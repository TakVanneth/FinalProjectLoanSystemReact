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
                $sql = "SELECT * FROM payment_tbl WHERE PaymentID = :id";
                $stmt = $conn->prepare($sql);
                $stmt->bindParam(':id', $path[3]);
                $stmt->execute();
                $payment = $stmt->fetch(PDO::FETCH_ASSOC);
            } else {
                $sql = "SELECT * FROM payment_tbl ORDER BY PaymentID DESC";
                $stmt = $conn->prepare($sql);
                $stmt->execute();
                $payment = $stmt->fetchAll(PDO::FETCH_ASSOC);
            }            
            print json_encode($payment);
            break;

        case 'POST':
            $payment = json_decode(file_get_contents('php://input'), true);

            $sql = "INSERT INTO `payment_tbl` (LoanReferenceNo, Payee, Amount, Penalty) 
                    VALUES (:LoanReferenceNo, :Payee, :Amount, :Penalty)";

            $stmt = $conn->prepare($sql);
            $stmt->bindParam(':LoanReferenceNo', $payment['LoanReferenceNo']);
            $stmt->bindParam(':Payee', $payment['Payee']);
            $stmt->bindParam(':Amount', $payment['Amount']);
            $stmt->bindParam(':Penalty', $payment['Penalty']);

            if ($stmt->execute()) {
                $response = ['status' => 1, 'message' => 'Record created successfully.'];
            } else {
                $response = ['status' => 0, 'message' => 'Failed to create record.'];
            }

            print json_encode($response);
            break;

        case 'PUT':
            $payment = json_decode(file_get_contents('php://input'), true);
        
            $sql = "UPDATE `payment_tbl` SET 
                    LoanReferenceNo = :LoanReferenceNo, 
                    Payee = :Payee, 
                    Amount = :Amount, 
                    Penalty = :Penalty 
                    WHERE PaymentID = :id";
        
            $stmt = $conn->prepare($sql);
            $stmt->bindParam(':LoanReferenceNo', $payment['LoanReferenceNo']);
            $stmt->bindParam(':Payee', $payment['Payee']);
            $stmt->bindParam(':Amount', $payment['Amount']);
            $stmt->bindParam(':Penalty', $payment['Penalty']);
            $stmt->bindParam(':id', $payment['PaymentID']);  // Added condition for identifying the record
        
            if ($stmt->execute()) {
                $response = ['status' => 1, 'message' => 'Record updated successfully.'];
            } else {
                $response = ['status' => 0, 'message' => 'Failed to update record.'];
            }
        
            print json_encode($response);
            break;
            
        case 'DELETE':
            $sql = "DELETE FROM payment_tbl WHERE PaymentID = :id";
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
