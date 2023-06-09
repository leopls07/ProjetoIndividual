const btn_voltar = document.querySelector("#btn-voltar");
btn_voltar.addEventListener("click", () => {
  window.location.href = "/";
});

const album_container = document.querySelector(".album-container");
const div_item_container = document.querySelectorAll(".item-content");
const containerItemIndividual = document.querySelectorAll(".item-container");

window.onload = ()=>{
  div_item_container.forEach(element => {
    element.classList.remove('item-contentAfter')
    element.classList.add('item-contentAfter')
  });


}



const idUsuario = sessionStorage.getItem("idUsuario");
async function verificarInventario(idUsuario) {
  let itens = [];
  let itensInventerio = await fetch(`/inventarios/verificar/${idUsuario}`, {
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
      for (i = 0; i < data.length; i++) {
        itens.push(data[i]);
      }
      for (i = 0; i < itens.length; i++) {
        let fkItemPercorrido = itens[i].fkItem;
        
        if (fkItemPercorrido == 1) {
          div_item_container[0].classList.add("one");
          div_item_container[0].classList.remove("a");
          containerItemIndividual[0].style.border = "2px solid #efb810";
        }
        if (fkItemPercorrido == 2) {
          div_item_container[1].classList.add("two");
          div_item_container[1].classList.remove("b");
          containerItemIndividual[1].style.border = "2px solid #efb810";
        }
        if (fkItemPercorrido == 3) {
          div_item_container[2].classList.add("three");
          div_item_container[2].classList.remove("c");
          containerItemIndividual[2].style.border = "2px solid #efb810";
        }
        if (fkItemPercorrido == 4) {
          div_item_container[3].classList.add("four");
          div_item_container[3].classList.remove("d");
          containerItemIndividual[3].style.border = "2px solid #efb810";
        }
        if (fkItemPercorrido == 5) {
          div_item_container[4].classList.add("five");
          div_item_container[4].classList.remove("e");
          containerItemIndividual[4].style.border = "2px solid #efb810";
        }
        if (fkItemPercorrido == 6) {
          div_item_container[5].classList.add("six");
          div_item_container[5].classList.remove("f");
          containerItemIndividual[5].style.border = "2px solid #efb810";
        }
        if (fkItemPercorrido == 7) {
          div_item_container[6].classList.add("seven");
          div_item_container[6].classList.remove("g");
          containerItemIndividual[6].style.border = "2px solid #efb810";
        }
        if (fkItemPercorrido == 8) {
          div_item_container[7].classList.add("eight");
          div_item_container[7].classList.remove("h");
          containerItemIndividual[7].style.border = "2px solid #efb810";
        }
      }
    })
    .catch((e) => {
      console.error(e);
    });
}

verificarInventario(idUsuario);

var vetorDesc = [
  "Lâmina do Caos",
  "Machado Leviatã",
  "Lâmina do Olimpo",
  "Mjölnir ",
  "Lâmina de Artemis",
  "Lança de Draupnir",
  "Espada de Zeus",
  "Faquinha de Atreus",
];

for (var i = 0; i < div_item_container.length; i++) {
  const desc = document.createElement("div");

  desc.innerHTML = vetorDesc[i];
  
  div_item_container[i].addEventListener("mousemove", (e) => {
    var coordenadaX = e.clientX;
    var coordenadaY = e.clientY + 22;
    
    desc.classList.add("desc");
    desc.style.top = `${coordenadaY}px`;
    desc.style.left = `${coordenadaX}px`;
    album_container.appendChild(desc);

    setTimeout(() => {
      desc.classList.add('aparecido')
      desc.classList.remove('desaparecido')
      
    }, 500);
  });

  div_item_container[i].addEventListener("mouseleave", (e) => {
    album_container.removeChild(album_container.lastChild);
    desc.classList.remove('aparecido')
    desc.classList.remove('desc')
    desc.classList.add('desaparecido')
  });
}
