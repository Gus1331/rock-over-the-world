var express = require("express");
var router = express.Router();

var favoritosController = require("../controllers/favoritosController");

router.post("/atualizarInstrumento", function (req, res) {
    favoritosController.atualizarInstrumento(req, res);
})

router.post("/atualizarSubGen", function (req, res) {
    favoritosController.atualizarSubGen(req, res);
})

router.post("/atualizar", function (req, res) {
    favoritosController.atualizar(req, res);
})

router.get("/listar/:idUsuario", function (req, res) {
    favoritosController.listar(req, res);
});


module.exports = router;