<?php
header('Content-Type: application/json');

// Configuración de la base de datos
$host = 'localhost';
$db   = 'nombre_base_datos';
$user = 'usuario';
$pass = 'contraseña';
$charset = 'utf8mb4';

$dsn = "mysql:host=$host;dbname=$db;charset=$charset";
$options = [
    PDO::ATTR_ERRMODE            => PDO::ERRMODE_EXCEPTION,
    PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC,
];

try {
    $pdo = new PDO($dsn, $user, $pass, $options);
} catch (\PDOException $e) {
    echo json_encode(['success' => false, 'message' => 'Error al conectar a la base de datos.']);
    exit;
}

// Recibir datos
$nick = $_POST['nick'] ?? '';
$pass = $_POST['pass'] ?? '';
$passConfirm = $_POST['passConfirm'] ?? '';

if (!$nick || !$pass || !$passConfirm) {
    echo json_encode(['success' => false, 'message' => 'Todos los campos son obligatorios.']);
    exit;
}

if ($pass !== $passConfirm) {
    echo json_encode(['success' => false, 'message' => 'Las contraseñas no coinciden.']);
    exit;
}

// Comprobar si el usuario ya existe
$stmt = $pdo->prepare('SELECT id FROM users WHERE nick = ?');
$stmt->execute([$nick]);
if ($stmt->fetch()) {
    echo json_encode(['success' => false, 'message' => 'El usuario ya existe.']);
    exit;
}

// Insertar usuario (hash de contraseña)
$passHash = password_hash($pass, PASSWORD_DEFAULT);
$stmt = $pdo->prepare('INSERT INTO users (nick, password) VALUES (?, ?)');
$stmt->execute([$nick, $passHash]);

echo json_encode(['success' => true, 'message' => 'Usuario registrado correctamente.']);
