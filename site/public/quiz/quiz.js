





let perguntas = []

const perguntaH2 = document.querySelector('#pergunta')
const respostasDiv = document.querySelector('#respostas')
const proximoBtn = document.querySelector('#btn-proximo')
const questaoAtualElement = document.querySelector('#questaoAtual')
const quizFormElement = document.querySelector('#quiz-form')
const body = document.querySelector('body')

let username = sessionStorage.getItem('username')
let idUsuario = sessionStorage.getItem('idUsuario')
let idQuiz; // id 1 = gow 3 / id 2 = gow 2018 / id 3 = gow ragnarok
let questaoAtualPosicao = 0
let pontuacao = 0
let pontuacaoMediaDoQuiz 


function randomizar() {
    return (Math.round(Math.random())-0.5);
}






function comecarQuiz() {
    timer()
    questaoAtualPosicao = 0
    questaoAtual = 0
    pontuacao = 0
    proximoBtn.innerHTML = 'Próximo'

    if (body.id == 'quiz-ragnarok-html') {
        idQuiz = 3
        perguntas = perguntasRagnarok
    } else if (body.id == 'quiz-gow2018-html') {
        idQuiz = 2
        perguntas = perguntasGow2018
        
    } else if (body.id == 'quiz-gow3-html') {
          idQuiz = 1   
        perguntas = perguntasGow3
    }

    perguntas.sort(randomizar)

    for(let i = 0; i< perguntas.length ; i++){
         perguntas[i].alternativas.sort(randomizar)
    }

    mostrarPergunta()
    
}

function mostrarPergunta() {
    setTimeout(() => {
        quizFormElement.style.opacity = '1'
    }, 200)



    resetarQuestoesAnteriores()


    let questaoAtual = perguntas[questaoAtualPosicao]
    let questaoNumero = questaoAtualPosicao + 1
    perguntaH2.innerHTML = questaoNumero + ' - ' + questaoAtual.pergunta


    questaoAtual.alternativas.forEach(alternativa => {
        const button = document.createElement("button")
        button.innerHTML = alternativa.resposta
        button.classList.add("btn-resposta")
        respostasDiv.appendChild(button)

        if (alternativa.correta) {
            button.dataset.correct = alternativa.correta
        }
        button.addEventListener('click', selecionarResposta)
    })

    questaoAtualElement.innerHTML = `${questaoAtualPosicao + 1}/${perguntas.length}`
        

}

function resetarQuestoesAnteriores() {

    proximoBtn.style.display = "none"
    while (respostasDiv.firstChild) {
        respostasDiv.removeChild(respostasDiv.firstChild)
    }
}

function selecionarResposta(e) {
    const botaoSelecionado = e.target
    const isCorrect = botaoSelecionado.dataset.correct === "true"

    if (isCorrect) {
        botaoSelecionado.classList.add("correta")
        pontuacao++
    } else {
        botaoSelecionado.classList.add("incorreta")
    }


    Array.from(respostasDiv.children).forEach(button => {
        if (button.dataset.correct === "true") {
            button.classList.add("correta")
        }
        button.disabled = true
    })
    proximoBtn.style.opacity = "1"
    proximoBtn.style.display = "block"

}

 async function mostrarPontuacao() {
     resetarQuestoesAnteriores()
     selecionarMelhoresTentativas(idQuiz)

     minutos = 0
     segundos = 0
     milesimos = 0

     proximoBtn.style.display = "block"
     proximoBtn.style.opacity = "1"
     proximoBtn.innerHTML = `Jogar Novamente`

    perguntaH2.innerHTML = `Resultado: ${pontuacao * 10}/${perguntas.length * 10} <br>
    Pontuação média do quiz: ${pontuacaoMediaDoQuiz} `

    questaoAtualElement.innerHTML = 'Ver classificação 🏆'
    questaoAtualElement.classList.add('verClassificacao')

}
let tempoFinal = 0
function handleNextButton() {
    questaoAtualPosicao++
    if (questaoAtualPosicao < perguntas.length) {
        quizFormElement.style.opacity = '0'
        mostrarPergunta()

    } else {
        clearInterval(timerInterval)
    
        
        if(milesimos < 10){
            if(segundos < 10){
                 tempoFinal = Number(`${minutos}0${segundos}00${milesimos - 10}`)
            }else{
                 tempoFinal = Number(`${minutos}${segundos}00${milesimos - 10}`)
            }
        }else if(milesimos < 100){
            if(segundos < 10){
                 tempoFinal = Number(`${minutos}0${segundos}0${milesimos - 10}`)
            }else{
                 tempoFinal = Number(`${minutos}${segundos}0${milesimos -10}`)
            }
        }else{
            if(segundos < 10){
                 tempoFinal = Number(`${minutos}0${segundos}${milesimos -10}`)
            }else{
                 tempoFinal = Number(`${minutos}${segundos}${milesimos -10}`)
            } 
        }

        inserirTentativa()

        setTimeout(()=>{

       
        pegarPontuacaoMedia(idQuiz)
        

        const intervalo = setInterval(()=>{
                if(pontuacaoMediaDoQuiz != undefined){
                    mostrarPontuacao()
                    clearInterval(intervalo)
                }
        },100)
    },200)
        
    }
}


proximoBtn.addEventListener('click', () => {
    if (questaoAtualPosicao < perguntas.length) {
        handleNextButton()
    } else {
        comecarQuiz()
        tentativas_container.innerHTML = ''
        topico_div.style.display =  'none'
    }
})


let timerInterval
let minutos = 0
let segundos = 0
let milesimos = 0
const divTimer = document.querySelector('#timer')

function timer(){
     timerInterval = setInterval(()=>{
        if(milesimos < 10){
            if(segundos < 10){
                var tempo = `${minutos} : 0${segundos} :  00${milesimos}`
            }else{
                var tempo = `${minutos} : ${segundos} :  00${milesimos}`
            }
        }else if(milesimos < 100){
            if(segundos < 10){
                var tempo = `${minutos} : 0${segundos} :  0${milesimos}`
            }else{
                var tempo = `${minutos} : ${segundos} :  0${milesimos}`
            }
        }else{
            if(segundos < 10){
                var tempo = `${minutos} : 0${segundos} :  ${milesimos}`
            }else{
                var tempo = `${minutos} :  ${segundos} :  ${milesimos}`
            } 
        }
        if(milesimos == 1000){
            milesimos = 0
            segundos ++
        }
        if(segundos == 60){
            segundos = 0
            minutos ++
        }
        if(minutos == 60){
            alert(':( cabo o quiz né')
        }
        divTimer.innerHTML = `${tempo}`
        milesimos+=10
    },10)
}




const btnSairQuiz = document.querySelector('#btn-sair-quiz')

const div_confirmacao_sair = document.querySelector('#div-confirmacao-sair')
const btn_sair = document.querySelector('#btn-sair')
const btn_cancelar = document.querySelector('#btn-cancelar')

const divBlur = document.querySelector('#blurred')

btnSairQuiz.addEventListener('click', ()=>{
    
    div_confirmacao_sair.style.opacity = '1'
    div_confirmacao_sair.style.display = 'block'
    divBlur.style.filter = 'blur(4px)'
   
btn_sair.addEventListener('click',()=>{

    div_confirmacao_sair.style.opacity = '0'
    div_confirmacao_sair.style.display = 'none'
    document.body.style.overflowY = 'auto'
    

   location.href = '../index.html'
    
})

btn_cancelar.addEventListener('click',()=>{
    document.body.style.overflowY = 'auto'
    div_confirmacao_sair.style.opacity = '0'
    div_confirmacao_sair.style.display = 'none'
    divBlur.style.filter = ''
})


})


let tentativaAtual;
 async function inserirTentativa(){
   await fetch('/tentativas/inserir', {
        method: 'POST',
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          idUsuarioServer: idUsuario,
          idQuizServer: idQuiz,
          pontuacaoServer: (pontuacao * 10) ,
          tempoServer: tempoFinal
        })
      }).then((resposta)=>{
        if(resposta.ok){
            return resposta.json()
        }
    }).then((resposta)=>{
        tentativaAtual = resposta.insertId
        // console.log(tentativaAtual)
            // console.log(resposta)
      }).catch(err => console.error(err))

}


async function pegarPontuacaoMedia(idQuiz){
   await fetch(`/tentativas/selecionarMedia/${idQuiz}`, {cache: 'no-store'}).then((response)=>{
        if (response.ok) {
            response.json().then(function (resposta) {
                // console.log(`Dados recebidos: ${JSON.stringify(resposta)}`);
                 pontuacaoMediaDoQuiz = (parseFloat(resposta[0].media)).toFixed(2)
                //  console.log(pontuacaoMediaDoQuiz + 'Pontuacao var')
                //  console.log(resposta[0].media)
                resposta.reverse();

             
            });
        } else {
            console.error('Nenhum dado encontrado ou erro na API');
        }
    })
        .catch(function (error) {
            console.error(`Erro na obtenção dos dados p/ gráfico: ${error.message}`);
        });
    }


function renderTentativa(){
    const tentativas_container = document.querySelector('#tentativas')

    const tentativa_div = document.createElement('div')
    tentativa_div.id = 'tentativa-ranking'
    tentativa_div.classList.add('tentativa-ranking')
    tentativas_container.appendChild(tentativa_div)

    const username_div = document.createElement('div')
    const resultados_div = document.createElement('div')

    username_div.classList.add('userRanking')
    resultados_div.classList.add('resultadosRanking')

    tentativa_div.appendChild(resultados_div)
    tentativa_div.appendChild(username_div)

    const pontuacao_div = document.createElement('div')
    const tempo_div = document.createElement('div')

    resultados_div.appendChild(pontuacao_div)
    resultados_div.appendChild(tempo_div)
    
    



}

function formatarTempo(milissegundos) {
    var minutos = Math.floor(milissegundos / 60000);
    var segundos = Math.floor((milissegundos % 60000) / 1000);
    var milissegundosRestantes = milissegundos % 1000;
  
    var minutosFormatados = minutos.toString().padStart(2, '0');
    var segundosFormatados = segundos.toString().padStart(2, '0');
    var milissegundosFormatados = milissegundosRestantes.toString().padStart(3, '0');
  
    return minutosFormatados + ':' + segundosFormatados + '.' + milissegundosFormatados;
  }

const tentativas_container = document.querySelector('#tentativas')
const topico_div = document.querySelector('#topico-div')

async function selecionarMelhoresTentativas(idQuiz){

    await fetch(`/tentativas/selecionarMelhoresTentativas/${idQuiz}`, {cache: 'no-store'}).then((response)=>{
        if (response.ok) {
            response.json().then(function (resposta) {
                

                topico_div.style.display = 'flex'
                  for(i = 0; i<resposta.length; i++){

                      let usernameTentativa = resposta[i].username
                      let pontuacaoTentativa = resposta[i].pontuacao
                      let tempoTentativa = resposta[i].tempo
                      let idTentativa = resposta[i].idTentativa


                      

                    const tentativa_div = document.createElement('div')
                    tentativa_div.id = 'tentativa-ranking'
                    tentativa_div.classList.add('tentativa-ranking')
                    tentativas_container.appendChild(tentativa_div)

                    const username_div = document.createElement('div')
                    username_div.classList.add('resultadoItem')
                    const resultados_div = document.createElement('div')
                    resultados_div.classList.add('resultadosRanking')
                    
                    
                    tentativa_div.appendChild(username_div)
                    tentativa_div.appendChild(resultados_div)

                
                    const pontuacao_div = document.createElement('div')
                    const tempo_div = document.createElement('div')

                    pontuacao_div.classList.add('resultadoItem')
                    tempo_div.classList.add('resultadoItem')

                    resultados_div.appendChild(pontuacao_div)
                    resultados_div.appendChild(tempo_div)

                    
                    if(idTentativa == tentativaAtual){
                        tentativa_div.classList.add('tentativaAtual') 
                      }else{
                        tentativa_div.classList.remove('tentativaAtual')
                      }

                    if(i == 0){
                        username_div.innerHTML = ` 🏆 ${i + 1}st:  ${usernameTentativa}`
                    }else if(i == 1){
                        username_div.innerHTML = `🥈 ${i + 1}nd: ${usernameTentativa}`
                    }else if( i == 2){
                        username_div.innerHTML = `🥉 ${i + 1}rd: ${usernameTentativa}`
                    }else{
                        username_div.innerHTML = `<img src="http://www.emoticonr.com/design/yahoo/loser.gif"> ${i + 1}th: ${usernameTentativa}`
                    }
                    pontuacao_div.innerHTML = `${pontuacaoTentativa}`
                    tempo_div.innerHTML = `${formatarTempo(tempoTentativa)}`
                      
                }
                const container_classificacao = document.querySelector('.classificacao-container')
                container_classificacao.style.overflowY = 'scroll'
                
             
            });
        } else {
            console.error('Nenhum dado encontrado ou erro na API');
        }
    })
        .catch(function (error) {
            console.error(`Erro na obtenção dos dados p/ gráfico: ${error.message}`);
        });
    }








const perguntasGow3 = [

    {
        pergunta: 'Por que Kratos quer se vingar do Olimpo?',
        alternativas: [
            { resposta: 'É o jogo do god of war', correta: false },
            { resposta: 'É o inverno da mitologia nórdica', correta: false },
            { resposta: 'É  o fim do mundo na mitologia nórdica', correta: true },
            { resposta: 'É quando odin tenta matar kratos em uma batalha por conta de suas atitudes passadas', correta: false },

        ]
    },

    // {
    //     pergunta: 'Quantos anos tem Atreus durante o jogo?',
    //     alternativas: [
    //         { resposta: '15', correta: false },
    //         { resposta: '14', correta: true },
    //         { resposta: '16', correta: false },
    //         { resposta: '13', correta: false },

    //     ]
    // },
    // {
    //     pergunta: 'Pergunta genérica',
    //     alternativas: [
    //         { resposta: '!true', correta: false },
    //         { resposta: 'Carro de luxo 02 não é 01 ', correta: false },
    //         { resposta: 'Capitalismo é bom', correta: false },
    //         { resposta: 'Eu amo minha namorada (biapls)', correta: true },

    //     ]
    // },
    // {
    //     pergunta: 'Pergunta genérica 2',
    //     alternativas: [
    //         { resposta: '!true', correta: false },
    //         { resposta: 'Carro de luxo 02 não é 01 ', correta: false },
    //         { resposta: 'Capitalismo é bom', correta: false },
    //         { resposta: 'Eu amo minha namorada (biapls)', correta: true },

    //     ]
    // }
]


const perguntasGow2018 = [

    {
        pergunta: 'O que é Midgard?',
        alternativas: [
            { resposta: ' O reino dos mortos na mitologia nórdica', correta: false },
            { resposta: 'O mundo mortal habitado pelos seres humanos', correta: true },
            { resposta: 'O lar dos deuses nórdicos', correta: false },
            { resposta: 'A terra dos gigantes', correta: false }

        ]
    },

    {
        pergunta: 'Quantos anos tem Atreus durante o jogo?',
        alternativas: [
            { resposta: '15', correta: false },
            { resposta: '14', correta: true },
            { resposta: '16', correta: false },
            { resposta: '13', correta: false },

        ]
    },
    {
        pergunta: 'Qual é a mitologia retratada em God of War (2018)',
        alternativas: [
            { resposta: 'Mitologia Grega', correta: false },
            { resposta: 'Mitologia Romana', correta: false },
            { resposta: 'Mitologia Egípcia', correta: false },
            { resposta: 'Mitologia Nórdica', correta: true },

        ]
    },
    {
        pergunta: 'Quem ajuda Kratos a salvar Atreus durante o jogo?',
        alternativas: [
            { resposta: 'Odin', correta: false },
            { resposta: 'Atena', correta: false },
            { resposta: 'Freya', correta: true },
            { resposta: 'Kratos salva atreus sozinho', correta: false },

        ]
    },
    {
        pergunta: 'Qual é o nome da arma principal usada por Kratos em God of War (2018)?',
        alternativas:[
            {resposta: 'Lâmina do Caos',correta: false},
            {resposta: 'Mjölnir', correta: false},
            {resposta: 'Machado Leviatã', correta:true},
            {resposta: 'Espadas do Olimpo',correta:false}
        ]
    },
    {
        pergunta: 'Quem é o principal antagonista no jogo God of War (2018)?',
        alternativas:[
            {resposta: 'Zeus',correta: false},
            {resposta: 'Hades', correta: false},
            {resposta: 'Ares', correta:false},
            {resposta: 'Baldur',correta:true}
        ]
    },
    {
        pergunta: 'Qual é o nome da serpente gigante que Kratos e Atreus encontram em God of War?',
        alternativas:[
            {resposta: 'Jörmungandr',correta: true},
            {resposta: 'Fenrir', correta: false},
            {resposta: 'Jötunsenperts', correta:false},
            {resposta: 'Yggdrasil',correta:false}
        ]
    },
    {
        pergunta: 'Quem é o deus da guerra em God of War (2018)?',
        alternativas:[
            {resposta: 'Kratos',correta: false},
            {resposta: 'Tyr',correta:true},
            {resposta: 'Hades', correta: false},
            {resposta: 'Thor', correta:false}
        ]
    },
    {
        pergunta: 'Qual é o objetivo principal de Kratos e Atreus em sua jornada em God of War (2018)?',
        alternativas:[
            {resposta: 'Vingar a morte de Faye e voltarem para a Grécia',correta: false},
            {resposta: 'Libertar os deuses nórdicos para que todos eles se vinguem da morte injusta de faye', correta: false},
            {resposta: 'Despejar as cinzas de Faye no topo da montanha mais alta dos 9 reinos',correta:true},
            {resposta: 'Espalhar caos e destruição', correta:false}
        ]
    },
    {
        pergunta: 'Por que kratos é obrigado a pegar as Lâminas do caos?',
        alternativas:[
            {resposta: 'Para enfrentar um exército de deuses',correta: false},
            {resposta: 'Para libertar seu irmão aprisionado.', correta: false},
            {resposta: 'Para entregar as Lâminas para Atreus',correta:false},
            {resposta: 'Para poder enfrentar o frio dos ventos de helheim e derrotar o guardião do reino para sarvar Atreus', correta:true}
        ]
    },


]



const perguntasRagnarok = [

    {
        pergunta: 'O que é o Ragnarok?',
        alternativas: [
            { resposta: 'É o jogo do god of war', correta: false },
            { resposta: 'É o inverno da mitologia nórdica', correta: false },
            { resposta: 'É  o fim do mundo na mitologia nórdica', correta: true },
            { resposta: 'É quando odin tenta matar kratos em uma batalha por conta de suas atitudes passadas', correta: false },

        ]
    },

    {
        pergunta: 'Quantos anos tem Atreus durante o jogo?',
        alternativas: [
            { resposta: '15', correta: false },
            { resposta: '14', correta: true },
            { resposta: '16', correta: false },
            { resposta: '13', correta: false },

        ]
    },
    {
        pergunta: 'Pergunta genérica',
        alternativas: [
            { resposta: '!true', correta: false },
            { resposta: 'Carro de luxo 02 não é 01 ', correta: false },
            { resposta: 'Capitalismo é bom', correta: false },
            { resposta: 'Eu amo minha namorada (biapls)', correta: true },

        ]
    },
    {
        pergunta: 'Pergunta genérica 2',
        alternativas: [
            { resposta: '!true', correta: false },
            { resposta: 'Carro de luxo 02 não é 01 ', correta: false },
            { resposta: 'Capitalismo é bom', correta: false },
            { resposta: 'Eu amo minha namorada (biapls)', correta: true },

        ]
    }
]




comecarQuiz();
