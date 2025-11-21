document.addEventListener("DOMContentLoaded", () => {

    // -------------------- Elementos --------------------
    const toggleThemeBtn = document.getElementById("toggleThemeBtn");
    const rainbowBtn = document.getElementById("rainbowBtn");
    const rainbowMenu = document.getElementById("rainbowMenu");
    const colorDots = document.querySelectorAll(".color-dot");

    // -------------------- Inicializar tema --------------------
    const savedTheme = localStorage.getItem("tema") || "theme-light";
    setTheme(savedTheme);

    // -------------------- Función para cambiar tema --------------------
    function setTheme(themeName) {
        // Quitar todas las clases de tema
        document.documentElement.classList.remove(
            "theme-light",
            "theme-dark",
            "theme-red",
            "theme-orange",
            "theme-yellow",
            "theme-green",
            "theme-cyan",
            "theme-blue",
            "theme-purple"
        );

        // Aplicar la clase elegida
        document.documentElement.classList.add(themeName);
        localStorage.setItem("tema", themeName);

        // Actualizar icono ☀️ / 🌙 según tema
        if (themeName === "theme-light") {
            toggleThemeBtn.textContent = "☀️";
        } else if (themeName === "theme-dark") {
            toggleThemeBtn.textContent = "🌙";
        } else {
            toggleThemeBtn.textContent = "☀️"; // para temas arcoiris, podemos mostrar sol
        }
    }

    // -------------------- Botón Claro/Oscuro --------------------
    toggleThemeBtn.addEventListener("click", () => {
        const currentTheme = localStorage.getItem("tema") || "theme-light";
        if (currentTheme === "theme-light") {
            setTheme("theme-dark");
        } else {
            setTheme("theme-light");
        }
    });

    // -------------------- Botón Arcoiris --------------------
    rainbowBtn.addEventListener("click", () => {
        rainbowMenu.classList.toggle("d-none");
    });

    // -------------------- Selección de color --------------------
    colorDots.forEach(dot => {
        dot.addEventListener("click", () => {
            const theme = dot.getAttribute("data-theme");
            setTheme(theme);
            rainbowMenu.classList.add("d-none"); // ocultar menú después de seleccionar
        });
    });

    // -------------------- Formularios --------------------
    const formLogin = document.getElementById("formLogin");
    const formRegistro = document.getElementById("formRegistro");

    formLogin.addEventListener("submit", e => {
        e.preventDefault();
        // Aquí puedes añadir AJAX para login
        alert("Login enviado: " + document.getElementById("nickLogin").value);
    });

    formRegistro.addEventListener("submit", e => {
        e.preventDefault();
        // Aquí puedes añadir AJAX para registro
        const pass = document.getElementById("passRegistro").value;
        const confirm = document.getElementById("passConfirm").value;
        if (pass !== confirm) {
            alert("Las contraseñas no coinciden");
            return;
        }
        alert("Registro enviado: " + document.getElementById("nickRegistro").value);
    });

});
