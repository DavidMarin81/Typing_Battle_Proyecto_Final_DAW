document.addEventListener('DOMContentLoaded', () => {
    const nivelBtns = document.querySelectorAll('.nivel-btn');

    // Mapa de teclas a dedos
    const dedos = {
        'A': 'Meñique izquierdo',
        'S': 'Anular izquierdo',
        'D': 'Corazón izquierdo',
        'F': 'Índice izquierdo',
        'J': 'Índice derecho',
        'K': 'Corazón derecho',
        'L': 'Anular derecho',
        'Ñ': 'Meñique derecho',
        'G': 'Índice izquierdo',
        'H': 'Índice derecho',

        'Q': 'Meñique izquierdo',
        'W': 'Anular izquierdo',
        'E': 'Corazón izquierdo',
        'R': 'Índice izquierdo',
        'U': 'Índice derecho',
        'I': 'Corazón derecho',
        'O': 'Anular derecho',
        'P': 'Meñique derecho',
        'T': 'Índice izquierdo',
        'Y': 'Índice derechoeb',

        'Z': 'Meñique izquierdo',
        'X': 'Anular izquierdo',
        'C': 'Corazón izquierdo',
        'V': 'Índice izquierdo',
        'B': 'Índice izquierdo',
        'N': 'Índice derecho',
        'M': 'Índice derecho',
        ',': 'Corazón derecho',
        '.': 'Anular derecho'
    };

    nivelBtns.forEach(btn => {
        btn.addEventListener('click', (e) => {
            const nivel = btn.dataset.nivel;

            if (btn.disabled) return;

            // Eliminar modal previo si existe
            let existingModal = document.getElementById('infoTeclasModal');
            if (existingModal) existingModal.remove();

            const modalDiv = document.createElement('div');
            modalDiv.classList.add('modal', 'fade');
            modalDiv.id = 'infoTeclasModal';
            modalDiv.tabIndex = -1;
            modalDiv.setAttribute('aria-hidden', 'true');

            const teclas = btn.querySelector('.nivel-left')?.title || '';

            // Generar lista de teclas con dedos
            const listaTeclas = teclas.split(' ').map(t => {
                const dedo = dedos[t.toUpperCase()] || '';
                return `<li><strong>${t}</strong> → ${dedo}</li>`;
            }).join('');

            const themeClass = document.body.className;

            modalDiv.innerHTML = `
                <div class="modal-dialog modal-dialog-centered">
                    <div class="modal-content ${themeClass}" style="
                        background-color: var(--color-card-bg);
                        color: var(--color-text);
                        border: 1px solid var(--color-text);
                        transition: background-color 0.3s, color 0.3s;
                    ">
                        <div class="modal-header">
                            <h5 class="modal-title">Nivel ${nivel} - Teclas a usar</h5>
                            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Cerrar"></button>
                        </div>
                        <div class="modal-body">
                            <p>¡Prepárate para jugar! Usa los dedos correctos para cada tecla:</p>
                            <ul>${listaTeclas}</ul>
                        </div>
                        <div class="modal-footer">
                            <button type="button" class="btn btn-primary" id="confirmNivelBtn">Comenzar</button>
                            <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Cancelar</button>
                        </div>
                    </div>
                </div>
            `;

            document.body.appendChild(modalDiv);

            const bsModal = new bootstrap.Modal(modalDiv, { backdrop: 'static', keyboard: false });
            bsModal.show();

            modalDiv.querySelector('#confirmNivelBtn').addEventListener('click', () => {
                bsModal.hide();
                window.location.href = `juego.html?nivel=${nivel}`;
            });

            modalDiv.addEventListener('hidden.bs.modal', () => {
                modalDiv.remove();
            });

            e.stopImmediatePropagation();
        });
    });
});
