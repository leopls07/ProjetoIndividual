





let perguntas = []

const perguntaH2 = document.querySelector('#pergunta')
const respostasDiv = document.querySelector('#respostas')
const proximoBtn = document.querySelector('#btn-proximo')
const questaoAtualElement = document.querySelector('#questaoAtual')
const quizFormElement = document.querySelector('#quiz-form')
const body = document.querySelector('body')


let questaoAtualPosicao = 0
let pontuacao = 0


function comecarQuiz() {
    questaoAtualPosicao = 0
    questaoAtual = 0
    pontuacao = 0
    proximoBtn.innerHTML = 'Próximo'

    if (body.id == 'quiz-ragnarok-html') {
        perguntas = perguntasRagnarok
    } else if (body.id == 'quiz-gow2018-html') {
        perguntas = perguntasGow2018
    } else if (body.id == 'quiz-gow3-html') {
        perguntas = perguntasGow3
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

function mostrarPontuacao() {
    resetarQuestoesAnteriores()
    perguntaH2.innerHTML = `Resultado: ${pontuacao}/${perguntas.length} `
    proximoBtn.innerHTML = `Jogar Novamente`
    proximoBtn.style.opacity = "1"
    proximoBtn.style.display = "block"
    questaoAtualElement.innerHTML = ''



}

function handleNextButton() {
    questaoAtualPosicao++
    if (questaoAtualPosicao < perguntas.length) {
        quizFormElement.style.opacity = '0'
        mostrarPergunta()

    } else {
        mostrarPontuacao()
    }
}


proximoBtn.addEventListener('click', () => {
    if (questaoAtualPosicao < perguntas.length) {
        handleNextButton()
    } else {
        comecarQuiz()
    }
})






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


const perguntasGow2018 = [

    {
        pergunta: 'O que é Midgard?',
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
