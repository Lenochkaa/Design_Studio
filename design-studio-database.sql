-- MySQL dump 10.13  Distrib 8.0.40, for Win64 (x86_64)
--
-- Host: 127.0.0.1    Database: design_studio_database
-- ------------------------------------------------------
-- Server version	8.0.40

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
-- Table structure for table `contact_form`
--

DROP TABLE IF EXISTS `contact_form`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `contact_form` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(255) DEFAULT NULL,
  `email` varchar(255) DEFAULT NULL,
  `message` text,
  `status` enum('new','processed') DEFAULT 'new',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `contact_form`
--

LOCK TABLES `contact_form` WRITE;
/*!40000 ALTER TABLE `contact_form` DISABLE KEYS */;
INSERT INTO `contact_form` VALUES (1,'Olena','olenatest@gmail.com','I am interested in apartment design.','processed'),(2,'Volodymyr','tkvova@gmail.com','I am interested in redisigning restaurant.','processed'),(3,'Kyrylo','kyrylo_business@gmail.com','Project Type: basic\nStyle: premium\nDeadline: soon\nEstimated Price: 45.00 USD/m²','processed'),(4,'Olena','test1@gmail.com','Test','processed'),(5,'Olena','test1@gmail.com','Project Type: technical\nStyle: premium\nDeadline: soon\nEstimated Price: 30.00 USD/m²','processed'),(6,'Maria','maria_les@gmail.com','I would like to receive consultation on the restoration of an old country estate.','new');
/*!40000 ALTER TABLE `contact_form` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `meetings`
--

DROP TABLE IF EXISTS `meetings`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `meetings` (
  `id` int NOT NULL AUTO_INCREMENT,
  `project_id` int NOT NULL,
  `date` datetime NOT NULL,
  `type` enum('online','offline') NOT NULL,
  `topic` varchar(255) NOT NULL,
  `status` enum('scheduled','done') DEFAULT 'scheduled',
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  KEY `project_id` (`project_id`),
  CONSTRAINT `meetings_ibfk_1` FOREIGN KEY (`project_id`) REFERENCES `projects` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=17 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `meetings`
--

LOCK TABLES `meetings` WRITE;
/*!40000 ALTER TABLE `meetings` DISABLE KEYS */;
INSERT INTO `meetings` VALUES (12,2,'2026-01-16 12:10:00','online','Check design plans','done','2026-01-13 12:33:45'),(13,2,'2026-01-26 11:40:00','offline','I have new ideas for restroom','scheduled','2026-01-13 12:39:01'),(14,1,'2026-01-30 11:20:00','online','I want to discuss the deadline for completing the drawings. ','done','2026-01-27 13:00:37'),(16,1,'2026-02-10 12:50:00','online','I have a few new requests regarding the renovation.','scheduled','2026-01-27 13:10:23');
/*!40000 ALTER TABLE `meetings` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `projects`
--

DROP TABLE IF EXISTS `projects`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `projects` (
  `id` int NOT NULL AUTO_INCREMENT,
  `contract_code` varchar(9) NOT NULL,
  `project_name` varchar(255) NOT NULL,
  `status` enum('contract_signed','briefing','concept_development','layout_planning','design_approval','working_drawings','contractor_search','materials_selection','budget_approval','implementation','author_supervision','completed') DEFAULT 'contract_signed',
  `description` text,
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `meeting_required` tinyint(1) DEFAULT '0',
  PRIMARY KEY (`id`),
  KEY `fk_projects_user` (`contract_code`),
  CONSTRAINT `fk_projects_user` FOREIGN KEY (`contract_code`) REFERENCES `users` (`contract_code`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `projects`
--

LOCK TABLES `projects` WRITE;
/*!40000 ALTER TABLE `projects` DISABLE KEYS */;
INSERT INTO `projects` VALUES (1,'123456789','Country house renovation','working_drawings','Country house renovation in modern style','2026-01-04 17:52:02','2026-01-09 12:46:32',0),(2,'123456788','Interior design of a beauty salon','briefing','Interior design of a beauty salon in a modern style','2026-01-04 18:19:27','2026-01-09 14:26:10',0),(3,'123456777','sgdfg','contract_signed','dsfgf','2026-01-14 16:49:31','2026-01-14 16:49:31',0),(4,'123456799','project1','contract_signed','zdvdzzv','2026-01-14 16:53:21','2026-01-14 16:53:21',0);
/*!40000 ALTER TABLE `projects` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `users`
--

DROP TABLE IF EXISTS `users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `users` (
  `id` int NOT NULL AUTO_INCREMENT,
  `contract_code` char(9) NOT NULL,
  `password` varchar(255) NOT NULL,
  `role` enum('admin','client') DEFAULT 'client',
  `is_activated` tinyint(1) DEFAULT '0',
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  UNIQUE KEY `contract_code` (`contract_code`)
) ENGINE=InnoDB AUTO_INCREMENT=12 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `users`
--

LOCK TABLES `users` WRITE;
/*!40000 ALTER TABLE `users` DISABLE KEYS */;
INSERT INTO `users` VALUES (6,'ADMIN','$2b$10$UxSBRfRbwbwPedda3MEjAeUlaiq4ousrChKegzcGEmrZP.WgMegyy','admin',1,'2026-01-02 15:43:33'),(7,'123456789','$2b$10$OS2Gi65ouzyYIrMEp98gGuazi2PWXfYXIDAgqJn/a8uyD6Ug4wrfS','client',1,'2026-01-02 15:45:47'),(8,'123456788','$2b$10$WDlq4WYznjHqNoSMgTvYpOx7rrYo/g6RGRF6.wXcUcH2QzVIGTw76','client',1,'2026-01-02 16:00:44'),(9,'123456799','$2b$10$clePY8c/ygahoPW/F4fn4urKddCeC1yJOaXJeflKhDUpIc3CJ2HcS','client',1,'2026-01-07 18:23:19'),(10,'123456777','$2b$10$50xHFgB5UHwJErgw/XiSfelpSh1YbPJGjs4wI5Lv3RqmbaLtyFspa','client',1,'2026-01-14 14:50:18'),(11,'333333333','$2b$10$AOw7FJd6oIIadnH7S.Mxluhb1qjiUvaOf8LAXpDDl5Pq1V.kMMSWG','client',1,'2026-01-27 12:51:04');
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

-- Dump completed on 2026-01-31 15:02:50
