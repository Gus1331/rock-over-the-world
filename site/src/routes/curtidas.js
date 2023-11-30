var express = require("express");
var router = express.Router();

var curtidasController = require("../controllers/curtidasController");


router.get("/listarCurtidasUsuario/:idUsuario", function (req, res) {
    curtidasController.listarCurtidasUsuario(req, res);
});

router.get("/listarRanking/", function (req, res) {
    curtidasController.listarRanking(req, res);
});

router.get("/listaMusicasCadastradas/", function (req, res) {
    curtidasController.listaMusicasCadastradas(req, res);
});

router.post("/cadastrarMusica/", function (req, res) {
    curtidasController.cadastrarMusica(req, res);
});

router.post("/curtirMusica/", function (req, res) {
    console.log("ok")
    curtidasController.curtirMusica(req, res);
});

module.exports = router;