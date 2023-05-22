var tentativaModel = require("../models/tentativaModel");



function inserir(req, res) {
    // Crie uma variável que vá recuperar os valores do arquivo cadastro.html
  

      var idUsuario = req.body.idUsuarioServer
      var idQuiz = req.body.idQuizServer
      var pontuacao = req.body.pontuacaoServer 
      var tempo = req.body.tempoServer
    // Faça as validações dos valores
        
        // Passe os valores como parâmetro e vá para o arquivo usuarioModel.js
        tentativaModel.inserir(idQuiz,idUsuario, pontuacao,tempo)
            .then(
                function (resultado) {
                    res.json(resultado);
                }
            ).catch(
                function (erro) {
                    console.log(erro);
                    console.log(
                        "\nHouve um erro ao realizar o cadastro! Erro: ",
                        erro.sqlMessage
                    );
                    res.status(500).json(erro.sqlMessage);
                }
            );
    }


function selecionarMedia(req, res){
    var idQuiz = req.params.idQuiz

    tentativaModel.selecionarMedia(idQuiz).then((resultado)=>{
        if (resultado.length > 0) {
            res.status(200).json(resultado);
        } else {
            res.status(204).send("Nenhum resultado encontrado!")
        }
    }).catch(function (erro) {
        console.log(erro);
        console.log("Houve um erro ao buscar as ultimas medidas.", erro.sqlMessage);
        res.status(500).json(erro.sqlMessage);
    });  
    }


   function selecionarMelhoresTentativas(req, res){

    var idQuiz = req.params.idQuiz

    tentativaModel.selecionarMelhoresTentativas(idQuiz).then((resultado)=>{
        if (resultado.length > 0) {
            res.status(200).json(resultado);
        } else {
            res.status(204).send("Nenhum resultado encontrado!")
        }
    }).catch(function (erro) {
        console.log(erro);
        console.log("Houve um erro ao buscar as ultimas medidas.", erro.sqlMessage);
        res.status(500).json(erro.sqlMessage);
    });  
    }
   


module.exports = {
    inserir,
    selecionarMedia,
    selecionarMelhoresTentativas
}
