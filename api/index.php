<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: *");
header("Access-Control-Allow-Methods: *");

include './DbConnect.php';
try {
    $objDb = new DbConnect;
    $conn = $objDb->connect();

    $method = $_SERVER['REQUEST_METHOD'];

    switch ($method) {
        case 'GET':
            $path = explode('/', $_SERVER['REQUEST_URI']);
            if (isset($path[3]) && is_numeric($path[3])) {
                $sql = "SELECT * FROM users WHERE id = :id";
                $stmt = $conn->prepare($sql);
                $stmt->bindParam(':id', $path[3]);
                $stmt->execute();
                $users = $stmt->fetch(PDO::FETCH_ASSOC);
            } else {
                $sql = "SELECT * FROM users ORDER BY id DESC";
                $stmt = $conn->prepare($sql);
                $stmt->execute();
                $users = $stmt->fetchAll(PDO::FETCH_ASSOC);
            }
            print json_encode($users);
            break;

        case 'POST':
            $user = json_decode(file_get_contents('php://input'), true);

            $sql = "INSERT INTO `users` (name, email, password, age, phone, access) 
                    VALUES (:name, :email, :password, :age, :phone, :access)";
                    
            $stmt = $conn->prepare($sql);
            $stmt->bindParam(':name', $user['name']);
            $stmt->bindParam(':email', $user['email']);
            $stmt->bindParam(':password', $user['password']);
            $stmt->bindParam(':age', $user['age']);
            $stmt->bindParam(':phone', $user['phone']);
            $stmt->bindParam(':access', $user['access']);
            
            if ($stmt->execute()) {
                $response = ['status' => 1, 'message' => 'Record created successfully.'];
            } else {
                $response = ['status' => 0, 'message' => 'Failed to create record.'];
            }

            print json_encode($response);
            break;

        case 'PUT':
            $user = json_decode(file_get_contents('php://input'), true);

            $sql = "UPDATE `users` SET name = :name,
             email = :email, password = :password,
              age = :age, phone = :phone, access = :access WHERE id = :id";

            $stmt = $conn->prepare($sql);
            $stmt->bindParam(':id', $user['id']);
            $stmt->bindParam(':name', $user['name']);
            $stmt->bindParam(':email', $user['email']);
            $stmt->bindParam(':password', $user['password']);
            $stmt->bindParam(':age', $user['age']);
            $stmt->bindParam(':phone', $user['phone']);
            $stmt->bindParam(':access', $user['access']);

            if ($stmt->execute()) {
                $response = ['status' => 1, 'message' => 'Record update successfully.'];
            } else {
                $response = ['status' => 0, 'message' => 'Failed to update record.'];
            }

            print json_encode($response);
            break;

        case 'DELETE':
            $sql = "DELETE FROM users WHERE id = :id";
            $path = explode('/', $_SERVER['REQUEST_URI']);

            $stmt = $conn->prepare($sql);
            $stmt->bindParam(':id', $path[3]);

            if ($stmt->execute()) {
                $response = ['status' => 1, 'message' => 'Record Deleted successfully.'];
            } else {
                $response = ['status' => 0, 'message' => 'Failed to Deleted record.'];
            }

            print json_encode($response);
            break;
    }
} catch (PDOException $e) {
    print json_encode(['status' => 0, 'message' => 'Database error: ' . $e->getMessage()]);
} catch (Exception $e) {
    print json_encode(['status' => 0, 'message' => 'An error occurred: ' . $e->getMessage()]);
}
?>
