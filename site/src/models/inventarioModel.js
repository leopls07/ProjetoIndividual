var database = require("../database/config.js")




function cadastrarInventario(fkUsuario){
    var instrucao = `INSERT INTO inventario (fkUsuario) VALUES (${fkUsuario});`

    console.log('Executando \n ' + instrucao)
    return database.executar(instrucao)
}


function verificarInventario(idUser){
    var instrucao = `
    select inventarioItem.fkInventario, inventarioItem.fkItem, item.nomeItem, usuario.idUsuario from inventarioItem
     join item on fkItem = idItem join  inventario on fkInventario = idInventario join usuario  on fkUsuario = idUsuario where fkUsuario = ${idUser };`

     return database.executar(instrucao)
}   

module.exports ={
    cadastrarInventario,
    verificarInventario
}