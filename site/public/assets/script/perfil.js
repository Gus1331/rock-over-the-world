/* PERFIL */
let favoritos;

function aplicarDados(){
    console.log(usuarioData)
    h1_apelido_usuario.innerText = usuarioData.apelido;
    p_nome_usuario.innerText = usuarioData.nome;
    span_dtConta_usuario.innerText = usuarioData.dtConta;
    img_imgPerfil_usuario.src = `assets/images/profile/${usuarioData.imgPerfil}.png`;
}   

function goHome(){
    window.location = "index.html"
}

function listarFavoritos(){
    fetch(`/favoritos/listar/${usuarioData.id}`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json"
        }
    }).then( response => {
        if(!response.ok){
            console.log('erro ao trazer dados');
        }
        return response.json();
    })
    .then(data => {
        console.log("Favoritos listados!");
        console.log("Fav :",data);

        favoritos = data[0];

    }
    ).catch(function (erro) {
        console.log(erro);
    })
}

/* USANDO API DO SPOTIFY */

/* EXEMPLO DE FETCH
    const trackId = '3tPh0SSYadl5wBe8rVqr1v?si=960ad8a52af54d73'; // Substitua com o ID da música que você deseja obter informações

fetch(`https://api.spotify.com/v1/tracks/${trackId}`, {
  headers: {
    'Authorization': `Bearer ${accessToken}`
  }
})
  .then(response => response.json())
  .then(data => {
    console.log('Informações da música:', data);
    // Faça algo com os dados da música
  })
  .catch(error => {
    console.error('Ocorreu um erro ao buscar a música:', error);
  });
} 
*/