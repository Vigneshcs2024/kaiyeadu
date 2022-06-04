-- MySQL dump 10.13  Distrib 8.0.29, for Linux (x86_64)
--
-- Host: localhost    Database: kaiyeadu_dev
-- ------------------------------------------------------
-- Server version	8.0.29-0ubuntu0.20.04.3

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8mb4 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `police_stations`
--

DROP TABLE IF EXISTS `police_stations`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `police_stations` (
  `id` char(36) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL,
  `name` varchar(255) NOT NULL,
  `area` varchar(255) NOT NULL,
  `district` varchar(255) NOT NULL,
  `createdAt` datetime DEFAULT NULL,
  `updatedAt` datetime DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `police_stations`
--

LOCK TABLES `police_stations` WRITE;
/*!40000 ALTER TABLE `police_stations` DISABLE KEYS */;
INSERT INTO `police_stations` VALUES ('54e1d636-8fe9-4e59-84ce-c2b43a19ba49','Police Station 8','Vandalur','Chennai','2022-05-18 06:42:14','2022-05-18 06:42:14'),('61629eb8-c653-42f9-81a8-f66ac454fab8','Police Station 4','Sooriyur','Trichy','2022-05-18 06:40:56','2022-05-18 06:40:56'),('94b60c77-12eb-45cd-8c32-3375cef711f0','Police Station 1','Anna Nagar','Madurai','2022-05-18 06:40:13','2022-05-18 06:40:13'),('a43c40cc-d10b-46e0-bcac-d4afbc4dc42c','Police Station 3','Guduvanchery','Chennai','2022-05-18 06:40:45','2022-05-18 06:40:45'),('b3bdd993-51e3-4e80-aaa2-8b9b8d297b30','Sample station','Sample area','Sample district',NULL,NULL),('b58c8866-5c3e-48f0-a3fe-12bf9fa5e541','Police Station 5','Mandayur','Trichy','2022-05-18 06:41:14','2022-05-18 06:41:14'),('c9066d17-cf16-4397-8bcd-870edbe8ecfa','Police Station 2','Perungalathur','Chennai','2022-05-18 06:40:32','2022-05-18 06:40:32'),('d4024a32-9020-46e0-9ebf-a6b06e941d2b','Police Station 9','Potheri','Chennai','2022-05-18 06:42:36','2022-05-18 06:42:36'),('d9176d88-e93e-4f00-8c3d-0c880ff67d93','Police Station 10','Maraimalai Nagar','Chengalpattu','2022-05-18 06:42:52','2022-05-18 06:42:52'),('e4737dd1-5e4a-47fa-876e-093b7375bd4a','Police Station 6','K.K.Nagar','Madurai','2022-05-18 06:41:39','2022-05-18 06:41:39'),('eaf91712-d998-4647-a9e4-ff3f099ec24a','Police Station 7','Tambaram','Chennai','2022-05-18 06:41:52','2022-05-18 06:41:52');
/*!40000 ALTER TABLE `police_stations` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `users`
--

DROP TABLE IF EXISTS `users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `users` (
  `id` char(36) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL,
  `gpf` char(10) DEFAULT NULL,
  `name` varchar(255) NOT NULL,
  `police_station` char(36) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL,
  `email` varchar(255) NOT NULL,
  `phone` char(10) NOT NULL,
  `password` varchar(255) DEFAULT NULL,
  `designation` enum('Gr II - PC','Gr I - PC','HC','SSI','SI','Inspr','DSP','ADSP','SP','DIG','IG') NOT NULL,
  `role` enum('user','admin','master') NOT NULL DEFAULT 'user',
  `createdAt` datetime DEFAULT NULL,
  `updatedAt` datetime DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `email` (`email`),
  UNIQUE KEY `phone` (`phone`),
  KEY `police_station` (`police_station`),
  CONSTRAINT `users_ibfk_1` FOREIGN KEY (`police_station`) REFERENCES `police_stations` (`id`) ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `users`
--

LOCK TABLES `users` WRITE;
/*!40000 ALTER TABLE `users` DISABLE KEYS */;
INSERT INTO `users` VALUES ('0ca1c4d5-72b9-4d05-991c-35dd02524796','TUSER00001','Admin','b3bdd993-51e3-4e80-aaa2-8b9b8d297b30','admin@email.com','9874563210','$2b$04$ZNt6MuE.Y2m96nRb.DxEnuaKPlmi/rl1M4dWXF5xCp2i00Bi3AM8G','SI','admin',NULL,'2022-05-27 15:34:21'),('49f0abed-a612-40ac-ac61-8b415e14fddc','TUSER00002','San','c9066d17-cf16-4397-8bcd-870edbe8ecfa','santhoshvelr@gmail.com','6382878078','','Gr II - PC','user','2022-05-19 06:50:37','2022-05-19 06:52:24'),('86265cc6-42e0-4d79-8df8-2e39976fffac','TUSER00003','Test','e4737dd1-5e4a-47fa-876e-093b7375bd4a','admin2@email.com','9876543210','$2b$04$ltDpiwt8Sq8P0rD/9dQzGeQ6SQZmN/738UjJP8i9Y1OkecxjOr7ES','SSI','master','2022-05-19 06:54:13','2022-05-19 06:59:40');
/*!40000 ALTER TABLE `users` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2022-06-04 22:40:35
