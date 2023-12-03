var database = require("../database/config")

function dadosGerais() {

    var instrucao = `SELECT DISTINCT(SELECT COUNT(subGen) from favoritos WHERE subGen = "Rock Progressivo") AS "progressivo",
	(SELECT COUNT(subGen) from favoritos WHERE subGen = "Heavy metal") AS "metal",
    (SELECT COUNT(subGen) from favoritos WHERE subGen = "Rock 'n' Roll") AS "roll",
    (SELECT COUNT(subGen) from favoritos WHERE subGen = "Rock Alternativo") AS "alternativo",
    (SELECT COUNT(subGen) from favoritos WHERE subGen = "Indie Rock") AS "indie",
    (SELECT COUNT(subGen) from favoritos WHERE subGen = "Hard Rock") AS "hard",
    (SELECT COUNT(subGen) from favoritos WHERE subGen = "Punk Rock") AS "punk",
    (SELECT COUNT(subGen) from favoritos WHERE subGen = "Grunge") AS "grunge",
    (SELECT COUNT(subGen) from favoritos WHERE subGen = "Post Rock") AS "post",
    AVG(YEAR(FROM_DAYS(TO_DAYS(NOW())-TO_DAYS(u.dtNasc)))) AS "media",
    (SELECT COUNT(sexo) FROM usuario WHERE sexo = "m") AS homens,
	(SELECT COUNT(sexo) FROM usuario WHERE sexo = "f") AS mulheres,
    (SELECT COUNT(sexo) FROM usuario) AS "total"
	FROM favoritos JOIN usuario u ON fkUsuario = idUsuario;`;

    console.log("Executando a instrução SQL: \n" + instrucao);
    return database.executar(instrucao);
}


module.exports = {
    dadosGerais
};