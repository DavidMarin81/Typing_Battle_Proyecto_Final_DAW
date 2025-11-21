document.addEventListener("DOMContentLoaded", () => {
    const toggleThemeBtn = document.getElementById("toggleThemeBtn");
    const rainbowBtn = document.getElementById("rainbowBtn");
    const rainbowMenu = document.getElementById("rainbowMenu");
    const colorDots = document.querySelectorAll(".color-dot");

    // Guardar el modo "base" para claro/oscuro
    let baseMode = localStorage.getItem("baseMode") || "light";

    // Inicializar tema
    const savedTheme = localStorage.getItem("tema") || "theme-light";
    setTheme(savedTheme);

    function setTheme(themeName) {
        const html = document.documentElement;

        // Quitar todas las clases de tema
        html.classList.remove(
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

        // Aplicar nueva clase
        html.classList.add(themeName);
        localStorage.setItem("tema", themeName);

        // Actualizar baseMode si el tema es claro u oscuro
        if (themeName === "theme-light") baseMode = "light";
        if (themeName === "theme-dark") baseMode = "dark";
        localStorage.setItem("baseMode", baseMode);

        // Cambiar icono según tema
        if (themeName === "theme-light") {
            toggleThemeBtn.textContent = "🌙"; // luna para cambiar a oscuro
        } else if (themeName === "theme-dark") {
            toggleThemeBtn.textContent = "☀️"; // sol para cambiar a claro
        } else {
            // Para colores arcoiris mostramos icono según baseMode
            toggleThemeBtn.textContent = baseMode === "light" ? "🌙" : "☀️";
        }
    }

    // Toggle claro/oscuro
    toggleThemeBtn.addEventListener("click", (e) => {
        e.stopPropagation(); // Evitar que cierre el menú arcoiris
        if (baseMode === "light") {
            setTheme("theme-dark");
        } else {
            setTheme("theme-light");
        }
    });

    // Botón arcoiris
    rainbowBtn.addEventListener("click", (e) => {
        e.stopPropagation(); // Evitar que se cierre inmediatamente
        rainbowMenu.classList.toggle("d-none");
    });

    // Selección de color arcoiris
    colorDots.forEach(dot => {
        dot.addEventListener("click", (e) => {
            e.stopPropagation();
            const theme = dot.getAttribute("data-theme");
            setTheme(theme);
            rainbowMenu.classList.add("d-none");
        });
    });

    // Ocultar menú arcoiris al hacer clic fuera, solo si está visible
    rainbowBtn.addEventListener("click", (e) => {
        e.stopPropagation(); // Esto evita que el evento de document lo cierre
        rainbowMenu.classList.toggle("d-none");
    });
});
