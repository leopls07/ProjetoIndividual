const idQuizzes = [1,2,3]
async function selecionarMelhoresTentativas(){

    for(i= 0; i < idQuizzes.length;i++){

    await   fetch(`/tentativas/selecionarMelhoresTentativas/${idQuizzes[i]}`,{
            cache: 'no-store'
        }).then((res)=>{
            if(res.status == 204){
                console.log('Nada encontrado no quiz: ' + idQuizzes[i])
                return
            }
            if(res.ok){
                console.log('resOK ' + idQuizzes[i])
                 res.json().then((dados)=>{
                    console.log(dados)
                 })
            }
        }).catch((error)=>{
            console.log(error)
        })
    }
}

selecionarMelhoresTentativas()