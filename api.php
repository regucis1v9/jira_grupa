<?php
// api.php

header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: PUT, POST, GET, DELETE, OPTIONS"); // Include DELETE method
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
    $sortBy = $_GET['sort'] ?? 'due_date_asc'; // Default sorting option
    
    switch ($sortBy) {
        case 'due_date_asc':
            $orderBy = 'due_date ASC';
            break;
        case 'due_date_desc':
            $orderBy = 'due_date DESC';
            break;
        case 'status_finished':
            $orderBy = 'status = "Finished" DESC, status = "On Hold" DESC';
            break;
        case 'status_on_hold':
            $orderBy = 'status = "On Hold" DESC, status = "Finished" DESC';
            break;
        case 'status_active':
            $orderBy = 'status = "Active" DESC, status = "Finished" DESC, status = "On Hold" DESC';
            break;
        default:
            $orderBy = 'due_date ASC'; // Default sorting by due date
            break;
    }

    // Handling GET requests for fetching tasks with sorting
    $sql = "SELECT * FROM tasks ORDER BY $orderBy"; // Modify your SQL query accordingly

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
} elseif ($_SERVER['REQUEST_METHOD'] === 'PUT' && isset($_GET['updateTask'])) {
    $taskId = $_GET['updateTask'];
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

    // Update task data in the database
    $stmt = $conn->prepare("UPDATE tasks SET title=?, description=?, due_date=?, status=? WHERE id=?");
    $stmt->bind_param("ssssi", $title, $description, $due_date, $status, $taskId);

    if ($stmt->execute()) {
        echo json_encode(array("message" => "Task updated successfully"));
    } else {
        echo json_encode(array("message" => "Failed to update task"));
    }

    $stmt->close();
}


$conn->close();
?>
