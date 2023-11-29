var database = require("../database/config")

function autenticarApelido(apelido) {
    console.log("autenticando apelido... ");

    var instrucao = `
        SELECT apelido FROM usuario WHERE apelido = '${apelido}';
    `;
    console.log("Executando a instrução SQL: \n" + instrucao);
    return database.executar(instrucao);
}

function autenticar(apelido, senha) {
    console.log("autenticando... ");

    var instrucao = `
    SELECT nome, sexo, apelido, dtNasc, DATE_FORMAT(dtConta, "%d/%m/%Y") AS dtConta, email, idUsuario, imgPerfil FROM usuario
    WHERE apelido = '${apelido}' AND senha = '${senha}';
    `;
    console.log("Executando a instrução SQL: \n" + instrucao);
    return database.executar(instrucao);
}


function cadastrar(nome, email, senha, apelido, dtNasc, regiao, sexo) {
    console.log("cadastrando...");
    

    var instrucao = `
    INSERT INTO usuario(nome, apelido, sexo, dtNasc, email, senha, fkRegiao) VALUE 
	('${nome}', '${apelido}', '${sexo}', '${dtNasc}', '${email}', '${senha}', ${regiao});
    `;
    console.log("Executando a instrução SQL: \n" + instrucao);
    return database.executar(instrucao);
}

function requisitarDados(apelido, senha){
    console.log("requisitando dados...");

    var instrucao = `
    SELECT idUsuario as id, nome, sexo, apelido, dtNasc, DATE_FORMAT(dtConta, "%d/%m/%Y") AS dtConta, email, idUsuario, imgPerfil FROM usuario
    WHERE apelido = '${apelido}' AND senha = '${senha}';
    `;
    console.log("Executando a instrução SQL: \n" + instrucao);
    return database.executar(instrucao);
}

function conectarFavoritos(idUsuario){
    console.log("conectar favoritos...");

    var instrucao = `
    INSERT INTO favoritos(fkUsuario) VALUE (${idUsuario});
    `;
    console.log("Executando a instrução SQL: \n" + instrucao);
    return database.executar(instrucao);
}

function atualizarFotoPerfil(idUsuario, fotoPerfil){
    
    var instrucao = ``
    if(fotoPerfil < 10){
        instrucao = `
        UPDATE usuario SET  imgPerfil = "profile-img0${fotoPerfil}" WHERE idUsuario = ${idUsuario};
        `;
    }
    else{
        instrucao = `
        UPDATE usuario SET  imgPerfil = "profile-img${fotoPerfil}" WHERE idUsuario = ${idUsuario};
        `;

    }
    console.log("Executando a instrução SQL: \n" + instrucao);
    return database.executar(instrucao);

}

module.exports = {
    autenticar,
    autenticarApelido,
    requisitarDados,
    conectarFavoritos,
    atualizarFotoPerfil,
    cadastrar,
};