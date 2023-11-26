<?php
include "db.php";
header("Access-Control-Allow-Origin: http://localhost:3000");
header("Access-Control-Allow-Methods: POST, GET, OPTIONS");
header("Access-Control-Allow-Headers: Origin, X-Requested-With, Content-Type, Accept");
header("Access-Control-Allow-Credentials: true");
header('Content-Type: application/json');

class UpdateData extends DB {
    private $rawData;

    public function __construct() {
        parent::__construct();
        $this->rawData = file_get_contents('php://input');
    }

    public function updateUser() {
        $decodedData = json_decode($this->rawData, true);
  
        if ($decodedData !== null && isset($decodedData['id'], $decodedData['username'], $decodedData['email'], $decodedData['token'])) {
            $id = strip_tags($decodedData['id']);
            $username = strip_tags($decodedData['username']);
            $email = strip_tags($decodedData['email']);
            $token = $decodedData['token'];

            // Check if the provided token matches the token for the given user ID
            $checkTokenQuery = "SELECT * FROM `users` WHERE id = '$id' AND token = '$token'";
            $checkTokenResult = $this->conn->query($checkTokenQuery);

            if ($checkTokenResult->num_rows > 0) {
                // Validate email format
                if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
                    echo json_encode(["message" => "Invalid email format"]);
                    return;
                }

                // Check if the username already exists
                $checkUsernameQuery = "SELECT * FROM `users` WHERE username = '$username'";
                $checkUsernameResult = $this->conn->query($checkUsernameQuery);

                // Check if the email already exists
                $checkEmailQuery = "SELECT * FROM `users` WHERE email = '$email'";
                $checkEmailResult = $this->conn->query($checkEmailQuery);

                if ($checkUsernameResult->num_rows > 0 && $checkUsernameResult->fetch_assoc()['id'] != $id) {
                    // Username exists for another user, return an error
                    echo json_encode(["message" => "Username already exists"]);
                } else if ($checkEmailResult->num_rows > 0 && $checkEmailResult->fetch_assoc()['id'] != $id) {
                    // Email exists for another user, return an error
                    echo json_encode(["message" => "Email already exists"]);
                } else {
                    // Update the user details
                    $updateQuery = "UPDATE `users` SET username = '$username', email = '$email' WHERE id = '$id'";
                    $updateResult = $this->conn->query($updateQuery);

                    if ($updateResult === true) {
                        echo json_encode(["message" => "User details updated successfully"]);
                    } else {
                        echo json_encode(["message" => "Error updating user details: " . $this->conn->error]);
                    }
                }
            } else {
                // Token mismatch, return an error
                $updateQuery = "UPDATE `users` SET token = '' WHERE id = '$id'";
                echo json_encode(["message" => "Invalid token"]);
            }
        } else {
            echo json_encode(["message" => "Invalid data received"]);
        }
    }
}

// Create an instance of the UpdateData class
$updateData = new UpdateData();

// Process the raw POST data
$updateData->updateUser();
?>
