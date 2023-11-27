var favoritosModel = require("../models/favoritosModel");

function atualizarInstrumento(req, res){
    var idUsuario = req.body.idUsuarioServer;
    var instrumento = req.body.instrumentoServer;

    favoritosModel.atualizarInstrumento(idUsuario, instrumento)
        .then(resultado => {
            res.json(resultado);
        }).catch(
            function (erro) {
                console.log(erro);
                console.log(
                    "\nHouve um erro ao pegar id de favoritos! Erro: ",
                    erro.sqlMessage
                );
                res.status(500).json(erro.sqlMessage);
            }
        );
}

function atualizarSubGen(req, res){
    var idUsuario = req.body.idUsuarioServer;
    var subGen = req.body.subGenServer;

    favoritosModel.atualizarSubGen(idUsuario, subGen)
        .then(resultado => {
            res.json(resultado);
        }).catch(
            function (erro) {
                console.log(erro);
                console.log(
                    "\nHouve um erro ao pegar id de favoritos! Erro: ",
                    erro.sqlMessage
                );
                res.status(500).json(erro.sqlMessage);
            }
        );

}

function atualizar(req, res) {
    var idUsuario = req.body.idUsuarioServer;
    var idSpotify = req.body.idSpotifyServer;
    var campo = req.body.campoServer
    console.log("update user:", idUsuario, "idspot: ", idSpotify);
    

    favoritosModel.atualizar(idUsuario, idSpotify, campo)
        .then(resultado => {
            res.json(resultado);
        }).catch(
            function (erro) {
                console.log(erro);
                console.log(
                    "\nHouve um erro ao pegar id de favoritos! Erro: ",
                    erro.sqlMessage
                );
                res.status(500).json(erro.sqlMessage);
            }
        );
}

function listar(req, res) {
    var idUsuario = req.params.idUsuario;

    favoritosModel.listar(idUsuario)
        .then(resultado => {
            res.json(resultado);
        }).catch(
            function (erro) {
                console.log(erro);
                console.log(
                    "\nHouve um erro ao pegar id de favoritos! Erro: ",
                    erro.sqlMessage
                );
                res.status(500).json(erro.sqlMessage);
            }
        );
}

module.exports = {
    listar,
    atualizar,
    atualizarSubGen,
    atualizarInstrumento
}