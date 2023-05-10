const perguntasRagnarok = [

{
    pergunta: 'O que é o "Ragnarok? "',
    alternativas: [
        {resposta: 'É o jogo do god of war', correta: false},
        {resposta: 'É o inverno da mitologia nórdica', correta: false},
        {resposta: 'É  o fim do mundo na mitologia nórdica', correta: true},
        {resposta: 'É quando odin tenta matar kratos em uma batalha por conta de suas atitudes passadas', correta: false},
       
    ]
},

{
    pergunta: 'Quantos anos tem Atreus durante o jogo?',
    alternativas: [
        {resposta: '15', correta: false},
        {resposta: '14', correta: true},
        {resposta: '16', correta: false},
        {resposta: '13', correta: false},
       
    ]
},
{
    pergunta: 'Pergunta genérica',
    alternativas: [
        {resposta: '!true', correta: false},
        {resposta: 'Carro de luxo 02 não é 01 ', correta: false},
        {resposta: 'Capitalismo é bom', correta: false},
        {resposta: 'Eu amo minha namorada (biapls)', correta: true},
       
    ]
},
{
    pergunta: 'Pergunta genérica 2',
    alternativas: [
        {resposta: '!true', correta: false},
        {resposta: 'Carro de luxo 02 não é 01 ', correta: false},
        {resposta: 'Capitalismo é bom', correta: false},
        {resposta: 'Eu amo minha namorada (biapls)', correta: true},
       
    ]
}

]

const perguntaH2 = document.querySelector('#pergunta')
const respostasDiv = document.querySelector('#respostas')
const proximoBtn = document.querySelector('#btn-proximo')


let questaoAtualPosicao = 0
let pontuacao = 0


function comecarQuiz(){
    questaoAtual = 0
    pontuacao = 0
    proximoBtn.innerHTML = 'Próximo'
    mostrarPergunta()
}

function mostrarPergunta(){

    resetarQuestoesAnteriores()

    let questaoAtual = perguntasRagnarok[questaoAtualPosicao]
    let questaoNumero = questaoAtualPosicao + 1
    perguntaH2.innerHTML = questaoNumero + ' - ' + questaoAtual.pergunta


    questaoAtual.alternativas.forEach(alternativa => {
        const button = document.createElement("button")
        button.innerHTML = alternativa.resposta
        button.classList.add("btn-resposta")
        respostasDiv.appendChild(button)

        if(alternativa.correta){
            button.dataset.corret = alternativa.correta
        }
        button.addEventListener('click' , selecionarResposta)

    } )

}

function resetarQuestoesAnteriores(){
 proximoBtn.style.diplay = "none"
 while(respostasDiv.firstChild){
    respostasDiv.removeChild(respostasDiv.firstChild)
 }
}

function selecionarResposta(){}

comecarQuiz();