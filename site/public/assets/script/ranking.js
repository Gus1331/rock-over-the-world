/* RANKING */
let curtidasUsuario = [];
let ranking = [];

function listaCurtidaUsuario() {
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
function listarRanking() {
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


async function buscarDadosSpotify() {

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

function montarRanking(musicaAtual, i){
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
    else{
        rankingHTML += `
        <li>
        <span class="position">${i + 1}</span>
        <span class="name">${musicaAtual.name}</span>
        <span class="author">${musicaAtual.artists[0].name}</span>
        <img src="${musicaAtual.album.images[0].url}" class="img">
        <span class="likes">
        `;
    }
    if(ranking[i].userLike){
        rankingHTML += `
        <span class="material-symbols-outlined" style="font-variation-settings: 'FILL' 1"> thumb_up </span> &nbsp; ${ranking[i].likes}
        </span>
        </li>
        `;
    }
    else{
        rankingHTML += `
        <span class="likes">
        <span class="material-symbols-outlined" style="font-variation-settings: 'FILL' 0"> thumb_up </span> &nbsp; ${ranking[i].likes}
        </span>
        </li>
        `;
    }

    if( i + 1 == ranking.length){
        rankingHTML += `</ul>`;
    }
    results.innerHTML = rankingHTML
}