





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
