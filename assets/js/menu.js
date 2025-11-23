document.addEventListener("DOMContentLoaded", () => {
    const botones = document.querySelectorAll(".nivel-btn");
    
    // 1. Recuperar el nivel máximo guardado durante el login
    const nivelMaximo = localStorage.getItem('user_nivel_maximo');

    // Convertir el nivel a un número entero. Si no existe, por seguridad, usar 1.
    const maxLevel = nivelMaximo ? parseInt(nivelMaximo, 10) : 1; 

    botones.forEach(btn => {
        const nivelBoton = parseInt(btn.dataset.nivel, 10);
        // Seleccionar el span del candado dentro de este botón específico
        const lockIconSpan = btn.querySelector('.lock-icon'); 
        
        if (nivelBoton <= maxLevel) {
            // Nivel desbloqueado:
            btn.disabled = false;
            btn.classList.remove('locked'); 
            
            // MODIFICACIÓN A: Mostrar candado ABIERTO
            if (lockIconSpan) {
                lockIconSpan.textContent = '🔓'; 
            }
            
            // 2. Manejar el clic solo para botones DESBLOQUEADOS
            btn.addEventListener("click", () => {
                window.location.href = `juego.html?nivel=${nivelBoton}`;
            });
            
        } else {
            // 3. Nivel bloqueado:
            btn.disabled = true;
            btn.classList.add('locked'); 
            
            // MODIFICACIÓN B: Mostrar candado CERRADO
            if (lockIconSpan) {
                lockIconSpan.textContent = '🔒';
            }
            
            // Opcional: Impedir que se muestre como un puntero
            btn.style.cursor = 'not-allowed'; 
        }
    });
});