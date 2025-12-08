// ==========================
//   CARGAR NIVELES DESDE BD
// ==========================
document.addEventListener("DOMContentLoaded", () => {

    const usuario_id = sessionStorage.getItem("usuario_id");

    if (!usuario_id) {
        console.warn("⚠ No hay usuario_id en sessionStorage. Volviendo al login.");
        window.location.href = "index.html";
        return;
    }

    fetch("https://mediumslateblue-stinkbug-339289.hostingersite.com/backend/getLevel.php", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ usuario_id })
    })
    .then(res => res.json())
    .then(data => {

        const maxLevel = data.nivel_actual ? parseInt(data.nivel_actual, 10) : 1;

        const botones = document.querySelectorAll(".nivel-btn");

        botones.forEach(btn => {
            const nivel = parseInt(btn.dataset.nivel, 10);
            const lockIconSpan = btn.querySelector(".lock-icon");

            if (nivel <= maxLevel) {
                btn.disabled = false;
                btn.classList.remove("locked");
                if (lockIconSpan) lockIconSpan.textContent = "🔓";
            } else {
                btn.disabled = true;
                btn.classList.add("locked");
                if (lockIconSpan) lockIconSpan.textContent = "🔒";
                btn.style.cursor = "not-allowed";
            }
        });

    })
    .catch(err => console.error("❌ Error cargando niveles:", err));
});


// ====================
//   CERRAR SESIÓN
// ====================
document.addEventListener("DOMContentLoaded", () => {

    const logoutBtn = document.getElementById("logoutBtn");

    if (logoutBtn) {
        logoutBtn.addEventListener("click", () => {

            console.log("📌 Cerrando sesión...");

            // Eliminar datos del usuario
            sessionStorage.clear();
            localStorage.clear(); // por si acaso

            // Redirigir al login
            window.location.href = "index.html";
        });
    }
});
