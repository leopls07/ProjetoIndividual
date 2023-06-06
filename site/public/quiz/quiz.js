let perguntas = [];

const perguntaH2 = document.querySelector("#pergunta");
const respostasDiv = document.querySelector("#respostas");
const proximoBtn = document.querySelector("#btn-proximo");
const questaoAtualElement = document.querySelector("#questaoAtual");
const quizFormElement = document.querySelector("#quiz-form");
const body = document.querySelector("body");

const username = sessionStorage.getItem("username");
const idUsuario = sessionStorage.getItem("idUsuario");
let idQuiz; // id 1 = gow 3 / id 2 = gow 2018 / id 3 = gow ragnarok
let questaoAtualPosicao = 0;
let pontuacao = 0;
let pontuacaoMediaDoQuiz;


window.onload = ()=>{
  window.scrollTo(0,0)
}

function randomizar() {
  return Math.round(Math.random()) - 0.5;
}

function comecarQuiz() {
  timer();
  questaoAtualPosicao = 0;
  questaoAtual = 0;
  pontuacao = 0;
  proximoBtn.innerHTML = "Próximo";

  if (body.id == "quiz-ragnarok-html") {
    idQuiz = 3;
    perguntas = perguntasRagnarok;
  } else if (body.id == "quiz-gow2018-html") {
    idQuiz = 2;
    perguntas = perguntasGow2018;
  } else if (body.id == "quiz-gow3-html") {
    idQuiz = 1;
    perguntas = perguntasGow3;
  }

  perguntas.sort(randomizar);

  for (let i = 0; i < perguntas.length; i++) {
    perguntas[i].alternativas.sort(randomizar);
  }

  mostrarPergunta();
}

function mostrarPergunta() {
  setTimeout(() => {
    quizFormElement.style.opacity = "1";
  }, 200);

  resetarQuestoesAnteriores();

  let questaoAtual = perguntas[questaoAtualPosicao];
  let questaoNumero = questaoAtualPosicao + 1;
  perguntaH2.innerHTML = questaoNumero + " - " + questaoAtual.pergunta;

  questaoAtual.alternativas.forEach((alternativa) => {
    const button = document.createElement("button");
    button.innerHTML = alternativa.resposta;
    button.classList.add("btn-resposta");
    respostasDiv.appendChild(button);

    if (alternativa.correta) {
      button.dataset.correct = alternativa.correta;
    }
    button.addEventListener("click", selecionarResposta);
  });

  questaoAtualElement.innerHTML = `${questaoAtualPosicao + 1}/${
    perguntas.length
  }`;
}

function resetarQuestoesAnteriores() {
  proximoBtn.style.display = "none";
  while (respostasDiv.firstChild) {
    respostasDiv.removeChild(respostasDiv.firstChild);
  }
}

function selecionarResposta(e) {
  const botaoSelecionado = e.target;
  const isCorrect = botaoSelecionado.dataset.correct === "true";

  if (isCorrect) {
    botaoSelecionado.classList.add("correta");
    pontuacao++;
  } else {
    botaoSelecionado.classList.add("incorreta");
  }

  Array.from(respostasDiv.children).forEach((button) => {
    if (button.dataset.correct === "true") {
      button.classList.add("correta");
    }
    button.disabled = true;
  });
  proximoBtn.style.opacity = "1";
  proximoBtn.style.display = "block";
}

async function mostrarPontuacao() {
  resetarQuestoesAnteriores();

  selecionarMelhoresTentativas(idQuiz);

  minutos = 0;
  segundos = 0;
  milesimos = 0;

  proximoBtn.style.display = "block";
  proximoBtn.style.opacity = "1";
  proximoBtn.innerHTML = `Jogar Novamente`;

  perguntaH2.innerHTML = `Resultado: ${pontuacao * 10}/${
    perguntas.length * 10
  } <br>
    Pontuação média do quiz: ${pontuacaoMediaDoQuiz} `;

  questaoAtualElement.innerHTML = "Ver classificação 🏆";
  questaoAtualElement.classList.add("verClassificacao");
}
let tempoFinal = 0;
function handleNextButton() {
  questaoAtualPosicao++;
  if (questaoAtualPosicao < perguntas.length) {
    quizFormElement.style.opacity = "0";
    mostrarPergunta();
  } else {
    clearInterval(timerInterval);

    if (milesimos < 10) {
      if (segundos < 10) {
        tempoFinal = Number(`${minutos}0${segundos}00${milesimos - 10}`);
      } else {
        tempoFinal = Number(`${minutos}${segundos}00${milesimos - 10}`);
      }
    } else if (milesimos < 100) {
      if (segundos < 10) {
        tempoFinal = Number(`${minutos}0${segundos}0${milesimos - 10}`);
      } else {
        tempoFinal = Number(`${minutos}${segundos}0${milesimos - 10}`);
      }
    } else {
      if (segundos < 10) {
        tempoFinal = Number(`${minutos}0${segundos}${milesimos - 10}`);
      } else {
        tempoFinal = Number(`${minutos}${segundos}${milesimos - 10}`);
      }
    }

    inserirTentativa();

    setTimeout(() => {
      pegarPontuacaoMedia(idQuiz);

      const intervalo = setInterval(() => {
        if (pontuacaoMediaDoQuiz != undefined) {
          mostrarPontuacao();
          clearInterval(intervalo);
        }
      }, 100);
    }, 200);
  }
}

proximoBtn.addEventListener("click", () => {
  if (questaoAtualPosicao < perguntas.length) {
    handleNextButton();
  } else {
    comecarQuiz();
    tentativas_container.innerHTML = "";
    topico_div.style.display = "none";
  }
});

let timerInterval;
let minutos = 0;
let segundos = 0;
let milesimos = 0;
let milesimosRealOficial = 0;
const divTimer = document.querySelector("#timer");

function timer() {
  timerInterval = setInterval(() => {
    milesimos += 10;
    milesimosRealOficial += 10;
    if (milesimos < 10) {
      if (segundos < 10) {
        var tempo = `${minutos} : 0${segundos} :  00${milesimos}`;
      } else {
        var tempo = `${minutos} : ${segundos} :  00${milesimos}`;
      }
    } else if (milesimos < 100) {
      if (segundos < 10) {
        var tempo = `${minutos} : 0${segundos} :  0${milesimos}`;
      } else {
        var tempo = `${minutos} : ${segundos} :  0${milesimos}`;
      }
    } else {
      if (segundos < 10) {
        var tempo = `${minutos} : 0${segundos} :  ${milesimos}`;
      } else {
        var tempo = `${minutos} :  ${segundos} :  ${milesimos}`;
      }
    }
    if (milesimos == 1000) {
      milesimos = 0;
      segundos++;
    }
    if (segundos == 60) {
      segundos = 0;
      minutos++;
    }
    if (minutos == 60) {
      alert(":( cabo o quiz né");
    }
    divTimer.innerHTML = `${tempo}`;
  }, 10);
}

const btnSairQuiz = document.querySelector("#btn-sair-quiz");

const div_confirmacao_sair = document.querySelector("#div-confirmacao-sair");
const btn_sair = document.querySelector("#btn-sair");
const btn_cancelar = document.querySelector("#btn-cancelar");

const divBlur = document.querySelector("#blurred");

btnSairQuiz.addEventListener("click", () => {
  div_confirmacao_sair.style.opacity = "1";
  div_confirmacao_sair.style.display = "block";
  divBlur.style.filter = "blur(4px)";

  btn_sair.addEventListener("click", () => {
    div_confirmacao_sair.style.opacity = "0";
    div_confirmacao_sair.style.display = "none";
    document.body.style.overflowY = "auto";

    location.href = "../index.html";
  });

  btn_cancelar.addEventListener("click", () => {
    document.body.style.overflowY = "auto";
    div_confirmacao_sair.style.opacity = "0";
    div_confirmacao_sair.style.display = "none";
    divBlur.style.filter = "";
  });
});

let tentativaAtual;
async function inserirTentativa() {
  await fetch("/tentativas/inserir", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      idUsuarioServer: idUsuario,
      idQuizServer: idQuiz,
      pontuacaoServer: pontuacao * 10,
      tempoServer: milesimosRealOficial,
    }),
  })
    .then((resposta) => {
      if (resposta.ok) {
        milesimosRealOficial = 0;
        return resposta.json();
      }
    })
    .then((resposta) => {
      tentativaAtual = resposta.insertId;
      // console.log(tentativaAtual)
      // console.log(resposta)
    })
    .catch((err) => console.error(err));
}

async function pegarPontuacaoMedia(idQuiz) {
  await fetch(`/tentativas/selecionarMedia/${idQuiz}`, {
    cache: "no-store",
  }).then((response) => {
    if (response.ok) {
      response.json().then(function (resposta) {
        pontuacaoMediaDoQuiz = parseFloat(resposta[0].media).toFixed(2);
        resposta.reverse();
      });
    } else {
      console.error("Nenhum dado encontrado ou erro na API");
    }
  });
}

function formatarTempo(milissegundos) {
  var minutos = Math.floor(milissegundos / 60000);
  var segundos = Math.floor((milissegundos % 60000) / 1000);
  var milissegundosRestantes = milissegundos % 1000;

  var minutosFormatados = minutos.toString().padStart(2, "0");
  var segundosFormatados = segundos.toString().padStart(2, "0");
  var milissegundosFormatados = milissegundosRestantes
    .toString()
    .padStart(3, "0");

  return (
    minutosFormatados + ":" + segundosFormatados + "." + milissegundosFormatados
  );
}

const tentativas_container = document.querySelector("#tentativas");
const topico_div = document.querySelector("#topico-div");

let itensDisponiveis = []
let itemGanho = []

async function selecionarMelhoresTentativas(idQuiz) {
  itemGanho = []
  await fetch(`/tentativas/selecionarMelhoresTentativas/${idQuiz}`, {
    cache: "no-store",
  })
    .then((response) => {
      if (response.ok) {
        response.json().then(function (resposta) {
          topico_div.style.display = "flex";
          for (i = 0; i < resposta.length; i++) {
            let usernameTentativa = resposta[i].username;
            let pontuacaoTentativa = resposta[i].pontuacao;
            let tempoTentativa = resposta[i].tempo;
            let idTentativa = resposta[i].idTentativa;

            const tentativa_div = document.createElement("div");
            tentativa_div.id = "tentativa-ranking";
            tentativa_div.classList.add("tentativa-ranking");
            tentativas_container.appendChild(tentativa_div);

            const username_div = document.createElement("div");
            username_div.classList.add("resultadoItem");
            const resultados_div = document.createElement("div");
            resultados_div.classList.add("resultadosRanking");

            tentativa_div.appendChild(username_div);
            tentativa_div.appendChild(resultados_div);

            const pontuacao_div = document.createElement("div");
            const tempo_div = document.createElement("div");

            pontuacao_div.classList.add("resultadoItem");
            tempo_div.classList.add("resultadoItem");

            resultados_div.appendChild(pontuacao_div);
            resultados_div.appendChild(tempo_div);

            if (idTentativa == tentativaAtual) {
              if (i == 0  && pontuacaoTentativa >= 10) {
                // AQUI EU DESCUBRO SE A TENTATIVA ATUAL É O PRIMEIRO LUGAR SE FOR, GANHA UM ITEM
                itemGanho = itensDisponiveis.sort(randomizar)[0]
                console.log(itemGanho + 'Item ganho')
                if(itensDisponiveis.length == 0){
                  alert('Ja tem todos os itens')
                }else{
                  inserirItemInventario(idUsuario,itemGanho)
                  setTimeout(()=>{
                    verificarInventario(idUsuario);
                  },1000)
                  const container_card = document.querySelector('#container-card')
                  const content_card = document.querySelector('#card-content')

                  switch(itemGanho){
                    case 1:
                      content_card.style.backgroundImage= 'url("../inventario/invassets/laminasdocaos.jpg")'
                      content_card.style.backgroundSize = 'cover'
                      break
                    case 2:
                      content_card.style.backgroundImage= 'url("../inventario/invassets/machadoleviatan.jpg")'
                      content_card.style.backgroundSize = 'contain'
                      break
                      case 3:
                      content_card.style.backgroundImage= 'url("../inventario/invassets/laminadoolimpo.jpg")'
                      content_card.style.backgroundSize = 'contain'
                      break
                      case 4:
                      content_card.style.backgroundImage= 'url("../inventario/invassets/MjolnirThor.jpg")'
                      content_card.style.backgroundSize = 'contain'
                      break
                      case 5:
                      content_card.style.backgroundImage= 'url("../inventario/invassets/laminadehades.jpg")'
                      content_card.style.backgroundSize = 'contain'
                      break
                      case 6:
                      content_card.style.backgroundImage= 'url("../inventario/invassets/lancadedraupnir.jpg")'
                      content_card.style.backgroundSize = 'contain'
                      break
                      case 7:
                      content_card.style.backgroundImage= 'url("../inventario/invassets/espadadezeus.jpg")'
                      content_card.style.backgroundSize = 'contain'
                      break
                      case 8:
                      content_card.style.backgroundImage= 'url("../inventario/invassets/faquinhadoatreus.jpg")'
                      content_card.style.backgroundSize = 'contain'
                      
                      break
                  }

                  


                  container_card.classList.add('container-card-ativado')
                  divBlur.style.filter = 'blur(4px)'
                  quizFormElement.style.pointerEvents = 'none'

                const btnInventario = document.querySelector('#btn-ir-inventario')
                const btnContinuar = document.querySelector('#btn-continuar-quiz')

                btnInventario.addEventListener('click',()=>{
                    window.location.href = '../inventario/inventario.html' 
                    container_card.style.display = 'none'
                    container_card.style.opacity = '0'
                    quizFormElement.style.pointerEvents = ''
                    container_card.classList.remove('container-card-ativado')
                })
                btnContinuar.addEventListener('click',()=>{
                  container_card.style.display = 'none'
                  container_card.style.opacity = '0'
                  divBlur.style.filter = ''
                  quizFormElement.style.pointerEvents = ''
                  container_card.classList.remove('container-card-ativado')
                })
                  verificarInventario(idUsuario)
                }
              }
              tentativa_div.classList.add("tentativaAtual");
            } else {
              tentativa_div.classList.remove("tentativaAtual");
            }

            if (i == 0) {
              username_div.innerHTML = ` 🏆 ${i + 1}st:  ${usernameTentativa}`;
            } else if (i == 1) {
              username_div.innerHTML = `🥈 ${i + 1}nd: ${usernameTentativa}`;
            } else if (i == 2) {
              username_div.innerHTML = `🥉 ${i + 1}rd: ${usernameTentativa}`;
            } else {
              username_div.innerHTML = `<img src="http://www.emoticonr.com/design/yahoo/loser.gif"> ${
                i + 1
              }th: ${usernameTentativa}`;
            }
            pontuacao_div.innerHTML = `${pontuacaoTentativa}`;
            tempo_div.innerHTML = `${formatarTempo(tempoTentativa)}`;
          }
          const container_classificacao = document.querySelector(
            ".classificacao-container"
          );
          container_classificacao.style.overflowY = "scroll";
        });
      } else {
        console.error("Nenhum dado encontrado ou erro na API");
      }
    })
    .catch(function (error) {
      console.error(`Erro na obtenção dos dados p/ gráfico: ${error.message}`);
    });
}
async function verificarInventario(idUsuario) {
  let itens = [];
  let itensAdquiridos = [];
  itensDisponiveis = [1,2,3,4,5,6,7,8];
  await fetch(`/inventarios/verificar/${idUsuario}`, {
    cache: "no-store",
  })
    .then((res) => {
      if (res.status == 204) {
        // Sem itens :(
        return;
      }
      if (res.ok) {
        return res.json();
      }
    })
    .then((data) => {
      if(data == undefined){return}
      for (var i = 0; i < data.length; i++) {
        itens.push(data[i]);
      }
      for (var i = 0; i < itens.length; i++) {
        let fkItemPercorrido = itens[i].fkItem;
        
        for (var j = 1; j <= 8; j++) {
          if (fkItemPercorrido == j) {
            itensAdquiridos.push(fkItemPercorrido);
          
          }
        }
      }

      for(var i = 0; i< itensAdquiridos.length; i++){
         if(itensDisponiveis.indexOf(itensAdquiridos[i]) != -1 ){
          itensDisponiveis.splice(itensDisponiveis.indexOf(itensAdquiridos[i]),1)
         }
      }

      console.log("Itens adquiridos " + itensAdquiridos);
      console.log("Itens não adquiridos " + itensDisponiveis);
    })
    .catch((e) => {
      console.error(e);
    });
}

async function inserirItemInventario(idUsuario,itemGanho){

  await fetch(`/inventarios/cadastrarItem/?fkInventario=${idUsuario}&fkItem=${itemGanho}`,{method: 'POST'})
  .catch((e)=>{
    console.error(e)
  })
}

const perguntasGow3 = [
  {
    pergunta: "Por que Kratos quer se vingar do Olimpo?",
    alternativas: [
      {
        resposta: "Porque os Deuses dizimaram sua cidade natal",
        correta: false,
      },
      {
        resposta: "Porque os Deuses levaram Kratos a matar sua família",
        correta: true,
      },
      {
        resposta: "Porque os Deuses o trairam e tiraram seus poderes",
        correta: false,
      },
      {
        resposta: "porque os Deuses tentaram o apriosionar pela eternidade",
        correta: false,
      },
    ],
  },

  {
    pergunta: "Qual é o objetivo principal de Kratos?",
    alternativas: [
      { resposta: "Salvar sua família", correta: false },
      { resposta: "Derrotar todos os deuses do Olimpo", correta: false },
      { resposta: "Vingar a morte de sua esposa", correta: true },
      {
        resposta: "Encontrar o artefato místico conhecido como Olho de Apolo",
        correta: false,
      },
    ],
  },
  {
    pergunta: "Qual é a principa arma usada por Kratos",
    alternativas: [
      { resposta: "Espada do Olimpo", correta: false },
      { resposta: "Escudo de Atena", correta: false },
      { resposta: "Lâminas do Caos", correta: true },
      { resposta: "Tridente de Poseidon", correta: false },
    ],
  },
  {
    pergunta: "Quem é o primeiro deus que Kratos enfrenta?",
    alternativas: [
      { resposta: "Hades", correta: false },
      { resposta: "Hermes", correta: false },
      { resposta: "Zeus", correta: false },
      { resposta: "Poseidon", correta: true },
    ],
  },
  {
    pergunta: "Qual é o nome do grande titã que ajuda Kratos em sua jornada",
    alternativas: [
      { resposta: "Atlas", correta: false },
      { resposta: "Cronos", correta: false },
      { resposta: "Gaia", correta: true },
      { resposta: "Prometeu", correta: false },
    ],
  },
  {
    pergunta: "Qual é o local onde ocorre a maior parte da ação",
    alternativas: [
      { resposta: "O Olimpo", correta: true },
      { resposta: "O Hades", correta: false },
      { resposta: "A Cidade de Esparta", correta: false },
      { resposta: "O Labirinto de Dédalo", correta: false },
    ],
  },
  {
    pergunta: "Qual é o nome da arma mágica que Kratos recebe de Hefesto",
    alternativas: [
      { resposta: "Chicote de Nêmesis", correta: true },
      { resposta: "Clava de Hades", correta: false },
      { resposta: "Martelo de Hefesto", correta: false },
      { resposta: "Flechas de Apolo", correta: false },
    ],
  },
  {
    pergunta:
      "Qual é o nome do artefato divino que Kratos adquire no início do jogo e que lhe concede poderes especiais?",
    alternativas: [
      { resposta: "Cabeça de Medusa", correta: false },
      { resposta: "Amuleto de Afrodite", correta: false },
      { resposta: "Olho de Apolo", correta: true },
      { resposta: "Chifre de Minotauro", correta: false },
    ],
  },
  {
    pergunta: "Quem é o último chefe que Kratos enfrenta",
    alternativas: [
      { resposta: "Hera", correta: false },
      { resposta: "Cronos", correta: false },
      { resposta: "Zeus", correta: true },
      { resposta: "Hades", correta: false },
    ],
  },
  {
    pergunta: "Qual é o destino final de Kratos no final de God of War 3?",
    alternativas: [
      { resposta: "Ele se torna o novo governante do Olimpo.", correta: false },
      { resposta: "Ele se sacrifica para salvar a humanidade.", correta: true },
      {
        resposta: "Ele é condenado a uma eternidade de tormento no Tártaro.",
        correta: false,
      },
      {
        resposta:
          "Ele desaparece misteriosamente, e aparece na mitologia nórdica",
        correta: false,
      },
    ],
  },
];

const perguntasGow2018 = [
  {
    pergunta: "O que é Midgard?",
    alternativas: [
      { resposta: " O reino dos mortos na mitologia nórdica", correta: false },
      {
        resposta: "O mundo mortal habitado pelos seres humanos",
        correta: true,
      },
      { resposta: "O lar dos deuses nórdicos", correta: false },
      { resposta: "A terra dos gigantes", correta: false },
    ],
  },

  {
    pergunta: "Quantos anos tem Atreus durante o jogo?",
    alternativas: [
      { resposta: "15", correta: false },
      { resposta: "14", correta: true },
      { resposta: "16", correta: false },
      { resposta: "13", correta: false },
    ],
  },
  {
    pergunta: "Qual é a mitologia retratada em God of War (2018)",
    alternativas: [
      { resposta: "Mitologia Grega", correta: false },
      { resposta: "Mitologia Romana", correta: false },
      { resposta: "Mitologia Egípcia", correta: false },
      { resposta: "Mitologia Nórdica", correta: true },
    ],
  },
  {
    pergunta: "Quem ajuda Kratos a salvar Atreus durante o jogo?",
    alternativas: [
      { resposta: "Odin", correta: false },
      { resposta: "Atena", correta: false },
      { resposta: "Freya", correta: true },
      { resposta: "Kratos salva atreus sozinho", correta: false },
    ],
  },
  {
    pergunta:
      "Qual é o nome da arma principal usada por Kratos em God of War (2018)?",
    alternativas: [
      { resposta: "Lâmina do Caos", correta: false },
      { resposta: "Mjölnir", correta: false },
      { resposta: "Machado Leviatã", correta: true },
      { resposta: "Espadas do Olimpo", correta: false },
    ],
  },
  {
    pergunta: "Quem é o principal antagonista no jogo God of War (2018)?",
    alternativas: [
      { resposta: "Zeus", correta: false },
      { resposta: "Hades", correta: false },
      { resposta: "Ares", correta: false },
      { resposta: "Baldur", correta: true },
    ],
  },
  {
    pergunta:
      "Qual é o nome da serpente gigante que Kratos e Atreus encontram em God of War?",
    alternativas: [
      { resposta: "Jörmungandr", correta: true },
      { resposta: "Fenrir", correta: false },
      { resposta: "Jötunsenperts", correta: false },
      { resposta: "Yggdrasil", correta: false },
    ],
  },
  {
    pergunta: "Quem é o deus da guerra em God of War (2018)?",
    alternativas: [
      { resposta: "Kratos", correta: false },
      { resposta: "Tyr", correta: true },
      { resposta: "Hades", correta: false },
      { resposta: "Thor", correta: false },
    ],
  },
  {
    pergunta:
      "Qual é o objetivo principal de Kratos e Atreus em sua jornada em God of War (2018)?",
    alternativas: [
      {
        resposta: "Vingar a morte de Faye e voltarem para a Grécia",
        correta: false,
      },
      {
        resposta:
          "Libertar os deuses nórdicos para que todos eles se vinguem da morte injusta de faye",
        correta: false,
      },
      {
        resposta:
          "Despejar as cinzas de Faye no topo da montanha mais alta dos 9 reinos",
        correta: true,
      },
      { resposta: "Espalhar caos e destruição", correta: false },
    ],
  },
  {
    pergunta: "Por que kratos é obrigado a pegar as Lâminas do caos?",
    alternativas: [
      { resposta: "Para enfrentar um exército de deuses", correta: false },
      { resposta: "Para libertar seu irmão aprisionado.", correta: false },
      { resposta: "Para entregar as Lâminas para Atreus", correta: false },
      {
        resposta:
          "Para poder enfrentar o frio dos ventos de helheim e derrotar o guardião do reino para salvar Atreus",
        correta: true,
      },
    ],
  },
];

const perguntasRagnarok = [
  {
    pergunta: "O que é o Ragnarok?",
    alternativas: [
      { resposta: "É o jogo do god of war", correta: false },
      { resposta: "É o inverno da mitologia nórdica", correta: false },
      { resposta: "É  o fim do mundo na mitologia nórdica", correta: true },
      {
        resposta:
          "É quando odin tenta matar kratos em uma batalha por conta de suas atitudes passadas",
        correta: false,
      },
    ],
  },

  {
    pergunta: "Quantos anos tem Atreus durante o jogo?",
    alternativas: [
      { resposta: "15", correta: false },
      { resposta: "14", correta: true },
      { resposta: "16", correta: false },
      { resposta: "13", correta: false },
    ],
  },
  {
    pergunta:
      "Quais criaturas mitológicas estão presentes em God of War Ragnarok",
    alternativas: [
      { resposta: "Dragões", correta: false },
      { resposta: "Gigantes", correta: false },
      { resposta: "Trolls", correta: false },
      { resposta: "Todas as alternativas", correta: true },
    ],
  },
  {
    pergunta:
      "Qual é o objetivo principal de Kratos e Atreus em God of War Ragnarok",
    alternativas: [
      {
        resposta:
          "Trazer os poderes do ragnarok assim salvando sua esposa Faye",
        correta: false,
      },
      { resposta: "Destruir todos os deuses nórdicos", correta: false },
      { resposta: "Dominar os reinos nórdicos", correta: false },
      { resposta: "Evitar o Ragnarok e salvar a humanidade", correta: true },
    ],
  },
  {
    pergunta:
      "Quem é o irmão de Thor que Kratos e Atreus encontram em sua jornada?",
    alternativas: [
      { resposta: "Magni", correta: false },
      { resposta: "Freyr", correta: false },
      { resposta: "Tyr", correta: false },
      { resposta: "Modi", correta: true },
    ],
  },
  {
    pergunta: "Qual é a nova habilidade de Atreus?",
    alternativas: [
      { resposta: "Transformação em animais", correta: false },
      { resposta: "Manipulação de trovões", correta: true },
      { resposta: "Controle sobre a neve", correta: false },
      { resposta: "Poder de cura", correta: false },
    ],
  },
  {
    pergunta: "Quem é responsável por levar a serpente do mundo de volta para o passado",
    alternativas: [
      { resposta: "Odin", correta: false },
      { resposta: "Freya", correta: false },
      { resposta: "Thor", correta: true },
      { resposta: "Kratos", correta: false },
    ],
  },
  {
    pergunta: "Quem forjou a lança draupnir",
    alternativas: [
      { resposta: "Sindri", correta: false },
      { resposta: "Brok", correta: false },
      { resposta: "Senhora da Forja", correta: true },
      { resposta: "Noé", correta: false },
    ],
  },
  {
    pergunta: "Quem é o primeiro Deus a receber atreus em asgard",
    alternativas: [
      { resposta: "Thor", correta: false },
      { resposta: "Zeus", correta: false },
      { resposta: "Odin", correta: false },
      { resposta: "Heimdall", correta: true },
    ],
  },
  {
    pergunta: "Contra quem é a primeira luta",
    alternativas: [
      { resposta: "Thor", correta: false },
      { resposta: "Atreus", correta: true },
      { resposta: "Odin", correta: false },
      { resposta: "Um troll", correta: false },
    ],
  },
  
];

const div_confirmacao_comeco = document.querySelector("#div-confirmacao-quiz");
const btn_confirmar_comeco = document.querySelector("#btn-confirmar");
const btn_cancelar_comeco = document.querySelector("#btn-cancelar-comeco");
const span_tempo_comeco = document.querySelector("#tempo-regressivo");
function confirmacaoQuiz() {
  verificarInventario(idUsuario);
  div_confirmacao_comeco.style.opacity = "1";
  div_confirmacao_comeco.style.display = "block";
  divBlur.style.filter = "blur(4px)";

  btn_confirmar_comeco.addEventListener("click", () => {
    var count = 3;

      document.body.style.pointerEvents = 'none'

    var contagemRegressiva = setInterval(() => {
      if (count == 0) {
        clearInterval(contagemRegressiva);
        div_confirmacao_comeco.style.opacity = "0";
        div_confirmacao_comeco.style.display = "none";
        document.body.style.pointerEvents = ''
        divBlur.style.filter = "";
        comecarQuiz();
      }
      span_tempo_comeco.innerHTML = `${count}`;
      count--;
    }, 1000);
  });

  btn_cancelar_comeco.addEventListener("click", () => {
    window.location.href = "/";
  });
}

confirmacaoQuiz();
