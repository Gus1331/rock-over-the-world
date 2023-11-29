var database = require("../database/config")


function listarCurtidasUsuario(idUsuario){
    console.log("listar curtidos...", idUsuario);

    var instrucao = `
    SELECT idApiSpotify as idMusica FROM curtida JOIN musica ON fkMusica = idMusica WHERE fkUsuario = ${idUsuario};
    `;
    console.log("Executando a instrução SQL: \n" + instrucao);
    return database.executar(instrucao);
}

function listarRanking(){
    console.log("listar ranking...", );

    var instrucao = `
    SELECT idApiSpotify as idMusica, COUNT(*) AS likes FROM curtida JOIN musica ON fkMusica = idMusica GROUP BY fkMusica;
    `;
    console.log("Executando a instrução SQL: \n" + instrucao);
    return database.executar(instrucao);
}


module.exports = {
    listarCurtidasUsuario,
    listarRanking,
};