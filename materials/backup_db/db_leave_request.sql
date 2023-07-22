-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Jul 02, 2023 at 03:10 PM
-- Server version: 10.4.28-MariaDB
-- PHP Version: 8.1.17

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `db_leave_request`
--

-- --------------------------------------------------------

--
-- Table structure for table `tb_department`
--

CREATE TABLE `tb_department` (
  `id` bigint(20) NOT NULL,
  `name` varchar(25) NOT NULL,
  `manager` bigint(20) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `tb_department`
--

INSERT INTO `tb_department` (`id`, `name`, `manager`) VALUES
(1, 'Human Resouce', 3),
(4, 'IT', 4),
(5, 'Sales', 6);

-- --------------------------------------------------------

--
-- Table structure for table `tb_employee`
--

CREATE TABLE `tb_employee` (
  `id` bigint(20) NOT NULL,
  `address` varchar(20) DEFAULT NULL,
  `email` varchar(255) NOT NULL,
  `hire_date` datetime DEFAULT NULL,
  `is_married` bit(1) DEFAULT NULL,
  `name` varchar(25) NOT NULL,
  `phone` varchar(13) DEFAULT NULL,
  `department` bigint(20) DEFAULT NULL,
  `manager` bigint(20) DEFAULT NULL,
  `gender` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `tb_employee`
--

INSERT INTO `tb_employee` (`id`, `address`, `email`, `hire_date`, `is_married`, `name`, `phone`, `department`, `manager`, `gender`) VALUES
(1, 'Surabaya', 'tontono@gmail.com', '2023-06-29 10:00:00', b'0', 'Tono', '089766453210', 1, 4, 1),
(2, NULL, 'jenita@gmail.com', NULL, NULL, 'Jeni', '087832417788', 1, NULL, 2),
(3, NULL, 'pakpedro@gmail.com', NULL, NULL, 'Pedro', '087832419090', 1, NULL, 1),
(4, NULL, 'paksamsul@gmail.com', NULL, NULL, 'Samsul', '087832418080', 1, NULL, 1),
(6, NULL, 'prisilia@gmail.com', NULL, NULL, 'Prisil', '087832417070', 4, NULL, 2),
(7, NULL, 'abimanyu@gmail.com', NULL, NULL, 'Abi', '087832416767', 4, NULL, 1),
(8, NULL, 'pakhusni@gmail.com', NULL, NULL, 'Husni', '087832416516', 5, NULL, 1);

-- --------------------------------------------------------

--
-- Table structure for table `tb_gender`
--

CREATE TABLE `tb_gender` (
  `id` int(11) NOT NULL,
  `name` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `tb_gender`
--

INSERT INTO `tb_gender` (`id`, `name`) VALUES
(1, 'Laki-laki'),
(2, 'Perempuan');

-- --------------------------------------------------------

--
-- Table structure for table `tb_history`
--

CREATE TABLE `tb_history` (
  `id` bigint(20) NOT NULL,
  `date` datetime NOT NULL,
  `notes` varchar(255) DEFAULT NULL,
  `employee` bigint(20) NOT NULL,
  `leave_request` bigint(20) NOT NULL,
  `leave_status` bigint(20) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `tb_leave_balance`
--

CREATE TABLE `tb_leave_balance` (
  `id` bigint(20) NOT NULL,
  `current_year` datetime NOT NULL,
  `last_year` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `tb_leave_request`
--

CREATE TABLE `tb_leave_request` (
  `id` bigint(20) NOT NULL,
  `attachment` varchar(255) NOT NULL,
  `duration` int(11) NOT NULL,
  `end_date` datetime NOT NULL,
  `notes` varchar(255) NOT NULL,
  `start_date` datetime NOT NULL,
  `total` int(11) NOT NULL,
  `employee` bigint(20) NOT NULL,
  `current_status` bigint(20) NOT NULL,
  `leave_type` bigint(20) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `tb_leave_status`
--

CREATE TABLE `tb_leave_status` (
  `id` bigint(20) NOT NULL,
  `name` varchar(25) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `tb_leave_status`
--

INSERT INTO `tb_leave_status` (`id`, `name`) VALUES
(1, 'Pending'),
(2, 'Accepted'),
(3, 'Rejected');

-- --------------------------------------------------------

--
-- Table structure for table `tb_leave_type`
--

CREATE TABLE `tb_leave_type` (
  `id` bigint(20) NOT NULL,
  `day_num` int(11) NOT NULL,
  `name` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `tb_leave_type`
--

INSERT INTO `tb_leave_type` (`id`, `day_num`, `name`) VALUES
(1, 90, 'Maternity');

-- --------------------------------------------------------

--
-- Table structure for table `tb_parameter`
--

CREATE TABLE `tb_parameter` (
  `id` bigint(20) NOT NULL,
  `value` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `tb_privilege`
--

CREATE TABLE `tb_privilege` (
  `id` bigint(20) NOT NULL,
  `name` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `tb_privilege`
--

INSERT INTO `tb_privilege` (`id`, `name`) VALUES
(1, 'CREATE_ADMIN'),
(2, 'READ_ADMIN'),
(3, 'UPDATE_ADMIN'),
(4, 'DELETE_ADMIN'),
(5, 'CREATE_EMPLOYEE'),
(6, 'READ_EMPLOYEE'),
(7, 'UPDATE_EMPLOYEE'),
(8, 'DELETE_EMPLOYEE'),
(9, 'CREATE_MANAGER'),
(10, 'READ_MANAGER'),
(11, 'UPDATE_MANAGER'),
(12, 'DELETE_MANAGER'),
(13, 'CREATE_CEO'),
(14, 'READ_CEO'),
(15, 'UPDATE_CEO'),
(16, 'DELETE_CEO');

-- --------------------------------------------------------

--
-- Table structure for table `tb_role`
--

CREATE TABLE `tb_role` (
  `id` bigint(20) NOT NULL,
  `name` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `tb_role`
--

INSERT INTO `tb_role` (`id`, `name`) VALUES
(1, 'Admin'),
(2, 'Employee'),
(3, 'Manager'),
(5, 'CEO');

-- --------------------------------------------------------

--
-- Table structure for table `tb_role_previlege`
--

CREATE TABLE `tb_role_previlege` (
  `role_id` bigint(20) NOT NULL,
  `privilege_id` bigint(20) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `tb_role_previlege`
--

INSERT INTO `tb_role_previlege` (`role_id`, `privilege_id`) VALUES
(1, 1),
(1, 2),
(1, 3),
(1, 4),
(2, 5),
(2, 6),
(2, 7),
(2, 8),
(3, 9),
(3, 10),
(3, 11),
(3, 12),
(5, 13),
(5, 14),
(5, 15),
(5, 16);

-- --------------------------------------------------------

--
-- Table structure for table `tb_user`
--

CREATE TABLE `tb_user` (
  `id` bigint(20) NOT NULL,
  `is_account_non_locked` bit(1) DEFAULT NULL,
  `is_enabled` bit(1) DEFAULT NULL,
  `password` varchar(255) NOT NULL,
  `username` varchar(255) NOT NULL,
  `role` bigint(20) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `tb_user`
--

INSERT INTO `tb_user` (`id`, `is_account_non_locked`, `is_enabled`, `password`, `username`, `role`) VALUES
(1, b'1', b'1', '$2a$10$xGpfLJlEQzep2qf0dbbvrO8aiMobyb7NkZliFHEZ/OlL5A0Oq7NGu', 'tono', 1),
(2, b'1', b'1', '$2a$10$W6kCGgr6IfR.M76b64SwPe2mi2nTDO2Qcqw9XojB5zdqeG/4zxpqK', 'jeni', 1),
(3, b'1', b'1', '$2a$10$vR9tFKAZgTioPXbqhU5CLONcfgVhRlTPNRFHzwRo9yNUFr7ZVWRky', 'pedro', 3),
(4, b'1', b'1', '$2a$10$s.XNoVhxAyEcolWqXTjqpOh8FbKrzPwU4LYxr/iuggEzOGtgPQ2iS', 'samsul', 3),
(6, b'1', b'1', '$2a$10$pX0rmVkmcNyCvEinefka.OdKVNMwtpOpRbxsc7EHwy3qAZ4wEnZ2e', 'prisil', 3),
(7, b'1', b'1', '$2a$10$f/QHn792EE7tvcPUzuMc7uqf5HeFeRz2a1latKD5M19r0ZrFcc5Lm', 'abi', 3),
(8, b'1', b'1', '$2a$10$ebuSp91sbdNPC9YUKde/eeYBMyylON2QUC152tlTwbsN6ZGWzmWpy', 'husni', 2);

--
-- Indexes for dumped tables
--

--
-- Indexes for table `tb_department`
--
ALTER TABLE `tb_department`
  ADD PRIMARY KEY (`id`),
  ADD KEY `FKf7tfics9xhy6i7sr1yeh8qgn3` (`manager`);

--
-- Indexes for table `tb_employee`
--
ALTER TABLE `tb_employee`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `UK_em9lvg7whqbrro5fbav5bt0gy` (`email`),
  ADD KEY `FK14egua7ilegncbrph1oi8facc` (`department`),
  ADD KEY `FKc3lnd5fm6y18busqxy5217dgc` (`manager`),
  ADD KEY `FKe12v2h8vxnsjcdw1vrughq672` (`gender`);

--
-- Indexes for table `tb_gender`
--
ALTER TABLE `tb_gender`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `tb_history`
--
ALTER TABLE `tb_history`
  ADD PRIMARY KEY (`id`),
  ADD KEY `FKk7907uac4ro0we8c095bv6g2b` (`employee`),
  ADD KEY `FKdqmv9uyqfj8cs0b736p9x8b5y` (`leave_request`),
  ADD KEY `FKqrxea1ktqtm8qhyl371vy38w5` (`leave_status`);

--
-- Indexes for table `tb_leave_balance`
--
ALTER TABLE `tb_leave_balance`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `tb_leave_request`
--
ALTER TABLE `tb_leave_request`
  ADD PRIMARY KEY (`id`),
  ADD KEY `FK2qqj7m271ti4i6qewfmcfn98t` (`employee`),
  ADD KEY `FKm14eab5xonfkb3sel12dwap70` (`current_status`),
  ADD KEY `FKa9mx587b4fciutbxix0m47c7j` (`leave_type`);

--
-- Indexes for table `tb_leave_status`
--
ALTER TABLE `tb_leave_status`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `tb_leave_type`
--
ALTER TABLE `tb_leave_type`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `tb_parameter`
--
ALTER TABLE `tb_parameter`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `tb_privilege`
--
ALTER TABLE `tb_privilege`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `tb_role`
--
ALTER TABLE `tb_role`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `tb_role_previlege`
--
ALTER TABLE `tb_role_previlege`
  ADD KEY `FK1j1tbwqoh1d019k1fip6kb62f` (`privilege_id`),
  ADD KEY `FK72ed0trcynvlojk6gagnmmcfu` (`role_id`);

--
-- Indexes for table `tb_user`
--
ALTER TABLE `tb_user`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `UK_4wv83hfajry5tdoamn8wsqa6x` (`username`),
  ADD KEY `FKeayyci2soerl5hblbeaomtlu6` (`role`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `tb_department`
--
ALTER TABLE `tb_department`
  MODIFY `id` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT for table `tb_employee`
--
ALTER TABLE `tb_employee`
  MODIFY `id` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;

--
-- AUTO_INCREMENT for table `tb_gender`
--
ALTER TABLE `tb_gender`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `tb_history`
--
ALTER TABLE `tb_history`
  MODIFY `id` bigint(20) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `tb_leave_request`
--
ALTER TABLE `tb_leave_request`
  MODIFY `id` bigint(20) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `tb_leave_status`
--
ALTER TABLE `tb_leave_status`
  MODIFY `id` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT for table `tb_leave_type`
--
ALTER TABLE `tb_leave_type`
  MODIFY `id` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `tb_privilege`
--
ALTER TABLE `tb_privilege`
  MODIFY `id` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=17;

--
-- AUTO_INCREMENT for table `tb_role`
--
ALTER TABLE `tb_role`
  MODIFY `id` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `tb_department`
--
ALTER TABLE `tb_department`
  ADD CONSTRAINT `FKf7tfics9xhy6i7sr1yeh8qgn3` FOREIGN KEY (`manager`) REFERENCES `tb_employee` (`id`);

--
-- Constraints for table `tb_employee`
--
ALTER TABLE `tb_employee`
  ADD CONSTRAINT `FK14egua7ilegncbrph1oi8facc` FOREIGN KEY (`department`) REFERENCES `tb_department` (`id`),
  ADD CONSTRAINT `FKc3lnd5fm6y18busqxy5217dgc` FOREIGN KEY (`manager`) REFERENCES `tb_employee` (`id`),
  ADD CONSTRAINT `FKe12v2h8vxnsjcdw1vrughq672` FOREIGN KEY (`gender`) REFERENCES `tb_gender` (`id`);

--
-- Constraints for table `tb_history`
--
ALTER TABLE `tb_history`
  ADD CONSTRAINT `FKdqmv9uyqfj8cs0b736p9x8b5y` FOREIGN KEY (`leave_request`) REFERENCES `tb_leave_request` (`id`),
  ADD CONSTRAINT `FKk7907uac4ro0we8c095bv6g2b` FOREIGN KEY (`employee`) REFERENCES `tb_employee` (`id`),
  ADD CONSTRAINT `FKqrxea1ktqtm8qhyl371vy38w5` FOREIGN KEY (`leave_status`) REFERENCES `tb_leave_status` (`id`);

--
-- Constraints for table `tb_leave_balance`
--
ALTER TABLE `tb_leave_balance`
  ADD CONSTRAINT `FK1gwex8hxw443bb5pfnxfnaomt` FOREIGN KEY (`id`) REFERENCES `tb_employee` (`id`);

--
-- Constraints for table `tb_leave_request`
--
ALTER TABLE `tb_leave_request`
  ADD CONSTRAINT `FK2qqj7m271ti4i6qewfmcfn98t` FOREIGN KEY (`employee`) REFERENCES `tb_employee` (`id`),
  ADD CONSTRAINT `FKa9mx587b4fciutbxix0m47c7j` FOREIGN KEY (`leave_type`) REFERENCES `tb_leave_type` (`id`),
  ADD CONSTRAINT `FKm14eab5xonfkb3sel12dwap70` FOREIGN KEY (`current_status`) REFERENCES `tb_leave_status` (`id`);

--
-- Constraints for table `tb_role_previlege`
--
ALTER TABLE `tb_role_previlege`
  ADD CONSTRAINT `FK1j1tbwqoh1d019k1fip6kb62f` FOREIGN KEY (`privilege_id`) REFERENCES `tb_privilege` (`id`),
  ADD CONSTRAINT `FK72ed0trcynvlojk6gagnmmcfu` FOREIGN KEY (`role_id`) REFERENCES `tb_role` (`id`);

--
-- Constraints for table `tb_user`
--
ALTER TABLE `tb_user`
  ADD CONSTRAINT `FKeayyci2soerl5hblbeaomtlu6` FOREIGN KEY (`role`) REFERENCES `tb_role` (`id`),
  ADD CONSTRAINT `FKeevlntsedmt1rdsr2d2lilphg` FOREIGN KEY (`id`) REFERENCES `tb_employee` (`id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
