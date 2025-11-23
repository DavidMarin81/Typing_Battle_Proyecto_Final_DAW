CREATE TABLE estadisticas_usuario (
    id INT AUTO_INCREMENT PRIMARY KEY,
    usuario_id INT,
    nivel_actual INT DEFAULT 1,
    partidas_jugadas INT DEFAULT 0,
    partidas_ganadas INT DEFAULT 0,
    teclas_correctas INT DEFAULT 0,
    teclas_incorrectas INT DEFAULT 0,
    tiempo_total_jugado INT DEFAULT 0,  -- en segundos
    racha_maxima INT DEFAULT 0,
    puntos_totales INT DEFAULT 0,    

    FOREIGN KEY (usuario_id) REFERENCES usuarios(id) ON DELETE CASCADE
);