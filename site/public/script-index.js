let idUsuario = sessionStorage.getItem('idUsuario')
const btnEntrar = document.querySelector('#btn-entrar')
const div_aviso = document.querySelector('.aviso')
const resposta_aviso = document.querySelector('.resposta-cadastro')
const btn_comecar_2018 = document.querySelector('#btn-comecar-2018')
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
      window.location.href = './login.html'
    })
}else{
    btnEntrar.innerHTML = 'Sair'
    btnEntrar.addEventListener('click', ()=>{
        
        div_aviso.style.opacity = '1'
        resposta_aviso.innerHTML = 'Saindo . . .'
     

        sessionStorage.clear()
        setTimeout(()=>{
            location.reload()
        },1000)
    })
}
}

btn_comecar_2018.addEventListener('click', ()=>{
    if(statusUsuario == false){
        div_aviso.style.opacity = '1'
        resposta_aviso.innerHTML = 'Logue para fazer o quiz'
        setTimeout(()=>{
            div_aviso.style.opacity = '0'
        },1000)
    }else{
        window.location.href = './quiz/quiz-gow2018.html'
    }
})



verificarSeEstaLogado()