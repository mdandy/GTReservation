-- phpMyAdmin SQL Dump
-- version 3.5.1
-- http://www.phpmyadmin.net
--
-- Host: db.cip.gatech.edu
-- Generation Time: Oct 07, 2012 at 07:23 AM
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
-- Table structure for table `Reservations`
--

CREATE TABLE IF NOT EXISTS `Reservations` (
  `reserve_id` int(11) NOT NULL AUTO_INCREMENT,
  `user_id` varchar(64) NOT NULL,
  `court_id` int(11) NOT NULL,
  `reserve_time` datetime NOT NULL,
  PRIMARY KEY (`reserve_id`),
  UNIQUE KEY `reserve_id` (`reserve_id`),
  KEY `user_id` (`user_id`)
) ENGINE=InnoDB  DEFAULT CHARSET=latin1 AUTO_INCREMENT=208 ;

--
-- Dumping data for table `Reservations`
--

INSERT INTO `Reservations` (`reserve_id`, `user_id`, `court_id`, `reserve_time`) VALUES
(49, 'kjohnstone6', 4, '2012-10-02 07:00:00'),
(55, 'kjohnstone6', 3, '2012-10-02 08:00:00'),
(56, 'kjohnstone6', 3, '2012-10-02 09:00:00'),
(59, 'kjohnstone6', 4, '2012-10-02 10:00:00'),
(61, 'kjohnstone6', 1, '2012-10-02 11:00:00'),
(63, 'kjohnstone6', 2, '2012-10-02 11:00:00'),
(124, 'pvassenkov3', 2, '2012-10-02 12:00:00'),
(137, 'kjohnstone6', 1, '2012-10-02 12:00:00'),
(150, 'kjohnstone6', 2, '2012-10-02 15:00:00'),
(152, 'kjohnstone6', 1, '2012-10-02 19:00:00'),
(153, 'kjohnstone6', 4, '2012-10-02 16:00:00'),
(155, 'kjohnstone6', 3, '2012-10-02 16:00:00'),
(156, 'kjohnstone6', 1, '2012-10-03 09:00:00'),
(163, 'jzeder3', 1, '2012-10-05 11:00:00'),
(164, 'jzeder3', 1, '2012-10-05 16:00:00'),
(165, 'jzeder3', 1, '2012-10-05 20:00:00'),
(167, 'jzeder3', 1, '2012-10-05 12:00:00'),
(168, 'jzeder3', 2, '2012-10-05 18:00:00'),
(169, 'kjohnstone6', 1, '2012-10-05 21:00:00'),
(172, 'mdandy3', 1, '2012-10-05 09:00:00'),
(190, 'mdandy3', 3, '2012-10-07 14:00:00'),
(194, 'jedwards36', 1, '2012-10-06 16:00:00'),
(197, 'jedwards36', 2, '2012-10-07 13:00:00'),
(198, 'jedwards36', 2, '2012-10-07 12:00:00'),
(199, 'jedwards36', 2, '2012-10-06 16:00:00'),
(201, 'jedwards36', 3, '2012-10-06 14:00:00'),
(203, 'jedwards36', 1, '2012-10-06 19:00:00'),
(204, 'jedwards36', 1, '2012-10-06 20:00:00'),
(205, 'jzeder3', 2, '2012-10-06 17:00:00'),
(206, 'jedwards36', 2, '2012-10-06 20:00:00'),
(207, 'mdandy3', 2, '2012-10-06 19:00:00');

-- --------------------------------------------------------

--
-- Table structure for table `Users`
--

CREATE TABLE IF NOT EXISTS `Users` (
  `user_id` varchar(64) NOT NULL,
  `name` varchar(64) NOT NULL,
  `email` varchar(64) NOT NULL,
  `privilege` int(11) NOT NULL DEFAULT '1',
  PRIMARY KEY (`user_id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `Users`
--

INSERT INTO `Users` (`user_id`, `name`, `email`, `privilege`) VALUES
('jedwards36', 'Edwards,Jonathan Pelham', 'jedwards36@gatech.edu', 1),
('jzeder3', 'Josh Zeder', 'jzeder3@gatech.edu', 1),
('kjohnstone6', 'Kevin Johnstone', 'kjohnstone6@gatech.edu', 1),
('mdandy3', 'Dandy,Michael', 'mdandy3@gatech.edu', 0),
('pvassenkov3', 'Vassenkov,Phillip', 'pvassenkov3@gatech.edu', 1);

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
