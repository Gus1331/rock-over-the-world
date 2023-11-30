/* RANKING */
let curtidasUsuario = [];
let ranking = [];
let musicasCadastradas = [];

function listaCurtidaUsuario() { // LISTA DE MUSICAS QUE FORAM CURTIDAS PELO USUARIO
    fetch(`/curtidas/listarCurtidasUsuario/${usuarioData.id}`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json"
        }
    }).then(response => {
        if (!response.ok) {
            console.log('erro ao trazer dados');
        }
        return response.json();
    }).then((data) => {
        curtidasUsuario = data;
        setTimeout(listarRanking, 500);
    })
        .catch(function (erro) {
            console.log(erro);
        });

}

function listaMusicasCadastradas() { // LISTA TODAS MUSICAS CADASTRADAS NO BANCO (AFIM DE SABER SE A MUSICA CURTIDA PRECISARÁ SER REGISTRADA)
    fetch(`/curtidas/listaMusicasCadastradas/`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json"
        }
    }).then(response => {
        if (!response.ok) {
            console.log('erro ao trazer dados');
        }
        return response.json();
    }).then((data) => {
        musicasCadastradas = data
    })
        .catch(function (erro) {
            console.log(erro);
        });
}


function listarRanking() { // LISTA O RANKING 
    fetch(`/curtidas/listarRanking/`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json"
        }
    }).then(response => {
        if (!response.ok) {
            console.log('erro ao trazer dados');
        }
        return response.json();
    }).then((data) => {
        ranking = data;

        setTimeout(buscarDadosSpotify, 500)
    })
        .catch(function (erro) {
            console.log(erro);
        });

}


function buscarDadosSpotify() {


    if (curtidasUsuario.length > 0) {


        // ESTE FOR TEM COMO OBJETIVO COMPARAR AS MUSICAS QUE O USUARIO CURTIU COM O RANKING, PARA QUE SE POSSA SABER AS MUSICAS EM QUE O BOTÃO DE LIKE SE DESATIVARA
        for (let iRank = 0; iRank < ranking.length; iRank++) {

            for (let iCurt = 0; iCurt < curtidasUsuario.length; iCurt++) {

                if (ranking[iRank].idMusica == curtidasUsuario[iCurt].idMusica) {
                    ranking[iRank].userLike = true; // o usuario já curtiu esta musica
                    break;
                }
                else {
                    ranking[iRank].userLike = false; // o usuario não curtiu esta musica
                }

            }
        }
    }


    for (let i = 0; i < ranking.length; i++) {

        fetch(`https://api.spotify.com/v1/tracks/${ranking[i].idMusica}`, {
            headers: {
                'Authorization': `Bearer ${accessToken}`
            }
        })
            .then(response => response.json())
            .then(data => {
                setTimeout(() => {
                    montarRanking(data, i)
                }, 500);
            })
            .catch(error => {
                console.error('Ocorreu um erro ao buscar a música:', error);
            });


    }
}

function montarRanking(musicaAtual, i) {
    console.log(ranking);

    if (i == 0) {
        console.log(musicaAtual)
        rankingHTML = `<ul>`;
        rankingHTML += `
        <li class="first">
        <span class="firstPosition">1</span>
        <img src="assets/images/first.gif" class="firstImgPosition">
        <span class="firstName">${musicaAtual.name}</span>
        <span class="firstAuthor">${musicaAtual.artists[0].name}</span>
        <img src="${musicaAtual.album.images[0].url}" class="firstImg">
        <span class="likes">
        `;
    }
    else {
        rankingHTML += `
        <li>
        <span class="position">${i + 1}</span>
        <span class="name">${musicaAtual.name}</span>
        <span class="author">${musicaAtual.artists[0].name}</span>
        <img src="${musicaAtual.album.images[0].url}" class="img">
        <span class="likes">
        `;
    }
    if ((curtidasUsuario.length > 0)) {
        if (ranking[i].userLike) { //CURTIU
            rankingHTML += `
            <span class="material-symbols-outlined" style="font-variation-settings: 'FILL' 1"> thumb_up </span> &nbsp; ${ranking[i].likes}
            </span>
            </li>
            `;
        }
        else { // NÃO CURTIU
            rankingHTML += `
            <span class="likes">
            <span onclick="curtirMusica('${musicaAtual.id}');" class="material-symbols-outlined" style="font-variation-settings: 'FILL' 0"> thumb_up </span> &nbsp; ${ranking[i].likes}
            </span>
            </li>
            `;
        }
    }
    else { // NÃO CURTIU
        rankingHTML += `
        <span class="likes">
        <span onclick="curtirMusica('${musicaAtual.id}');" class="material-symbols-outlined" style="font-variation-settings: 'FILL' 0"> thumb_up </span> &nbsp; ${ranking[i].likes}
        </span>
        </li>
        `;
    }

    if (i == ranking.length) {
        rankingHTML += `</ul>`;
    }
    results.innerHTML = rankingHTML

}

function montarPesquisa(musicaAtual, i) {

    if (i == 0) {
        searchHTML = `<ul>`;
    }

        searchHTML += `
        <li>
        <span class="name">${musicaAtual.name}</span>
        <span class="author">${musicaAtual.artists[0].name}</span>
        <img src="${musicaAtual.album.images[0].url}" class="img">
        <span class="likes">
        `;
    
        searchHTML += `
        <span class="likes">
        <span onclick="curtirMusica('${musicaAtual.id}');" class="material-symbols-outlined" style="font-variation-settings: 'FILL' 0"> thumb_up
        </li>
        `;
    

    if (i + 1 == 10) {
        searchHTML += `</ul>`;
    }
    resultsSearch.innerHTML = searchHTML

}


/* ATIVAR */

function ativarRanking() {
    div_title_musicas.style.border = `1px solid var(--color00)`;
    div_title_votar.style.border = `none`;

    results.innerHTML = `<ul></ul>`;
    listaCurtidaUsuario();
}

function ativarVotar() {
    div_title_musicas.style.border = `none`;
    div_title_votar.style.border = `1px solid var(--color00)`;
    results.innerHTML = `<input id="input_searchVote" placeHolder="Pesquise aqui..." onkeydown="pesquisaVotacao();"><div id="resultsSearch"></div>`;
}

function pesquisaVotacao(){
    let searchTerm = input_searchVote.value;
    resultsSearch.innerHTML = ``;
    let resultsHTML = `<ul>`

    fetch(`https://api.spotify.com/v1/search?q=${encodeURIComponent(searchTerm)}&type=track`, {
      headers: {
        'Authorization': `Bearer ${accessToken}`
      }
    })
      .then(response => response.json())
      .then(data => {
        for (let i = 0; i < 10; i++) { // PEGA OS DADOS DENTRO DE UMA ARRAY COM AS MUSICAS PROCURADAS

        //   exportAno = data.tracks.items[i].album.release_date;
        //   ano += `${exportAno[0]}`;
        //   ano += `${exportAno[1]}`;
        //   ano += `${exportAno[2]}`;
        //   ano += `${exportAno[3]}`;
        montarPesquisa(data.tracks.items[i], i)
        }
        resultsHTML += `</ul>`;
        resultsSearch.innerHTML += resultsHTML
      })
      .catch(error => {
        console.error('Ocorreu um erro na pesquisa de músicas:', error);
      });
  
}


function curtirMusica(idMusicaSpotify) { // CURTE A MUSICA 
    let idMusicaCurtir;

    for (let i = 0; i < musicasCadastradas.length; i++) {
        if (idMusicaSpotify == musicasCadastradas[i].idApiSpotify) {
            idMusicaCurtir = musicasCadastradas[i].idMusica
        }

    }
    if(idMusicaCurtir == undefined){
        fetch("/curtidas/cadastrarMusica", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                idMusicaServer: idMusicaSpotify
            })
        }).then(resposta => {
            if (resposta.ok) {
                console.log("Musica cadastrada!");
                setTimeout(()=>{
                    listaMusicasCadastradas();
                    listaCurtidaUsuario();
                },500);
            }
    
        }).catch(function (erro) {
            console.log(erro);
        })

    }

    setTimeout(() => {
        for (let i = 0; i < musicasCadastradas.length; i++) {
            if (idMusicaSpotify == musicasCadastradas[i].idApiSpotify) {
                idMusicaCurtir = musicasCadastradas[i].idMusica
            }
    
        }
        fetch(`/curtidas/curtirMusica/`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                idUsuarioServer: usuarioData.id,
                idMusicaServer: idMusicaCurtir
            })
        }).then(resposta => {
            if (resposta.ok) {
                console.log("Musica curtida!");
            }
            ativarRanking();

        }).catch(function (erro) {
            console.log(erro);
        })
    }, 1500)
}