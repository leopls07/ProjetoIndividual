var inventarioModel = require("../models/inventarioModel");

function cadastrarInventario(req, res) {
  var fkUsuario = req.body.fkUsuarioServer;

  inventarioModel.cadastrarInventario(fkUsuario).then((resultado) => {
      if (resultado.length > 0) {
        res.status(200).json(resultado);
      } else {
        res.status(204).send("Nenhum resultado encontrado!");
      }
    })
    .catch(function (erro) {
      console.log(erro);
      console.log("Houve um erro.", erro.sqlMessage);
      res.status(500).json(erro.sqlMessage);
    });
}

function verificarInventario(req, res) {
  var idUser = req.params.idUsuario;

  inventarioModel.verificarInventario(idUser).then((resultado) => {
      if (resultado.length > 0) {
        res.status(200).json(resultado);
      } else {
        res.status(204).send("Nenhum resultado encontrado!");
      }
    })
    .catch(function (erro) {
      console.log(erro);
      console.log("Houve um erro.", erro.sqlMessage);
      res.status(500).json(erro.sqlMessage);
    });
}

function cadastrarItem(req, res) {
  var fkInventario = req.query.fkInventario;
  var fkItem = req.query.fkItem;

  inventarioModel.cadastrarItem(fkInventario, fkItem).then((resultado) => {
      if (resultado.length > 0) {
        res.status(200).json(resultado);
      } else {
        res.status(204).send("Nenhum resultado encontrado!");
      }
    })
    .catch(function (erro) {
      console.log(erro);
      console.log("Houve um erro.", erro.sqlMessage);
      res.status(500).json(erro.sqlMessage);
    });
}

module.exports = {
  cadastrarInventario,
  verificarInventario,
  cadastrarItem,
};
