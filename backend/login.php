<?php
// Permitir CORS si es necesario
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type");
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') exit(0);

header('Content-Type: application/json');
include 'conexion.php'; // Tu conexión PDO
require 'PHPMailer-master/src/PHPMailer.php';
require 'PHPMailer-master/src/SMTP.php';
require 'PHPMailer-master/src/Exception.php';
use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\Exception;

$nick = $_POST['nick'] ?? null;
$pass = $_POST['pass'] ?? null;

if (!$nick || !$pass) {
    echo json_encode(['success' => false, 'message' => 'Todos los campos son obligatorios.']);
    exit;
}

try {
    // Buscar usuario en la base de datos y traer rol y email
    $stmt = $pdo->prepare("SELECT pass, rol, email, two_factor_code, tf_expires FROM usuarios WHERE nick = ?");
    $stmt->execute([$nick]);

    if ($stmt->rowCount() === 0) {
        echo json_encode(['success' => false, 'message' => 'Usuario o contraseña incorrectos.']);
        exit;
    }

    $row = $stmt->fetch(PDO::FETCH_ASSOC);
    $hash = $row['pass'];
    $rol = $row['rol'];
    $email = $row['email'];

    if (password_verify($pass, $hash)) {
        session_start();
        $_SESSION['nick'] = $nick;
        $_SESSION['rol'] = $rol;
        
        $twoFactorCode = $_POST['two_factor_code'] ?? null;
        
        // Verificar 2FA si ya se envió el código
        if ($rol === 'administrador' && $twoFactorCode) {
            if ($twoFactorCode === $row['two_factor_code'] && strtotime($row['tf_expires']) > time()) {
                // Código correcto y no expirado
                echo json_encode(['success' => true, 'message' => 'Login correcto', 'two_factor_required' => false]);
                exit;
            } else {
                // Código incorrecto o expirado
                echo json_encode(['success' => false, 'message' => 'Código de verificación incorrecto o expirado.']);
                exit;
            }
        }

        if ($rol === 'administrador') {
            // Generar código de 6 dígitos
            $codigo2FA = str_pad(rand(0, 999999), 6, '0', STR_PAD_LEFT);
            
            // Guardar código y expiración en la base de datos
            date_default_timezone_set('Europe/Madrid');
            $tf_expires = date('Y-m-d H:i:s', strtotime('+5 minutes'));
            $stmt = $pdo->prepare("UPDATE usuarios SET two_factor_code = ?, tf_expires = ? WHERE nick = ?");
            $stmt->execute([$codigo2FA, $tf_expires, $nick]);

            // Preparar PHPMailer
            $mail = new PHPMailer(true);
            try {
                $mail->isSMTP();
                $mail->Host = 'smtp.gmail.com';
                $mail->SMTPAuth = true;
                $mail->Username = 'davidmaringomez81@gmail.com'; // tu correo
                $mail->Password = 'token_secreto';           // tu token de aplicación
                $mail->SMTPSecure = PHPMailer::ENCRYPTION_STARTTLS;
                $mail->Port = 587;
                
                // *** Cambio 1: Configurar CharSet para aceptar tildes ***
                $mail->CharSet = 'UTF-8';

                $mail->setFrom('davidmaringomez81@gmail.com', 'Aplicación');
                $mail->addAddress($email, $nick);

                $mail->isHTML(true);
                // *** Cambio 2: Asunto con tilde ***
                $mail->Subject = 'Código de Verificación de Acceso';
                
                // *** Cambio 3: Cuerpo más elegante y destacando el código ***
                $mail->Body = "
                <div style='font-family: Arial, sans-serif; padding: 20px; border: 1px solid #ddd; border-radius: 5px;'>
                    <h2 style='color: #333;'>Verificación de Acceso Requerida</h2>
                    <p>Hola **$nick**,</p>
                    <p>Para completar tu inicio de sesión como **Administrador**, por favor, utiliza el siguiente código de verificación de **6 dígitos**:</p>
                    <div style='background-color: #f4f4f4; padding: 15px; text-align: center; border-radius: 4px; margin: 20px 0;'>
                        <p style='font-size: 16px; margin: 0;'>Tu código es:</p>
                        <p style='font-size: 32px; font-weight: bold; color: #007bff; margin: 5px 0;'>$codigo2FA</p>
                    </div>
                    <p>Este código **expirará en 5 minutos**. Si no solicitaste este acceso, puedes ignorar este correo.</p>
                    <hr style='border: none; border-top: 1px solid #eee;'>
                    <p style='font-size: 12px; color: #777;'>Atentamente,<br>El equipo de Typing Battle</p>
                </div>
                ";

                $mail->send();

                echo json_encode([
                    'success' => true,
                    'message' => 'Código enviado al correo.',
                    'two_factor_required' => true
                ]);
            } catch (Exception $e) {
                echo json_encode(['success' => false, 'message' => 'Error al enviar el correo: '.$mail->ErrorInfo]);
            }
        } else {
            // Usuario normal, login directo
            echo json_encode(['success' => true, 'message' => 'Login correcto', 'two_factor_required' => false]);
        }

    } else {
        echo json_encode(['success' => false, 'message' => 'Usuario o contraseña incorrectos.']);
    }

} catch (PDOException $e) {
    echo json_encode(['success' => false, 'message' => 'Error en la base de datos: ' . $e->getMessage()]);
}
?>