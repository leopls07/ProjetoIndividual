var database = require("../database/config.js")


// Coloque os mesmos parâmetros aqui. Vá para a var instrucao
function inserir(idQuiz, idUsuario, pontuacao, tempo) {
    
    // Insira exatamente a query do banco aqui, lembrando da nomenclatura exata nos valores
    //  e na ordem de inserção dos dados.
    var instrucao = `
        INSERT INTO tentativa (fkQuiz, fkUsuario, pontuacao, tempo) VALUES ('${idQuiz}', '${idUsuario}', '${pontuacao}', '${tempo}');
    `;
    // console.log("Executando a instrução SQL: \n" + instrucao);
    return database.executar(instrucao);
}

function selecionarMedia (idQuiz){ 
  var instrucao = `SELECT AVG(pontuacao) as 'media' FROM tentativa WHERE fkQuiz = ${idQuiz};`
  console.log('Executando \n ' + instrucao)
  return database.executar(instrucao)

}

function selecionarMediaGeral (idQuiz){ 
  var instrucao = `
  SELECT AVG(q1.pontuacao) as 'mediaq1', AVG(q2.pontuacao)  as 'mediaq2', AVG(q3.pontuacao) as 'mediaq3' FROM tentativa AS q1 
  join tentativa q2 join tentativa q3 
      where q1.fkQuiz = 1 and q2.fkQuiz = 2 and q3.fkQuiz = 3;`
//   console.log('Executando \n ' + instrucao)
  return database.executar(instrucao)

}

function selecionarMelhoresTentativas(idQuiz){
    var fkQuiz = parseInt(idQuiz)
    var instrucaoSelect = `select * from tentativa join usuario on idUsuario = fkUsuario where fkQuiz = ${fkQuiz} order by pontuacao desc, tempo asc LIMIT 10;`
    // console.log('Executando \n ' + instrucaoSelect)
    return database.executar(instrucaoSelect)
}


function selecionarTentativasPorcentagem(idQuiz){
    var instrucao = `SELECT (SELECT COUNT(pontuacao)from tentativa where pontuacao >= 50 and fkQuiz = ${idQuiz}) as maior 
                           ,(SELECT count(pontuacao) from tentativa where pontuacao < 50 and fkQuiz = ${idQuiz}) as menor;`
    //  console.log('Executando \n ' + instrucao)
    return database.executar(instrucao)
}



// var instrucao = select * from tentativa where fkQuiz = 3 order by pontuacao desc, tempo asc LIMIT 10 ;  futuro select pra pegar o jonson ne

module.exports = {
    inserir,
    selecionarMedia,
    selecionarMelhoresTentativas,
    selecionarMediaGeral,
    selecionarTentativasPorcentagem
};