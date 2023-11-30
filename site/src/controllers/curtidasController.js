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
            
function listaMusicasCadastradas(req, res) {

    curtidasModel.listaMusicasCadastradas()
        .then(resultado => {
            res.json(resultado);
        }).catch(
            function (erro) {
                console.log(erro);
                console.log(
                    "\nHouve um erro ao pegar lista de musicas cadastradas! Erro: ",
                    erro.sqlMessage
                    );
                    res.status(500).json(erro.sqlMessage);
                }
        );
}

function cadastrarMusica(req, res) {
    var idMusica = req.body.idMusicaServer;
    
    curtidasModel.cadastrarMusica(idMusica)
    .then(resultado => {
        res.json(resultado);
    }).catch(
        function (erro) {
            console.log(erro);
            console.log(
                "\nHouve um erro ao cadastrar musica! Erro: ",
                    erro.sqlMessage
                    );
                    res.status(500).json(erro.sqlMessage);
                }
                );
            }
            
function curtirMusica(req, res) {
    var idMusica = req.body.idMusicaServer;
    var idUsuario = req.body.idUsuarioServer;
    
    curtidasModel.curtirMusica(idMusica, idUsuario)
        .then(resultado => {
            res.json(resultado);
        }).catch(
            function (erro) {
                console.log(erro);
                console.log(
                    "\nHouve um erro ao curtir musica! Erro: ",
                    erro.sqlMessage
                );
                res.status(500).json(erro.sqlMessage);
            }
        );
}



module.exports = {
    listarCurtidasUsuario,
    listarRanking,
    listaMusicasCadastradas,
    cadastrarMusica,
    curtirMusica,
}