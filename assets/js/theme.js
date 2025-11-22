document.addEventListener("DOMContentLoaded", () => {
    const toggleThemeBtn = document.getElementById("toggleThemeBtn");
    const rainbowBtn = document.getElementById("rainbowBtn");
    const rainbowMenu = document.getElementById("rainbowMenu");
    const colorDots = document.querySelectorAll(".color-dot");
    const colorPicker = document.getElementById("customColorPicker");

    // BaseMode: light / dark
    let baseMode = localStorage.getItem("baseMode") || "light";
    let customColor = localStorage.getItem("customColor") || null;

    // Inicializar
    let savedTheme = localStorage.getItem("tema") || (baseMode === "light" ? "theme-light" : "theme-dark");
    if (savedTheme === "theme-custom" && customColor) {
        applyCustomTheme(customColor, baseMode);
    } else {
        setTheme(savedTheme);
    }

    // -------------------------------------------------------------
    // FUNCIONES
    // -------------------------------------------------------------
    function setTheme(themeName) {
        const html = document.documentElement;
        html.className = ""; // limpiar todas las clases

        if (themeName === "theme-custom" && customColor) {
            html.classList.add("theme-custom");
            applyCustomTheme(customColor, baseMode);
        } else {
            html.classList.add(themeName);
            localStorage.setItem("tema", themeName);

            // Si es light/dark, actualizar baseMode
            if (themeName === "theme-light") baseMode = "light";
            if (themeName === "theme-dark") baseMode = "dark";
            localStorage.setItem("baseMode", baseMode);
        }

        updateToggleIcon();
    }

    function applyCustomTheme(color, mode) {
        const r = document.documentElement;
        r.className = "theme-custom";

        const lightMix = (c, pct) => `color-mix(in srgb, ${c} ${pct}%, white)`;
        const darkMix = (c, pct) => `color-mix(in srgb, ${c} ${pct}%, black)`;
        const mix = mode === "light" ? lightMix : darkMix;

        r.style.setProperty("--color-primary", color);
        r.style.setProperty("--color-bg", mix(color, 10));
        r.style.setProperty("--color-card-bg", mix(color, 15));
        r.style.setProperty("--color-text", mix(color, 80));
        r.style.setProperty("--color-secondary", mix(color, 70));
        r.style.setProperty("--color-input-bg", mix(color, 5));
        r.style.setProperty("--color-input-border", mix(color, 40));
        r.style.setProperty("--color-placeholder", mix(color, 50));

        localStorage.setItem("tema", "theme-custom");
        localStorage.setItem("customColor", color);
        customColor = color;
    }

    function updateToggleIcon() {
        toggleThemeBtn.textContent = baseMode === "light" ? "🌙" : "☀️";
    }

    // -------------------------------------------------------------
    // EVENTOS
    // -------------------------------------------------------------
    toggleThemeBtn.addEventListener("click", e => {
        e.stopPropagation();
        // Cambiar baseMode
        baseMode = baseMode === "light" ? "dark" : "light";
        localStorage.setItem("baseMode", baseMode);

        // Reaplicar tema actual
        if (customColor) {
            // Si hay un color custom, recalcular todos los derivados según baseMode
            applyCustomTheme(customColor, baseMode);
        } else {
            const theme = baseMode === "light" ? "theme-light" : "theme-dark";
            setTheme(theme);
        }
    });

    // Abrir/cerrar menú arcoiris
    rainbowBtn.addEventListener("click", (e) => {
        e.stopPropagation();
        // Si el menú está oculto, mostrarlo
        if (rainbowMenu.classList.contains("d-none") || !rainbowMenu.classList.contains("show")) {
            rainbowMenu.classList.add("show");
            rainbowMenu.classList.remove("d-none");
        } else {
            // Si está visible, ocultarlo
            rainbowMenu.classList.remove("show");
            rainbowMenu.classList.add("d-none");
        }
    });

    colorDots.forEach(dot => {
        dot.addEventListener("click", e => {
            e.stopPropagation();
            const theme = dot.getAttribute("data-theme");

            if (theme === "custom") {
                colorPicker.click();
                return;
            }

            // Tomar color del dot y aplicar customTheme adaptado a baseMode
            const color = rgbToHex(getComputedStyle(dot).backgroundColor);
            applyCustomTheme(color, baseMode);

            rainbowMenu.classList.remove("show");
        });
    });

    colorPicker.addEventListener("input", e => {
        const color = e.target.value;
        applyCustomTheme(color, baseMode);
        rainbowMenu.classList.remove("show");
    });

    // Cerrar menú arcoiris al hacer click fuera
    document.addEventListener("click", (e) => {
        if (!rainbowMenu.contains(e.target) && e.target !== rainbowBtn) {
            rainbowMenu.classList.remove("show");
            rainbowMenu.classList.add("d-none");
        }
    });

    // -------------------------------------------------------------
    // UTILIDADES
    // -------------------------------------------------------------
    function rgbToHex(rgb) {
        const result = rgb.match(/\d+/g);
        if (!result) return "#000000";
        return "#" + result.slice(0, 3).map(x => parseInt(x).toString(16).padStart(2, "0")).join("");
    }
});
