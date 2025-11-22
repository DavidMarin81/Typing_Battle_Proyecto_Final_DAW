-- Usuarios
CREATE TABLE usuarios (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nick VARCHAR(50) NOT NULL UNIQUE,
    email VARCHAR(100) NOT NULL UNIQUE,
    pass VARCHAR(255) NOT NULL,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,

    -- Rol del usuario
    rol ENUM('usuario', 'administrador') DEFAULT 'usuario',

    -- Two Factor Auth (2FA)
    two_factor_code VARCHAR(6) NULL,
    tf_expires DATETIME NULL,

    -- Seguridad (anti fuerza bruta)
    intentos INT DEFAULT 0,
    blocked BOOLEAN DEFAULT FALSE
);
