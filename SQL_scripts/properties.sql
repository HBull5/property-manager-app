-- phpMyAdmin SQL Dump
-- version 5.0.2
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Jun 02, 2020 at 02:29 AM
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
  `AssignmentID` int(11) NOT NULL,
  `DateAssigned` timestamp NULL DEFAULT NULL,
  `OwnerFirstName` varchar(50) NOT NULL,
  `OwnerLastName` varchar(50) NOT NULL,
  `Address` varchar(255) NOT NULL,
  `Phone` varchar(10) NOT NULL,
  `ProblemDescription` varchar(255) NOT NULL,
  `Completed` tinyint(1) NOT NULL DEFAULT 0,
  `EmployeeID` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `assignments`
--

INSERT INTO `assignments` (`AssignmentID`, `DateAssigned`, `OwnerFirstName`, `OwnerLastName`, `Address`, `Phone`, `ProblemDescription`, `Completed`, `EmployeeID`) VALUES
(16, '2020-06-02 00:18:17', 'Harcourt', 'Bull', '1812 Mountside Drive', '8169126682', 'broken fan', 0, 1),
(17, NULL, 'Jessica', 'Bull', '1812 mountside drive ', '8169126632', 'broken sink', 0, NULL);

--
-- Triggers `assignments`
--
DELIMITER $$
CREATE TRIGGER `addDate` BEFORE UPDATE ON `assignments` FOR EACH ROW SET NEW.DateAssigned = IF(OLD.employeeID != NEW.employeeID, CURRENT_TIMESTAMP, OLD.DateAssigned)
$$
DELIMITER ;

-- --------------------------------------------------------

--
-- Table structure for table `employees`
--

CREATE TABLE `employees` (
  `EmployeeID` int(11) NOT NULL,
  `EmployeeFirstName` varchar(50) NOT NULL,
  `EmployeeLastName` varchar(50) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `employees`
--

INSERT INTO `employees` (`EmployeeID`, `EmployeeFirstName`, `EmployeeLastName`) VALUES
(1, 'Harcourt', 'Bull'),
(2, 'Robert ', 'Tommaro'),
(3, 'Chad ', 'Chapman'),
(4, 'Roberta ', 'Butler');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `assignments`
--
ALTER TABLE `assignments`
  ADD PRIMARY KEY (`AssignmentID`),
  ADD KEY `EmployeeID` (`EmployeeID`);

--
-- Indexes for table `employees`
--
ALTER TABLE `employees`
  ADD PRIMARY KEY (`EmployeeID`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `assignments`
--
ALTER TABLE `assignments`
  MODIFY `AssignmentID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=18;

--
-- AUTO_INCREMENT for table `employees`
--
ALTER TABLE `employees`
  MODIFY `EmployeeID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `assignments`
--
ALTER TABLE `assignments`
  ADD CONSTRAINT `assignments_ibfk_1` FOREIGN KEY (`EmployeeID`) REFERENCES `employees` (`EmployeeID`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
