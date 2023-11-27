var database = require("../database/config")

function atualizarInstrumento(idUsuario, instrumento){
    var instrucao = `
    UPDATE favoritos SET instrumento = "${instrumento}" WHERE idFav = ${Number(idUsuario) + 10000};
    `;
    console.log("Executando a instrução SQL: \n" + instrucao);
    return database.executar(instrucao);
}

function atualizarSubGen(idUsuario, subGen){
    var instrucao = `
    UPDATE favoritos SET subGen = "${subGen}" WHERE idFav = ${Number(idUsuario) + 10000};
    `;
    console.log("Executando a instrução SQL: \n" + instrucao);
    return database.executar(instrucao);
}

function atualizar(idUsuario, idSpotify, campo){

    var instrucao = `
    UPDATE favoritos SET ${campo} = "${idSpotify}" WHERE idFav = ${Number(idUsuario) + 10000};
    `;
    console.log("Executando a instrução SQL: \n" + instrucao);
    return database.executar(instrucao);
}

function listar(idUsuario){
    console.log("listar favoritos...");

    var instrucao = `
    SELECT musica , album, banda, artista, solo, vocal, subGen, instrumento FROM usuario JOIN favoritos ON fkUsuario = idUsuario WHERE idUsuario = ${idUsuario};
    `;
    console.log("Executando a instrução SQL: \n" + instrucao);
    return database.executar(instrucao);
}

module.exports = {
    listar,
    atualizar,
    atualizarSubGen,
    atualizarInstrumento
};