-- MySQL dump 10.13  Distrib 5.6.51, for osx10.16 (x86_64)
--
-- Host: bt-02-test.in.llycloud.com    Database:
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
-- Current Database: `enrolment`
--

CREATE DATABASE /*!32312 IF NOT EXISTS*/ `enrolment` /*!40100 DEFAULT CHARACTER SET utf8 */;

USE `enrolment`;

--
-- Table structure for table `Enrolments`
--

DROP TABLE IF EXISTS `Enrolments`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `Enrolments` (
                              `student_id` char(30) NOT NULL,
                              `subject_code` char(50) DEFAULT NULL,
                              `mark` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Enrolments`
--

LOCK TABLES `Enrolments` WRITE;
/*!40000 ALTER TABLE `Enrolments` DISABLE KEYS */;
INSERT INTO `Enrolments` VALUES ('a1111111','COMP SCI 1102',62),('a1111111','COMP SCI 2000	',80),('a1111112','COMP SCI 1102',55),('a1111112','COMP SCI 2207',55),('a1111113','PHIL 2039',65),('a1111113','COMP SCI 1102',46),('a1111114','COMP SCI 2207',67),('a1111114','COMP SCI 2000',49);
/*!40000 ALTER TABLE `Enrolments` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `Students`
--

DROP TABLE IF EXISTS `Students`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `Students` (
                            `student_id` char(30) NOT NULL,
                            `given_name` char(30) DEFAULT NULL,
                            `family_name` char(30) DEFAULT NULL,
                            `program` char(30) DEFAULT NULL,
                            PRIMARY KEY (`student_id`),
                            UNIQUE KEY `Students_student_id_uindex` (`student_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Students`
--

LOCK TABLES `Students` WRITE;
/*!40000 ALTER TABLE `Students` DISABLE KEYS */;
INSERT INTO `Students` VALUES ('a1111111','Fang','Li','BE(Hons)(Soft)'),('a1111112','Jane','Brown','BE(Hons)(Soft)\n'),('a1111113','Bob','Smith','BCompSc'),('a1111114','Wei','Zhang','BCompSc');
/*!40000 ALTER TABLE `Students` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `Subjects`
--

DROP TABLE IF EXISTS `Subjects`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `Subjects` (
                            `subject_code` char(30) NOT NULL,
                            `subject` char(100) DEFAULT NULL,
                            `faculty` char(10) DEFAULT NULL,
                            PRIMARY KEY (`subject_code`),
                            UNIQUE KEY `Subjects_subject_code_uindex` (`subject_code`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Subjects`
--

LOCK TABLES `Subjects` WRITE;
/*!40000 ALTER TABLE `Subjects` DISABLE KEYS */;
INSERT INTO `Subjects` VALUES ('COMP SCI 1102','Object Oriented Programming','ECMS'),('COMP SCI 2000','Computer Systems','ECMS'),('COMP SCI 2207','Web and Database Computing','ECMS'),('PHIL 2039','Philosophy of Mind','Arts');
/*!40000 ALTER TABLE `Subjects` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2021-04-06 15:52:07
