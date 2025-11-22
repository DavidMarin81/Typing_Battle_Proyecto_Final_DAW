document.addEventListener("DOMContentLoaded", () => {
    const formLogin = document.getElementById('formLogin');
    const mensajeLogin = document.getElementById('mensajeLogin');
    const twoFactorContainer = document.getElementById('twoFactorContainer');
    const twoFactorInput = document.getElementById('twoFactorInput');

    let requires2FA = false;

    formLogin.addEventListener('submit', async (e) => {
        e.preventDefault();

        const nick = document.getElementById('nickLogin').value.trim();
        const pass = document.getElementById('passLogin').value;
        const twoFactorCode = twoFactorInput.value.trim();

        if (!nick || !pass) {
            mensajeLogin.style.color = 'red';
            mensajeLogin.textContent = "Todos los campos son obligatorios.";
            return;
        }

        const formData = new FormData();
        formData.append('nick', nick);
        formData.append('pass', pass);

        // Solo enviamos 2FA si está visible
        if (requires2FA) formData.append('two_factor_code', twoFactorCode);

        try {
            const res = await fetch('https://mediumslateblue-stinkbug-339289.hostingersite.com/backend/login.php', {
                method: 'POST',
                body: formData
            });
            const data = await res.json();

            if (data.success) {
                if (data.two_factor_required) {
                    // Administrador
                    // Mostrar input de 2FA
                    twoFactorContainer.style.display = 'block';
                    mensajeLogin.style.color = 'blue';
                    mensajeLogin.textContent = 'Se ha enviado un código a tu correo. Introdúcelo para continuar.';
                    requires2FA = true;
                } else {
                    // Usuario normal: login directo
                    mensajeLogin.style.color = 'green';
                    mensajeLogin.textContent = data.message;

                    setTimeout(() => {
                        window.location.href = 'menu.html'; // página destino
                    }, 1000);
                }
            } else {
                mensajeLogin.style.color = 'red';
                mensajeLogin.textContent = data.message;
            }
        } catch (error) {
            mensajeLogin.style.color = 'red';
            mensajeLogin.textContent = 'Error en la conexión con el servidor.';
            console.error(error);
        }
    });
});
