const letrasFondo = document.getElementById("letrasFondo");
const scoreDisplay = document.getElementById("score");
const erroresDisplay = document.getElementById("errores");
const timerDisplay = document.getElementById("timer");

const popSound = document.getElementById("popSound");
const mistakeSound = document.getElementById("mistakeSound");

let score = 0;
let errores = 0;
let burbujas = [];
let gameInterval;
let gameDuration = 30; // segundos
let timeLeft = gameDuration;
let gameOver = false;

// Función para obtener letra aleatoria
function obtenerLetraAleatoria() {
  const letras = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
  return letras.charAt(Math.floor(Math.random() * letras.length));
}

// Función para hacer temblar la pantalla
function shakeScreen() {
  document.body.classList.add("shake");
  setTimeout(() => {
    document.body.classList.remove("shake");
  }, 400);
}

// Crear burbuja y animar caída
function crearBurbuja() {
  if (gameOver) return;

  const letra = obtenerLetraAleatoria();
  const burbuja = document.createElement("div");
  burbuja.classList.add("burbuja");
  burbuja.textContent = letra;
  burbuja.dataset.letra = letra;

  // Posición horizontal aleatoria dentro de la pantalla (menos 80px de ancho burbuja)
  burbuja.style.left = `${Math.random() * (window.innerWidth - 100)}px`;
  burbuja.style.top = `-80px`; // Empieza arriba fuera de pantalla

  letrasFondo.appendChild(burbuja);
  burbujas.push(burbuja);

  actualizarActiva();

  moverBurbuja(burbuja);
}

// Animar caída burbuja
function moverBurbuja(burbuja) {
  let pos = -80; // empieza arriba fuera
  const velocidad = 2 + Math.random() * 2; // pixeles por frame

  function frame() {
    if (gameOver) {
      if (letrasFondo.contains(burbuja)) letrasFondo.removeChild(burbuja);
      return;
    }

    pos += velocidad;
    burbuja.style.top = pos + "px";

    if (pos > window.innerHeight) {
      // La burbuja cayó sin ser explotada
      if (letrasFondo.contains(burbuja)) letrasFondo.removeChild(burbuja);

      const idx = burbujas.indexOf(burbuja);
      if (idx !== -1) burbujas.splice(idx, 1);

      // Resta puntos y aumenta errores
      if (!gameOver) {
        errores++;
        score = Math.max(0, score - 2);
        erroresDisplay.textContent = errores;
        scoreDisplay.textContent = score;
        mistakeSound.currentTime = 0;
        mistakeSound.play();
        shakeScreen();
        actualizarActiva();
      }
      return; // detiene animación
    }

    requestAnimationFrame(frame);
  }

  requestAnimationFrame(frame);
}

// Actualiza qué burbuja está activa (la primera)
function actualizarActiva() {
  burbujas.forEach((b, idx) => {
    b.classList.toggle("activa", idx === 0);
  });
}

// Manejo de pulsaciones
document.addEventListener("keydown", e => {
  if (gameOver) return;
  if (burbujas.length === 0) return;

  const tecla = e.key.toUpperCase();
  const primeraBurbuja = burbujas[0];
  const letraEsperada = primeraBurbuja.dataset.letra;

  if (tecla === letraEsperada) {
    // Explota la burbuja correcta
    popSound.currentTime = 0;
    popSound.play();

    primeraBurbuja.classList.add("explode");
    setTimeout(() => {
      if (letrasFondo.contains(primeraBurbuja)) {
        letrasFondo.removeChild(primeraBurbuja);
      }
    }, 400);

    burbujas.shift();
    score += 5;
    scoreDisplay.textContent = score;
    actualizarActiva();
  } else {
    // Error, letra incorrecta
    errores++;
    score = Math.max(0, score - 2);
    erroresDisplay.textContent = errores;
    scoreDisplay.textContent = score;

    mistakeSound.currentTime = 0;
    mistakeSound.play();
    shakeScreen();
  }
});

// Temporizador
function startTimer() {
  timerDisplay.textContent = timeLeft;

  const timerInterval = setInterval(() => {
    if (timeLeft <= 0) {
      clearInterval(timerInterval);
      terminarJuego();
    } else {
      timeLeft--;
      timerDisplay.textContent = timeLeft;
    }
  }, 1000);
}

// Finalizar juego
function terminarJuego() {
  gameOver = true;
  clearInterval(gameInterval);

  // Limpia las burbujas restantes
  burbujas.forEach(b => {
    if (letrasFondo.contains(b)) {
      letrasFondo.removeChild(b);
    }
  });
  burbujas = [];

  // Mostrar mensaje fin de juego
  const mensaje = document.createElement("div");
  mensaje.textContent = "¡Fin del juego!";
  mensaje.style.position = "fixed";
  mensaje.style.top = "50%";
  mensaje.style.left = "50%";
  mensaje.style.transform = "translate(-50%, -50%)";
  mensaje.style.fontSize = "3rem";
  mensaje.style.color = "white";
  mensaje.style.background = "rgba(0,0,0,0.7)";
  mensaje.style.padding = "20px 40px";
  mensaje.style.borderRadius = "15px";
  mensaje.style.zIndex = "100";
  document.body.appendChild(mensaje);
}

// Iniciar juego
function iniciarJuego() {
  score = 0;
  errores = 0;
  timeLeft = gameDuration;
  gameOver = false;
  scoreDisplay.textContent = score;
  erroresDisplay.textContent = errores;
  timerDisplay.textContent = timeLeft;

  gameInterval = setInterval(() => {
    crearBurbuja();
  }, 1500); // cada 1.5 segundos cae una burbuja

  startTimer();
}

// Arranca el juego automáticamente al cargar
window.onload = () => {
  iniciarJuego();
};
