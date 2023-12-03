var express = require("express");
var router = express.Router();

var analyticsController = require("../controllers/analyticsController");

router.get("/dadosGerais/", function (req, res) {
    analyticsController.dadosGerais(req, res);
});

module.exports = router;