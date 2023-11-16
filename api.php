<?php
// api.php

header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: GET, POST, DELETE"); // Include DELETE method
header("Access-Control-Allow-Headers: Content-Type");


$host = "localhost";
$username = "root";
$password = "";
$database = "pupsiks";

$conn = new mysqli($host, $username, $password, $database);

if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

// Example endpoint to add tasks
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $requestData = json_decode(file_get_contents('php://input'), true);

    // Validate if the required fields are empty
    if (empty($requestData['title']) || empty($requestData['description']) || empty($requestData['due_date'])) {
        echo json_encode(array("error" => "Please fill in all required fields"));
        exit; // Stop execution if any field is empty
    }

    $title = $requestData['title'];
    $description = $requestData['description'];
    $due_date = $requestData['due_date'];
    $status = $requestData['status'] ?? 'Active'; // Set status to 'Active' by default

    // Insert task data into the database
    $stmt = $conn->prepare("INSERT INTO tasks (title, description, due_date, status) VALUES (?, ?, ?, ?)");
    $stmt->bind_param("ssss", $title, $description, $due_date, $status);

    if ($stmt->execute()) {
        echo json_encode(array("message" => "Task added successfully"));
    } else {
        echo json_encode(array("message" => "Failed to add task"));
    }

    $stmt->close();
} elseif ($_SERVER['REQUEST_METHOD'] === 'GET' && isset($_GET['fetchTasks'])) {
    // Handling GET requests for fetching tasks
    $sql = "SELECT * FROM tasks";
    $result = $conn->query($sql);

    $tasks = [];

    if ($result->num_rows > 0) {
        while ($row = $result->fetch_assoc()) {
            $tasks[] = $row;
        }
    }

    echo json_encode($tasks);
} elseif ($_SERVER['REQUEST_METHOD'] === 'DELETE' && isset($_GET['deleteTask'])) {
    // Handling DELETE requests for deleting a specific task
    $taskId = $_GET['deleteTask'];

    $stmt = $conn->prepare("DELETE FROM tasks WHERE id = ?");
    $stmt->bind_param("i", $taskId);

    if ($stmt->execute()) {
        echo json_encode(array("message" => "Task deleted successfully"));
    } else {
        echo json_encode(array("message" => "Failed to delete task"));
    }

    $stmt->close();
} else {
    echo json_encode(array("message" => "Invalid request method"));
}


$conn->close();
?>
