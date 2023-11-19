// Funções background + header + footer
let apelido;

function openLogin() {
    console.log('login:')

    screendiv.style.display = "flex";
    loginPage.style.display = "flex";
}

function closeLogin() {
    screendiv.style.display = "none";
    loginPage.style.display = "none";
}


function login() {

    apelido = input_login_userName.value;
    senha = input_login_password.value;

    fetch("/usuarios/autenticar", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            apelidoServer: apelido,
            senhaServer: senha
        })
    }).then(function (resposta) {
        console.log("ESTOU NO THEN DO entrar()!")

        if (resposta.ok) {
            console.log(resposta);


        } else {

            console.log("Houve um erro ao tentar realizar o login!");

            resposta.text().then(texto => {
                console.error(texto);
            });
        }

    }).catch(function (erro) {
        console.log(erro);
    })

    return false;
}