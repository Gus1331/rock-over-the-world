let usuarioData;


function dataLocalStorage(){
    let usuarioLogado = localStorage.getItem('usuario');
    
    if (usuarioLogado) {
        usuarioData = JSON.parse(usuarioLogado);
        console.log(usuarioData)
        loginOn();
    }
}
dataLocalStorage();



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
    }).then(resposta => {
        return resposta.json();

    }).then(data => {
        localStorage.setItem('usuario', JSON.stringify(data));
        console.log("Login realizado com sucesso!");
        console.log(data);
        dataLocalStorage();
        closeLogin();
        loginOn();
    }
    ).catch(function (erro) {
        console.log(erro);
    })
}

function loginOn() {
        li_login.innerHTML = `
        <div class="profile">
        <img src="assets/images/profile/${usuarioData.imgPerfil}.png">
        <p>
            <span class="profilename" id="span_userName">${usuarioData.apelido}</span>
            <br>
            <span class="logout" onclick="logout();">Logout</span>
        </p>
    </div>
        `;
   

}

function logout() {
    localStorage.clear();
    li_login.innerHTML = `
    <button onclick="openLogin();">LOGIN</button>
    `;
}