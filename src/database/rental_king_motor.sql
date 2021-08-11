-- phpMyAdmin SQL Dump
-- version 5.1.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Aug 11, 2021 at 07:29 PM
-- Server version: 10.4.20-MariaDB
-- PHP Version: 8.0.8

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `rental_king_motor`
--

-- --------------------------------------------------------

--
-- Table structure for table `active_token`
--

CREATE TABLE `active_token` (
  `id` int(11) NOT NULL,
  `token` text NOT NULL,
  `time_issued` int(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Table structure for table `history`
--

CREATE TABLE `history` (
  `id` int(11) NOT NULL,
  `user_id` int(11) NOT NULL,
  `model_id` int(11) NOT NULL,
  `prepayment` int(11) NOT NULL,
  `returned_status` tinyint(1) NOT NULL,
  `rent_start_date` date NOT NULL,
  `rent_finish_date` date NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `history`
--

INSERT INTO `history` (`id`, `user_id`, `model_id`, `prepayment`, `returned_status`, `rent_start_date`, `rent_finish_date`) VALUES
(1, 1, 9, 825000, 1, '2021-01-21', '2021-01-23'),
(2, 3, 11, 80000, 1, '2021-03-21', '2021-03-22'),
(3, 1, 12, 750000, 1, '2021-05-01', '2021-05-02'),
(4, 2, 14, 190000, 0, '2021-08-01', '2021-08-03'),
(5, 3, 11, 160000, 0, '2021-08-02', '2021-08-04'),
(6, 2, 11, 160000, 0, '2021-08-01', '2021-08-03'),
(7, 1, 14, 95000, 0, '2021-04-12', '2021-04-12'),
(9, 3, 13, 130000, 1, '2021-03-12', '2021-03-13');

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `id` int(11) NOT NULL,
  `auth_level` int(1) NOT NULL,
  `name` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  `address` varchar(255) NOT NULL,
  `DOB` date NOT NULL,
  `gender` tinyint(1) NOT NULL,
  `profile_picture` text NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`id`, `auth_level`, `name`, `email`, `password`, `address`, `DOB`, `gender`, `profile_picture`) VALUES
(1, 1, 'Sulthan Qintara', 'sulthanqintara@gmail.com', '$2b$10$psqo7biGnHTIcwT7MGOazOsGg8I0rayYrAIVgmKhXPVKojyjc.QTK', 'Bandung', '1997-10-20', 1, 'http://localhost:8000/img/photo-1628537276154-746791.jpg'),
(2, 3, 'Michael Michelle', 'michael@yahoo.com', '$2b$10$Ssjp8ATn6Y6lrD3jTznQc.IQdT.3OnfETtMMAJo28Dws2F76RVzqq', 'Yogyakarta', '1990-01-20', 1, ''),
(3, 3, 'Adelaine Adelle', 'adelaine02@yahoo.com', '$2b$10$0eRtM1wkLMgkSI2kCK7V8OJFoaCr2wsF0h8gFroMyjYBdIAJq4Vbi', 'Bandung', '2000-05-05', 0, ''),
(5, 3, 'Johnson John', 'johnson.john@gmail.com', '$2b$10$XZg8XkLYK4M5sNZ1yVYASeSydhITecvkJQLDAGGvPGdesX9dodoRa', 'Surabaya', '1999-08-23', 1, ''),
(6, 2, 'Alexandra Ashley', 'alexi_ash@gmailcom', '$2b$10$hikFya33BluuyDaKHxfs4u6z6fmHjoyjbh2wR9fSyPg.O3e9sBsly', 'Jakarta', '2001-01-05', 0, 'http://localhost:8000/img/photo-1628614032961-650064.jpg'),
(7, 2, 'Linda Sandoval', 'lindythequeen@gmailcom', '$2b$10$Z3MRp0Qkh4r03T27vFfFtOdRhkVzKWPrknpmuW07ZIKQFNnywHaO6', 'Malang', '1995-03-15', 0, '');

-- --------------------------------------------------------

--
-- Table structure for table `vehicles`
--

CREATE TABLE `vehicles` (
  `id` int(11) NOT NULL,
  `type_id` int(11) NOT NULL,
  `model` varchar(255) NOT NULL,
  `owner` int(11) NOT NULL,
  `location` varchar(255) NOT NULL,
  `price` int(11) NOT NULL,
  `amount_available` int(11) NOT NULL,
  `popular_stats` int(11) NOT NULL,
  `picture` text NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `vehicles`
--

INSERT INTO `vehicles` (`id`, `type_id`, `model`, `owner`, `location`, `price`, `amount_available`, `popular_stats`, `picture`) VALUES
(9, 1, 'Van', 7, 'Yogyakarta', 275000, 3, 1, ''),
(10, 2, 'Vespa', 6, 'Yogyakarta', 175000, 8, 0, ''),
(11, 3, 'Sport Bike', 7, 'Kalimantan', 80000, 15, 3, ''),
(12, 1, 'Lambhorgini', 7, 'South Jakarta', 750000, 3, 1, ''),
(13, 3, 'Fixie Gray', 6, 'Yogyakarta', 65000, 18, 1, ''),
(14, 2, 'Honda KLX', 7, 'Kalimantan', 95000, 7, 2, ''),
(15, 3, 'Onthel', 6, 'Malang', 60000, 10, 0, ''),
(16, 1, 'Avanza', 7, 'Bandung', 120000, 5, 0, ''),
(17, 2, 'Vespa', 7, 'Yogyakarta', 100000, 8, 0, 'http://localhost:8000/img/picture-1628618425136-622684.jpg, http://localhost:8000/img/picture-1628618425140-381419.png, '),
(18, 2, 'Vespa', 6, 'Yogyakarta', 100000, 8, 0, '');

-- --------------------------------------------------------

--
-- Table structure for table `vehicle_types`
--

CREATE TABLE `vehicle_types` (
  `id` int(11) NOT NULL,
  `name_idn` varchar(255) NOT NULL,
  `name_en` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `vehicle_types`
--

INSERT INTO `vehicle_types` (`id`, `name_idn`, `name_en`) VALUES
(1, 'Mobil', 'Cars'),
(2, 'Motor', 'Motorcycle'),
(3, 'Sepeda', 'Bicycle');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `active_token`
--
ALTER TABLE `active_token`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `history`
--
ALTER TABLE `history`
  ADD PRIMARY KEY (`id`),
  ADD KEY `renter_id` (`user_id`),
  ADD KEY `model` (`model_id`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `vehicles`
--
ALTER TABLE `vehicles`
  ADD PRIMARY KEY (`id`),
  ADD KEY `type_id` (`type_id`);

--
-- Indexes for table `vehicle_types`
--
ALTER TABLE `vehicle_types`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `active_token`
--
ALTER TABLE `active_token`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=18;

--
-- AUTO_INCREMENT for table `history`
--
ALTER TABLE `history`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=11;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;

--
-- AUTO_INCREMENT for table `vehicles`
--
ALTER TABLE `vehicles`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=19;

--
-- AUTO_INCREMENT for table `vehicle_types`
--
ALTER TABLE `vehicle_types`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `history`
--
ALTER TABLE `history`
  ADD CONSTRAINT `history_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`),
  ADD CONSTRAINT `history_ibfk_2` FOREIGN KEY (`model_id`) REFERENCES `vehicles` (`id`);

--
-- Constraints for table `vehicles`
--
ALTER TABLE `vehicles`
  ADD CONSTRAINT `vehicles_ibfk_1` FOREIGN KEY (`type_id`) REFERENCES `vehicle_types` (`id`),
  ADD CONSTRAINT `vehicles_ibfk_2` FOREIGN KEY (`owner`) REFERENCES `users` (`id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
