-- phpMyAdmin SQL Dump
-- version 5.2.0
-- https://www.phpmyadmin.net/
--
-- Host: localhost:8889
-- Generation Time: Feb 20, 2024 at 11:15 AM
-- Server version: 5.7.39
-- PHP Version: 8.2.0

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `loansystemDB_react_js_ui`
--
CREATE DATABASE IF NOT EXISTS loansystemDB_react_js_ui;
USE loansystemDB_react_js_ui;

-- --------------------------------------------------------

--
-- Table structure for table `Borrower_tbl`
--

CREATE TABLE `Borrower_tbl` (
  `id` int(11) NOT NULL,
  `Name` varchar(255) NOT NULL,
  `Address` varchar(255) NOT NULL,
  `Contact` varchar(20) NOT NULL,
  `Email` varchar(255) NOT NULL,
  `TaxID` varchar(20) NOT NULL,
  `CurrentLoan` varchar(50) DEFAULT 'none',
  `NextPaymentSchedule` varchar(50) DEFAULT 'N/A'
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `Borrower_tbl`
--

INSERT INTO `Borrower_tbl` (`id`, `Name`, `Address`, `Contact`, `Email`, `TaxID`, `CurrentLoan`, `NextPaymentSchedule`) VALUES
(1, 'Tak Vanneth', 'Phnom Penh', '010 296 011', 'Vanneth@sample.com', '789845-23', 'none', 'N/A'),
(2, 'Tak Vanneth', 'phnom penh', '010 296 11', 'vannethtak03@gmail.com', '789845-23', 'none', 'N/A'),
(3, 'Tak Vanneth', 'phnom penh', '010 296 11', 'vannethtak03@gmail.com', '789845-23', 'none', 'N/A'),
(4, 'Tak Vanneth', 'phnom penh', '010 296 11', 'vannethtak03@gmail.com', '789845-23', 'none', 'N/A'),
(5, 'Tak Vanneth', 'phnom penh', '010 296 11', 'vannethtak03@gmail.com', '789845-23', 'none', 'N/A'),
(6, 'Tak Vanneth', 'phnom penh', '010 296 11', 'vannethtak03@gmail.com', '789845-23', 'none', 'N/A'),
(7, 'Tak Vanneth', 'phnom penh', '010 296 11', 'vannethtak03@gmail.com', '789845-23', 'none', 'N/A'),
(8, 'Tak Vanneth', 'phnom penh', '010 296 11', 'vannethtak03@gmail.com', '789845-24', 'none', 'N/A');

-- --------------------------------------------------------

--
-- Table structure for table `loandetails_tbl`
--

CREATE TABLE `loandetails_tbl` (
  `id` int(11) NOT NULL,
  `Name` varchar(100) DEFAULT NULL,
  `Contact` varchar(20) DEFAULT NULL,
  `Address` varchar(255) DEFAULT NULL,
  `Reference` varchar(20) DEFAULT NULL,
  `LoanType` varchar(200) DEFAULT NULL,
  `PlanDuration` int(11) DEFAULT NULL,
  `InterestRate` decimal(5,2) DEFAULT NULL,
  `Installments` int(11) DEFAULT NULL,
  `Amount` decimal(10,2) DEFAULT NULL,
  `TotalPayableAmount` decimal(10,2) DEFAULT NULL,
  `MonthlyPayableAmount` decimal(10,0) DEFAULT NULL,
  `OverduePayableAmount` decimal(10,2) DEFAULT NULL,
  `DateReleased` date DEFAULT NULL,
  `LoanDate` date DEFAULT NULL,
  `MonthlyAmount` decimal(10,2) DEFAULT NULL,
  `Penalty` decimal(10,2) DEFAULT NULL,
  `PayableAmount` decimal(10,2) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `loandetails_tbl`
--

INSERT INTO `loandetails_tbl` (`id`, `Name`, `Contact`, `Address`, `Reference`, `LoanType`, `PlanDuration`, `InterestRate`, `Installments`, `Amount`, `TotalPayableAmount`, `MonthlyPayableAmount`, `OverduePayableAmount`, `DateReleased`, `LoanDate`, `MonthlyAmount`, `Penalty`, `PayableAmount`) VALUES
(1, 'Tak Vanneth', '010 296 011', 'Phnom Penh', '81409630', 'Small Business', 36, '8.00', 3, '100000.00', '108000.00', '3000', '90.00', '2025-01-01', '2020-12-26', '3000.00', '90.00', '3090.00'),
(2, 'Zongly Pises', '01078970', 'phnom penh', '87645634', 'Small Business', 64, '3.00', 5, '65000.00', '6500.28', '102', '90.00', '2024-01-30', '2024-01-27', '90.00', '70.00', '90.00'),
(3, 'Bonich', '0000000', 'phnom penh', '87653908', 'edu loan', 32, '8.00', 3, '100000.00', '11137.73', '348', '90.00', '2024-01-01', '2024-01-27', '3000.00', '90.00', '3090.00'),
(4, 'Tak Vanneth', '010 296 11', 'phnom penh', '87645634', 'edu loan', 64, '10.00', 8, '70000.00', '90602.60', '1416', '90.00', '2024-02-01', '2024-01-23', '90.00', '90.00', '3090.00');

-- --------------------------------------------------------

--
-- Table structure for table `LoanType_tbl`
--

CREATE TABLE `LoanType_tbl` (
  `id` int(11) NOT NULL,
  `LoanType` varchar(255) DEFAULT NULL,
  `Description` text
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `LoanType_tbl`
--

INSERT INTO `LoanType_tbl` (`id`, `LoanType`, `Description`) VALUES
(1, 'Small Business', 'Small Business Loans'),
(2, 'Medium Business', 'Medium Business Loans'),
(3, 'large Business', 'large Business Loans'),
(5, 'edu loan', 'edu loan');

-- --------------------------------------------------------

--
-- Table structure for table `payment_tbl`
--

CREATE TABLE `payment_tbl` (
  `PaymentID` int(11) NOT NULL,
  `LoanReferenceNo` varchar(20) DEFAULT NULL,
  `Payee` varchar(100) DEFAULT NULL,
  `Amount` decimal(10,2) DEFAULT NULL,
  `Penalty` decimal(10,2) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `payment_tbl`
--

INSERT INTO `payment_tbl` (`PaymentID`, `LoanReferenceNo`, `Payee`, `Amount`, `Penalty`) VALUES
(1, '921432', 'Vanneth Tak', '3000.00', '70.00'),
(2, '552643', 'Somnang', '90.00', '90.00'),
(3, '998919', 'Bonich', '9000.00', '90.00'),
(4, '336665', 'Satha', '9000.00', '90.00'),
(5, '686569', 'Zongly', '9000.00', '90.00'),
(6, '422850', 'Satha', '9000.00', '90.00'),
(7, '54546', 'Bonich', '9000.00', '90.00'),
(8, '4179', 'Zongly', '9000.00', '90.00'),
(9, '857260', 'Somnang', '9000.00', '90.00'),
(10, '273761', 'Vanneth Tak', '7000.00', '70.00'),
(11, '797028', 'Vanneth Tak', '7000.00', '70.00'),
(12, '163854', 'Somnang', '9000.00', '90.00'),
(13, '428190', 'Zongly', '9000.00', '90.00'),
(14, '649385', 'Bonich', '9000.00', '90.00'),
(15, '962357', 'Satha', '9000.00', '90.00'),
(16, '863632', 'Zongly', '9000.00', '90.00'),
(17, '431089', 'Satha', '9000.00', '90.00'),
(18, '564550', 'Bonich', '9000.00', '90.00'),
(19, '529482', 'Somnang', '90.00', '90.00'),
(20, '953761', 'Vanneth Tak', '3000.00', '70.00'),
(21, '180360', 'Logan Nelson', '1500.00', '75.00'),
(22, '558030', 'Satha', '8097.00', '95.00'),
(23, '309014', 'Sothearith Choeun', '8167.00', '33.00'),
(24, '195469', 'Pich Chimi', '8494.00', '16.00'),
(25, '226767', 'Bonich', '3160.00', '59.00'),
(26, '982619', 'Somnang', '6660.00', '86.00'),
(27, '259807', 'Zongly', '4811.00', '58.00'),
(28, '440074', 'Sothearith Choeun', '7480.00', '65.00'),
(29, '977166', 'Pich Chimi', '3139.00', '7.00'),
(30, '650175', 'Vanneth Tak', '6499.00', '30.00'),
(31, '543301', 'Somnang', '8209.00', '48.00'),
(32, '909363', 'Bonich', '1237.00', '90.00'),
(33, '79968', 'Satha', '7293.00', '41.00'),
(34, '844663', 'Zongly', '39.00', '49.00'),
(35, '413947', 'Satha', '6146.00', '84.00'),
(36, '309920', 'Bonich', '576.00', '36.00'),
(37, '617021', 'Zonglyttt', '114.00', '21.00');

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `id` int(11) NOT NULL,
  `name` varchar(255) DEFAULT NULL,
  `email` varchar(255) DEFAULT NULL,
  `password` text NOT NULL,
  `age` int(11) DEFAULT NULL,
  `phone` varchar(20) DEFAULT NULL,
  `access` varchar(50) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`id`, `name`, `email`, `password`, `age`, `phone`, `access`) VALUES
(1, 'Vanneth tak', 'vannethtak03@gmail.com', 'vannethtak03@gmail.com', 21, '10296011', 'Manager'),
(2, 'Channy Samnang', 'user@example.com', 'user@example.com', 21, '0123456789', 'User'),
(3, 'Chan Bonich', 'Chan.Bonich@gmail.com', 'Chan.Bonich@gmail.com', 19, '296011', 'Manager'),
(4, 'Sreng Satha', 'Sreng.Satha@email.com', 'Sreng.Satha@email.com', 19, '296011', 'Manager'),
(5, 'Zongly', 'Zongly.example@gmail.com', 'Zongly.example@gmail.com', 21, '012345678', 'Manager'),
(6, 'Admin', 'admin@example.com', 'admin@example.com', 19, '012345678', 'Manager');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `Borrower_tbl`
--
ALTER TABLE `Borrower_tbl`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `loandetails_tbl`
--
ALTER TABLE `loandetails_tbl`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `LoanType_tbl`
--
ALTER TABLE `LoanType_tbl`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `payment_tbl`
--
ALTER TABLE `payment_tbl`
  ADD PRIMARY KEY (`PaymentID`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `Borrower_tbl`
--
ALTER TABLE `Borrower_tbl`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;

--
-- AUTO_INCREMENT for table `loandetails_tbl`
--
ALTER TABLE `loandetails_tbl`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT for table `LoanType_tbl`
--
ALTER TABLE `LoanType_tbl`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT for table `payment_tbl`
--
ALTER TABLE `payment_tbl`
  MODIFY `PaymentID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=38;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
