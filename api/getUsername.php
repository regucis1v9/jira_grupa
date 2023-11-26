<?php

include "db.php";

header("Access-Control-Allow-Origin: http://localhost:3000");
header("Access-Control-Allow-Methods: POST, GET, OPTIONS");
header("Access-Control-Allow-Headers: Origin, X-Requested-With, Content-Type, Accept");
header("Access-Control-Allow-Credentials: true");
header('Content-Type: application/json');

class Search extends DB {
    private $rawData;

    public function __construct() {
        parent::__construct();
        $this->rawData = file_get_contents('php://input');
    }

    public function search() {
        $decodedData = json_decode($this->rawData, true);
    
        if ($decodedData !== null && isset($decodedData['id'])) {
            $id = $decodedData['id'];
    
            // Use INNER JOIN to combine the two SELECT statements into one
            $sql = "SELECT username FROM users WHERE id = $id";
    
            $result = $this->conn->query($sql);
    
            if ($result->num_rows > 0) {
                $row = $result->fetch_assoc();
                echo json_encode($row['username']); // Echo only the username
            } else {
                echo json_encode(["message" => "No matching tasks found"]);
            }
        } else {
            echo json_encode(["message" => "Invalid data received"]);
        }
    }
}

$login = new Search();
$login->search();
?>
