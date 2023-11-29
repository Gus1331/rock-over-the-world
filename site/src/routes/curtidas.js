var express = require("express");
var router = express.Router();

var curtidasController = require("../controllers/curtidasController");


router.get("/listarCurtidasUsuario/:idUsuario", function (req, res) {
    curtidasController.listarCurtidasUsuario(req, res);
});

router.get("/listarRanking/", function (req, res) {
    curtidasController.listarRanking(req, res);
});

module.exports = router;