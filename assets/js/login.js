document.addEventListener("DOMContentLoaded", () => {
    const formLogin = document.getElementById('formLogin');
    const mensajeLogin = document.getElementById('mensajeLogin');
    const twoFactorContainer = document.getElementById('twoFactorContainer');
    const twoFactorInput = document.getElementById('twoFactorInput');

    let requires2FA = false; // Para saber si estamos en el paso 2

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

        // Solo enviar el código 2FA si es necesario
        if (requires2FA && twoFactorCode) {
            formData.append('two_factor_code', twoFactorCode);
        }

        try {
            const res = await fetch('https://mediumslateblue-stinkbug-339289.hostingersite.com/backend/login.php', {
                method: 'POST',
                body: formData
            });

            const data = await res.json();

            if (data.success) {
                if (data.two_factor_required) {
                    // Paso 1: mostrar input 2FA
                    twoFactorContainer.style.display = 'block';
                    mensajeLogin.style.color = 'blue';
                    mensajeLogin.textContent = 'Se ha enviado un código a tu correo. Introdúcelo para continuar.';
                    requires2FA = true;
                    twoFactorInput.focus();
                } else {

                    // Login finalizado (usuario normal o admin que ya pasó 2FA)
                    
                    // --- MODIFICACIÓN CLAVE: RECIBIR Y GUARDAR EL NIVEL ---
                    if (data.nivel_maximo) {
                        // Guardar el nivel máximo del usuario en el almacenamiento local
                        // Esto permite acceder al dato en 'menu.html'
                        localStorage.setItem('user_nivel_maximo', data.nivel_maximo);
                        
                        console.log("Login exitoso. Nivel máximo: ", data.nivel_maximo);
                    }
                    
                    // --------------------------------------------------------
                    // Login finalizado (usuario normal o admin que ya pasó 2FA)
                    mensajeLogin.style.color = 'green';
                    mensajeLogin.textContent = data.message;

                    setTimeout(() => {
                        window.location.href = 'menu.html';
                    }, 1000);
                }
            } else {
                // Error de login o código 2FA incorrecto
                mensajeLogin.style.color = 'red';
                mensajeLogin.textContent = data.message;

                // Si el error es por 2FA, mantener el input visible
                if (requires2FA) {
                    twoFactorContainer.style.display = 'block';
                    twoFactorInput.focus();
                }
            }

        } catch (error) {
            mensajeLogin.style.color = 'red';
            mensajeLogin.textContent = 'Error en la conexión con el servidor.';
            console.error(error);
        }
    });
});
