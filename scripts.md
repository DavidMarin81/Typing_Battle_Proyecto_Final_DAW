# Scripts para la base de datos
- Historial de intentos
    ~~~sql
    -- historial de intentos
    CREATE TABLE IF NOT EXISTS scores (
        id INT AUTO_INCREMENT PRIMARY KEY,
        jugador VARCHAR(100) NOT NULL,
        nivel INT NOT NULL,
        puntuacion INT NOT NULL,
        duracion_seconds INT DEFAULT NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        INDEX (nivel),
        INDEX (puntuacion)
    ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

    ~~~
- Mejores puntuaciones por jugador + nivel
    ~~~sql
    -- mejores puntuaciones por jugador+nivel (rápido para leaderboard)
   CREATE TABLE best_scores (
        id INT AUTO_INCREMENT PRIMARY KEY,
        jugador VARCHAR(100) NOT NULL,
        nivel INT NOT NULL,
        puntuacion INT NOT NULL,
        duracion_seconds INT DEFAULT NULL,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
        UNIQUE KEY jugador_nivel (jugador, nivel),
        INDEX (nivel, puntuacion)
    ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
    ~~~

- Se insertan datos en best_scores
    ~~~sql
    CREATE TABLE best_scores (
        id INT AUTO_INCREMENT PRIMARY KEY,
        jugador VARCHAR(100) NOT NULL,
        nivel INT NOT NULL,
        puntuacion INT NOT NULL,
        duracion_seconds INT DEFAULT NULL,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
        UNIQUE KEY jugador_nivel (jugador, nivel),
        INDEX (nivel, puntuacion)
    ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
    ~~~

- Tabla de usuarios
    ~~~sql
    CREATE TABLE IF NOT EXISTS users (
        id INT AUTO_INCREMENT PRIMARY KEY,
        nick VARCHAR(50) NOT NULL UNIQUE,
        password_hash VARCHAR(255) NOT NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
    ~~~
