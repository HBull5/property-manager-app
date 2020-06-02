-- phpMyAdmin SQL Dump
-- version 5.0.2
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Jun 02, 2020 at 09:09 PM
-- Server version: 10.4.11-MariaDB
-- PHP Version: 7.4.5

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `properties`
--
DROP DATABASE IF EXISTS properties;
CREATE DATABASE properties;
USE properties;
-- --------------------------------------------------------

--
-- Table structure for table `assignments`
--

CREATE TABLE `assignments` (
  `assignmentID` int(11) NOT NULL,
  `employeeID` int(11) DEFAULT NULL,
  `customerID` int(11) NOT NULL,
  `dateAssigned` timestamp NULL DEFAULT NULL,
  `problemDescription` varchar(500) NOT NULL,
  `completed` tinyint(1) NOT NULL DEFAULT 0
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `assignments`
--

INSERT INTO `assignments` (`assignmentID`, `employeeID`, `customerID`, `dateAssigned`, `problemDescription`, `completed`) VALUES
(19, 8, 1, '2020-06-02 15:56:02', 'WASHER Lorem ipsum dolor sit amet consectetur adipisicing elit. Optio magnam omnis harum quos provident quo cupiditate, vitae facere cumque, in quas excepturi ipsam numquam voluptas neque enim sint eius. Eum ea impedit, accusantium ipsam eos enim? Debitis accusamus quia qui excepturi, sapiente impedit incidunt quos esse ratione sint voluptatum distinctio.', 0),
(20, 8, 2, '2020-06-02 19:07:25', 'CIELING FAN Lorem ipsum dolor sit amet consectetur adipisicing elit. Optio magnam omnis harum quos provident quo cupiditate, vitae facere cumque, in quas excepturi ipsam numquam voluptas neque enim sint eius. Eum ea impedit, accusantium ipsam eos enim? Debitis accusamus quia qui excepturi, sapiente impedit incidunt quos esse ratione sint voluptatum distinctio.', 0);

--
-- Triggers `assignments`
--
DELIMITER $$
CREATE TRIGGER `addDate` BEFORE UPDATE ON `assignments` FOR EACH ROW SET NEW.dateAssigned = 
IF(NEW.employeeID != OLD.employeeID OR NEW.employeeID IS NOT NULL AND OLD.employeeID IS NULL, CURRENT_TIMESTAMP, OLD.dateAssigned)
$$
DELIMITER ;

-- --------------------------------------------------------

--
-- Table structure for table `customers`
--

CREATE TABLE `customers` (
  `customerID` int(11) NOT NULL,
  `firstName` varchar(50) NOT NULL,
  `lastName` varchar(50) NOT NULL,
  `address` varchar(150) NOT NULL,
  `city` varchar(150) NOT NULL,
  `state` varchar(2) NOT NULL,
  `zip` varchar(5) NOT NULL,
  `phone` varchar(10) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `customers`
--

INSERT INTO `customers` (`customerID`, `firstName`, `lastName`, `address`, `city`, `state`, `zip`, `phone`) VALUES
(1, 'John', 'Doe', 'West Turbo Lane', 'Kansas City', 'MO', '30901', '8162223333'),
(2, 'Jane', 'Deer', 'East Supercharger Road', 'Kansas City', 'MO', '30901', '8164445555');

-- --------------------------------------------------------

--
-- Table structure for table `employees`
--

CREATE TABLE `employees` (
  `employeeID` int(11) NOT NULL,
  `firstName` varchar(50) NOT NULL,
  `lastName` varchar(50) NOT NULL,
  `address` varchar(150) NOT NULL,
  `city` varchar(150) NOT NULL,
  `state` varchar(2) NOT NULL,
  `zip` varchar(5) NOT NULL,
  `phone` varchar(10) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `employees`
--

INSERT INTO `employees` (`employeeID`, `firstName`, `lastName`, `address`, `city`, `state`, `zip`, `phone`) VALUES
(5, 'Robert', 'Tammaro', '123 Sesame Street', 'East PBS ', 'GA', '12345', '1112223333'),
(6, 'Chad', 'Chapman', 'ABC Sesame Street', 'West PBS', 'SC', '54321', '3332221111'),
(7, 'Roberta', 'Butler', '456 Sesame Street', 'North PBS', 'NC', '67890', '2223335555'),
(8, 'Harcourt', 'Bull', 'CBA Sesame Street', 'South PBS', 'MO', '01234', '5557776666');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `assignments`
--
ALTER TABLE `assignments`
  ADD PRIMARY KEY (`assignmentID`),
  ADD KEY `EmployeeID` (`employeeID`),
  ADD KEY `CustomerID` (`customerID`);

--
-- Indexes for table `customers`
--
ALTER TABLE `customers`
  ADD PRIMARY KEY (`customerID`);

--
-- Indexes for table `employees`
--
ALTER TABLE `employees`
  ADD PRIMARY KEY (`employeeID`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `assignments`
--
ALTER TABLE `assignments`
  MODIFY `assignmentID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=25;

--
-- AUTO_INCREMENT for table `customers`
--
ALTER TABLE `customers`
  MODIFY `customerID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `employees`
--
ALTER TABLE `employees`
  MODIFY `employeeID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `assignments`
--
ALTER TABLE `assignments`
  ADD CONSTRAINT `assignments_ibfk_1` FOREIGN KEY (`EmployeeID`) REFERENCES `employees` (`employeeID`),
  ADD CONSTRAINT `assignments_ibfk_2` FOREIGN KEY (`CustomerID`) REFERENCES `customers` (`CustomerID`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
