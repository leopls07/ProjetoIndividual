var database = require("../database/config.js")




function cadastrarInventario(fkUsuario){
    var instrucao = `INSERT INTO inventario (fkUsuario) VALUES (${fkUsuario});`

    console.log('Executando \n ' + instrucao)
    return database.executar(instrucao)
}


module.exports ={
    cadastrarInventario
}