// VARIAVEIS LOGIN
const login_email = document.querySelector('#ipt_login_email')
const login_senha = document.querySelector('#ipt_login_senha')
const login_btn = document.querySelector('#btn_login')
const login_erro = document.querySelector('#login_erro')

/* VALIDAÇÕES INPUT LOGIN */ 
const numeros = [1,2,3,4,5,6,7,8,9,0]
const sc = ['!','@','#','%','$','&','*','-','_']

login_btn.addEventListener('click' , () => {
    const email = login_email.value
    const senha = login_senha.value
    
    // ISSO AQUI É A ELITE, O MÉTODO SOME PERCORRE TODA A ARRAY E O "item" É O ITEM QUE ESTA ATUALMENTE SENDO PERCORRIDO, E SE A SENHA INCLUI ALGUM DESSES ITENS QUE FORAM PERCORRIDOS 
    // ESSA CONSTANTE VAI RETORNAR VERDADEIRA
     
    const verificarnumeros = numeros.some(item => senha.includes(item)) 
    const verificarsc = sc.some(e => senha.includes(e))

    const senha_validation = verificarnumeros && verificarsc && senha.toLowerCase() != senha  && senha.length >=6 // VARIAVEL PARA VERIFICAR SENHA VÁLIDA

    const email_validation =    // VARIAVEL PARA VERIFICAR EMAIL VÁLIDO
    email.indexOf('@') != -1 &&
    email.indexOf('.') != -1 &&
    email.indexOf(' ') == -1 &&
    email.substring(email.indexOf('@') + 1 , email.length).indexOf('@') == -1 &&
    email.endsWith('.') == false &&
    email.startsWith('.') == false && 
    email.startsWith('@') == false
    


if(email == '' || senha == ''){ /*VALIDAÇÃO CAMPOS VAZIOS*/ 
login_erro.innerHTML = 'Preencha todos os campos'
login_erro.style.opacity = '1' ;
}else if(!email_validation){ 
login_erro.innerHTML = 'Email Inválido'
login_erro.style.opacity = '1' ;
}else if (!senha_validation){
login_erro.innerHTML = 'Senha Inválida'
login_erro.style.opacity = '1' 
}else{
    // TUDO VÁLIDO
    alert('ok')
}

})

// TIRAR ERRO CASO USUÁRIO VOLTE A DIGITAR
login_email.addEventListener('focus', () =>{
    login_erro.innerHTML = ''
    login_erro.style.opacity = '0' ;
})

login_senha.addEventListener('focus', () =>{
    login_erro.innerHTML = ''
    login_erro.style.opacity = '0';
})

/* VALIDAÇÕES INPUT LOGIN */ 


