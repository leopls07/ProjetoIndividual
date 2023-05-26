const btn_voltar = document.querySelector('#btn-voltar')
btn_voltar.addEventListener('click', ()=>{
    window.location.href = '../index.html'
})



const album_container = document.querySelector('.album-container')
const div_item_container = document.querySelectorAll('div.one, div.two,div.three ,div.four, div.five, div.six, div.seven, div.eight')




for(var i = 0; i< div_item_container.length; i++){
    div_item_container[i].addEventListener('mouseenter', (e)=>{
        
        
        var coordenadaX = e.x + 3
        var coordenadaY = e.y -5
        
        const desc = document.createElement('div')
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
        })
}