var database = require("../database/config.js")


// Coloque os mesmos parâmetros aqui. Vá para a var instrucao
function inserir(idQuiz, idUsuario, pontuacao) {
    
    // Insira exatamente a query do banco aqui, lembrando da nomenclatura exata nos valores
    //  e na ordem de inserção dos dados.
    var instrucao = `
        INSERT INTO tentativa (fkQuiz, fkUsuario, pontuacao) VALUES ('${idQuiz}', '${idUsuario}', '${pontuacao}');
    `;
    console.log("Executando a instrução SQL: \n" + instrucao);
    return database.executar(instrucao);
}

module.exports = {
    inserir
};