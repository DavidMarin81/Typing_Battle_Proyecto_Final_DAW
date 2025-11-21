document.addEventListener("DOMContentLoaded", () => {

  // ======= Modo claro / oscuro =======
  const toggleBtn = document.getElementById("modoToggle");
  if (localStorage.getItem("modo") === "light") {
    document.body.classList.add("light-mode");
    toggleBtn.textContent = "☀️";
  }

  toggleBtn.addEventListener("click", () => {
    document.body.classList.toggle("light-mode");
    const modoActual = document.body.classList.contains("light-mode") ? "light" : "dark";
    toggleBtn.textContent = modoActual === "light" ? "☀️" : "🌙";
    localStorage.setItem("modo", modoActual);
  });

  // ======= Letras por nivel =======
  const letrasPorNivel = {
    1: "asdf ",
    2: "jklñ ",
    3: "asdfg ",
    4: "hjkllñ ",
    5: "qwer ",
    6: "uiop ",
    7: "qwert ",
    8: "yuiop ",
    9: "zxcv ",
    10: "bnm ",
    11: "asdfghjklñ ",
    12: "qwertyuiop ",
    13: "zxcvbnm ",
    14: "qwertyuiopasdfghjklñ ",
    15: "asdfghjklñzxcvbnm ",
    16: "qwertyuiopasdfghjklñzxcvbnm "
  };

  // ======= Rellenar selects de nivel =======
  const nivelSelects = document.querySelectorAll("#nivelEntrenamiento, #nivelCompeticion");
  nivelSelects.forEach(select => {
    for (let i = 0; i < 16; i++) {
      select.innerHTML += `<option value="${i + 1}">Nivel ${i + 1}</option>`;
    }
  });

  // ======= Modal info nivel =======
  const contenidoModal = document.getElementById("contenidoModalNivel");
  const modalNivel = new bootstrap.Modal(document.getElementById("modalInfoNivel"));

  // Entrenamiento
  document.getElementById("infoNivelBtn").addEventListener("click", () => {
    const nivel = document.getElementById("nivelEntrenamiento").value;
    contenidoModal.textContent = nivel ? `Nivel ${nivel}: ${letrasPorNivel[nivel]}` : "Por favor, selecciona un nivel primero.";
    modalNivel.show();
  });

  // Competición
  document.getElementById("infoNivelBtnCompeticion").addEventListener("click", () => {
    const nivel = document.getElementById("nivelCompeticion").value;
    contenidoModal.textContent = nivel ? `Nivel ${nivel}: ${letrasPorNivel[nivel]}` : "Por favor, selecciona un nivel primero.";
    modalNivel.show();
  });

  // ======= Formulario Entrenamiento =======
  document.getElementById("formEntrenamiento").addEventListener("submit", (e) => {
    e.preventDefault();
    const nivel = document.getElementById("nivelEntrenamiento").value;
    const dificultad = document.getElementById("dificultadEntrenamiento").value;
    const tiempo = document.getElementById("tiempoEntrenamiento").value;

    if (!nivel || !dificultad || !tiempo) {
      return alert("❗ Debes completar todas las opciones.");
    }

    alert(`🏋️‍♂️ Entrenamiento\nNivel: ${nivel}\nDificultad: ${dificultad}\nDuración: ${tiempo}`);
    // Aquí redirigirías a la partida de entrenamiento
    // window.location.href = `../juego/entrenamiento.html?nivel=${nivel}&dif=${dificultad}&tiempo=${tiempo}`;
  });

  // ======= Formulario Competición =======
  document.getElementById("formCompeticion").addEventListener("submit", (e) => {
    e.preventDefault();
    const nivel = document.getElementById("nivelCompeticion").value;
    const dificultad = document.getElementById("dificultadCompeticion").value;
    const tiempo = document.getElementById("tiempoCompeticion").value;

    if (!nivel || !dificultad || !tiempo) {
      return alert("❗ Debes completar todas las opciones.");
    }

    alert(`🏆 Competición\nNivel: ${nivel}\nDificultad: ${dificultad}\nDuración: ${tiempo}`);
    // Aquí redirigirías a la partida de competición
    // window.location.href = `../juego/competicion.html?nivel=${nivel}&dif=${dificultad}&tiempo=${tiempo}`;
  });

});
