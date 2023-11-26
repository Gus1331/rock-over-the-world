var database = require("../database/config")



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
};