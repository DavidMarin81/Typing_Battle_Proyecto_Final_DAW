<?php
header('Content-Type: application/json');

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

if (!$nick || !$pass) {
    echo json_encode(['success' => false, 'message' => 'Todos los campos son obligatorios.']);
    exit;
}

// Buscar usuario
$stmt = $pdo->prepare('SELECT id, password FROM users WHERE nick = ?');
$stmt->execute([$nick]);
$user = $stmt->fetch();

if (!$user || !password_verify($pass, $user['password'])) {
    echo json_encode(['success' => false, 'message' => 'Usuario o contraseña incorrectos.']);
    exit;
}

// Login correcto
echo json_encode(['success' => true, 'message' => '¡Bienvenido!']);
