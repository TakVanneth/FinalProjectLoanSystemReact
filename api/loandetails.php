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
                $sql = "SELECT * FROM loandetails_tbl WHERE id = :id";
                $stmt = $conn->prepare($sql);
                $stmt->bindParam(':id', $path[3]);
                $stmt->execute();
                $loandetails = $stmt->fetch(PDO::FETCH_ASSOC);
            } else {
                $sql = "SELECT * FROM loandetails_tbl ORDER BY id DESC";
                $stmt = $conn->prepare($sql);
                $stmt->execute();
                $loandetails = $stmt->fetchAll(PDO::FETCH_ASSOC);
            }
            print json_encode($loandetails);
            break;

        case 'POST':
            $input = json_decode(file_get_contents('php://input'), true);

            $sql = "INSERT INTO `loandetails_tbl` (Name, Contact, Address, Reference, LoanType, PlanDuration, InterestRate, Installments, Amount, TotalPayableAmount, MonthlyPayableAmount,  OverduePayableAmount, DateReleased, LoanDate, MonthlyAmount, Penalty, PayableAmount) 
                    VALUES (:Name, :Contact, :Address, :Reference, :LoanType, :PlanDuration, :InterestRate, :Installments, :Amount, :TotalPayableAmount, :MonthlyPayableAmount, :OverduePayableAmount, :DateReleased, :LoanDate, :MonthlyAmount, :Penalty, :PayableAmount)";

            $stmt = $conn->prepare($sql);
            $stmt->bindParam(':Name', $input['Name']);
            $stmt->bindParam(':Contact', $input['Contact']);
            $stmt->bindParam(':Address', $input['Address']);
            $stmt->bindParam(':Reference', $input['Reference']);
            $stmt->bindParam(':LoanType', $input['LoanType']);
            $stmt->bindParam(':PlanDuration', $input['PlanDuration']);
            $stmt->bindParam(':InterestRate', $input['InterestRate']);
            $stmt->bindParam(':Installments', $input['Installments']);
            $stmt->bindParam(':Amount', $input['Amount']);
            $stmt->bindParam(':TotalPayableAmount', $input['TotalPayableAmount']);
            $stmt->bindParam(':MonthlyPayableAmount', $input['MonthlyPayableAmount']);
            $stmt->bindParam(':OverduePayableAmount', $input['OverduePayableAmount']);
            $stmt->bindParam(':DateReleased', $input['DateReleased']);
            $stmt->bindParam(':LoanDate', $input['LoanDate']);
            $stmt->bindParam(':MonthlyAmount', $input['MonthlyAmount']);
            $stmt->bindParam(':Penalty', $input['Penalty']);
            $stmt->bindParam(':PayableAmount', $input['PayableAmount']);

            if ($stmt->execute()) {
                $response = ['status' => 1, 'message' => 'Record created successfully.'];
            } else {
                $response = ['status' => 0, 'message' => 'Failed to create record.'];
            }

            print json_encode($response);
            break;

        case 'PUT':
            $input = json_decode(file_get_contents('php://input'), true);

            $sql = "UPDATE `loandetails_tbl` SET 
            Name = :Name, 
            Contact = :Contact, 
            Address = :Address, 
            Reference = :Reference, 
            LoanType = :LoanType, 
            PlanDuration = :PlanDuration, 
            InterestRate = :InterestRate, 
            Installments = :Installments, 
            Amount = :Amount, 
            TotalPayableAmount = :TotalPayableAmount, 
            MonthlyPayableAmount = :MonthlyPayableAmount, 
            OverduePayableAmount = :OverduePayableAmount, 
            DateReleased = :DateReleased, 
            LoanDate = :LoanDate, 
            MonthlyAmount = :MonthlyAmount, 
            Penalty = :Penalty, 
            PayableAmount = :PayableAmount 
            WHERE id = :id";
    
            $stmt = $conn->prepare($sql);
            $stmt->bindParam(':id', $input['id']);
            $stmt->bindParam(':Name', $input['Name']);
            $stmt->bindParam(':Contact', $input['Contact']);
            $stmt->bindParam(':Address', $input['Address']);
            $stmt->bindParam(':Reference', $input['Reference']);
            $stmt->bindParam(':LoanType', $input['LoanType']);
            $stmt->bindParam(':PlanDuration', $input['PlanDuration']);
            $stmt->bindParam(':InterestRate', $input['InterestRate']);
            $stmt->bindParam(':Installments', $input['Installments']);
            $stmt->bindParam(':Amount', $input['Amount']);
            $stmt->bindParam(':TotalPayableAmount', $input['TotalPayableAmount']);
            $stmt->bindParam(':MonthlyPayableAmount', $input['MonthlyPayableAmount']);
            $stmt->bindParam(':OverduePayableAmount', $input['OverduePayableAmount']);
            $stmt->bindParam(':DateReleased', $input['DateReleased']);
            $stmt->bindParam(':LoanDate', $input['LoanDate']);
            $stmt->bindParam(':MonthlyAmount', $input['MonthlyAmount']);
            $stmt->bindParam(':Penalty', $input['Penalty']);
            $stmt->bindParam(':PayableAmount', $input['PayableAmount']);

            if ($stmt->execute()) {
                $response = ['status' => 1, 'message' => 'Record updated successfully.'];
            } else {
                $response = ['status' => 0, 'message' => 'Failed to update record.'];
            }

            print json_encode($response);
            break;

        case 'DELETE':
            $sql = "DELETE FROM loandetails_tbl WHERE id = :id";
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
