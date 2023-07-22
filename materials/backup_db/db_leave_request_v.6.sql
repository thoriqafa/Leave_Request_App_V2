-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: localhost:3306
-- Generation Time: Jul 11, 2023 at 04:41 PM
-- Server version: 8.0.30
-- PHP Version: 8.1.10

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
  `id` bigint NOT NULL,
  `name` varchar(25) COLLATE utf8mb4_general_ci NOT NULL,
  `manager` bigint DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `tb_department`
--

INSERT INTO `tb_department` (`id`, `name`, `manager`) VALUES
(1, 'Human Resouce', 3),
(2, 'Information Technology', NULL),
(3, 'Sales', NULL),
(4, 'Supply Chain Management', NULL),
(5, 'Marketing', NULL),
(6, 'Accounting', NULL);

-- --------------------------------------------------------

--
-- Table structure for table `tb_employee`
--

CREATE TABLE `tb_employee` (
  `id` bigint NOT NULL,
  `address` varchar(20) COLLATE utf8mb4_general_ci DEFAULT NULL,
  `email` varchar(255) COLLATE utf8mb4_general_ci NOT NULL,
  `hire_date` datetime DEFAULT NULL,
  `is_married` bit(1) DEFAULT NULL,
  `name` varchar(25) COLLATE utf8mb4_general_ci NOT NULL,
  `phone` varchar(13) COLLATE utf8mb4_general_ci DEFAULT NULL,
  `department` bigint DEFAULT NULL,
  `manager` bigint DEFAULT NULL,
  `gender` int DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `tb_employee`
--

INSERT INTO `tb_employee` (`id`, `address`, `email`, `hire_date`, `is_married`, `name`, `phone`, `department`, `manager`, `gender`) VALUES
(1, 'Surabaya', 'paktono@gmail.com', NULL, b'1', 'Tono', '087832416516', 1, NULL, 1),
(2, NULL, 'jenitajeni@gmail.com', NULL, NULL, 'Jeni', '087832417786', 1, NULL, 2),
(3, NULL, 'pakpedro@gmail.com', NULL, NULL, 'Pedro', '087832419900', 1, NULL, 1),
(4, NULL, 'paksamsul@gmail.com', NULL, NULL, 'Samsul', '087832418899', 2, NULL, 1),
(5, NULL, 'fathur@gmail.com', '2023-07-06 16:14:35', NULL, 'Fathur', '089528203898', 2, NULL, 1),
(6, NULL, 'admin@gmail.com', '2023-07-06 16:19:42', NULL, 'Admin', '089775564490', 1, NULL, 1),
(7, NULL, 'husni@gmail.com', '2023-07-06 16:21:47', NULL, 'Husni', '087622341120', 4, NULL, 1),
(8, NULL, 'fariz@gmail.com', '2023-07-06 16:53:55', NULL, 'Fariz', '087689904456', 5, NULL, 1),
(12, NULL, 'ponari@gmail.com', '2023-07-10 17:12:22', NULL, 'Ponari', '01286980', 3, NULL, 1),
(13, NULL, 'gunawan@gmail.com', '2023-07-10 17:20:52', NULL, 'Gunawan', '0128698045', 3, NULL, 1),
(20, NULL, '0ffa6523e1@mymaily.lol', '2023-07-11 10:15:43', NULL, 'pirlo', '21323212', 3, NULL, 1),
(21, NULL, 'd56bf7ac47@mymaily.lol', '2023-07-11 10:23:02', NULL, 'pok', '123213', 5, NULL, 2),
(22, NULL, 'b2bbc81667@mymaily.lol', '2023-07-11 14:50:30', NULL, 'lali', '2323', 3, NULL, 2);

-- --------------------------------------------------------

--
-- Table structure for table `tb_gender`
--

CREATE TABLE `tb_gender` (
  `id` int NOT NULL,
  `name` varchar(255) COLLATE utf8mb4_general_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `tb_gender`
--

INSERT INTO `tb_gender` (`id`, `name`) VALUES
(1, 'Male'),
(2, 'Female');

-- --------------------------------------------------------

--
-- Table structure for table `tb_history`
--

CREATE TABLE `tb_history` (
  `id` bigint NOT NULL,
  `date` date NOT NULL,
  `remarked` varchar(255) DEFAULT NULL,
  `employee` bigint DEFAULT NULL,
  `leave_request` bigint NOT NULL,
  `leave_status` bigint DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `tb_history`
--

INSERT INTO `tb_history` (`id`, `date`, `remarked`, `employee`, `leave_request`, `leave_status`) VALUES
(1, '2023-07-11', NULL, 22, 1, 1),
(2, '2023-07-11', NULL, 3, 1, 2),
(3, '2023-07-11', NULL, 22, 2, 1),
(4, '2023-07-11', NULL, 3, 2, 2),
(5, '2023-07-11', NULL, 22, 3, 1),
(6, '2023-07-11', NULL, 3, 3, 2),
(7, '2023-07-11', NULL, 20, 4, 1),
(8, '2023-07-11', NULL, 3, 4, 2),
(9, '2023-07-11', NULL, 20, 5, 1),
(10, '2023-07-11', NULL, 3, 5, 2),
(11, '2023-07-11', NULL, 20, 6, 1),
(12, '2023-07-11', NULL, 3, 6, 2),
(13, '2023-07-11', NULL, 20, 7, 1),
(14, '2023-07-11', NULL, 3, 7, 2),
(15, '2023-07-11', NULL, 20, 8, 1),
(16, '2023-07-11', NULL, 3, 8, 2);

-- --------------------------------------------------------

--
-- Table structure for table `tb_leave_balance`
--

CREATE TABLE `tb_leave_balance` (
  `id` bigint NOT NULL,
  `current_year` int NOT NULL,
  `last_year` int NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `tb_leave_balance`
--

INSERT INTO `tb_leave_balance` (`id`, `current_year`, `last_year`) VALUES
(7, 4, 0),
(20, -1, 0),
(21, -2, 0),
(22, -2, 0);

-- --------------------------------------------------------

--
-- Table structure for table `tb_leave_request`
--

CREATE TABLE `tb_leave_request` (
  `id` bigint NOT NULL,
  `attachment` varchar(255) DEFAULT NULL,
  `duration` int DEFAULT NULL,
  `end_date` date DEFAULT NULL,
  `notes` varchar(255) NOT NULL,
  `start_date` date NOT NULL,
  `employee` bigint DEFAULT NULL,
  `current_status` bigint DEFAULT NULL,
  `leave_type` bigint DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `tb_leave_request`
--

INSERT INTO `tb_leave_request` (`id`, `attachment`, `duration`, `end_date`, `notes`, `start_date`, `employee`, `current_status`, `leave_type`) VALUES
(1, NULL, NULL, '2023-07-17', 'asdas', '2023-07-12', 22, 2, 6),
(2, NULL, NULL, '2023-07-17', 'asdasd', '2023-07-12', 22, 2, 6),
(3, NULL, 3, '2023-07-17', 'asdasda', '2023-07-13', 22, 2, 6),
(4, NULL, 3, '2023-07-17', 'ikuu', '2023-07-13', 20, 2, 6),
(5, NULL, 3, '2023-07-17', 'sik rek', '2023-07-13', 20, 2, 6),
(6, NULL, 2, '2023-07-13', 'asdasda', '2023-07-12', 20, 2, 6),
(7, NULL, 3, '2023-07-20', '', '2023-07-18', 20, 2, 6),
(8, NULL, 2, '2023-07-13', 'adasda', '2023-07-12', 20, 2, 6);

--
-- Triggers `tb_leave_request`
--
DELIMITER $$
CREATE TRIGGER `calculate_duration_leave` BEFORE INSERT ON `tb_leave_request` FOR EACH ROW BEGIN
    DECLARE start_date DATE;
    DECLARE end_date DATE;
    DECLARE duration INT;
    
    SET start_date = NEW.start_date;
    SET end_date = NEW.end_date;
    SET duration = 0;

    WHILE start_date <= end_date DO
        SET duration = duration + CASE WHEN WEEKDAY(start_date) IN (5, 6) THEN 0 ELSE 1 END;
        SET start_date = DATE_ADD(start_date, INTERVAL 1 DAY);
    END WHILE;

    SET NEW.duration = duration;
END
$$
DELIMITER ;
DELIMITER $$
CREATE TRIGGER `calculate_duration_leave_update` BEFORE UPDATE ON `tb_leave_request` FOR EACH ROW BEGIN
    DECLARE start_date DATE;
    DECLARE end_date DATE;
    DECLARE duration INT;
    
    SET start_date = NEW.start_date;
    SET end_date = NEW.end_date;
    SET duration = 0;

    WHILE start_date <= end_date DO
        SET duration = duration + CASE WHEN WEEKDAY(start_date) IN (5, 6) THEN 0 ELSE 1 END;
        SET start_date = DATE_ADD(start_date, INTERVAL 1 DAY);
    END WHILE;

    SET NEW.duration = duration;
END
$$
DELIMITER ;
DELIMITER $$
CREATE TRIGGER `update_leave_balance` AFTER UPDATE ON `tb_leave_request` FOR EACH ROW BEGIN
    DECLARE last_year INT;
    DECLARE remaining_duration INT;
    
    
    SELECT last_year INTO last_year FROM tb_leave_balance WHERE id = (SELECT employee FROM tb_leave_request WHERE id = NEW.id);
    
    SET remaining_duration = (SELECT duration FROM tb_leave_request WHERE id = NEW.id) - last_year;
    
    IF NEW.current_status = 2 THEN
        IF last_year >= (SELECT duration FROM tb_leave_request WHERE id = NEW.id) THEN
        
            UPDATE tb_leave_balance
            SET last_year = last_year - (SELECT duration FROM tb_leave_request WHERE id = NEW.id)
            WHERE id = (SELECT employee FROM tb_leave_request WHERE id = NEW.id);
        ELSE
        
            UPDATE tb_leave_balance
            SET last_year = 0,
                current_year = current_year - remaining_duration
            WHERE id = (SELECT employee FROM tb_leave_request WHERE id = NEW.id);
        END IF;
    END IF;
END
$$
DELIMITER ;

-- --------------------------------------------------------

--
-- Table structure for table `tb_leave_status`
--

CREATE TABLE `tb_leave_status` (
  `id` bigint NOT NULL,
  `name` varchar(25) COLLATE utf8mb4_general_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `tb_leave_status`
--

INSERT INTO `tb_leave_status` (`id`, `name`) VALUES
(1, 'Pending'),
(2, 'Accepted'),
(3, 'Rejected'),
(4, 'Canceled');

-- --------------------------------------------------------

--
-- Table structure for table `tb_leave_type`
--

CREATE TABLE `tb_leave_type` (
  `id` bigint NOT NULL,
  `day_num` int DEFAULT NULL,
  `name` varchar(255) COLLATE utf8mb4_general_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `tb_leave_type`
--

INSERT INTO `tb_leave_type` (`id`, `day_num`, `name`) VALUES
(1, 90, 'Maternity'),
(2, NULL, 'Sick'),
(3, 1, 'Merriage'),
(4, NULL, 'Workshop'),
(5, 1, 'Wedding'),
(6, NULL, 'Leave');

-- --------------------------------------------------------

--
-- Table structure for table `tb_parameter`
--

CREATE TABLE `tb_parameter` (
  `id` bigint NOT NULL,
  `value` int NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `tb_parameter`
--

INSERT INTO `tb_parameter` (`id`, `value`) VALUES
(1, 12);

-- --------------------------------------------------------

--
-- Table structure for table `tb_privilege`
--

CREATE TABLE `tb_privilege` (
  `id` bigint NOT NULL,
  `name` varchar(255) COLLATE utf8mb4_general_ci NOT NULL
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
(12, 'DELETE_MANAGER');

-- --------------------------------------------------------

--
-- Table structure for table `tb_role`
--

CREATE TABLE `tb_role` (
  `id` bigint NOT NULL,
  `name` varchar(255) COLLATE utf8mb4_general_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `tb_role`
--

INSERT INTO `tb_role` (`id`, `name`) VALUES
(1, 'Admin'),
(2, 'Employee'),
(3, 'Manager');

-- --------------------------------------------------------

--
-- Table structure for table `tb_role_previlege`
--

CREATE TABLE `tb_role_previlege` (
  `role_id` bigint NOT NULL,
  `privilege_id` bigint NOT NULL
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
(3, 12);

-- --------------------------------------------------------

--
-- Table structure for table `tb_user`
--

CREATE TABLE `tb_user` (
  `id` bigint NOT NULL,
  `is_account_non_locked` bit(1) DEFAULT NULL,
  `is_enabled` bit(1) DEFAULT NULL,
  `password` varchar(255) COLLATE utf8mb4_general_ci NOT NULL,
  `username` varchar(255) COLLATE utf8mb4_general_ci NOT NULL,
  `role` bigint DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `tb_user`
--

INSERT INTO `tb_user` (`id`, `is_account_non_locked`, `is_enabled`, `password`, `username`, `role`) VALUES
(1, b'1', b'1', '$2a$10$3mLqd3mmmKTeOABJLSFgc.JJy8pP3rHUb4xt.LaaOSvik/D5jiIsO', 'tono', 1),
(2, b'1', b'1', '$2a$10$BQvxVQLL1D2YVg9a0CU.wOnP5VwIOCz6bHXZ.W32pbc4aCUS59g32', 'jeni', 1),
(3, b'1', b'1', '$2a$10$5bb6WbzCW/eZSc8WGxXwv.gTvvTEkTf99K6xNZk5g1IZnQwQYAqES', 'pedro', 3),
(4, b'1', b'1', '$2a$10$RLlaLgJrdfbvlJpR4JQggOEr/lmd14MRvZg7bW8zy.UVoS891XOfS', 'samsul', 2),
(5, b'1', b'1', '$2a$10$0MuheQb2PAbK7vic2R/qHuLgRLoYc/duUxPK1pje3CIHK2PcApks2', 'fathur', 3),
(6, b'1', b'1', '$2a$10$3ESQzY2h473vMRLD.f6hrulTdT/hjDZpCcLnMfA5GEeM44s270YrG', 'admin', 1),
(7, b'1', b'1', '$2a$10$h52HYnM3UZZoAVf11giebOBkKE0M/LqQo5T312uu9HJnvyeh5/9ZC', 'husni', 2),
(8, b'1', b'1', '$2a$10$2hz6qDx9yvSaYNtA/brJZeNONQVMUPjAqDOwRRGNqso9TX63TBKsK', 'fariz', 2),
(12, b'1', b'1', '$2a$10$QORWTlJpzGDYNkcx2zkU9u4tT.fzHsfU0DqtlDQHz22BTMeVR.KYi', 'ponari', 2),
(13, b'1', b'1', '$2a$10$fseLu7Q0UDvv7xaAw5VmkuHocewhVCPT1jGmnBnHju.0bjdY8slfu', 'gunawan', 1),
(20, b'1', b'1', '$2a$10$Q4K8j67wjLJpv4Gxz/lsMuaUc3jY7lxL3Hrg.XmY3VADCVNMrQfWi', 'pirlo', 2),
(21, b'1', b'1', '$2a$10$Li/797VffHQerN9Lo1K27.an.dPAUzv5dQJ/UebKVw1kR894GG31W', 'pok', 3),
(22, b'1', b'1', '$2a$10$ILO9yCVyCS1/nj5lYwgo9utFRRDdVbp.nAcVLAyvjQwxQ7vzQUEwm', 'lali', 2);

--
-- Triggers `tb_user`
--
DELIMITER $$
CREATE TRIGGER `create_leave_balance` AFTER INSERT ON `tb_user` FOR EACH ROW BEGIN
    INSERT INTO tb_leave_balance (id, current_year, last_year) VALUES (NEW.id, 13-MONTH(NOW()), 0);
END
$$
DELIMITER ;

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
  MODIFY `id` bigint NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- AUTO_INCREMENT for table `tb_employee`
--
ALTER TABLE `tb_employee`
  MODIFY `id` bigint NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=23;

--
-- AUTO_INCREMENT for table `tb_gender`
--
ALTER TABLE `tb_gender`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `tb_history`
--
ALTER TABLE `tb_history`
  MODIFY `id` bigint NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=17;

--
-- AUTO_INCREMENT for table `tb_leave_request`
--
ALTER TABLE `tb_leave_request`
  MODIFY `id` bigint NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;

--
-- AUTO_INCREMENT for table `tb_leave_status`
--
ALTER TABLE `tb_leave_status`
  MODIFY `id` bigint NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT for table `tb_leave_type`
--
ALTER TABLE `tb_leave_type`
  MODIFY `id` bigint NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- AUTO_INCREMENT for table `tb_parameter`
--
ALTER TABLE `tb_parameter`
  MODIFY `id` bigint NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `tb_privilege`
--
ALTER TABLE `tb_privilege`
  MODIFY `id` bigint NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=13;

--
-- AUTO_INCREMENT for table `tb_role`
--
ALTER TABLE `tb_role`
  MODIFY `id` bigint NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

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

DELIMITER $$
--
-- Events
--
CREATE DEFINER=`root`@`localhost` EVENT `reset_leave_balance` ON SCHEDULE EVERY 1 YEAR STARTS '2023-01-01 00:00:00' ON COMPLETION NOT PRESERVE ENABLE DO UPDATE tb_leave_balance
    SET last_year = current_year,
        current_year = (SELECT value FROM tb_parameter WHERE id = 1)$$

CREATE DEFINER=`root`@`localhost` EVENT `reset_leave_balance_again` ON SCHEDULE EVERY 1 YEAR STARTS '2023-07-01 00:00:00' ON COMPLETION NOT PRESERVE ENABLE DO UPDATE tb_leave_balance
    SET last_year = 0$$

DELIMITER ;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
