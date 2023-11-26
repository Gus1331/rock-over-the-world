/* PERFIL */

let favoritos; // ficará o objeto com os favoritos

function logado() { // Verifica se o usuario está logado ao acessa a página
  if (usuarioData == undefined) {
    goHome();
  }
  else {
    setTimeout(() => {
      aplicarDados();
      listarFavoritos();
    }, 200);
  }
}

function goHome() {
  window.location = "index.html";
}

function aplicarDados() { // Coloca os dados do usuario na esquerda
  console.log(usuarioData)
  h1_apelido_usuario.innerText = usuarioData.apelido;
  p_nome_usuario.innerText = usuarioData.nome;
  span_dtConta_usuario.innerText = usuarioData.dtConta;
  img_imgPerfil_usuario.src = `assets/images/profile/${usuarioData.imgPerfil}.png`;
}

function listarFavoritos() { //Pega os favoritos do bd tabela favoritos

  fetch(`/favoritos/listar/${usuarioData.id}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json"
    }
  }).then(response => {
    if (!response.ok) {
      console.log('erro ao trazer dados');
    }
    return response.json();
  })
    .then(data => {
      console.log("Fav :", data);

      favoritos = data[0];

      /* VERIFICAÇÃO DOS FAVORITOS ------------------------------------------- */
      // monta a estrutura HTML para receber os dados do fetch API spotify


      if (favoritos.musica != null) { // MUSICA
        let favCard = document.getElementsByClassName("favCard")[0];
        favCard.innerHTML = `
        <div class="nome" id="musica_nome"></div>
        <div class="autor" id="musica_autor"></div>
        <div class="data" id="musica_data"></div>
        <div class="favCardImg" id="musica_foto"></div>`;
        acessarMusica("249XHhBxBOblTCYStaC27L");
      }
      if (favoritos.album != null) {//ALBUM
        let favCard = document.getElementsByClassName("favCard")[1];
        favCard.innerHTML = `
      <div class="nome" id="album_nome"></div>
      <div class="autor" id="album_autor"></div>
      <div class="data" id="album_data"></div>
      <div class="favCardImg" id="album_foto"></div>`;
      acessarAlbum(favoritos.album);
      }
      if (favoritos.banda != null) { // BANDA
        let favCard = document.getElementsByClassName("favCard")[2];
        favCard.innerHTML = `
        <div class="nome" id="banda_nome"></div>
        <div class="autor" id="banda_genero"></div>
        <div class="favCardImg" id="banda_foto"></div>
        `;
        acessarBanda(favoritos.banda);
      }
      if (favoritos.artista != null) { // ARTISTA
        let favCard = document.getElementsByClassName("favCard")[3];
        favCard.innerHTML = `
        <div class="nome" id="artista_nome"></div>
        <div class="autor" id="artista_genero"></div>
        <div class="favCardImg" id="artista_foto"></div>`;
        acessarArtista(favoritos.artista);
      }
      if (favoritos.solo != null) { // SOLO
        let favCard = document.getElementsByClassName("favCard")[4];
        favCard.innerHTML = `
        <div class="nome" id="solo_nome"></div>
        <div class="autor" id="solo_autor"></div>
        <div class="data" id="solo_data"></div>
        <div class="favCardImg" id="solo_foto"></div>`;
        acessarSolo(favoritos.solo);
      }
      if (favoritos.vocal != null) { // VOCAL
        let favCard = document.getElementsByClassName("favCard")[5];
        favCard.innerHTML = `
        <div class="nome" id="vocal_nome"></div>
        <div class="autor" id="vocal_autor"></div>
        <div class="data" id="vocal_data"></div>
        <div class="favCardImg" id="vocal_foto"></div>`;
        acessarVocal(favoritos.vocal);
      }
      if (favoritos.subGen != null) { // SUB GENERO
        let favCard = document.getElementsByClassName("favCard")[6];
        favCard.innerHTML = `
        <div class="nome" id="subGen_nome"></div>
        <div class="favCardImg" id="subGen_foto"></div>`;
        acessarSubGen(favoritos.subGen);
      }
      if (favoritos.instrumento != null) { // INSTRUMENTO
        let favCard = document.getElementsByClassName("favCard")[7];
        favCard.innerHTML = `
        <div class="nome" id="instrumento_nome"></div>
        <div class="favCardImg" id="instrumento_foto"></div>`;
      }
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

function acessarMusica(trackId) {
  fetch(`https://api.spotify.com/v1/tracks/${trackId}`, {
    headers: {
      'Authorization': `Bearer ${accessToken}`
    }
  })
    .then(response => response.json())
    .then(data => {
      musica_nome.innerHTML = data.name;
      musica_autor.innerHTML = data.artists[0].name
      for(let i = 0; i < 4; i++){
        let ano = data.album.release_date
        musica_data.innerHTML += ano[i];
      }
      musica_foto.innerHTML = `<img src="${data.album.images[0].url}">`;
    })
    .catch(error => {
      console.error('Ocorreu um erro ao buscar a música:', error);
    });
} 

function acessarAlbum(albumId) {
  fetch(`https://api.spotify.com/v1/albums/${albumId}`, {
    headers: {
      'Authorization': `Bearer ${accessToken}`
    }
  })
    .then(response => response.json())
    .then(data => {
      album_nome.innerHTML = data.name;
      album_autor.innerHTML = data.artists[0].name
      for(let i = 0; i < 4; i++){
        let ano = data.release_date
        album_data.innerHTML += ano[i];
      }
      album_foto.innerHTML = `<img src="${data.images[0].url}">`;
    })
    .catch(error => {
      console.error('Ocorreu um erro ao buscar o album:', error);
    });
}

function acessarBanda(artistId) {
  fetch(`https://api.spotify.com/v1/artists/${artistId}`, {
    headers: {
      'Authorization': `Bearer ${accessToken}`
    }
  })
    .then(response => response.json())
    .then(data => {
      banda_nome.innerHTML = data.name;
      banda_genero.innerHTML = data.genres[0];
      banda_foto.innerHTML = `<img src="${data.images[0].url}">`;
    })
    .catch(error => {
      console.error('Ocorreu um erro ao buscar a banda:', error);
    });
  }
  
  function acessarArtista(artistId) {
  fetch(`https://api.spotify.com/v1/artists/${artistId}`, {
    headers: {
      'Authorization': `Bearer ${accessToken}`
    }
  })
    .then(response => response.json())
    .then(data => {
      artista_nome.innerHTML = data.name;
      artista_genero.innerHTML = data.genres[0];
      artista_foto.innerHTML = `<img src="${data.images[0].url}">`;
    })
    .catch(error => {
      console.error('Ocorreu um erro ao buscar a banda:', error);
    });

}

function acessarSolo(trackId) {
  fetch(`https://api.spotify.com/v1/tracks/${trackId}`, {
    headers: {
      'Authorization': `Bearer ${accessToken}`
    }
  })
    .then(response => response.json())
    .then(data => {
      solo_nome.innerHTML = data.name;
      solo_autor.innerHTML = data.artists[0].name
      for(let i = 0; i < 4; i++){
        let ano = data.album.release_date
        solo_data.innerHTML += ano[i];
      }
      solo_foto.innerHTML = `<img src="${data.album.images[0].url}">`;
    })
    .catch(error => {
      console.error('Ocorreu um erro ao buscar a música:', error);
    });
}

function acessarVocal(trackId) {
  fetch(`https://api.spotify.com/v1/tracks/${trackId}`, {
    headers: {
      'Authorization': `Bearer ${accessToken}`
    }
  })
    .then(response => response.json())
    .then(data => {
      vocal_nome.innerHTML = data.name;
      vocal_autor.innerHTML = data.artists[0].name
      for(let i = 0; i < 4; i++){
        let ano = data.album.release_date
        vocal_data.innerHTML += ano[i];
      }
      vocal_foto.innerHTML = `<img src="${data.album.images[0].url}">`;
    })
    .catch(error => {
      console.error('Ocorreu um erro ao buscar a música:', error);
    });
}

function acessarSubGen(subGen) {
  if(subGen == ""){

  }else if (subGen == ""){

  }else if (subGen == ""){

  }else if (subGen == ""){
    
  }else if (subGen == ""){

  }else if (subGen == ""){

  }else if (subGen == ""){

  }else if (subGen == ""){

  }else if (subGen == ""){

  }else if (subGen == ""){

  }else if (subGen == ""){

  }else if (subGen == ""){

  }
}
function acessar(instrumento) {
  if(instrumento == "guitarra"){

  }else if (instrumento == "bateria"){

  }else if (instrumento == "baixo"){

  }else if (instrumento == "violão"){
    
  }else if (instrumento == "piano"){

  }else if (instrumento == "violino"){

  }else if (instrumento == "violancelo"){

  }else if (instrumento == "flauta"){

  }else if (instrumento == "orgão"){

  }else if (instrumento == "saxofone"){

  }
}