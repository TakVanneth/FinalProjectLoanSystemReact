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
                $sql = "SELECT * FROM Borrower_tbl WHERE id = :id";
                $stmt = $conn->prepare($sql);
                $stmt->bindParam(':id', $path[3]);
                $stmt->execute();
                $borrower = $stmt->fetch(PDO::FETCH_ASSOC);
            } else {
                $sql = "SELECT * FROM Borrower_tbl ORDER BY id DESC";
                $stmt = $conn->prepare($sql);
                $stmt->execute();
                $borrower = $stmt->fetchAll(PDO::FETCH_ASSOC);
            }
            print json_encode($borrower);
            break;

        case 'POST':
            $input = json_decode(file_get_contents('php://input'), true);

            $sql = "INSERT INTO `Borrower_tbl` (Name, Address, Contact, Email, TaxID, CurrentLoan, NextPaymentSchedule) 
                    VALUES (:Name, :Address, :Contact, :Email, :TaxID, :CurrentLoan, :NextPaymentSchedule)";
                    
            $stmt = $conn->prepare($sql);
            $stmt->bindParam(':Name', $input['Name']);
            $stmt->bindParam(':Address', $input['Address']);
            $stmt->bindParam(':Contact', $input['Contact']);
            $stmt->bindParam(':Email', $input['Email']);
            $stmt->bindParam(':TaxID', $input['TaxID']);
            $stmt->bindParam(':CurrentLoan', $input['CurrentLoan']);
            $stmt->bindParam(':NextPaymentSchedule', $input['NextPaymentSchedule']);
            
            if ($stmt->execute()) {
                $response = ['status' => 1, 'message' => 'Record created successfully.'];
            } else {
                $response = ['status' => 0, 'message' => 'Failed to create record.'];
            }

            print json_encode($response);
            break;

        case 'PUT':
            $input = json_decode(file_get_contents('php://input'), true);

            $sql = "UPDATE `Borrower_tbl` SET 
                    Name = :Name, Address = :Address, Contact = :Contact, 
                    Email = :Email, TaxID = :TaxID, CurrentLoan = :CurrentLoan, 
                    NextPaymentSchedule = :NextPaymentSchedule  WHERE id = :id";

            $stmt = $conn->prepare($sql);
            $stmt->bindParam(':id', $input['id']);
            $stmt->bindParam(':Name', $input['Name']);
            $stmt->bindParam(':Address', $input['Address']);
            $stmt->bindParam(':Contact', $input['Contact']);
            $stmt->bindParam(':Email', $input['Email']);
            $stmt->bindParam(':TaxID', $input['TaxID']);
            $stmt->bindParam(':CurrentLoan', $input['CurrentLoan']);
            $stmt->bindParam(':NextPaymentSchedule', $input['NextPaymentSchedule']);

            if ($stmt->execute()) {
                $response = ['status' => 1, 'message' => 'Record updated successfully.'];
            } else {
                $response = ['status' => 0, 'message' => 'Failed to update record.'];
            }

            print json_encode($response);
            break;

        case 'DELETE':
            $path = explode('/', $_SERVER['REQUEST_URI']);
            $id = $path[3];

            $sql = "DELETE FROM Borrower_tbl WHERE id = :id";
            $stmt = $conn->prepare($sql);
            $stmt->bindParam(':id', $id);

            if ($stmt->execute()) {
                $response = ['status' => 1, 'message' => 'Record deleted successfully.'];
            } else {
                $response = ['status' => 0, 'message' => 'Failed to delete record.'];
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
