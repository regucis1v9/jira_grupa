<?php

include "db.php";

header("Access-Control-Allow-Origin: http://localhost:3000");
header("Access-Control-Allow-Methods: POST, GET, OPTIONS");
header("Access-Control-Allow-Headers: Origin, X-Requested-With, Content-Type, Accept");
header("Access-Control-Allow-Credentials: true");
header('Content-Type: application/json');

class Logout extends DB {
    private $rawData;

    public function __construct() {
        parent::__construct();
        $this->rawData = file_get_contents('php://input');
    }

    public function Logout() {
        $decodedData = json_decode($this->rawData, true);
    
        if ($decodedData !== null && isset($decodedData['id'])) {
            $id = strip_tags($decodedData['id']);
    
            $sql = "UPDATE `users` SET token = '' WHERE id = '$id'";
            $result = $this->conn->query($sql);
            if($result){
                echo json_encode(["message" => "logged out"]);
            }else{
                echo json_encode(["message" => "Unable to log out"]);
            }
        } else {
            echo json_encode(["message" => "Invalid data received"]);
        }
    }
}

$login = new Logout();
$login->Logout();
?>
