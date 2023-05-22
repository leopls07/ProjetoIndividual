var database = require("../database/config.js")


// Coloque os mesmos parâmetros aqui. Vá para a var instrucao
function inserir(idQuiz, idUsuario, pontuacao, tempo) {
    
    // Insira exatamente a query do banco aqui, lembrando da nomenclatura exata nos valores
    //  e na ordem de inserção dos dados.
    var instrucao = `
        INSERT INTO tentativa (fkQuiz, fkUsuario, pontuacao, tempo) VALUES ('${idQuiz}', '${idUsuario}', '${pontuacao}', '${tempo}');
    `;
    console.log("Executando a instrução SQL: \n" + instrucao);
    return database.executar(instrucao);
}

function selecionarMedia (idQuiz){ 
  var instrucao = `SELECT AVG(pontuacao) as 'media' FROM tentativa WHERE fkQuiz = ${idQuiz};`
  console.log('Executando \n ' + instrucao)
  return database.executar(instrucao)

}

function selecionarMelhoresTentativas(idQuiz){
    var fkQuiz = parseInt(idQuiz)
    var instrucaoSelect = `select * from tentativa join usuario on idUsuario = fkUsuario where fkQuiz = ${fkQuiz} order by pontuacao desc, tempo asc LIMIT 10;`
    console.log('Executando \n ' + instrucaoSelect)
    return database.executar(instrucaoSelect)
}


// var instrucao = select * from tentativa where fkQuiz = 3 order by pontuacao desc, tempo asc LIMIT 10 ;  futuro select pra pegar o jonson ne

module.exports = {
    inserir,
    selecionarMedia,
    selecionarMelhoresTentativas
};