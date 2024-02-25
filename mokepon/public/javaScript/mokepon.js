const selectionMensajes = document.getElementById('mensajes')
const selectionReiniciar = document.getElementById('reiniciar')
const selectionSeleccionarAtaque = document.getElementById('seleccionar_ataque')
const botonMascota = document.getElementById('boton_mascota')

const botonReiniciar = document.getElementById('boton_reiniciar')
const selectionMascota = document.getElementById('seleccionar-mascota')
const spanMascotaPc = document.getElementById('mascota_pc')
const spanVidasJugador = document.getElementById('vidas_jugador')
const spanVidasPc = document.getElementById('vidas_pc')
const sectionsMensajes = document.getElementById('resultado')
const ataquesDelJugador = document.getElementById('ataques_del_jugador')
const ataquesDelPc = document.getElementById('ataques_del_pc')
const contenedorTarjetas = document.getElementById('contenedorTarjetas')
const cotenedorAtaques = document.getElementById('contenedorAtaques')
const sectionVerMapa = document.getElementById('ver_mapa')
const mapa = document.getElementById('mapa')
let jugadorId = null
let enemigoId = null
let ataqueJugador = []
let mokeponesEnemigos = []

let optionesMokepons
let inputcharmander
let inputbulbasaur
let inputsquirtle
let mascotaJugador
let ataquesMokepon
let mascotapc
let fuego
let agua
let planta
let botones = []
let indexAtaqueJugador
let indexataqueEnemigo
let ataquesMokeponEnemigo
let victoriasJugador = 0
let victoriasPc = 0
let mokepones = []
let lienzo = mapa.getContext('2d')
let intervalo
let mapaBackground = new Image()
let mascotaDelJugadorObjeto
let alturaQueBuscamos
let anchoDelMapa = window.innerWidth - 20
const anchoMaximoDelMapa = 750
if (anchoDelMapa > anchoMaximoDelMapa) {
    anchoDelMapa = anchoMaximoDelMapa - 20
}
alturaQueBuscamos = anchoDelMapa * 500 / 700
mapa.width = anchoDelMapa
mapa.height = alturaQueBuscamos

mapaBackground.src = './img/mokemap.png'
const ataques = ['FUEGO', 'AGUA', 'PLANTA']
const imagenesDeFondo = ['./img/fondo.png', './img/fondo1.png', './img/fondo3.png', './img/fondo4.png', './img/fondo5.png', './img/fondo6.png', './img/fondo7.png']

class mokepon {
    constructor(nombre, foto, vida, fotoMapa, id = null) {
        this.id = id
        this.nombre = nombre
        this.foto = foto
        this.vida = vida
        this.ataque = []
        this.ancho = 50
        this.alto = 50
        this.x = aleatorio(0, mapa.width - this.ancho)
        this.y = aleatorio(0, mapa.height - this.alto)
        this.mapaFoto = new Image()
        this.mapaFoto.src = fotoMapa
        this.velocidadX = 0
        this.velocidadY = 0
    }
    pintarMokepon() {
        lienzo.drawImage(
            this.mapaFoto,
            this.x,
            this.y,
            this.ancho,
            this.alto)

    }
}

let charmanders = new mokepon('Charmander', './img/pokemon/charmander.png', 3, './img/pokemon/charmander.png',)
let bulbasaurs = new mokepon('Bulbasaur', './img/pokemon/bulbasor.png', 3, './img/pokemon/bulbasor.png',)
let squirtles = new mokepon('Squirtle', './img/pokemon/scuero.png', 3, './img/pokemon/scuero.png',)


const charmander_ataque = [{ nombre: 'Fuego 🔥', id: 'fuego' },
{ nombre: 'Fuego 🔥', id: 'fuego' },
{ nombre: 'Fuego 🔥', id: 'fuego' },
{ nombre: 'Agua 💧', id: 'agua' },
{ nombre: 'Planta 🌻', id: 'planta' }]

const bulbasaur_ataque = [{ nombre: 'Planta 🌻', id: 'planta' },
{ nombre: 'Planta 🌻', id: 'planta' },
{ nombre: 'Planta 🌻', id: 'planta' },
{ nombre: 'Fuego 🔥', id: 'fuego' },
{ nombre: 'Agua 💧', id: 'agua' }]

const squirtle_ataque = [{ nombre: 'Agua 💧', id: 'agua' },
{ nombre: 'Agua 💧', id: 'agua' },
{ nombre: 'Agua 💧', id: 'agua' },
{ nombre: 'Planta 🌻', id: 'planta' },
{ nombre: 'Fuego 🔥', id: 'fuego' }]

charmanders.ataque.push(...charmander_ataque)

bulbasaurs.ataque.push(...bulbasaur_ataque)

squirtles.ataque.push(...squirtle_ataque)



mokepones.push(charmanders, bulbasaurs, squirtles)




function iniciarJuego() {
    selectionSeleccionarAtaque.style.display = 'none'
    sectionVerMapa.style.display = 'none'
    selectionMensajes.style.display = 'none'
    selectionReiniciar.style.display = 'none'
    mokepones.forEach(mokepon => {
        optionesMokepons = `<input type="radio" name="mascota" value=${mokepon.nombre} id=${mokepon.nombre}>
        <label class="tarjeta_de_mokepon" for=${mokepon.nombre}>
            <p>${mokepon.nombre}</p><img src=${mokepon.foto}>
        </label>`
        contenedorTarjetas.innerHTML += optionesMokepons
        inputcharmander = document.getElementById('Charmander')
        inputbulbasaur = document.getElementById('Bulbasaur')
        inputsquirtle = document.getElementById('Squirtle')
    })
    botonMascota.addEventListener('click', seleccionarMascotaJugador)
    botonReiniciar.addEventListener('click', reiniciarJuego)
    unirseAlJuego()
    cambiarFondo()
}

function unirseAlJuego() {
    fetch('http://192.168.0.17:8080/Unirse')
    .then(function(response) {
        if (response.ok) {
            return response.text()
                .then(function(respuesta) {
                    console.log(respuesta)
                    jugadorId = respuesta
                }
            )
        }
    })

}

function seleccionarMascotaPc(enemigo) {
    mascotapc = Math.floor(Math.random() * (mokepones.length))
    spanMascotaPc.innerHTML = enemigo.nombre
    ataquesMokeponEnemigo = enemigo.ataque
    secuenciaDeAtaque()
}

function seleccionarMascotaJugador() {
    let spanMascotaJugador = document.getElementById('mascota_jugador')
    if (inputcharmander.checked) {
        spanMascotaJugador.innerHTML = inputcharmander.id
        mascotaJugador = inputcharmander.id
    }
    else if (inputbulbasaur.checked) {
        spanMascotaJugador.innerHTML = inputbulbasaur.id
        mascotaJugador = inputbulbasaur.id
    }
    else if (inputsquirtle.checked) {
        spanMascotaJugador.innerHTML = inputsquirtle.id
        mascotaJugador = inputsquirtle.id
    }
    else{
        alert('No selecionaste una mascota')
    return
}
    seleccionarMokepon(mascotaJugador)
    extraerAtaques(mascotaJugador)
    iniciarMapa()
    sectionVerMapa.style.display = 'flex'
    selectionMascota.style.display = 'none'
    
}

function seleccionarMokepon(mascotaJugador) {
    fetch(`http://192.168.0.17:8080/mokepon/${jugadorId}`, {   
        method: 'post',
        headers: {
            "Content-Type": 'application/json'
        },
        body: JSON.stringify({  mokepon: mascotaJugador })
    })
    
}


function extraerAtaques(mascotaJugador) {
    let ataques
    for (let i = 0; i < mokepones.length; i++) {
        if (mascotaJugador == mokepones[i].nombre) {
            if (mascotaJugador === mokepones[i].nombre) {
                ataques = mokepones[i].ataque
            }
        }
    }
    mostrarAtaques(ataques)
}

function mostrarAtaques(ataques) {
    ataques.forEach(ataque => {
        ataquesMokepon = `<button id=${ataque.id} class="boton_ataque BAtaque">${ataque.nombre}</button>`
        cotenedorAtaques.innerHTML += ataquesMokepon
    })
    fuego = document.getElementById('fuego')
    agua = document.getElementById('agua')
    planta = document.getElementById('planta')
    botones = document.querySelectorAll('.BAtaque')
}

function secuenciaDeAtaque() {
    botones.forEach(boton => {
        boton.addEventListener('click', (e) => {
            if (e.target.textContent === 'Fuego 🔥') {
                ataqueJugador.push('Fuego 🔥')
                boton.style.backgroundColor = '#112f58'
                boton.disabled = true
            } else if (e.target.textContent === 'Agua 💧') {
                ataqueJugador.push('Agua 💧')
                boton.style.backgroundColor = '#112f58'
                boton.disabled = true
            } else  {
                ataqueJugador.push('Planta 🌻')
                boton.style.backgroundColor = '#112f58'
                boton.disabled = true
            }
            if (ataqueJugador.length === 5) {
                enviarAtaques()
            }
        })
    })
}

function enviarAtaques() {
    fetch(`http://192.168.0.17:8080/mokepon/${jugadorId}/ataques`, {
        method: 'post',
        headers: {
            "Content-Type": 'application/json'
        },
        body: JSON.stringify({ ataques: ataqueJugador })
    })
    intervalo = setInterval(obtenerAtaques, 50)
}

function obtenerAtaques() {
    fetch(`http://192.168.0.17:8080/mokepon/${enemigoId}/ataques`)
    .then(function(response) {
        if (response.ok) {
             response.json()
                .then(function({ ataques }) {
                    if (ataques.length === 5) {

                        ataqueEnemigo = ataques
                        console.log('ataque pc',ataqueEnemigo)
                        combate()
                    }
                })
        }
    })
}



function ataqueEnemigo() {
    ataqueEnemigo.push(ataquesMokeponEnemigo[Math.floor(Math.random() * ataquesMokeponEnemigo.length)].nombre)
    console.log('ataque pc',ataqueEnemigo)
    iniciarPelea()
}

function iniciarPelea() {
    if (ataqueJugador.length === 5) {
        combate()
    }
}

function indexAmbosOponentes(jugador, pc) {
    indexAtaqueJugador = ataqueJugador[jugador]
    indexataqueEnemigo = ataqueEnemigo[pc]
}

function combate() {
    clearInterval(intervalo)
    for (let i = 0; i < ataqueJugador.length; i++) {
        if (ataqueJugador[i] === ataqueEnemigo[i]) {
            console.log('Empate')
            let termino = 'Empate'
            indexAmbosOponentes(i, i)
            crearMensaje(termino)
            console.log(indexAtaqueJugador)
            let selectionMensajes = document.getElementById('mensajes')
            selectionMensajes.style.display = 'flex'
        } else if ((ataqueJugador[i] === 'Agua 💧' && ataqueEnemigo[i] === 'Fuego 🔥') ||
            (ataqueJugador[i] === 'Planta 🌻' && ataqueEnemigo[i] === 'Agua 💧') ||
            (ataqueJugador[i] === 'Fuego 🔥' && ataqueEnemigo[i] === 'Planta 🌻')) {
            let termino = 'Ganaste'
            indexAmbosOponentes(i, i)
            victoriasJugador++
            spanVidasPc.innerHTML = victoriasJugador
            crearMensaje(termino)
            let selectionMensajes = document.getElementById('mensajes')
            selectionMensajes.style.display = 'flex'
        } else {
            let termino = 'Perdiste'
            indexAmbosOponentes(i, i)
            victoriasPc++
            spanVidasJugador.innerHTML = victoriasPc
            crearMensaje(termino)
            let selectionMensajes = document.getElementById('resultado')
            selectionMensajes.style.display = 'flex'
        }
    }

    revisarVictorias()
}

function crearMensaje(termino) {
    let nuevoAtaqueDelJug = document.createElement('p')
    let nuevoAtaqueDelPc = document.createElement('p')
    sectionsMensajes.innerHTML = termino
    nuevoAtaqueDelJug.innerHTML = indexAtaqueJugador
    nuevoAtaqueDelPc.innerHTML = indexataqueEnemigo
    ataquesDelJugador.appendChild(nuevoAtaqueDelJug)
    ataquesDelPc.appendChild(nuevoAtaqueDelPc)

}

function crearMensajeFinal(resultadoFinal1) {
    sectionsMensajes.innerHTML = resultadoFinal1
}

function revisarVictorias() {
    let resultadoFinal
    console.log(victoriasJugador)
    console.log(victoriasPc)
    if (victoriasJugador === victoriasPc) {
        resultadoFinal = 'Esto fue un empate!!!'
        crearMensajeFinal(resultadoFinal)
        let selectionReiniciar = document.getElementById('reiniciar')
        selectionReiniciar.style.display = 'block'
    } else if (victoriasJugador < victoriasPc) {
        resultadoFinal = 'FELICITACIONES! Ganaste :)'
        crearMensajeFinal(resultadoFinal)
        let selectionReiniciar = document.getElementById('reiniciar')
        selectionReiniciar.style.display = 'block'
    } else {
        resultadoFinal = 'Lo siento, perdiste :('
        crearMensajeFinal(resultadoFinal)
        let selectionReiniciar = document.getElementById('reiniciar')
        selectionReiniciar.style.display = 'block'
    }
}

function reiniciarJuego() {
    location.reload()
}


function cambiarFondo() {
    const indiceAleatorio = Math.floor(Math.random() * imagenesDeFondo.length);
    const nuevaImagenFondo = imagenesDeFondo[indiceAleatorio];
    document.body.style.backgroundImage = `url('${nuevaImagenFondo}')`;
}

function pintarCanvas() {

    mascotaDelJugadorObjeto.x += mascotaDelJugadorObjeto.velocidadX
    mascotaDelJugadorObjeto.y += mascotaDelJugadorObjeto.velocidadY
    lienzo.clearRect(0, 0, mapa.width, mapa.height)
    lienzo.drawImage(mapaBackground, 0, 0, mapa.width, mapa.height)
    mascotaDelJugadorObjeto.pintarMokepon()
    enviarPosicionAlServidor(mascotaDelJugadorObjeto.x, mascotaDelJugadorObjeto.y)
   mokeponesEnemigos.forEach(function (mokepon) {
    if (mokepon != undefined) {
        mokepon.pintarMokepon()
        revisarColision(mokepon)
    }
    })

}

function enviarPosicionAlServidor(x, y) {
    fetch(`http://192.168.0.17:8080/mokepon/${jugadorId}/posicion`, {
        method: 'post',
        headers: {
            "Content-Type": 'application/json'
        },
        body: JSON.stringify({ x, y })
    })
        .then(function (response) {
            if (response.ok) {
                response.json()
                    .then(function ({ enemigos }) {
                        console.log(enemigos)
                        mokeponesEnemigos = enemigos.map(function (enemigo) {
                            let mokeponEnemigo = null
                            if (enemigo.mokepon != undefined) {
                            const mokeponNombre = enemigo.mokepon.nombre 
                            switch (mokeponNombre) {
                                case "Charmander":
                                    mokeponEnemigo = new mokepon('Charmander', './img/pokemon/charmander.png', 3, './img/pokemon/charmander.png', enemigo.id)
                                    break
                                case "Bulbasaur":
                                    mokeponEnemigo = new mokepon('Bulbasaur', './img/pokemon/bulbasor.png', 3, './img/pokemon/bulbasor.png', enemigo.id)
                                    break
                                case "Squirtle":
                                    mokeponEnemigo = new mokepon('Squirtle', './img/pokemon/scuero.png', 3, './img/pokemon/scuero.png', enemigo.id)
                                    break
                                default:
                                    break
                            }
                           
                            mokeponEnemigo.x = enemigo.x
                            mokeponEnemigo.y = enemigo.y
                        }
                            return mokeponEnemigo
                        })

                    })
            }
        })
}

function movercharmanderderecha() {
    mascotaDelJugadorObjeto.velocidadX = 5
}

function movercharmanderizquierda() {
    mascotaDelJugadorObjeto.velocidadX = -5
}

function movercharmanderarriba() {
    mascotaDelJugadorObjeto.velocidadY = -5
}

function movercharmanderabajo() {
    mascotaDelJugadorObjeto.velocidadY = 5
}

function detenerMovimiento() {
    mascotaDelJugadorObjeto.velocidadX = 0
    mascotaDelJugadorObjeto.velocidadY = 0
}

function sePresionoTecla(evento) {
    switch (evento.key) {
        case 'ArrowRight':
            movercharmanderderecha()
            break
        case 'ArrowLeft':
            movercharmanderizquierda()
            break
        case 'ArrowUp':
            movercharmanderarriba()
            break
        case 'ArrowDown':
            movercharmanderabajo()
            break
    }
}

function obtenerObjetoMokepon() {

    for (let i = 0; i < mokepones.length; i++) {
        if (mascotaJugador === mokepones[i].nombre) {
            return mokepones[i]
        }
    }

}

function iniciarMapa() {
    mascotaDelJugadorObjeto = obtenerObjetoMokepon(mascotaJugador)
    window.addEventListener('keydown', sePresionoTecla)
    window.addEventListener('keyup', detenerMovimiento)
    intervalo = setInterval(pintarCanvas, 50)
}

function revisarColision(Enemigo) {
    const arribaEnemigo = Enemigo.y
    const abajoEnemigo = Enemigo.y + Enemigo.alto
    const izquierdaEnemigo = Enemigo.x
    const derechaEnemigo = Enemigo.x + Enemigo.ancho

    const arribaMascota = mascotaDelJugadorObjeto.y
    const abajoMascota = mascotaDelJugadorObjeto.y + mascotaDelJugadorObjeto.alto
    const izquierdaMascota = mascotaDelJugadorObjeto.x
    const derechaMascota = mascotaDelJugadorObjeto.x + mascotaDelJugadorObjeto.ancho
    if (abajoMascota < arribaEnemigo || arribaMascota > abajoEnemigo || derechaMascota < izquierdaEnemigo || izquierdaMascota > derechaEnemigo) {
        return 
    } 
        
        detenerMovimiento()
        clearInterval(intervalo)
        enemigoId = Enemigo.id
        selectionSeleccionarAtaque.style.display = 'flex'
        sectionVerMapa.style.display = 'none'
        seleccionarMascotaPc(Enemigo)
        //alert('Colision con: '+ Enemigo.nombre)
    
}
function aleatorio(min, max) { return Math.floor(Math.random() * (max - min + 1) + min) }



window.addEventListener('load', iniciarJuego)