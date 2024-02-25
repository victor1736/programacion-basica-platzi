let jugador = 0
let computadora
let scoreJugador = 0
let scoreComputadora = 0
const posibilidades = ["piedra", "papel", "tijera"]
while (scoreJugador < 3 && scoreComputadora < 3) {
    jugador = prompt("Elige una opcion: 0 para piedra, 1 para papel, 2 para tijera")
    alert("Elegiste " + posibilidades[jugador])
    computadora = Math.floor(Math.random() * 3)
    alert("La computadora eligio " + posibilidades[computadora])
    if (jugador == computadora) {
        alert("Empate")
    } else if ((jugador == 0 && computadora == 1) || (jugador == 1 && computadora == 2) || (jugador == 2 && computadora == 0)) {
        scoreComputadora++
        alert("Gana la computadora")
    } else if ((jugador == 0 && computadora == 2) || (jugador == 1 && computadora == 0) || (jugador == 2 && computadora == 1)) {
        scoreJugador++
        alert("Gana el jugador")
    } else {
        alert("Elegiste una opcion invalida la cual es: " + jugador)
        alert("Opcion invalida")
    }
    alert("El score es: Jugador: " + scoreJugador + " Computadora: " + scoreComputadora)
}
if (scoreJugador == 3) {
    alert("Gana el jugador")
} else {
    alert("Gana la computadora")
}
