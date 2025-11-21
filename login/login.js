document.addEventListener("DOMContentLoaded", () => {

    // ----- MODO CLARO/OSCURO -----
    const toggleBtn = document.getElementById("modoToggle");

    // Comprobar modo guardado en localStorage
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


    //========================//
    // Registro de usuario
    //========================//
    const formRegistro = document.getElementById('formRegistro');
    const mensajeRegistro = document.getElementById('mensajeRegistro');

    formRegistro.addEventListener('submit', async (e) => {
        e.preventDefault(); // evitar que el formulario recargue la página

        const nick = document.getElementById('nickRegistro').value.trim();
        const pass = document.getElementById('passRegistro').value;
        const passConfirm = document.getElementById('passConfirm').value;

        if (!nick || !pass || !passConfirm) {
            mensajeRegistro.style.color = 'red';
            mensajeRegistro.textContent = "Todos los campos son obligatorios.";
            return;
        }

        const formData = new FormData();
        formData.append('nick', nick);
        formData.append('pass', pass);
        formData.append('passConfirm', passConfirm);

        try {
            const res = await fetch('https://mediumslateblue-stinkbug-339289.hostingersite.com/backend/register.php', {
                method: 'POST',
                body: formData
            });
            const data = await res.json();

            if (data.success) {
                // Usuario registrado correctamente
                mensajeRegistro.classList.remove('text-danger');
                mensajeRegistro.classList.add('text-success');
                mensajeRegistro.textContent = data.message;

                // Limpiar campos de registro
                document.getElementById('nickRegistro').value = '';
                document.getElementById('passRegistro').value = '';
                document.getElementById('passConfirm').value = '';

                // Se queda en la pestaña de registro (no hacemos cambio a login)
            } else {
                // Error, por ejemplo: nick ya existe
                mensajeRegistro.style.color = 'red';
                mensajeRegistro.textContent = data.message;
            }
        } catch (error) {
            mensajeRegistro.style.color = 'red';
            mensajeRegistro.textContent = 'Error en la conexión con el servidor.';
        }
    });

    //=====================================//
    // Login
    //=====================================//
    // Login
    const formLogin = document.getElementById('formLogin');
    const mensajeLogin = document.getElementById('mensajeLogin');

    formLogin.addEventListener('submit', async (e) => {
        e.preventDefault();

        const nick = document.getElementById('nickLogin').value.trim();
        const pass = document.getElementById('passLogin').value;

        if (!nick || !pass) {
            mensajeLogin.classList.remove('exito');
            mensajeLogin.classList.add('error');
            mensajeLogin.textContent = "Todos los campos son obligatorios.";
            return;
        }

        const formData = new FormData();
        formData.append('nick', nick);
        formData.append('pass', pass);

        try {
            const res = await fetch('https://mediumslateblue-stinkbug-339289.hostingersite.com/backend/login.php', {
                method: 'POST',
                body: formData
            });

            const data = await res.json();

            if (data.success) {
                mensajeLogin.classList.remove('error');
                mensajeLogin.classList.add('exito');
                mensajeLogin.textContent = data.message;

                // Redirigir al juego después de 1s
                setTimeout(() => {
                    window.location.href = '../opciones/opciones.html'; // o la página de tu juego
                }, 1000);

            } else {
                mensajeLogin.classList.remove('exito');
                mensajeLogin.classList.add('error');
                mensajeLogin.textContent = data.message;
            }

        } catch (error) {
            mensajeLogin.classList.remove('exito');
            mensajeLogin.classList.add('error');
            mensajeLogin.textContent = 'Error en la conexión con el servidor.';
            console.error(error);
        }
    });

});
