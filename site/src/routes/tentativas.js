var express = require("express");
var router = express.Router();

var tentativaController = require("../controllers/tentativaController");

router.get("/listar", function (req, res) {
    tentativaController.listar(req, res);
});
router.get("/selecionarMedia/:idQuiz", function (req, res) {
    tentativaController.selecionarMedia(req, res);
});

router.get("/selecionarMediaGeral/:idQuiz", function (req, res) {
    tentativaController.selecionarMediaGeral(req, res);
});

router.get("/selecionarMelhoresTentativas/:idQuiz", function (req, res) {
    tentativaController.selecionarMelhoresTentativas(req, res);
});

//Recebendo os dados do html e direcionando para a função cadastrar de tentativaController.js
router.post("/inserir", function (req, res) {
    tentativaController.inserir(req, res);
})

router.post("/autenticar", function (req, res) {
    tentativaController.entrar(req, res);
});

router.get("/selecionarTentativasPorcentagem/:idQuiz", function(req,res){
    tentativaController.selecionarTentativasPorcentagem(req,res)
})
module.exports = router;
