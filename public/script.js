const lista_citas = document.querySelector('#lista-citas')

function dibujarCitas(citas){
    let html = ''
    for(let cita of citas){
        html += `<li class="list-group-item">${cita.nombre},${cita.lat}</li>`
    }
    lista_citas.innerHTML = html;
}
async function traerCitas(){
    let citas = await fetch('/quotes')
    citas = await citas.json()
    dibujarCitas(citas)
}
traerCitas()