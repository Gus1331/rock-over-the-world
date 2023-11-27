const usuarioLogado = localStorage.getItem('usuario');

if (usuarioLogado){
    window.location = "index.html";
}


/* VARIAVEIS */

let userData = {} // objeto responsável por guardar os dados do usuario e salvar no localStorage

let nome;
let apelido;
let dtNasc;
let sexo = "m";
let email;
let senha;
let regiao;

function setGender(span) {
    sexValue_M.className = "sexValue ";
    sexValue_F.className = "sexValue ";
    sexValue_Null.className = "sexValue ";

    if (span.innerHTML == "M") { sexo = "m"; }
    else if (span.innerHTML == "F") { sexo = "f"; }
    else { sexo = null; }

    span.className += "spnSelected";
}

function verificarApelido() {
    userName_response.innerHTML = `<span style="color: gray;">Verificando...</span>`;
    apelido = input_userName.value;

    if (apelido.indexOf(" ") != -1 ||
        apelido.length > 20 ||
        apelido.length < 4) {
        userName_response.innerHTML = `<span style="color: red;">Apelido inválido</span>`;
    }
    else { // SELECT * APELIDOS
        fetch("/usuarios/autenticarApelido", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                'Accept': 'application/json'
            },
            body: JSON.stringify({
                apelidoServer: apelido
            }),
        })
            .then(function (resposta) {
                console.log("resposta: ", resposta);

                if (resposta.ok) {

                    console.log("sucesso");
                    return resposta.json();

                    // userName_response.innerHTML = `<span style="color: green;">Apelido disponível :D</span>`;
                    // userName_response.innerHTML = `<span style="color: red;">Apelido inválido</span>`;
                } else {

                    throw "Houve um erro ao pesquisar apelido no banco de dados";
                }
            }).then(data => {
                console.log('Resposta:', data);

                if (data.allowed) {
                    userName_response.innerHTML = `<span style="color: green;">Apelido disponível :D</span>`;
                } else if (data.allowed == false) {
                    userName_response.innerHTML = `<span style="color: red;">Apelido indisponível :(</span>`;
                } else {
                    console.log(`Resposta retornou vazia`)
                }
            })
            .catch(function (resposta) {
                console.log(`#ERRO: ${resposta}`);
            });

        return false;

    }
}


/* VALIDAÇÃO */

function cadastrarUsuario() {
    div_error.style.display = "none";
    let errorList = []

    nome = input_name.value.toLowerCase();
    dtNasc = input_dt_nascimento.value;
    email = input_email.value.toLowerCase().trim();
    regiao = select_regiao.value;

    if (nome == "" || // CAMPOS EM BRANCO
        dtNasc == "" ||
        email == "" ||
        apelido == "" ||
        apelido == undefined ||
        regiao == "Selecionar" ||
        input_senha_A.value == "") {
        errorList.push("Preencha os campos em branco!")
        console.error("campos em branco")
    }
    else {
        if (userName_response.innerHTML.indexOf("red;") != - 1) {
            errorList.push("Apelido inválido");
            console.error("apelido");
        }


        if (apelido != undefined) {
            if (apelido.indexOf(" ") != -1) { // ESPAÇOS NO APELIDO        
                errorList.push("Apelido não pode conter espaços")
                console.error("apelido");
            }

            if (apelido.length > 20) { // LARGURA APELIDO
                errorList.push("Apelido ultrapassa limite de 20 caracteres")
                console.error("apelido");
            }
            else if (apelido.length < 4) {
                errorList.push("Apelido tem que ter no mínimo 4 caracteres")
                console.error("apelido");
            }
        }

        if (nome.length > 60) { // LARGURA NOME
            errorList.push("Nome ultrapassa limite de 60 caracteres")
            console.error("nome");
        }
        else if (nome.length < 5) {
            errorList.push("Nome muito curto")
            console.error("nome");
        }

        if (email.indexOf("@") == -1 ||
            email.indexOf(".") < -1 ||
            email.length < 12) {
            errorList.push("Email inválido")
            console.error("email");
        }
        else if (email.length > 256) { // EMAIL LARGURA
            errorList.push("Email ultrapassa limite de 256 caracteres")
            console.error("email");
        }


        if (input_senha_A.value == input_senha_B.value) { // SENHAS IGUAIS
            senha = input_senha_A.value;

            if (senha.indexOf("@") != - 1 || //SENHA NECESSITA CARACTERE ESPECIAL
                senha.indexOf("$") != - 1 ||
                senha.indexOf("%") != - 1 ||
                senha.indexOf("_") != - 1 ||
                senha.indexOf(".") != - 1 ||
                senha.indexOf("+") != - 1 ||
                senha.indexOf("=") != - 1 ||
                senha.indexOf("&") != - 1 ||
                senha.indexOf("(") != - 1 ||
                senha.indexOf(")") != - 1 ||
                senha.indexOf("^") != - 1 ||
                senha.indexOf("#") != - 1 ||
                senha.indexOf("!") != - 1 ||
                senha.indexOf("*") != - 1 ||
                senha.indexOf("-") != - 1 ||
                senha.indexOf(":") != - 1 ||
                senha.indexOf("{") != - 1 ||
                senha.indexOf("}") != - 1 ||
                senha.indexOf("[") != - 1 ||
                senha.indexOf("]") != - 1 ||
                senha.indexOf("?") != - 1 ||
                senha.indexOf("/") != - 1 ||
                senha.indexOf("`") != - 1 ||
                senha.indexOf("~") != - 1 ||
                senha.indexOf("´") != - 1 ||
                senha.indexOf("|") != - 1 ||
                senha.indexOf(",") != - 1 ||
                senha.indexOf(";") != - 1) { }
            else {
                errorList.push("A senha precisam de um caractere especial");
                console.error("senha")
            }

            if (senha.indexOf("0") != - 1 || // SENHA NECESSITA NUMERO
                senha.indexOf("1") != -1 ||
                senha.indexOf("2") != -1 ||
                senha.indexOf("3") != -1 ||
                senha.indexOf("4") != -1 ||
                senha.indexOf("5") != -1 ||
                senha.indexOf("6") != -1 ||
                senha.indexOf("7") != -1 ||
                senha.indexOf("8") != -1 ||
                senha.indexOf("9") != -1) { }
            else {
                errorList.push("A senha precisam de um numero");
                console.error("senha")
            }

            if (senha.length > 30) { // CARACTERES SENHA
                errorList.push("Senha ultrapassa limite de 30 caracteres")
                console.error("senha");
            }
            else if (senha.length < 8) {
                errorList.push("Senha necessita de no minimo 8 caracteres")
                console.error("senha");
            }
        }
        else {
            errorList.push("Senhas não conferem");
            console.error("senha");
        }


    }

    console.log(errorList);

    if (errorList.length > 0) {
        let message = ``;
        for (let i = 0; i < errorList.length; i++) {
            message += `${errorList[i]}<br>`
        }
        div_error.innerHTML = message
        setTimeout(() => {
            div_error.style.display = "block";
        }, 300)
    }
    else {

        fetch("/usuarios/cadastrar", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                nomeServer: nome,
                apelidoServer: apelido,
                dtNascServer: dtNasc,
                emailServer: email,
                senhaServer: senha,
                sexoServer: sexo,
                regiaoServer: regiao
            }),
        })
            .then(function (resposta) {
                console.log("resposta: ", resposta);

                if (resposta.ok) {

                    setTimeout(buscarDados, 500);

                } else {
                    throw "Houve um erro ao tentar realizar o cadastro!";
                }
            })
            .catch(function (resposta) {
                console.log(`#ERRO: ${resposta}`);
            });

        return false;

    }
}

function buscarDados() {
    console.log("Buscando os dados inseridos...")

    fetch("/usuarios/requisitarDados", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            apelidoServer: apelido,
            senhaServer: senha
        }),
    }).then(resposta => {
        return resposta.json();
    }).then(data => {
        userData = data;

        setTimeout(conectarCriarFavoritos, 500);
    }
    ).catch(function (resposta) {
        console.log(`#ERRO: ${resposta}`);
    })






}

function conectarCriarFavoritos() {
    console.log("Buscando os dados inseridos...")

    fetch("/usuarios/conectarFavoritos", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            idUsuarioServer: userData[0].idUsuario
        }),
    }).then(function (resposta) {
        if (resposta.ok) {

            setTimeout(finalizarCadastro, 500)
        }
        else {
            throw "Houve um erro ao tentar conectar com favoritos!";
        }
    }).catch(function (resposta) {
        console.log(`#ERRO: ${resposta}`);
    })

}

function finalizarCadastro() {
    localStorage.setItem('usuario', JSON.stringify(userData[0]));

    console.log("Cadastro realizado com sucesso! Redirecionando para tela de Login...");
    div_error.innerHTML = `Cadastro realizado com sucesso! Redirecionando para tela de Login...`;
    div_error.style.display = "block";
    div_error.style.backgroundColor = "rgb(30, 238, 75)";

    setTimeout(() => {
        window.location = "index.html";
    }, "5000");
}