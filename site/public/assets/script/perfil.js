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
  h1_apelido_usuario.innerText = usuarioData.apelido;
  p_nome_usuario.innerText = usuarioData.nome;
  span_dtConta_usuario.innerText = usuarioData.dtConta;
  img_imgPerfil_usuario.src = `assets/images/profile/${usuarioData.imgPerfil}.jpg`;
}

function editProfile(){
  searchLabel.innerHTML = `Editar foto de perfil:`;
  search.style.display = `block`;
  screendivSearch.style.display = `block`;
  searchResult.innerHTML= ``;
  for(let i = 1; i < 19; i++){
    if(i < 10){
      searchResult.innerHTML += `<img onclick="updateProfileImg(${i})" class="profileImg" src="assets/images/profile/profile-img0${i}.jpg">`;
    }
    else{
      searchResult.innerHTML += `<img onclick="updateProfileImg(${i})" class="profileImg" src="assets/images/profile/profile-img${i}.jpg">`;

    }
  }
}

function listarFavoritos() { //Pega os favoritos do bd tabela favoritos

  fetch(`/favoritos/listar/${usuarioData.id }`, {
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
        acessarMusica(favoritos.musica);
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
        acessarInstrumento(favoritos.instrumento);
      }
    }
    ).catch(function (erro) {
      console.log(erro);
    })
}

/* ONCLICK EDITAR FAVORITOS */

function closeSearch() {
  search.style.display = `none`;
  screendivSearch.style.display = `none`;
  search_musica.style.display = `none`;
  search_album.style.display = `none`;
  search_banda.style.display = `none`;
  search_artista.style.display = `none`;
  search_solo.style.display = `none`;
  search_vocal.style.display = `none`;
  searchResult.innerHTML = ``;
}

function editarMusica() {
  search.style.display = `block`;
  searchLabel.innerHTML = `Editar musica favorita:`;
  screendivSearch.style.display = `block`;
  search_musica.style.display = `block`;
}

function editarAlbum() {
  search.style.display = `block`;
  searchLabel.innerHTML = `Editar album favorito:`;
  screendivSearch.style.display = `block`;
  search_album.style.display = `block`;
}

function editarBanda() {
  search.style.display = `block`;
  searchLabel.innerHTML = `Editar banda favorita:`;
  screendivSearch.style.display = `block`;
  search_banda.style.display = `block`;
}

function editarArtista() {
  search.style.display = `block`;
  searchLabel.innerHTML = `Editar artista solo favorito:`;
  screendivSearch.style.display = `block`;
  search_artista.style.display = `block`;
}

function editarSolo() {
  search.style.display = `block`;
  searchLabel.innerHTML = `Editar solo de guitarra favorito:`;
  screendivSearch.style.display = `block`;
  search_solo.style.display = `block`;
}

function editarVocal() {
  search.style.display = `block`;
  searchLabel.innerHTML = `Editar vocal favorito:`;
  screendivSearch.style.display = `block`;
  search_vocal.style.display = `block`;
}

function editarSubGen(){
  search.style.display = `block`;
  searchLabel.innerHTML = `Editar Sub-gênero favorito:`;
  screendivSearch.style.display = `block`;
  searchResult.innerHTML = `
  <li onclick="atualizarSubGen(this.innerText)"><strong> Rock 'n' Roll</strong></li>
  <li onclick="atualizarSubGen(this.innerText)"><strong> Rock Alternativo</strong></li>
  <li onclick="atualizarSubGen(this.innerText)"><strong> Indie Rock</strong></li>
  <li onclick="atualizarSubGen(this.innerText)"><strong> Hard Rock</strong></li>
  <li onclick="atualizarSubGen(this.innerText)"><strong> Heavy Metal</strong></li>
  <li onclick="atualizarSubGen(this.innerText)"><strong> Punk Rock</strong></li>
  <li onclick="atualizarSubGen(this.innerText)"><strong> Grunge</strong></li>
  <li onclick="atualizarSubGen(this.innerText)"><strong> Rock Progressivo</strong></li>
  `;
}

function editarInstrumento(){
  search.style.display = `block`;
  searchLabel.innerHTML = `Editar Sub-gênero favorito:`;
  screendivSearch.style.display = `block`;
  searchResult.innerHTML = `
  <li onclick="atualizarInstrumento(this.innerText)"><strong> Guitarra</strong></li>
  <li onclick="atualizarInstrumento(this.innerText)"><strong> Bateria</strong></li>
  <li onclick="atualizarInstrumento(this.innerText)"><strong> Baixo</strong></li>
  <li onclick="atualizarInstrumento(this.innerText)"><strong> Violão</strong></li>
  <li onclick="atualizarInstrumento(this.innerText)"><strong> Violino</strong></li>
  <li onclick="atualizarInstrumento(this.innerText)"><strong> Violancelo</strong></li>
  <li onclick="atualizarInstrumento(this.innerText)"><strong> Flauta</strong></li>
  <li onclick="atualizarInstrumento(this.innerText)"><strong> Orgão</strong></li>
  <li onclick="atualizarInstrumento(this.innerText)"><strong> Saxofone</strong></li>
  `;
}

/* ATUALIZANDO FAVORITOS NO BD ========================================================================*/

function atualizarFavorito(idSpotify, campo) {
  fetch("/favoritos/atualizar", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      idUsuarioServer: usuarioData.id ,
      idSpotifyServer: idSpotify,
      campoServer: campo
    })
  }).then(resposta => {
    if (!resposta.ok) {
      console.log("Problemas ao atualizar favorito");
    }
    else {
      console.log("Favorito atualizado!");
      closeSearch();
      listarFavoritos();
    }

  }).catch(function (erro) {
    console.log(erro);
  })
}

function atualizarSubGen(subGen){

  fetch("/favoritos/atualizarSubGen", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      idUsuarioServer: usuarioData.id ,
      subGenServer: subGen
    })
  }).then(resposta => {
    if (!resposta.ok) {
      console.log("Problemas ao atualizar subgenero");
    }
    else {
      console.log("subgenero atualizado!");
      closeSearch();
      listarFavoritos();
    }

  }).catch(function (erro) {
    console.log(erro);
  })
}

function atualizarInstrumento(instrumento){

  fetch("/favoritos/atualizarInstrumento", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      idUsuarioServer: usuarioData.id ,
      instrumentoServer: instrumento
    })
  }).then(resposta => {
    if (!resposta.ok) {
      console.log("Problemas ao atualizar Instrumento");
    }
    else {
      console.log("Instrumento atualizado!");
      closeSearch();
      listarFavoritos();
    }

  }).catch(function (erro) {
    console.log(erro);
  })
}


function updateProfileImg (id){
  fetch("/usuarios/atualizarFotoPerfil", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      idUsuarioServer: usuarioData.id ,
      profileImgServer: id
    })
  }).then(resposta => {
    if (!resposta.ok) {
      console.log("Problemas ao atualizar foto de perfil!");
    }
    else {
      console.log("Foto atualizada!");
      closeSearch();
      let localData = usuarioData;
      
      if(id < 10)localData.imgPerfil = `profile-img0${id}`;
      else localData.imgPerfil = `profile-img${id}`;

      console.log(localData)

      localStorage.clear();
      localStorage.setItem('usuario', JSON.stringify(localData));

      aplicarDados();
    }
  
  }).catch(function (erro) {
    console.log(erro);
  })

}



/* USANDO API DO SPOTIFY ------------------------------------------------------------------ */

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
      for (let i = 0; i < 4; i++) {
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
      for (let i = 0; i < 4; i++) {
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
      for (let i = 0; i < 4; i++) {
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
      for (let i = 0; i < 4; i++) {
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
  subGen_nome.innerHTML = subGen;

  if (subGen == "Rock 'n' Roll") {
    subGen_foto.innerHTML = `<img src="assets/images/icon30.jpg">`;
  } else if (subGen == "Rock Progressivo") {
    subGen_foto.innerHTML = `<img src="assets/images/icon31.jpg">`;
  } else if (subGen == "Rock Alternativo") {
    subGen_foto.innerHTML = `<img src="assets/images/icon32.jpg">`;
  } else if (subGen == "Hard Rock") {
    subGen_foto.innerHTML = `<img src="assets/images/icon33.jpg">`;
  } else if (subGen == "Heavy Metal") {
    subGen_foto.innerHTML = `<img src="assets/images/icon34.jpg">`;
  } else if (subGen == "Punk Rock") {
    subGen_foto.innerHTML = `<img src="assets/images/icon35.jpg">`;
  } else if (subGen == "Grunge") {
    subGen_foto.innerHTML = `<img src="assets/images/icon36.jpg">`;
  } else if (subGen == "Indie Rock") {
    subGen_foto.innerHTML = `<img src="assets/images/icon37.jpg">`;
  }
}

function acessarInstrumento(instrumento) {
  instrumento_nome.innerHTML = instrumento;

  if (instrumento == "Guitarra") {
    instrumento_foto.innerHTML = `<img src="assets/images/icon01.png">`;
  } else if (instrumento == "Bateria") {
    instrumento_foto.innerHTML = `<img src="assets/images/icon02.png">`;
  } else if (instrumento == "Baixo") {
    instrumento_foto.innerHTML = `<img src="assets/images/icon03.png">`;
  } else if (instrumento == "Violão") {
    instrumento_foto.innerHTML = `<img src="assets/images/icon05.png">`;
  } else if (instrumento == "Piano") {
    instrumento_foto.innerHTML = `<img src="assets/images/icon06.png">`;
  } else if (instrumento == "Violino") {
    instrumento_foto.innerHTML = `<img src="assets/images/icon07.png">`;
  } else if (instrumento == "Violancelo") {
    instrumento_foto.innerHTML = `<img src="assets/images/icon07.png">`;
  } else if (instrumento == "Flauta") {
    instrumento_foto.innerHTML = `<img src="assets/images/icon08.png">`;
  } else if (instrumento == "Orgão") {
    instrumento_foto.innerHTML = `<img src="assets/images/icon06.png">`;
  } else if (instrumento == "Saxofone") {
    instrumento_foto.innerHTML = `<img src="assets/images/icon08.png">`;
  }
}

/* PESQUISAR */

function listarMusicas(local) {
  let searchTerm;

  if (local == "Musica") {
    searchTerm = search_musica.value;
  }
  else if (local == "Solo") {
    searchTerm = search_solo.value;
  }
  else if (local == "Vocal") {
    searchTerm = search_vocal.value;
  }

  fetch(`https://api.spotify.com/v1/search?q=${encodeURIComponent(searchTerm)}&type=track`, {
    headers: {
      'Authorization': `Bearer ${accessToken}`
    }
  })
    .then(response => response.json())
    .then(data => {
      searchResult.innerHTML = ``;
      for (let i = 0; i < 10; i++) { // PEGA OS DADOS DENTRO DE UMA ARRAY COM AS MUSICAS PROCURADAS
        let ano = ``;
        let exportAno;

        exportAno = data.tracks.items[i].album.release_date;
        ano += `${exportAno[0]}`;
        ano += `${exportAno[1]}`;
        ano += `${exportAno[2]}`;
        ano += `${exportAno[3]}`;

        searchResult.innerHTML += `<li onclick="atualizarFavorito('${data.tracks.items[i].id}', '${local}')"><strong> ${data.tracks.items[i].name} </strong><br><br> Autor: ${data.tracks.items[i].artists[0].name} <span class="sideRight">${ano}</span></li>`
      }
    })
    .catch(error => {
      console.error('Ocorreu um erro na pesquisa de músicas:', error);
    });
}

function listarAlbums() {
  let searchTerm = search_album.value;

  fetch(`https://api.spotify.com/v1/search?q=${encodeURIComponent(searchTerm)}&type=album`, {
    headers: {
      'Authorization': `Bearer ${accessToken}`
    }
  })
    .then(response => response.json())
    .then(data => {
      searchResult.innerHTML = ``;
      for (let i = 0; i < 10; i++) { // PEGA OS DADOS DENTRO DE UMA ARRAY COM AS MUSICAS PROCURADAS
        let ano = ``;
        let exportAno;
        
        exportAno = data.albums.items[i].release_date;
        ano += `${exportAno[0]}`;
        ano += `${exportAno[1]}`;
        ano += `${exportAno[2]}`;
        ano += `${exportAno[3]}`;
        
        searchResult.innerHTML += `<li onclick="atualizarFavorito('${data.albums.items[i].id}', 'album')"><strong> ${data.albums.items[i].name} </strong><br><br> Autor: ${data.albums.items[i].artists[0].name} <span class="sideRight">${ano}</span></li>`
      }
    })
    .catch(error => {
      console.error('Ocorreu um erro na pesquisa de músicas:', error);
    });
}

function listarArtistas(local) {
  let searchTerm;

  if (local == "Banda") {
    searchTerm = search_banda.value;
  }
  else if (local == "Artista") {
    searchTerm = search_artista.value;
  }

  fetch(`https://api.spotify.com/v1/search?q=${encodeURIComponent(searchTerm)}&type=artist`, {
    headers: {
      'Authorization': `Bearer ${accessToken}`
    }
  })
    .then(response => response.json())
    .then(data => {
      searchResult.innerHTML = ``;

      for (let i = 0; i < 10; i++) { // PEGA OS DADOS DENTRO DE UMA ARRAY COM OS ARTISTAS PROCURADOS

        searchResult.innerHTML += `<li onclick="atualizarFavorito('${data.artists.items[i].id}', '${local}')"><strong> ${data.artists.items[i].name} </strong><br><br> Gênero: ${data.artists.items[i].genres[0]} </li>`

      }
    })
    .catch(error => {
      console.error('Ocorreu um erro na pesquisa de músicas:', error);
    });
}