const cadastro_usuario = document.querySelector('#ipt_cadastro_usuario')
const cadastro_email = document.querySelector('#ipt_cadastro_email')
const cadastro_senha = document.querySelector('#ipt_cadastro_senha')
const cadastro_senhaconf = document.querySelector('#ipt_cadastro_senha_conf')
const cadastro_erro = document.querySelector('#cadastro_erro')

const cadastro_btn = document.querySelector('#btn_cadastro')

const numeros = [1,2,3,4,5,6,7,8,9,0]
const sc = ['!','@','#','%','$','&','*','-','_']


cadastro_btn.addEventListener('click', () =>  {
   
    const usuario = cadastro_usuario.value
    const email = cadastro_email.value
    const senha = cadastro_senha.value
    const senha_conf = cadastro_senhaconf.value


    
const verificarnumeros = numeros.some(item => senha.includes(item)) 
const verificarsc = sc.some(e => senha.includes(e))

const senha_validation = verificarnumeros && verificarsc && senha.toLowerCase() != senha && senha.length >=6 // VARIAVEL PARA VERIFICAR SENHA VÁLIDA

const email_validation =    // VARIAVEL PARA VERIFICAR EMAIL VÁLIDO
email.indexOf('@') != -1 &&
email.indexOf('.') != -1 &&
email.indexOf(' ') == -1 &&
email.substring(email.indexOf('@') + 1 , email.length).indexOf('@') == -1 &&
email.endsWith('.') == false &&
email.startsWith('.') == false && 
email.startsWith('@') == false


    
    if ( usuario == '' || email == '' || senha == '' || senha_conf == '' ){
        cadastro_erro.innerHTML = 'Preencha todos os campos'
        cadastro_erro.style.opacity = '1'
    }else if(!email_validation){ 
        cadastro_erro.innerHTML = 'Email Inválido'
        cadastro_erro.style.opacity = '1' ;
        }else if (!senha_validation){
        cadastro_erro.innerHTML = 'Senha Inválida'
        cadastro_erro.style.opacity = '1' 
        }else if(senha != senha_conf){
            cadastro_erro.innerHTML = 'Senhas diferentes'
            cadastro_erro.style.opacity = '1' 
        }else{
            //TUDO VÁLIDO
            alert('ok')
        }


})



cadastro_email.addEventListener('focus', () =>{
    cadastro_erro.innerHTML = ''
    cadastro_erro.style.opacity = '0'
})

cadastro_senha.addEventListener('focus', () =>{
    cadastro_erro.innerHTML = ''
    cadastro_erro.style.opacity = '0'
})
cadastro_usuario.addEventListener('focus', () =>{
    cadastro_erro.innerHTML = ''
    cadastro_erro.style.opacity = '0'
})

cadastro_senhaconf.addEventListener('focus', () =>{
    cadastro_erro.innerHTML = ''
    cadastro_erro.style.opacity = '0'
    
})
