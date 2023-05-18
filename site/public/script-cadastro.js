const cadastro_usuario = document.querySelector('#ipt_cadastro_usuario')
const cadastro_email = document.querySelector('#ipt_cadastro_email')
const cadastro_senha = document.querySelector('#ipt_cadastro_senha')
const cadastro_senhaconf = document.querySelector('#ipt_cadastro_senha_conf')
const cadastro_erro = document.querySelector('#cadastro_erro')

const cadastro_btn = document.querySelector('#btn_cadastro')

const numeros = [1, 2, 3, 4, 5, 6, 7, 8, 9, 0]
const sc = ['!', '@', '#', '%', '$', '&', '*', '-', '_']


cadastro_btn.addEventListener('click', () => {
     

    const usuario = cadastro_usuario.value
    const email = cadastro_email.value
    const senha = cadastro_senha.value
    const senha_conf = cadastro_senhaconf.value



    const verificarnumeros = numeros.some(item => senha.includes(item))
    const verificarsc = sc.some(e => senha.includes(e))

    const senha_validation = verificarnumeros && verificarsc && senha.length > 6 // VARIAVEL PARA VERIFICAR SENHA VÁLIDA

    const email_validation =    // VARIAVEL PARA VERIFICAR EMAIL VÁLIDO
        email.indexOf('@') != -1 &&
        email.indexOf('.') != -1 &&
        email.indexOf(' ') == -1 &&
        email.substring(email.indexOf('@') + 1, email.length).indexOf('@') == -1 &&
        email.endsWith('.') == false &&
        email.startsWith('.') == false &&
        email.startsWith('@') == false



    if (usuario == '' || email == '' || senha == '' || senha_conf == '') {
        cadastro_erro.innerHTML = 'Preencha todos os campos'
        cadastro_erro.style.opacity = '1';                                                                                                                            
    } else if (!email_validation) {
         
        cadastro_erro.innerHTML = 'Email Inválido'
        cadastro_erro.style.opacity = '1';
    } else if (!senha_validation) {
        cadastro_erro.innerHTML = 'Senha precisa conter números e pelo menos um caractere especial.'
        cadastro_erro.style.opacity = '1'
        if(senha.length <= 6){
            cadastro_erro.innerHTML = 'Senha precisa conter no mínimo 6 digitos.'
        }
    } else if (senha != senha_conf) {
         
        cadastro_erro.innerHTML = 'Senhas diferentes'
        cadastro_erro.style.opacity = '1'
    } else {
         
        efetuarCadastro()


    }


})


function efetuarCadastro(){
    const div_aviso = document.querySelector('.aviso')
    const resposta_aviso = document.querySelector('.resposta-cadastro')

var usuarioVar = cadastro_usuario.value 
var emailVar = cadastro_email.value 
var senhaVar = cadastro_senha.value 


fetch("/usuarios/cadastrar", {
    method: "POST",
    headers: {
        "Content-Type": "application/json"
    },
    body: JSON.stringify({
        // crie um atributo que recebe o valor recuperado aqui
        // Agora vá para o arquivo routes/usuario.js
        usernameServer: usuarioVar,
        emailServer: emailVar,
        senhaServer: senhaVar,
    })
    
}).then(function (resposta) {
  
    
    console.log("resposta: ", resposta);
    
    if (resposta.ok) {
       console.log('OK')
       return resposta.json()
    } else {

        div_aviso.style.opacity = '1'
        resposta_aviso.style.color = 'red'
        resposta_aviso.innerHTML = 'Houve um erro ao realizar o cadastro!'

        setTimeout(()=>{
            div_aviso.style.opacity = '0'
        },5000)

        throw ("Houve um erro ao tentar realizar o cadastro!");
    }
    
}).then(() => {

    div_aviso.style.opacity = '1'
    resposta_aviso.style.color = 'green'
    resposta_aviso.innerHTML = 'Cadastro realizado com sucesso!'

    

   setTimeout(() =>{
       window.location.href = './login.html'
   },1500)

}).catch(function (resposta) {
    console.log(`#ERRO: ${resposta}`);
});




}



cadastro_email.addEventListener('focus', () => {
    cadastro_erro.style.opacity = '0'
})

cadastro_senha.addEventListener('focus', () => {
    cadastro_erro.style.opacity = '0'
})
cadastro_usuario.addEventListener('focus', () => {
    cadastro_erro.style.opacity = '0'
})

cadastro_senhaconf.addEventListener('focus', () => {
    cadastro_erro.style.opacity = '0'

})
