<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: *");
header("Access-Control-Allow-Methods: *");
header('Content-Type: application/json');

include './DbConnect.php';

try {
    $objDb = new DbConnect;
    $conn = $objDb->connect();

    $method = $_SERVER['REQUEST_METHOD'];

    switch ($method) {
        case 'GET':
            $sql = "SELECT * FROM LoanType_tbl ORDER BY id DESC";
            $path = explode('/', $_SERVER['REQUEST_URI']);
            if (isset($path[3]) && is_numeric($path[3])) {
                $sql = "SELECT * FROM LoanType_tbl WHERE id = :id";
                $stmt = $conn->prepare($sql);
                $stmt->bindParam(':id', $path[3]);
                $stmt->execute();
                $loanTypes = $stmt->fetch(PDO::FETCH_ASSOC);
            } else {
                $stmt = $conn->prepare($sql);
                $stmt->execute();
                $loanTypes = $stmt->fetchAll(PDO::FETCH_ASSOC);
            }
            print json_encode($loanTypes);
            break;

        case 'POST':
            $loanType = json_decode(file_get_contents('php://input'), true);

            $sql = "INSERT INTO `LoanType_tbl` (LoanType, Description) 
                    VALUES (:LoanType, :Description)";

            $stmt = $conn->prepare($sql);
            $stmt->bindParam(':LoanType', $loanType['LoanType']);
            $stmt->bindParam(':Description', $loanType['Description']);

            if ($stmt->execute()) {
                $response = ['status' => 1, 'message' => 'Record created successfully.'];
            } else {
                $response = ['status' => 0, 'message' => 'Failed to create record.'];
            }

            print json_encode($response);
            break;

        case 'PUT':
            $loanType = json_decode(file_get_contents('php://input'), true);

            $sql = "UPDATE `LoanType_tbl` SET LoanType = :LoanType, Description = :Description WHERE id = :id";

            $stmt = $conn->prepare($sql);
            $stmt->bindParam(':id', $loanType['id']);
            $stmt->bindParam(':LoanType', $loanType['LoanType']);
            $stmt->bindParam(':Description', $loanType['Description']);

            if ($stmt->execute()) {
                $response = ['status' => 1, 'message' => 'Record updated successfully.'];
            } else {
                $response = ['status' => 0, 'message' => 'Failed to update record.'];
                
                $response['error'] = $stmt->errorInfo();
            }

            print json_encode($response);
            break;

        case 'DELETE':
            $sql = "DELETE FROM LoanType_tbl WHERE id = :id";
            $path = explode('/', $_SERVER['REQUEST_URI']);

            $stmt = $conn->prepare($sql);
            $stmt->bindParam(':id', $path[3]);

            if ($stmt->execute()) {
                $response = ['status' => 1, 'message' => 'Record Deleted successfully.'];
            } else {
                $response = ['status' => 0, 'message' => 'Failed to Deleted record.'];
            }
            break; 
        default:
            print json_encode(['status' => 0, 'message' => 'Unsupported method']);
            break;
    }
} catch (PDOException $e) {
    print json_encode(['status' => 0, 'message' => 'Database error: ' . $e->getMessage()]);
} catch (Exception $e) {
    print json_encode(['status' => 0, 'message' => 'An error occurred: ' . $e->getMessage()]);
}
?>
