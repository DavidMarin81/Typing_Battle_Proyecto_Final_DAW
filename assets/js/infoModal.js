document.addEventListener('DOMContentLoaded', () => {
    const infoBtn = document.getElementById('infoThemeBtn');

    if (!infoBtn) return;

    infoBtn.addEventListener('click', () => {

        let existingModal = document.getElementById('infoModal');
        if (!existingModal) {
            const modal = document.createElement('div');
            modal.classList.add('modal', 'fade');
            modal.id = 'infoModal';
            modal.setAttribute('tabindex', '-1');
            modal.setAttribute('aria-hidden', 'true');

            // Obtenemos el tema activo
            const themeClass = document.body.className; // ej: '', 'theme-dark', 'theme-red', etc.

            modal.innerHTML = `
                <div class="modal-dialog modal-dialog-centered">
                    <div class="modal-content ${themeClass}" style="
                        background-color: var(--color-card-bg);
                        color: var(--color-text);
                        border: 1px solid var(--color-text);
                        transition: background-color 0.3s, color 0.3s;
                    ">
                        <div class="modal-header">
                            <h5 class="modal-title">Información de la Aplicación</h5>
                            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Cerrar"></button>
                        </div>
                        <div class="modal-body">
                            <p>Bienvenido a la aplicación <strong>Typing Battle</strong> 🎮.</p>
                            <ul>
                                <li>
                                    Usa los botones de nivel para seleccionar la dificultad del juego.
                                    <button class="btn btn-sm btn-outline-primary ms-2" type="button" data-bs-toggle="collapse" data-bs-target="#nivelOpciones" aria-expanded="false" aria-controls="nivelOpciones">
                                        Ver niveles
                                    </button>
                                    <div class="collapse mt-2" id="nivelOpciones">
                                        <ul class="list-group list-group-flush">
                                        <li class="list-group-item">Todos los niveles incluyen la barra espaciadora (_)‼️</li>
                                            <li class="list-group-item">🟢 Nivel 1: Letras: asdf </li>
                                            <li class="list-group-item">🟢 Nivel 2: Letras: jklñ</li>
                                            <li class="list-group-item">🟡 Nivel 3: Letras: asdfjklñ </li>
                                            <li class="list-group-item">🟡 Nivel 4: Letras: asdfg </li>
                                            <li class="list-group-item">🟡 Nivel 5: Letras: hjklñ </li>
                                            <li class="list-group-item">🔴 Nivel 6: Letras: asdfghjklñ </li>
                                            <li class="list-group-item">🟢 Nivel 7: Letras: qwer </li>
                                            <li class="list-group-item">🟢 Nivel 8: Letras: uiop </li>
                                            <li class="list-group-item">🟡 Nivel 9: Letras: qweruiop </li>
                                            <li class="list-group-item">🟡 Nivel 10: Letras: qwert </li>
                                            <li class="list-group-item">🟡 Nivel 11: Letras: yuiop </li>
                                            <li class="list-group-item">🟢 Nivel 12: Letras: zxcv </li>
                                            <li class="list-group-item">🟢 Nivel 13: Letras: nm </li>
                                            <li class="list-group-item">🟡 Nivel 14: Letras: zxcvb </li>
                                            <li class="list-group-item">🟡 Nivel 15: Letras: zxcvbnm </li>
                                            <li class="list-group-item">🔴 Nivel 16: Letras: abcdefghijklmnñopqrstuvwxyz </li>
                                        </ul>
                                    </div>
                                </li>

                                <li>Los botones ☀️ y 🌙 te permiten cambiar el estilo visual de la app (light/dark mode).</li>
                                <li>El botón 🌈 abre el selector de colores para personalizar la apariencia para que puedas:</li>
                                    <ul>
                                        <li>Escoger entre uno de los colores establecidos (🔴🟠🟡🟢🔵🟣)</li>
                                        <li>Escoger tu color favorito 🎨</li>
                                    </ul>
                                <li>El botón de Reset 🔄 vuelve a los valores predeterminados del tema.</li>
                            </ul>
                            <p>¡Diviértete y mejora tu velocidad de mecanografía! ⌨️</p>
                        </div>
                        <div class="modal-footer">
                            <button type="button" class="btn btn-primary" data-bs-dismiss="modal">Cerrar</button>
                        </div>
                    </div>
                </div>
            `;
            document.body.appendChild(modal);
            existingModal = modal;
        }

        const bootstrapModal = new bootstrap.Modal(existingModal);
        bootstrapModal.show();
    });
});
