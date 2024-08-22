-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: localhost:5222:5222
-- Generation Time: Aug 22, 2024 at 06:40 AM
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
-- Database: `auth`
--

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `id` int(11) NOT NULL,
  `username` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  `last_login` datetime NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`id`, `username`, `email`, `password`, `last_login`, `created_at`) VALUES
(1, 'abdi', 'abdi@test.so', '$2b$10$.KhCSpwY22aRVyUSqhrZrOjOVdLnNPI89d/v1tv7Xuc7JbINswurq', '0000-00-00 00:00:00', '2024-08-22 04:12:37'),
(2, 'mohamed', 'mohamed@test.so', '$2b$10$bLjWB0.88PBB4pbfiriFd.0KKrY281PRc6IW1oI29ZwcmV4I9Hzzy', '0000-00-00 00:00:00', '2024-08-22 04:14:16'),
(3, 'john', 'user@example.com', '$2b$10$g7yJsp6tuRyajHOeDm9jwe.cX9x3EG9gUvehsOq5cj0V10sUeL7J6', '0000-00-00 00:00:00', '2024-08-22 04:24:10'),
(5, 'test', 'test@test.so', '$2b$10$WqCGN4lUo1i.bzT0OKUfIeP22DCd9KAUj//85mzHbsmCSYAAP.zDe', '0000-00-00 00:00:00', '2024-08-22 04:38:54');

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
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
