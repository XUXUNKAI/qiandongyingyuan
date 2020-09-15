/*
Navicat MySQL Data Transfer

Source Server         : 我的数据库
Source Server Version : 80012
Source Host           : localhost:3306
Source Database       : kamo

Target Server Type    : MYSQL
Target Server Version : 80012
File Encoding         : 65001

Date: 2020-04-29 12:02:52
*/

SET FOREIGN_KEY_CHECKS=0;

-- ----------------------------
-- Table structure for moviecover
-- ----------------------------
DROP TABLE IF EXISTS `moviecover`;
CREATE TABLE `moviecover` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT COMMENT '表id',
  `cover_id` varchar(50) NOT NULL DEFAULT '' COMMENT '电影封面id',
  `move_id` varchar(30) NOT NULL DEFAULT '' COMMENT '电影id',
  `url` varchar(100) NOT NULL DEFAULT '' COMMENT '电影封面',
  `created_at` datetime NOT NULL,
  `updated_at` datetime NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of moviecover
-- ----------------------------
