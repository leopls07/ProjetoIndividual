const btn_voltar = document.querySelector('#btn-voltar')
btn_voltar.addEventListener('click', ()=>{
    window.location.href = '../index.html'
})



const album_container = document.querySelector('.album-container')
const div_item_container = document.querySelectorAll('div.one, div.two,div.three ,div.four, div.five, div.six, div.seven, div.eight')


var vetorDesc = [
    'Lâmina do Caos',
    'Machado Leviatã',
    'Lâmina do Olimpo',
    'Mjölnir ',
    'Lâmina de Artemis',
    'Lança de Draupnir',
    'Espada de Zeus',
    'Faquinha de Atreus'  
]

for(var i = 0; i< div_item_container.length; i++){
    const desc = document.createElement('div')
    
  desc.innerHTML = vetorDesc[i]

    div_item_container[i].addEventListener('mousemove', (e)=>{
        
        
        
        var coordenadaX = e.x 
        var coordenadaY = e.y + 22

        console.log(e)
        
        album_container.appendChild(desc)
        desc.classList.add('desc')
        desc.style.top = `${coordenadaY}px`
        desc.style.left = `${coordenadaX}px`
        
        
        setTimeout(()=>{
            
            desc.style.opacity = '1'
            },500)
            
            


    })

    div_item_container[i].addEventListener('mouseleave',(e)=>{
    album_container.removeChild(album_container.lastChild) 
    desc.style.opacity = '0'
        })
}