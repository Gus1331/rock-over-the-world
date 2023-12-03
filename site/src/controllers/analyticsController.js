var analyticsModel = require("../models/analyticsModel");

function dadosGerais(req, res) {
    
    analyticsModel.dadosGerais()
    .then(resultado => {
        res.json(resultado);
    }).catch(
        function (erro) {
                console.log(erro);
                console.log(
                    "\nHouve um erro ao pegar dados gerais! Erro: ",
                    erro.sqlMessage
                );
                res.status(500).json(erro.sqlMessage);
            }
            );
        }






module.exports = {
    dadosGerais,
}