<?php
include "db.php";
header("Access-Control-Allow-Origin: http://localhost:3000");
header('Content-Type: application/json');

class GetAllTasks extends Database {
    public function selectTask() {
        $sql = "SELECT * FROM tasks";
        $result = $this->conn->query($sql);

        if ($result->num_rows > 0) {
            $tasks = array();
            while ($row = $result->fetch_assoc()) {
                $tasks[] = $row;
            }
            return $tasks;
        } else {
            return array();
        }
    }
}

$postTask = new GetAllTasks();
$tasks = $postTask->selectTask();
echo json_encode($tasks);


