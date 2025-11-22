 document.addEventListener("DOMContentLoaded", () => {
    const formLogin = document.getElementById('formLogin');
    const mensajeLogin = document.getElementById('mensajeLogin');

    formLogin.addEventListener('submit', async (e) => {
        e.preventDefault();

        const nick = document.getElementById('nickLogin').value.trim();
        const pass = document.getElementById('passLogin').value;

        if (!nick || !pass) {
            mensajeLogin.style.color = 'red';
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
                mensajeLogin.style.color = 'green';
                mensajeLogin.textContent = data.message;

                setTimeout(() => {
                    window.location.href = 'menu.html'; // página destino
                }, 1000);
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
