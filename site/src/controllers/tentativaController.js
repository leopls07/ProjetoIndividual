var tentativaModel = require("../models/tentativaModel");



function inserir(req, res) {
    // Crie uma variável que vá recuperar os valores do arquivo cadastro.html
  

      var idUsuario = req.body.idUsuarioServer
      var idQuiz = req.body.idQuizServer
      var pontuacao = req.body.pontuacaoServer 

    // Faça as validações dos valores
        
        // Passe os valores como parâmetro e vá para o arquivo usuarioModel.js
        tentativaModel.inserir(idQuiz,idUsuario, pontuacao)
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

module.exports = {
    inserir   
}
