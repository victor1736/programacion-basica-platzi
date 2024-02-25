const express = require('express');
const cors = require('cors');

const app = express();
http://192.168.0.17:8080

app.use(express.static('public'));
app.use(cors());
app.use(express.json());

const jugadores = [ ]

class Jugador {
    constructor(id, nombre) {
        this.id = id;
        //this.nombre = nombre;
    }

    asignarMokepon(mokepon) {
        this.mokepon = mokepon;
    }

    actualizarPosicion(x, y) {
        this.x = x;
        this.y = y;
    }

    asignarAtaques(ataques) {
        this.ataques = ataques;
    } 
}

class Mokepon {
    constructor(nombre) {
        this.nombre = nombre;
    }
}

app.get('/Unirse', (req, res) => {
    const id =    `${Math.random() }`;
    const jugador = new Jugador(id);
    jugadores.push(jugador);
    res.setHeader('access-control-allow-origin', '*');

    res.send(id);
    }
);

app.post('/mokepon/:jugadorId', (req, res) => {
    const jugadorId = req.params.jugadorId || '';
    const nombre = req.body.mokepon || '';
    const mokepon = new Mokepon(nombre);
    const jugadorIndex = jugadores.findIndex(jugador => jugador.id === jugadorId);
    if (jugadorIndex >= 0) {
        jugadores[jugadorIndex].asignarMokepon(mokepon);
    }
    console.log(jugadores);
    console.log(jugadorId);
    res.end();
});

app.post('/mokepon/:jugadorId/posicion', (req, res) => {
    const jugadorId = req.params.jugadorId || '';
    const x = req.body.x || 0;
    const y = req.body.y || 0;
    const jugadorIndex = jugadores.findIndex(jugador => jugador.id === jugadorId);
    if (jugadorIndex >= 0) {
        jugadores[jugadorIndex].actualizarPosicion(x, y);
    }
    const enemigos = jugadores.filter(jugador => jugador.id !== jugadorId);
    res.send({enemigos});
    res.end();
});
    
app.post('/mokepon/:jugadorId/ataques', (req, res) => {
    const jugadorId = req.params.jugadorId || '';
    const ataques = req.body.ataques || [];
    const jugadorIndex = jugadores.findIndex(jugador => jugador.id === jugadorId);
    if (jugadorIndex >= 0) {
        jugadores[jugadorIndex].asignarAtaques(ataques);
    }
    res.end();
});

app.get('/mokepon/:jugadorId/ataques', (req, res) => {
    const jugadorId = req.params.jugadorId || '';
    const jugador = jugadores.find((jugador) => jugador.id === jugadorId);
    res.send({
        ataques: jugador.ataques || []
    });
});

app.listen(8080, () => {
    console.log('Server is running on port 8080');
    });
