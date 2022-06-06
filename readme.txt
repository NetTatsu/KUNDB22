개발 환경 통합 설정

.env 기본값 
DATABASE_HOST = localhost
DATABASE_USER = (mysql id 기본값 : root)
DATABASE_PASSWORD = (mysql password)
DATABASE = errand

Mysql DB 이름 errand

순서대로 sql문 실행(순서대로 하지 않을경우 외래키 오류)

CREATE TABLE `member` (
  `userid` char(10) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `password` char(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `point` int NOT NULL DEFAULT '50',
  `name` char(10) NOT NULL,
  `age` char(8) DEFAULT NULL,
  `phone` char(11) DEFAULT NULL,
  `email` char(20) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci DEFAULT NULL,
  PRIMARY KEY (`userid`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci

CREATE TABLE `category` (
  `name` char(20) NOT NULL,
  PRIMARY KEY (`name`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci

CREATE TABLE `post` (
  `postid` int unsigned NOT NULL AUTO_INCREMENT,
  `title` char(30) NOT NULL,
  `contents` text CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci,
  `address` char(50) DEFAULT NULL,
  `userid` char(10) DEFAULT NULL,
  `category` char(20) DEFAULT NULL,
  PRIMARY KEY (`postid`),
  KEY `userid` (`userid`),
  KEY `category` (`category`),
  CONSTRAINT `post_ibfk_1` FOREIGN KEY (`userid`) REFERENCES `member` (`userid`) ON UPDATE CASCADE,
  CONSTRAINT `post_ibfk_2` FOREIGN KEY (`category`) REFERENCES `category` (`name`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci

CREATE TABLE `chat_room` (
  `roomid` int unsigned NOT NULL AUTO_INCREMENT,
  `userid` char(10) DEFAULT NULL,
  `postid` int unsigned NOT NULL,
  PRIMARY KEY (`roomid`),
  KEY `postid` (`postid`),
  KEY `chat_room_ibfk_1` (`userid`),
  CONSTRAINT `chat_room_ibfk_1` FOREIGN KEY (`userid`) REFERENCES `member` (`userid`),
  CONSTRAINT `chat_room_ibfk_2` FOREIGN KEY (`postid`) REFERENCES `post` (`postid`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci

CREATE TABLE `chat` (
  `chatid` int unsigned NOT NULL AUTO_INCREMENT,
  `roomid` int unsigned NOT NULL,
  `userid` char(10) NOT NULL,
  `contents` text NOT NULL,
  `time` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`chatid`),
  KEY `roomid` (`roomid`),
  KEY `userid` (`userid`),
  CONSTRAINT `chat_ibfk_1` FOREIGN KEY (`roomid`) REFERENCES `chat_room` (`roomid`),
  CONSTRAINT `chat_ibfk_2` FOREIGN KEY (`userid`) REFERENCES `member` (`userid`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci

CREATE TABLE `post_state` (
  `postid` int unsigned NOT NULL,
  `roomid` int unsigned NOT NULL,
  `state` char(10) NOT NULL DEFAULT '구인중',
  PRIMARY KEY (`postid`),
  KEY `chat_room_userid` (`roomid`),
  CONSTRAINT `post_state_ibfk_1` FOREIGN KEY (`postid`) REFERENCES `post` (`postid`),
  CONSTRAINT `post_state_ibfk_3` FOREIGN KEY (`roomid`) REFERENCES `chat_room` (`roomid`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci


ALTER TABLE post ADD pay INT NOT NULL 