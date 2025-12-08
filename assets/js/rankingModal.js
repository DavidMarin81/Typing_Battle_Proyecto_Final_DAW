document.addEventListener('DOMContentLoaded', () => {
    const rankingBtn = document.getElementById('rankingBtn');

    if (!rankingBtn) return;

    rankingBtn.addEventListener('click', () => {

        let existingModal = document.getElementById('rankingModal');

        if (!existingModal) {

            const modal = document.createElement('div');
            modal.classList.add('modal', 'fade');
            modal.id = 'rankingModal';
            modal.setAttribute('tabindex', '-1');
            modal.setAttribute('aria-hidden', 'true');

            // Obtener tema activo (como en tu modal original)
            const themeClass = document.body.className;

            modal.innerHTML = `
                <div class="modal-dialog modal-dialog-centered modal-lg">
                    <div class="modal-content ${themeClass}" style="
                        background-color: var(--color-card-bg);
                        color: var(--color-text);
                        border: 1px solid var(--color-text);
                        transition: background-color 0.3s, color 0.3s;
                    ">
                        <div class="modal-header">
                            <h5 class="modal-title">🏆 Clasificación General - TOP 10</h5>
                            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Cerrar"></button>
                        </div>
                        <div class="modal-body">
                            <p class="mb-2">Los jugadores con más puntos aparecen primero.</p>

                            <div id="rankingContent" class="text-center">
                                <p>Cargando ranking...</p>
                            </div>
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

        // -------------------------------
        //   CARGAR RANKING DEL BACKEND
        // -------------------------------

        fetch("https://mediumslateblue-stinkbug-339289.hostingersite.com/backend/getRanking.php")
            .then(res => res.json())
            .then(data => {

                const container = document.getElementById('rankingContent');

                if (!data.success || !data.ranking.length) {
                    container.innerHTML = "<p>No hay datos de clasificación aún.</p>";
                    return;
                }

                let table = `
                    <table class="table table-striped table-bordered">
                        <thead>
                            <tr>
                                <th>#</th>
                                <th>Jugador</th>
                                <th>Puntos Totales</th>
                            </tr>
                        </thead>
                        <tbody>
                `;

                data.ranking.slice(0, 10).forEach((user, index) => {
                    table += `
                        <tr>
                            <td><strong>${index + 1}</strong></td>
                            <td>${user.nick}</td>
                            <td>${user.puntos_totales}</td>
                        </tr>
                    `;
                });

                table += `
                        </tbody>
                    </table>
                `;

                container.innerHTML = table;
            })
            .catch(err => {
                document.getElementById('rankingContent').innerHTML =
                    "<p>Error cargando la clasificación.</p>";
            });
    });
});
