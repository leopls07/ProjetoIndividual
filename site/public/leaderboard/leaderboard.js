document.querySelector('#btn-voltar').addEventListener('click',()=>{window.location.href = '/'})
// SECTION MELHORES TENTATIVAS
Chart.defaults.color = 'white'
const ctx = document.getElementById('chartQuiz1');

var chartQuiz1 = new Chart(ctx, {
    type: 'bar',
    data: {
      labels: ['Red', 'Blue', 'Yellow', 'Green', 'Purple', 'Orange'],
      datasets: [{
        label: '# of Votes',
        data: [],
        borderWidth: 1,
        backgroundColor : '#862c28'
      }]
    },
    options: {
      scales: {
        y: {
          beginAtZero: true
        }
      }
    },
  });


  
const ctx2 = document.getElementById('chartQuiz2');

var chartQuiz2 = new Chart(ctx2, {
  type: 'bar',
  data: {
    labels: ['Red', 'Blue', 'Yellow', 'Green', 'Purple', 'Orange'],
    datasets: [{
      label: '# of Votes',
      data: [],
      borderWidth: 1,
      backgroundColor : '#862c28',
      color: '#000000'
      
    }]
  },
  options: {
    scales: {
      y: {
        beginAtZero: true
      }
    }
  }
});



const ctx3 = document.getElementById('chartQuiz3');

var chartQuiz3 =  new Chart(ctx3, {
    type: 'bar',
    data: {
      labels: [],
      datasets: [{
        label: '# of Votes',
        data: [],
        borderWidth: 1,
        backgroundColor : '#862c28'
      }]
    },
    options: {
      scales: {
        y: {
          beginAtZero: true
        }
      }
    }
  });


  const ctx4 = document.querySelector('#chartMedia');
  var chartMedia = new Chart(ctx4,{
    type: 'bar',
    data: {
      labels: [],
      datasets: [{
        label: '',
        data: [],
        borderWidth: 1,
        backgroundColor : '#862c28'
      }]
    },
    options: {
      scales: {
        y: {
          beginAtZero: true
        }
      }
    }
  });



  
  const ctx5 = document.querySelector('#chartPercentualPizza')

var chartPizzaQuiz1 =  new Chart(ctx5,{
   
      type: 'pie',
      data: {
        labels: [],
        datasets: [{
          label: 'Porcentagem',
          data: [],
          borderWidth: 1,
          backgroundColor: ['#862c28', '#00000']
        }]
      },
      options: {
        scales: {
          y: {
            beginAtZero: true
          }
        }
      }
  }) 


async function selecionarMelhoresTentativasQuiz1(){

   
    await   fetch(`/tentativas/selecionarMelhoresTentativas/1`,{
            cache: 'no-store'
        }).then((res)=>{
            if(res.status == 204){
                // console.log('Nada encontrado no quiz: ' + '1')
                return
            }
            if(res.ok){
                // console.log('resOK ' + ' 1')
                 res.json().then((dados)=>{
                    //  console.log(dados)

                   
                        chartQuiz1.data.datasets[0].data = []
                        chartQuiz1.data.labels = []
                        chartQuiz1.data.datasets[0].label = 'Pontuação' 
                       for(let j = 0;  j<dados.length; j++){                        
                           chartQuiz1.data.datasets[0].data.push(dados[j].pontuacao)
                           chartQuiz1.data.labels.push(dados[j].username)                        
                       }
                       chartQuiz1.update()
                 })
            }
        }).catch((error)=>{
            console.log(error)
        })   
}
async function selecionarMelhoresTentativasQuiz2(){

   
    await   fetch(`/tentativas/selecionarMelhoresTentativas/2`,{
            cache: 'no-store'
        }).then((res)=>{
            if(res.status == 204){
                // console.log('Nada encontrado no quiz: ' + '2')
                return
            }
            if(res.ok){
                // console.log('resOK ' + '2')
                 res.json().then((dados)=>{
                    //  console.log(dados)

                   
                        chartQuiz2.data.datasets[0].data = []
                        chartQuiz2.data.labels = []
                        chartQuiz2.data.datasets[0].label = 'Pontuação' 
                       for(let j = 0;  j<dados.length; j++){                        
                           chartQuiz2.data.datasets[0].data.push(dados[j].pontuacao)
                           chartQuiz2.data.labels.push(dados[j].username)                        
                       }
                       chartQuiz2.update()
                 })
            }
        }).catch((error)=>{
            console.log(error)
        })   
}
async function selecionarMelhoresTentativasQuiz3(){

   
    await   fetch(`/tentativas/selecionarMelhoresTentativas/3`,{
            cache: 'no-store'
        }).then((res)=>{
            if(res.status == 204){
                // console.log('Nada encontrado no quiz: ' + '3')
                return
            }
            if(res.ok){
                // console.log('resOK ' + '3')
                 res.json().then((dados)=>{
                    //  console.log(dados)

                   
                        chartQuiz3.data.datasets[0].data = []
                        chartQuiz3.data.labels = []
                        chartQuiz3.data.datasets[0].label = 'Pontuação' 
                       for(let j = 0;  j<dados.length; j++){                        
                           chartQuiz3.data.datasets[0].data.push(dados[j].pontuacao)
                           chartQuiz3.data.labels.push(dados[j].username)                        
                       }
                       chartQuiz3.update()
                 })
            }
        }).catch((error)=>{
            console.log(error)
        })   
}
// SECTION MELHORES TENTATIVAS

// SECTION PONTUACAO MEDIA
async function pegarPontuacaoMediaQuiz() {
    await fetch(`/tentativas/selecionarMediaGeral/1`, {
      cache: "no-store",
    }).then((response) => {
      if (response.ok) {
        response.json().then(function (resposta) {
        // console.log(resposta)

                chartMedia.data.datasets[0].label = 'Média' 
                chartMedia.data.datasets[0].data = []
                chartMedia.data.labels = []
                
                chartMedia.data.datasets[0].data.push(parseFloat(resposta[0].mediaq1))
                chartMedia.data.datasets[0].data.push(parseFloat(resposta[0].mediaq2))
                chartMedia.data.datasets[0].data.push(parseFloat(resposta[0].mediaq3))
                chartMedia.data.labels.push('Quiz God of War 3')
                chartMedia.data.labels.push('Quiz God of War 2018')
                chartMedia.data.labels.push('Quiz God of War Ragnarok')

               
               chartMedia.update()

        });
      } else {
        console.error("Nenhum dado encontrado ou erro na API");
      }
    });
  }

  var idQuizzes = [1,2,3]
  async function selecionarTentativasPorcentagem(){
  
    await fetch(`/tentativas/selecionarTentativasPorcentagem/1`,{
      cache: 'no-store',
      method: 'GET'
    }).then((res)=>{
      if(res.ok){
        return res.json().then((resposta)=>{
          console.log(resposta)
          let menor = resposta[0].menor
          let maior = resposta[0].maior


          let pctMaior = (menor/ (menor + maior) )*100
          let pctMenor = 100 - pctMaior
          

          chartPizzaQuiz1.data.datasets[0].label = 'Porcentagem'
          chartPizzaQuiz1.data.datasets[0].data = []


          chartPizzaQuiz1.data.datasets[0].data.push(pctMenor.toFixed(2))
          chartPizzaQuiz1.data.labels.push('Abaixo') 
          chartPizzaQuiz1.data.datasets[0].data.push(pctMaior.toFixed(2))
          chartPizzaQuiz1.data.labels.push('Acima') 
          chartPizzaQuiz1.update()

        })
      }
    }).catch((err)=>{
      console.log(err)
    })


  
}
    
    function atualizarGraficos(){

    selecionarMelhoresTentativasQuiz1()
    selecionarMelhoresTentativasQuiz2()
    selecionarMelhoresTentativasQuiz3()

    pegarPontuacaoMediaQuiz()   
}
  atualizarGraficos()
  selecionarTentativasPorcentagem()

setInterval(atualizarGraficos,1000)

