-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Feb 29, 2024 at 02:16 PM
-- Server version: 10.4.32-MariaDB
-- PHP Version: 8.2.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `nutech_test`
--

-- --------------------------------------------------------

--
-- Table structure for table `banner`
--

CREATE TABLE `banner` (
  `banner_name` varchar(255) NOT NULL,
  `banner_image` varchar(255) NOT NULL,
  `banner_description` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `banner`
--

INSERT INTO `banner` (`banner_name`, `banner_image`, `banner_description`) VALUES
('Banner 1', 'dummy.jpg', 'Lerem Ipsum Dolor sit amet'),
('Banner 2', 'dummy.jpg', 'Lerem Ipsum Dolor sit amet'),
('Banner 3', 'dummy.jpg', 'Lerem Ipsum Dolor sit amet'),
('Banner 4', 'dummy.jpg', 'Lerem Ipsum Dolor sit amet'),
('Banner 5', 'dummy.jpg', 'Lerem Ipsum Dolor sit amet'),
('Banner 6', 'dummy.jpg', 'Lerem Ipsum Dolor sit amet');

-- --------------------------------------------------------

--
-- Table structure for table `services`
--

CREATE TABLE `services` (
  `service_code` varchar(255) NOT NULL,
  `service_name` varchar(255) NOT NULL,
  `service_icon` varchar(255) NOT NULL,
  `service_tarif` int(50) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `services`
--

INSERT INTO `services` (`service_code`, `service_name`, `service_icon`, `service_tarif`) VALUES
('PAJAK', 'PAJAK PBB', 'dummy.jpg', 40000),
('PLN', 'Listrik', 'dummy.jpg', 10000),
('PDAM', 'PDAM Berlangganan', 'dummy.jpg', 40000),
('PULSA', 'Pulsa', 'dummy.jpg', 40000),
('MUSIK', 'Musik Berlangganan', 'dummy.jpg', 50000),
('PGN', 'PGN Berlangganan', 'dummy.jpg', 50000),
('TV', 'TV Berlangganan', 'dummy.jpg', 50000),
('PAKET_DATA', 'Paket Data', 'dummy.jpg', 50000),
('VOUCHER_GAME', 'Voucher Game', 'dummy.jpg', 100000),
('VOUCHER_MAKANAN', 'Voucher Makanan', 'dummy.jpg', 100000),
('QURBAN', 'Qurban', 'dummy.jpg', 200000),
('ZAKAT', 'Zakat', 'dummy.jpg', 300000);

-- --------------------------------------------------------

--
-- Table structure for table `transaction`
--

CREATE TABLE `transaction` (
  `email` varchar(255) NOT NULL,
  `invoice_number` varchar(255) NOT NULL,
  `description` varchar(255) NOT NULL,
  `transaction_type` varchar(255) NOT NULL,
  `total_amount` int(50) NOT NULL,
  `created_on` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `transaction`
--

INSERT INTO `transaction` (`email`, `invoice_number`, `description`, `transaction_type`, `total_amount`, `created_on`) VALUES
('fizi8889@gmail.com', 'INV1709199211531', 'TOP_UP_BALANCE', 'TOPUP', 100000, '1709199211531'),
('fizi8889@gmail.com', 'INV1709204547378', 'Zakat', 'ZAKAT', 300000, '1709204547378'),
('fizi8889@gmail.com', 'INV1709204625997', 'Zakat', 'ZAKAT', 300000, '1709204625997'),
('fizi8889@gmail.com', 'INV1709204645340', 'Pulsa', 'PULSA', 40000, '1709204645340'),
('fizi8889@gmail.com', 'INV1709205073003', 'Pulsa', 'PULSA', 40000, '1709205073003'),
('fizi8889@gmail.com', 'INV1709205219740', 'Pulsa', 'PAYMENT', 40000, '1709205219740'),
('fizi8889@gmail.com', 'INV1709205225707', 'Zakat', 'PAYMENT', 300000, '1709205225707'),
('fizi8889@gmail.com', 'INV1709206773889', 'Zakat', 'PAYMENT', 300000, '1709206773889'),
('fizi8889@gmail.com', 'INV1709206779856', 'Zakat', 'PAYMENT', 300000, '1709206779856'),
('fizi8889@gmail.com', 'INV1709207143493', 'Pulsa', 'PAYMENT', 40000, '1709207143493'),
('fizi8889@gmail.com', 'INV1709207200018', 'Pulsa', 'PAYMENT', 40000, '1709207200018'),
('fizi8889@gmail.com', 'INV1709207257955', 'Pulsa', 'PAYMENT', 40000, '1709207257955'),
('fizi8889@gmail.com', 'INV1709207266034', 'Pulsa', 'PAYMENT', 40000, '1709207266034'),
('fizi8889@gmail.com', 'INV1709207292731', 'TOP_UP_BALANCE', 'TOPUP', 5000000, '1709207292731'),
('fizi8889@gmail.com', 'INV1709207374153', 'Listrik', 'PAYMENT', 10000, '1709207374153'),
('fizi8889@gmail.com', 'INV1709208869897', 'Listrik', 'PAYMENT', 10000, '1709208869897'),
('fizi8889@gmail.com', 'INV1709208878346', 'Zakat', 'PAYMENT', 300000, '1709208878346'),
('fizi8889@gmail.com', 'INV1709208879198', 'Zakat', 'PAYMENT', 300000, '1709208879198'),
('fizi8889@gmail.com', 'INV1709208880073', 'Zakat', 'PAYMENT', 300000, '1709208880073'),
('fizi8889@gmail.com', 'INV1709208880901', 'Zakat', 'PAYMENT', 300000, '1709208880901'),
('fizi8889@gmail.com', 'INV1709208881701', 'Zakat', 'PAYMENT', 300000, '1709208881701'),
('fizi8889@gmail.com', 'INV1709208882686', 'Zakat', 'PAYMENT', 300000, '1709208882686'),
('fizi8889@gmail.com', 'INV1709208883407', 'Zakat', 'PAYMENT', 300000, '1709208883407'),
('fizi8889@gmail.com', 'INV1709208884284', 'Zakat', 'PAYMENT', 300000, '1709208884284');

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `id` int(25) NOT NULL,
  `email` varchar(25) NOT NULL,
  `first_name` varchar(255) NOT NULL,
  `last_name` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  `balance` int(255) NOT NULL,
  `profile_image` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`id`, `email`, `first_name`, `last_name`, `password`, `balance`, `profile_image`) VALUES
(1, 'fizi8889@gmail.com', 'Fi Zilalil', 'Huda', 'Fizi123456', 2600000, 'profile_image-1709208681589-431269423.png');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `id` int(25) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
