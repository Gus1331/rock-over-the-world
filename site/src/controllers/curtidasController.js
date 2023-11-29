var curtidasModel = require("../models/curtidasModel");


function listarCurtidasUsuario(req, res) {
    var idUsuario = req.params.idUsuario;

    curtidasModel.listarCurtidasUsuario(idUsuario)
        .then(resultado => {
            res.json(resultado);
        }).catch(
            function (erro) {
                console.log(erro);
                console.log(
                    "\nHouve um erro ao pegar lista de musicas curtidas do usuario! Erro: ",
                    erro.sqlMessage
                );
                res.status(500).json(erro.sqlMessage);
            }
        );
}


function listarRanking(req, res) {

    curtidasModel.listarRanking()
        .then(resultado => {
            res.json(resultado);
        }).catch(
            function (erro) {
                console.log(erro);
                console.log(
                    "\nHouve um erro ao pegar lista do ranking! Erro: ",
                    erro.sqlMessage
                );
                res.status(500).json(erro.sqlMessage);
            }
        );
}


module.exports = {
    listarCurtidasUsuario,
    listarRanking,
}