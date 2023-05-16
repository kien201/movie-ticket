-- MySQL dump 10.13  Distrib 8.0.32, for Win64 (x86_64)
--
-- Host: localhost    Database: movieticket
-- ------------------------------------------------------
-- Server version	8.0.32
use movieticket;
/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Dumping data for table `cinema`
--

LOCK TABLES `cinema` WRITE;
/*!40000 ALTER TABLE `cinema` DISABLE KEYS */;
INSERT INTO `cinema` VALUES (9,_binary '','admin','2023-04-12 16:13:19.348000','admin','2023-04-12 16:13:19.348000','HN','a');
/*!40000 ALTER TABLE `cinema` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Dumping data for table `food`
--

LOCK TABLES `food` WRITE;
/*!40000 ALTER TABLE `food` DISABLE KEYS */;
INSERT INTO `food` VALUES (38,_binary '','admin','2023-04-20 10:24:26.408000','admin','2023-04-20 10:26:00.201000',NULL,'test',5555,'test-1681961160198.jpg');
/*!40000 ALTER TABLE `food` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Dumping data for table `movie`
--

LOCK TABLES `movie` WRITE;
/*!40000 ALTER TABLE `movie` DISABLE KEYS */;
INSERT INTO `movie` VALUES (37,_binary '','admin','2023-04-14 15:57:37.163000','admin','2023-04-17 15:45:53.721000',NULL,NULL,NULL,NULL,NULL,'Thử slug với unicode',NULL,'thu-slug-voi-unicode-1681721153730','test-1681721149590.jpg');
/*!40000 ALTER TABLE `movie` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Dumping data for table `role`
--

LOCK TABLES `role` WRITE;
/*!40000 ALTER TABLE `role` DISABLE KEYS */;
INSERT INTO `role` VALUES (1,_binary '',NULL,'2023-04-12 13:16:45.682000',NULL,'2023-04-12 13:16:45.682000','Xem trang quản trị','SHOW_ADMIN'),(2,_binary '',NULL,'2023-04-12 13:16:45.748000',NULL,'2023-04-12 13:16:45.748000','Cập nhật rạp, phòng và chỗ ngồi','MANAGE_CINEMA'),(3,_binary '',NULL,'2023-04-12 13:16:45.757000',NULL,'2023-04-12 13:16:45.757000','Cập nhật đồ ăn','MANAGE_FOOD'),(4,_binary '',NULL,'2023-04-12 13:16:45.765000',NULL,'2023-04-12 13:16:45.765000','Cập nhật movie','MANAGE_MOVIE'),(5,_binary '',NULL,'2023-04-12 13:16:45.770000',NULL,'2023-04-12 13:16:45.770000','Cập nhật lịch chiếu','MANAGE_SHOWTIME'),(6,_binary '',NULL,'2023-04-12 13:16:45.773000',NULL,'2023-04-12 13:16:45.773000','Cập nhật người dùng','MANAGE_USER');
/*!40000 ALTER TABLE `role` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Dumping data for table `room`
--

LOCK TABLES `room` WRITE;
/*!40000 ALTER TABLE `room` DISABLE KEYS */;
INSERT INTO `room` VALUES (14,_binary '','admin','2023-04-12 17:05:44.259000','admin','2023-04-12 17:05:44.259000','room1',9),(33,_binary '','admin','2023-04-13 09:15:43.344000','admin','2023-04-13 09:15:43.344000','room5',9);
/*!40000 ALTER TABLE `room` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Dumping data for table `seat`
--

LOCK TABLES `seat` WRITE;
/*!40000 ALTER TABLE `seat` DISABLE KEYS */;
/*!40000 ALTER TABLE `seat` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Dumping data for table `seattype`
--

LOCK TABLES `seattype` WRITE;
/*!40000 ALTER TABLE `seattype` DISABLE KEYS */;
/*!40000 ALTER TABLE `seattype` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Dumping data for table `seq_generator_id`
--

LOCK TABLES `seq_generator_id` WRITE;
/*!40000 ALTER TABLE `seq_generator_id` DISABLE KEYS */;
INSERT INTO `seq_generator_id` VALUES (49),(49),(49),(49),(49),(49),(49),(49),(49),(49),(49);
/*!40000 ALTER TABLE `seq_generator_id` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Dumping data for table `showtime`
--

LOCK TABLES `showtime` WRITE;
/*!40000 ALTER TABLE `showtime` DISABLE KEYS */;
/*!40000 ALTER TABLE `showtime` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Dumping data for table `ticket`
--

LOCK TABLES `ticket` WRITE;
/*!40000 ALTER TABLE `ticket` DISABLE KEYS */;
/*!40000 ALTER TABLE `ticket` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Dumping data for table `ticketdetail`
--

LOCK TABLES `ticketdetail` WRITE;
/*!40000 ALTER TABLE `ticketdetail` DISABLE KEYS */;
/*!40000 ALTER TABLE `ticketdetail` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Dumping data for table `user`
--

LOCK TABLES `user` WRITE;
/*!40000 ALTER TABLE `user` DISABLE KEYS */;
INSERT INTO `user` VALUES (7,_binary '',NULL,'2023-04-12 13:16:46.003000',NULL,'2023-04-12 13:16:46.003000',NULL,NULL,'$2a$10$eEcpxGVBHD/Vk6jjXP/yju5Sv.Qu/Vr260eV8KO8H5ofU1NhU4q/u',NULL,'admin'),(8,_binary '','admin','2023-04-12 13:25:14.804000','admin','2023-04-12 13:41:56.626000',NULL,'Kien Tran','$2a$10$EhEJi3zDnjFnPRYgS/dDe.gbZslIrFh7czMkt6HB2p6HN9xYM1N.a',NULL,'kien'),(48,_binary '','admin','2023-05-03 23:37:16.838000','admin','2023-05-03 23:37:16.838000','d@gg.cc','t','$2a$10$J5o5ARacIX/QMrYzwpF8YOLAWyg3Twi9Wnpc3kyDqJShbI1IFKCJq','0432432424','admin1');
/*!40000 ALTER TABLE `user` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Dumping data for table `user_role`
--

LOCK TABLES `user_role` WRITE;
/*!40000 ALTER TABLE `user_role` DISABLE KEYS */;
INSERT INTO `user_role` VALUES (7,1),(8,1),(7,2),(7,3),(7,4),(7,5),(7,6);
/*!40000 ALTER TABLE `user_role` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2023-05-04  9:35:43
