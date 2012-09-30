-- phpMyAdmin SQL Dump
-- version 3.5.1
-- http://www.phpmyadmin.net
--
-- Host: db.cip.gatech.edu
-- Generation Time: Sep 30, 2012 at 01:16 PM
-- Server version: 5.5.15-log
-- PHP Version: 5.3.13

SET SQL_MODE="NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;

--
-- Database: `CONTRIB_maven`
--

-- --------------------------------------------------------

--
-- Table structure for table `Court1`
--

CREATE TABLE IF NOT EXISTS `Court1` (
  `reserve_time` datetime NOT NULL,
  `reserve_status` tinyint(1) NOT NULL,
  `user_id` int(11) NOT NULL,
  `reserve_id` int(11) NOT NULL,
  PRIMARY KEY (`reserve_id`),
  KEY `user_id` (`user_id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Table structure for table `Court2`
--

CREATE TABLE IF NOT EXISTS `Court2` (
  `reserve_time` datetime NOT NULL,
  `reserve_status` tinyint(1) NOT NULL,
  `user_id` int(11) NOT NULL,
  `reserve_id` int(11) NOT NULL,
  PRIMARY KEY (`reserve_id`),
  KEY `user_id` (`user_id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Table structure for table `Court3`
--

CREATE TABLE IF NOT EXISTS `Court3` (
  `reserve_time` datetime NOT NULL,
  `reserve_status` tinyint(1) NOT NULL,
  `user_id` int(11) NOT NULL,
  `reserve_id` int(11) NOT NULL,
  PRIMARY KEY (`reserve_id`),
  KEY `user_id` (`user_id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Table structure for table `Court4`
--

CREATE TABLE IF NOT EXISTS `Court4` (
  `reserve_time` datetime NOT NULL,
  `reserve_status` tinyint(1) NOT NULL,
  `user_id` int(11) NOT NULL,
  `reserve_id` int(11) NOT NULL,
  PRIMARY KEY (`reserve_id`),
  KEY `user_id` (`user_id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Table structure for table `Court5`
--

CREATE TABLE IF NOT EXISTS `Court5` (
  `reserve_time` datetime NOT NULL,
  `reserve_status` tinyint(1) NOT NULL,
  `user_id` int(11) NOT NULL,
  `reserve_id` int(11) NOT NULL,
  PRIMARY KEY (`reserve_id`),
  KEY `user_id` (`user_id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Table structure for table `Reservations`
--

CREATE TABLE IF NOT EXISTS `Reservations` (
  `reserve_id` int(11) NOT NULL,
  `user_id` int(11) NOT NULL,
  `court_id` int(11) NOT NULL,
  `reserve_time` datetime NOT NULL,
  PRIMARY KEY (`court_id`,`reserve_time`),
  UNIQUE KEY `reserve_id` (`reserve_id`),
  KEY `user_id` (`user_id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Table structure for table `Users`
--

CREATE TABLE IF NOT EXISTS `Users` (
  `user_id` int(11) NOT NULL,
  `name` varchar(50) NOT NULL,
  `email` varchar(50) NOT NULL,
  PRIMARY KEY (`user_id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `Court1`
--
ALTER TABLE `Court1`
  ADD CONSTRAINT `Court1_ibfk_2` FOREIGN KEY (`user_id`) REFERENCES `Users` (`user_id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `Court2`
--
ALTER TABLE `Court2`
  ADD CONSTRAINT `Court2_ibfk_2` FOREIGN KEY (`user_id`) REFERENCES `Users` (`user_id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `Court3`
--
ALTER TABLE `Court3`
  ADD CONSTRAINT `Court3_ibfk_2` FOREIGN KEY (`user_id`) REFERENCES `Users` (`user_id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `Court4`
--
ALTER TABLE `Court4`
  ADD CONSTRAINT `Court4_ibfk_2` FOREIGN KEY (`user_id`) REFERENCES `Users` (`user_id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `Court5`
--
ALTER TABLE `Court5`
  ADD CONSTRAINT `Court5_ibfk_2` FOREIGN KEY (`user_id`) REFERENCES `Users` (`user_id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `Reservations`
--
ALTER TABLE `Reservations`
  ADD CONSTRAINT `Reservations_ibfk_2` FOREIGN KEY (`user_id`) REFERENCES `Users` (`user_id`) ON DELETE CASCADE ON UPDATE CASCADE;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
