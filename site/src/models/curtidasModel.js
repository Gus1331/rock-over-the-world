var database = require("../database/config")


function listarCurtidasUsuario(idUsuario) {
    console.log("listar curtidos...", idUsuario);

    var instrucao = `
    SELECT idApiSpotify as idMusica FROM curtida JOIN musica ON fkMusica = idMusica WHERE fkUsuario = ${idUsuario};
    `;
    console.log("Executando a instrução SQL: \n" + instrucao);
    return database.executar(instrucao);
}

function listarRanking() {
    console.log("listar ranking...",);

    var instrucao = `
    SELECT idApiSpotify as idMusica, COUNT(*) AS likes FROM curtida JOIN musica ON fkMusica = idMusica GROUP BY fkMusica ORDER BY likes DESC;
    `;
    console.log("Executando a instrução SQL: \n" + instrucao);
    return database.executar(instrucao);
}

function listaMusicasCadastradas() {
    console.log("listar musicas cadastradas...",);

    var instrucao = `SELECT * FROM musica;`;
    console.log("Executando a instrução SQL: \n" + instrucao);
    return database.executar(instrucao);
}

function cadastrarMusica(idMusica) {
    console.log("listar musicas cadastradas...",);

    var instrucao = `INSERT INTO musica VALUE
	(NULL, '${idMusica}');`;
    console.log("Executando a instrução SQL: \n" + instrucao);
    return database.executar(instrucao);
}

function curtirMusica(idMusica, idUsuario) {
    console.log("curtindo musica...",);

    var instrucao = `INSERT INTO curtida(fkMusica, fkUsuario) VALUES
    (${idMusica}, ${idUsuario});`;
    console.log("Executando a instrução SQL: \n" + instrucao);
    return database.executar(instrucao);
}


module.exports = {
    listarCurtidasUsuario,
    listarRanking,
    listaMusicasCadastradas,
    curtirMusica,
    cadastrarMusica,
};