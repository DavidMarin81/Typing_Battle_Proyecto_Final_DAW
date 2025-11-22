document.addEventListener("DOMContentLoaded", () => {
    const formRegistro = document.getElementById('formRegistro');
    const mensajeRegistro = document.getElementById('mensajeRegistro');

    formRegistro.addEventListener('submit', async (e) => {
        e.preventDefault();

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
                mensajeRegistro.style.color = 'green';
                mensajeRegistro.textContent = data.message;
                formRegistro.reset();
            } else {
                mensajeRegistro.style.color = 'red';
                mensajeRegistro.textContent = data.message;
            }
        } catch (error) {
            mensajeRegistro.style.color = 'red';
            mensajeRegistro.textContent = 'Error en la conexión con el servidor.';
            console.error(error);
        }
    });
});
