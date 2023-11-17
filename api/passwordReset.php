<?php
header("Access-Control-Allow-Origin: http://localhost:3000");
header("Access-Control-Allow-Methods: POST, GET, OPTIONS");
header("Access-Control-Allow-Headers: Origin, X-Requested-With, Content-Type, Accept");
header("Access-Control-Allow-Credentials: true");
header('Content-Type: application/json');

use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\Exception;

require './src/Exception.php';
require './src/PHPMailer.php';
require './src/SMTP.php';
require 'db.php'; 

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    header('HTTP/1.1 200 OK');
    exit();
}

$inputJSON = file_get_contents('php://input');
$input = json_decode($inputJSON, true);

if (filter_var($input['email'], FILTER_VALIDATE_EMAIL)) {
    $recipientEmail = $input['email'];
    $db = new DB;
    $sql = "SELECT * FROM users WHERE email = '$recipientEmail'";
    $result = $db->conn->query($sql);

    if ($result && $result->num_rows > 0) {
        $randomPassword = substr(str_shuffle('abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789'), 0, 16);

        $mail = new PHPMailer(true);

        try {
            $mail->isSMTP();
            $mail->Host       = 'smtp.gmail.com';
            $mail->SMTPAuth   = true;
            $mail->Username   = 'ipa21.r.klavins@vtdt.edu.lv';
            $mail->Password   = 'popg rlnn trvx ajia';  // Use your actual App Password here
            $mail->SMTPSecure = PHPMailer::ENCRYPTION_STARTTLS;
            $mail->Port       = 587;

            $mail->setFrom('ipa21.r.klavins@vtdt.edu.lv', 'Pupsiks Support');
            $mail->addAddress($recipientEmail);

            $mail->isHTML(true);
            $mail->Subject = 'Your New Password';

            $mail->Body = '<html><head><style>body{font-family:Arial,sans-serif;background-color:#f4f4f4;color:#333;}.container{max-width:600px;margin:0 auto;padding:20px;background-color:#fff;border-radius:5px;box-shadow:0 0 10px rgba(0,0,0,0.1);}h1{color:#007bff;}</style></head><body><div class="container"><h1>Your New Password Is Here!</h1><p>Your new password: ' . $randomPassword . '</p></div></body></html>';

            $mail->send();

            $hashedPassword = password_hash($randomPassword, PASSWORD_DEFAULT);
            $updateSql = "UPDATE users SET password = '$hashedPassword' WHERE email = '$recipientEmail'";
            $db->conn->query($updateSql);

            echo json_encode(['status' => 'success', 'message' => 'Email sent successfully']);
        } catch (Exception $e) {
            echo json_encode(['email' => $recipientEmail ,'status' => 'error', 'message' => 'Error sending email: ' . $mail->ErrorInfo]);
        }
    } else {
        echo json_encode(['status' => 'error', 'message' => 'Email not found']);
    }
} else {
    echo json_encode(['status' => 'error', 'message' => 'Invalid email address']);
}
?>
