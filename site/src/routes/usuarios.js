var express = require("express");
var router = express.Router();

var usuarioController = require("../controllers/usuarioController");

router.post("/atualizarFotoPerfil", function (req, res) {
    console.log("ok")
    usuarioController.atualizarFotoPerfil(req, res);
})

router.post("/cadastrar", function (req, res) {
    usuarioController.cadastrar(req, res);
})

router.post("/autenticar", function (req, res) {
    usuarioController.autenticar(req, res);
});

router.post("/autenticarApelido", function (req, res) {
    usuarioController.autenticarApelido(req, res);
});

router.post("/requisitarDados" , function (req, res){
    usuarioController.requisitarDados(req, res);
});
router.post("/conectarFavoritos" , function (req, res){
    usuarioController.conectarFavoritos(req, res);
});

module.exports = router;