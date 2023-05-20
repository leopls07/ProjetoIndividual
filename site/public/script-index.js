let idUsuario = sessionStorage.getItem('idUsuario')

const btnEntrar = document.querySelector('#btn-entrar')
const div_aviso = document.querySelector('.aviso')
const resposta_aviso = document.querySelector('.resposta-cadastro')

const btn_comecar_2018 = document.querySelector('#btn-comecar-2018')

const div_confirmacao_sair = document.querySelector('#div-confirmacao-sair')
const btn_sair = document.querySelector('#btn-sair')
const btn_cancelar = document.querySelector('#btn-cancelar')

let statusUsuario;

function verificarSeEstaLogado(){
    if(idUsuario == undefined){
        statusUsuario = false
    }else{
        statusUsuario = true
    }
if(statusUsuario == false){
    btnEntrar.innerHTML = 'Entrar'
    btnEntrar.addEventListener('click', ()=>{
      window.location.href = '../cadastro-login/login.html'
    })
}else{
    btnEntrar.innerHTML = 'Sair'
    btnEntrar.addEventListener('click', ()=>{  
       
        div_confirmacao_sair.style.display = 'block'
        document.body.style.overflowY = 'hidden'
       setTimeout(()=>{
           div_confirmacao_sair.style.opacity = '1'
       },200)   
})
}



}

verificarSeEstaLogado()



btn_sair.addEventListener('click',()=>{

    div_confirmacao_sair.style.opacity = '0'
    div_confirmacao_sair.style.display = 'none'
    document.body.style.overflowY = 'auto'
    
    div_aviso.style.opacity = '1'
    resposta_aviso.innerHTML = 'Saindo . . .'
    
    sessionStorage.clear()
    setTimeout(()=>{
        location.reload()
    },1000)
})

btn_cancelar.addEventListener('click',()=>{
    document.body.style.overflowY = 'auto'
    div_confirmacao_sair.style.opacity = '0'
    div_confirmacao_sair.style.display = 'none'
    
})



btn_comecar_2018.addEventListener('click', ()=>{
    if(statusUsuario == false){
        div_aviso.style.opacity = '1'
        resposta_aviso.innerHTML = 'Logue para fazer o quiz'
        setTimeout(()=>{
            div_aviso.style.opacity = '0'
        },1000)
    }else{
        window.location.href = '../quiz/quiz-gow2018.html'
    }
})