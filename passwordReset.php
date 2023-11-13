<?php
header("Access-Control-Allow-Origin: http://localhost:3000");
header("Access-Control-Allow-Methods: POST, GET, OPTIONS");
header("Access-Control-Allow-Headers: Origin, X-Requested-With, Content-Type, Accept");
header("Access-Control-Allow-Credentials: true");
header('Content-Type: application/json');

use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\Exception;

// Include PHPMailer autoloader
require './src/Exception.php';
require './src/PHPMailer.php';
require './src/SMTP.php';

// Check if the request is a preflight request (OPTIONS)
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    // Return a 200 OK response for preflight requests
    header('HTTP/1.1 200 OK');
    exit();
}

// Parse incoming JSON data
$inputJSON = file_get_contents('php://input');
$input = json_decode($inputJSON, true);

// Validate and sanitize the email address
if (filter_var($input['email'], FILTER_VALIDATE_EMAIL)) {
    $recipientEmail = $input['email'];

    // Generate a string with 16 random characters
    $randomPassword = substr(str_shuffle('abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789'), 0, 16);

    // Initialize PHPMailer
    $mail = new PHPMailer(true);

    try {
        // Server settings
        $mail->isSMTP();
        $mail->Host       = 'smtp.gmail.com';
        $mail->SMTPAuth   = true;
        $mail->Username   = 'regnars.klavins@gmail.com';
        $mail->Password   = 'eyxcyozmrwptwaro';  // Use your actual App Password here
        $mail->SMTPSecure = PHPMailer::ENCRYPTION_STARTTLS;
        $mail->Port       = 587;

        // Recipients
        $mail->setFrom('regnars.klavins@gmail.com', 'Pupsiks Support');
        $mail->addAddress($recipientEmail);

        // Content
        $mail->isHTML(true);
        $mail->Subject = 'Your New Password';

        // HTML and CSS styling
        $mail->Body = '<html><head><style>body{font-family:Arial,sans-serif;background-color:#f4f4f4;color:#333;}.container{max-width:600px;margin:0 auto;padding:20px;background-color:#fff;border-radius:5px;box-shadow:0 0 10px rgba(0,0,0,0.1);}h1{color:#007bff;}</style></head><body><div class="container"><h1>Your New Password Is Here!</h1><p>Your new password: ' . $randomPassword . '</p></div></body></html>';

        // Send the email
        $mail->send();

        // Send a JSON response indicating success
        echo json_encode(['status' => 'success', 'message' => 'Email sent successfully']);
    } catch (Exception $e) {
        // Send a JSON response indicating the error
        echo json_encode(['status' => 'error', 'message' => 'Error sending email: ' . $mail->ErrorInfo]);
    }
} else {
    // Send a JSON response indicating an invalid email address
    echo json_encode(['status' => 'error', 'message' => 'Invalid email address']);
}
?>
