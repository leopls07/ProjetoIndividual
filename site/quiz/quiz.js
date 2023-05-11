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

    for (let i = 0; i < questaoAtual.alternativas.length; i++) {
        const alternativa = questaoAtual.alternativas[i];

            const button = document.createElement("button")
            button.innerHTML = alternativa.resposta
            button.classList.add("btn-resposta")
            respostasDiv.appendChild(button)
    
            if(alternativa.correta){
                button.dataset.correct = alternativa.correta
            }
            button.addEventListener('click' , selecionarResposta)
    
    }

 
}

function resetarQuestoesAnteriores(){
  
    proximoBtn.style.opacity = "0"
    proximoBtn.style.display = "none"
 while(respostasDiv.firstChild){
    respostasDiv.removeChild(respostasDiv.firstChild)
 }
}

function selecionarResposta(e){
    const botaoSelecionado =  e.target
    const isCorrect = botaoSelecionado.dataset.correct === "true"

    if(isCorrect){
        botaoSelecionado.classList.add("correta")
    }else{
        botaoSelecionado.classList.add("incorreta")
    }

    Array.from(respostasDiv.children).forEach(button => {
        if(button.dataset.correct === "true"){
            button.classList.add("correta")
        }
        button.disabled = true
    })
    proximoBtn.style.opacity = "1"
    proximoBtn.style.display = "block"
    
}

proximoBtn.addEventListener('click' , ()=> {
    if(questaoAtualPosicao < perguntasRagnarok.length){
        
    }
})

comecarQuiz();