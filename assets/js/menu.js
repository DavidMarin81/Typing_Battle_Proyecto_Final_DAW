document.addEventListener("DOMContentLoaded", () => {
    const botones = document.querySelectorAll(".nivel-btn");

    botones.forEach(btn => {
        btn.addEventListener("click", () => {
            const nivel = btn.dataset.nivel;
            window.location.href = `pantallaJuego.html?nivel=${nivel}`;
        });
    });
});
