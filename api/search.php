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
    
        if ($decodedData !== null && isset($decodedData['search'], $decodedData['id'])) {
            $search = '%' . strip_tags($decodedData['search']) . '%'; // Add % for SQL LIKE
            $id = strip_tags($decodedData['id']);
    
            $sql = "SELECT * FROM tasks WHERE user_id = $id AND title LIKE '$search'";
            $result = $this->conn->query($sql);
    
            if ($result->num_rows > 0) {
                $tasks = array();
                while ($row = $result->fetch_assoc()) {
                    $tasks[] = $row;
                }
                echo json_encode($tasks);
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
