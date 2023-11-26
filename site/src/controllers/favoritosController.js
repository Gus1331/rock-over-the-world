var favoritosModel = require("../models/favoritosModel");

function listar(req, res) {
    var idUsuario = req.params.idUsuario;
    console.log("req listar id:", idUsuario)
    

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
}