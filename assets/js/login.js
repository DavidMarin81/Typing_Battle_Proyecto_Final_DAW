document.addEventListener("DOMContentLoaded", () => {
    const formLogin = document.getElementById('formLogin');
    const mensajeLogin = document.getElementById('mensajeLogin');
    const twoFactorContainer = document.getElementById('twoFactorContainer');
    const twoFactorInput = document.getElementById('twoFactorInput');

    let requires2FA = false;

    formLogin.addEventListener('submit', async (e) => {
        e.preventDefault();

        const nick = document.getElementById('nickLogin').value.trim();
        const pass = document.getElementById('passLogin').value.trim();
        const twoFactorCode = twoFactorInput.value.trim();

        if (!nick || !pass) {
            mensajeLogin.style.color = 'red';
            mensajeLogin.textContent = "Todos los campos son obligatorios.";
            return;
        }

        const formData = new FormData();
        formData.append("nick", nick);
        formData.append("pass", pass);

        if (requires2FA && twoFactorCode) {
            formData.append("two_factor_code", twoFactorCode);
        }

        try {
            const res = await fetch("https://mediumslateblue-stinkbug-339289.hostingersite.com/backend/login.php", {
                method: "POST",
                body: formData
            });

            const data = await res.json();

            if (!data.success) {
                mensajeLogin.style.color = "red";
                mensajeLogin.textContent = data.message;
                return;
            }

            // Requiere 2FA
            if (data.two_factor_required) {
                requires2FA = true;
                twoFactorContainer.style.display = "block";
                mensajeLogin.style.color = "blue";
                mensajeLogin.textContent = "Introduce el código que te enviamos al correo.";
                return;
            }

            // 🔥 LOGIN COMPLETO — GUARDAMOS SIEMPRE EL ID
            sessionStorage.setItem("usuario_id", data.usuario_id ?? "");
            localStorage.setItem("user_nivel_maximo", data.nivel_maximo ?? 1);

            mensajeLogin.style.color = "green";
            mensajeLogin.textContent = "Login correcto";

            setTimeout(() => {
                window.location.href = "menu.html";
            }, 800);

        } catch (error) {
            mensajeLogin.style.color = "red";
            mensajeLogin.textContent = "Error de conexión con el servidor.";
        }
    });
});
