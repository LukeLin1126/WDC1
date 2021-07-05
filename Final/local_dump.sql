-- MySQL dump 10.13  Distrib 5.6.51, for osx10.16 (x86_64)
--
-- Host: bt-02-test.in.llycloud.com    Database: wdc-final
-- ------------------------------------------------------
-- Server version	5.5.5-10.4.15-MariaDB-log

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `category`
--

DROP TABLE IF EXISTS `category`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `category` (
  `category_id` int(13) NOT NULL AUTO_INCREMENT,
  `category_name` varchar(255) NOT NULL,
  `category_description` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`category_id`)
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `category`
--

LOCK TABLES `category` WRITE;
/*!40000 ALTER TABLE `category` DISABLE KEYS */;
INSERT INTO `category` VALUES (1,'Action games','Action games desc'),(2,'Action-adventure games','Action-adventure games desc'),(3,'Adventure games','Adventure games desc'),(4,'Role-playing games','Role-playing games desc'),(5,'Simulation games','Simulation games desc'),(6,'Strategy games','Strategy games desc');
/*!40000 ALTER TABLE `category` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `game`
--

DROP TABLE IF EXISTS `game`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `game` (
  `game_id` int(13) NOT NULL AUTO_INCREMENT,
  `game_name` varchar(255) NOT NULL,
  `category` int(13) DEFAULT NULL,
  `platform` int(5) DEFAULT NULL,
  `features` varchar(255) DEFAULT NULL,
  `price` double(13,2) DEFAULT NULL,
  PRIMARY KEY (`game_id`),
  KEY `game_platform_platform_id_fk` (`platform`),
  KEY `game_category_category_id_fk` (`category`),
  CONSTRAINT `game_category_category_id_fk` FOREIGN KEY (`category`) REFERENCES `category` (`category_id`),
  CONSTRAINT `game_platform_platform_id_fk` FOREIGN KEY (`platform`) REFERENCES `platform` (`platform_id`)
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `game`
--

LOCK TABLES `game` WRITE;
/*!40000 ALTER TABLE `game` DISABLE KEYS */;
INSERT INTO `game` VALUES (1,'game_01',1,1,'featrues_1',25.56),(2,'game_02',2,2,'featrues_2',35.66),(3,'game_03',3,3,'featrues_3',14.50),(4,'game_04',4,4,'featrues_4',27.77),(5,'game_05',5,5,'featrues_5',40.99),(6,'game_06',6,1,'featrues_6',19.99);
/*!40000 ALTER TABLE `game` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `order`
--

DROP TABLE IF EXISTS `order`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `order` (
  `user_id` int(13) DEFAULT NULL,
  `game_id` int(13) DEFAULT NULL,
  `order_id` int(16) NOT NULL AUTO_INCREMENT,
  `purchase_timestamp` datetime DEFAULT NULL,
  PRIMARY KEY (`order_id`),
  KEY `order_user_user_id_fk` (`user_id`),
  KEY `order_game_game_id_fk` (`game_id`),
  CONSTRAINT `order_game_game_id_fk` FOREIGN KEY (`game_id`) REFERENCES `game` (`game_id`),
  CONSTRAINT `order_user_user_id_fk` FOREIGN KEY (`user_id`) REFERENCES `user` (`user_id`)
) ENGINE=InnoDB AUTO_INCREMENT=15 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `order`
--

LOCK TABLES `order` WRITE;
/*!40000 ALTER TABLE `order` DISABLE KEYS */;
INSERT INTO `order` VALUES (1,2,1,'2021-06-30 13:23:51'),(5,4,6,'2021-06-19 13:23:51'),(6,1,7,'2021-06-17 13:23:51'),(4,4,8,'2021-06-21 13:23:51'),(5,1,9,'2021-06-20 13:23:51'),(4,6,10,'2021-04-30 13:23:51'),(5,2,11,'2021-06-22 13:23:51'),(4,1,12,'2021-05-30 13:23:51'),(1,6,13,'2021-04-25 13:23:51'),(7,6,14,'2020-04-25 13:23:51');
/*!40000 ALTER TABLE `order` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `platform`
--

DROP TABLE IF EXISTS `platform`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `platform` (
  `platform_id` int(5) NOT NULL AUTO_INCREMENT,
  `platform_name` varchar(255) NOT NULL,
  `platform_description` varchar(1024) DEFAULT NULL,
  PRIMARY KEY (`platform_id`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `platform`
--

LOCK TABLES `platform` WRITE;
/*!40000 ALTER TABLE `platform` DISABLE KEYS */;
INSERT INTO `platform` VALUES (1,'console','console_platform'),(2,'PC','PC_platform'),(3,'Mac','Mac_platform'),(4,'IOS','IOS_platform'),(5,'Android','android_platform');
/*!40000 ALTER TABLE `platform` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `user`
--

DROP TABLE IF EXISTS `user`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `user` (
  `user_id` int(13) NOT NULL AUTO_INCREMENT,
  `username` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  `email_address` varchar(255) DEFAULT NULL,
  `address` int(13) DEFAULT NULL,
  `phone_number` int(10) NOT NULL,
  `create_by` varchar(255) DEFAULT NULL,
  `create_time` date DEFAULT NULL,
  `update_by` varchar(255) DEFAULT NULL,
  `update_time` date DEFAULT NULL,
  PRIMARY KEY (`user_id`),
  UNIQUE KEY `user_phone_number_uindex` (`phone_number`),
  UNIQUE KEY `user_username_uindex` (`username`),
  UNIQUE KEY `user_email_address_uindex` (`email_address`),
  KEY `user_user_address_address_id_fk` (`address`),
  CONSTRAINT `user_user_address_address_id_fk` FOREIGN KEY (`address`) REFERENCES `user_address` (`address_id`)
) ENGINE=InnoDB AUTO_INCREMENT=8 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `user`
--

LOCK TABLES `user` WRITE;
/*!40000 ALTER TABLE `user` DISABLE KEYS */;
INSERT INTO `user` VALUES (1,'Akide_Liu','IAMpassword','mail@llycloud.com',1,450460666,'Admin','2021-06-16','Admin','2021-06-16'),(4,'Akide_Liu1','IAMpassword','mail1@llycloud.com',1,450460661,'Admin','2021-06-16','Admin','2021-06-16'),(5,'Akide_Liu2','IAMpassword','mail2@llycloud.com',1,450460662,'Admin','2021-06-16','Admin','2021-06-16'),(6,'Akide_Liu3','IAMpassword','mail3@llycloud.com',1,450460663,'Admin','2021-06-16','Admin','2021-06-16'),(7,'Akide_Liu4','IAMpassword','mail4@llycloud.com',1,450460664,'Admin','2021-06-16','Admin','2021-06-16');
/*!40000 ALTER TABLE `user` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `user_address`
--

DROP TABLE IF EXISTS `user_address`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `user_address` (
  `address_id` int(13) NOT NULL AUTO_INCREMENT,
  `street_address` varchar(1024) NOT NULL,
  `suburb_town` varchar(255) NOT NULL,
  `state` varchar(255) NOT NULL,
  `country` varchar(255) NOT NULL,
  `postCode` varchar(20) NOT NULL,
  PRIMARY KEY (`address_id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `user_address`
--

LOCK TABLES `user_address` WRITE;
/*!40000 ALTER TABLE `user_address` DISABLE KEYS */;
INSERT INTO `user_address` VALUES (1,'421 King William St','Adelaide','SA','AU','5000');
/*!40000 ALTER TABLE `user_address` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2021-07-01  4:26:20
