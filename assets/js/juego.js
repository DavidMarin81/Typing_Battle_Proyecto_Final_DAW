// ===== Configuración del juego =====
const fontSize = 40;
const velocidad = 1;
const puntuacion_maxima = 50;
const fallos_permitidos = 3;

let letrasActivas = [];
let puntos = 0;
let fallo = 0;
let finalPartida = false;
let nivelPartida = 1;

// ===== Elementos del DOM =====
const fallos = document.getElementById("fallos");
const puntuacion = document.getElementById("puntuacion");
const modal = document.getElementById("modal");
const btnSi = document.getElementById("btnSi");
const btnNo = document.getElementById("btnNo");
const btnVolver = document.getElementById("volver");

// ===== Volver al menu =====
if(btnVolver) {
    btnVolver.addEventListener("click", () => {
        window.location.href = 'menu.html';
    })
}

// ===== Generar letras según nivel =====
function generarLetra(nivel) {
    let letras;
    switch (nivel) {
        case "1": letras = "asdf "; break;
        case "2": letras = "jklñ"; break;
        case "3": letras = "asdfjklñ "; break;
        case "4": letras = "asdfg "; break;
        case "5": letras = "hjklñ "; break;
        case "6": letras = "asdfghjklñ "; break;
        case "7": letras = "qwer "; break;
        case "8": letras = "uiop "; break;
        case "9": letras = "qweruiop "; break;
        case "10": letras = "qwert "; break;
        case "11": letras = "yuiop "; break;
        case "12": letras = "zxcv "; break;
        case "13": letras = "nm "; break;
        case "14": letras = "zxcvb "; break;
        case "15": letras = "zxcvbnm "; break;
        case "16": letras = "abcdefghijklmnñopqrstuvwxyz "; break;
        default: letras = "asdf"; break;
    }
    return letras[Math.floor(Math.random() * letras.length)];
}

// ===== Color aleatorio para letras =====
function colorAleatorio() {
    const colores = ['#FFB6C1', '#FFD700', '#98FB98', '#87CEFA', '#FF69B4', '#FFA07A', '#BA55D3'];
    return colores[Math.floor(Math.random() * colores.length)];
}

// ===== Crear letra en DOM =====
function crearLetraEnDOM() {
    const letra = generarLetra(nivelPartida);
    const margenIzquierdo = 20;
    const pantalla = document.getElementById("juego");

    const contenedor = document.createElement("div");
    contenedor.classList.add("burbuja");
    contenedor.textContent = letra === ' ' ? '—' : letra;
    contenedor.style.position = "absolute";
    contenedor.style.fontSize = fontSize + "px";
    contenedor.style.left = "-9999px";
    contenedor.style.top = "-9999px";
    contenedor.style.backgroundColor = colorAleatorio();

    pantalla.appendChild(contenedor);
    const anchoBurbuja = contenedor.offsetWidth;
    const anchoDisponible = pantalla.offsetWidth - margenIzquierdo - anchoBurbuja;
    const posicionX = margenIzquierdo + Math.random() * anchoDisponible;
    contenedor.style.left = posicionX + "px";
    contenedor.style.top = -fontSize + "px";

    return {
        letra,
        contenedor,
        posicionY: -fontSize,
        lanzamiento: null
    };
}

// ===== Animar letra =====
function lanzarLetra() {
    if (finalPartida) return;

    const letraObj = crearLetraEnDOM();
    const limite = document.getElementById("juego").offsetHeight - fontSize;

    letraObj.lanzamiento = setInterval(() => {
        if (finalPartida) {
            clearInterval(letraObj.lanzamiento);
            return;
        }

        letraObj.posicionY += velocidad;
        letraObj.contenedor.style.top = letraObj.posicionY + "px";

        if (letraObj.posicionY >= limite) {
            letraObj.contenedor.remove();
            clearInterval(letraObj.lanzamiento);
            letrasActivas.splice(letrasActivas.indexOf(letraObj), 1);
            fallo++;
            fallos.textContent = "Fallos: " + fallo;
            if (fallo >= fallos_permitidos) finalizarJuego('fallos');
            actualizarLetraActiva();
        }
    }, 10  );

    letrasActivas.push(letraObj);
    actualizarLetraActiva(); // <-- también al añadir
}

// ===== Actualizar letra activa =====
function actualizarLetraActiva() {
    // Quitar clase "activa" de todas
    letrasActivas.forEach(l => l.contenedor.classList.remove("activa"));

    if (letrasActivas.length > 0) {
        letrasActivas[0].contenedor.classList.add("activa"); // primera letra a pulsar
    }
}

// ===== Finalizar juego =====
function finalizarJuego(motivo) {
    if (finalPartida) return;
    finalPartida = true;

    letrasActivas.forEach(({ lanzamiento }) => clearInterval(lanzamiento));
    letrasActivas = [];

    const mensajeModal = document.getElementById('mensajeModal');
    if (motivo === 'fallos') {
        mensajeModal.textContent = "Has alcanzado los fallos máximos permitidos.";
    } else if (motivo === 'puntos') {
        mensajeModal.textContent = "¡Has ganado!";
    } else {
        mensajeModal.textContent = "¡Juego terminado!";
    }

    mostrarModal();
}

// ===== Mostrar modal =====
function mostrarModal() {
    modal.style.display = "flex";
}

// ===== Botones modal =====
btnSi.addEventListener("click", () => location.reload());
btnNo.addEventListener("click", () => window.location.href = 'menu.html');

// ===== Detectar teclas =====
document.body.addEventListener("keydown", (evento) => {
    if (finalPartida || letrasActivas.length === 0) return;

    let primeraLetra = letrasActivas[0];
    if (primeraLetra.letra === evento.key.toLowerCase()) {

        playPop();

        primeraLetra.contenedor.remove();
        clearInterval(primeraLetra.lanzamiento);
        letrasActivas.shift();
        puntos++;
        puntuacion.textContent = "Puntos: " + puntos;

        actualizarLetraActiva(); // <-- actualizar siguiente letra

        if (puntos >= puntuacion_maxima) finalizarJuego('puntos');
    } else {

        playMistake();
        shakeScreen();
        fallo++;
        fallos.textContent = "Fallos: " + fallo;
        if (fallo >= fallos_permitidos) finalizarJuego('fallos');
    }
});

// ===== Iniciar juego =====
function iniciarJuego(nivel) {
    nivelPartida = nivel.toString();
    puntos = 0;
    fallo = 0;
    finalPartida = false;

    setInterval(lanzarLetra, 1000);
}

// ===== Obtener nivel desde URL =====
document.addEventListener("DOMContentLoaded", () => {
    const urlParams = new URLSearchParams(window.location.search);
    const nivel = urlParams.get('nivel');
    if (nivel) iniciarJuego(nivel);
});

// ===== Audios para aciertos y errores
function playPop() {
    const audio = new Audio('../assets/audio/pop.wav');
    audio.play().catch(e => console.error("Error al reproducir el audio"));
}

function playMistake() {
    const audio = new Audio('../assets/audio/mistake.wav');
    audio.play().catch(e => console.error("Error al reproducir el audio"));
}

// ===== Sacudir la pantalla ===== 

// Función para hacer temblar la pantalla
function shakeScreen() {
  document.body.classList.add("shake-active");
  setTimeout(() => {
    document.body.classList.remove("shake-active");
  }, 400);
}


