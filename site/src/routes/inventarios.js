var express = require("express");
var router = express.Router();

var inventarioController = require("../controllers/inventarioController");

router.get("/listar", function (req, res) {
    inventarioController.listar(req, res);
});

router.post("/cadastrarInventario", function (req, res) {
    inventarioController.cadastrarInventario(req, res);
})

router.get("/verificar/:idUsuario", function (req,res){
    inventarioController.verificarInventario(req,res)
})
module.exports = router;

