<?php

include "db.php";
header("Access-Control-Allow-Origin: http://localhost:3000");
header('Content-Type: application/json');

class getTasksById extends Database
{
    public function selectTask($id)
    {
        $id = $this->conn->real_escape_string($id);

        $sql = "SELECT * FROM tasks WHERE id = ?";
        $stmt = $this->conn->prepare($sql);
        $stmt->bind_param("i", $id);
        $stmt->execute();
        $result = $stmt->get_result();

        if ($result->num_rows > 0) {
            $tasks = array();
            while ($row = $result->fetch_assoc()) {
                $tasks[] = $row;
            }
            return $tasks;
        } else {
            return "empty";
        }
    }
}

if (isset($_GET['id'])) {
    $id = $_GET['id'];
    $postTask = new getTasksById();
    echo json_encode($postTask->selectTask($id));
} else {
    echo json_encode(array("error" => "ID parameter is missing"));
}
