/*
Navicat MySQL Data Transfer

Source Server         : 我的数据库
Source Server Version : 80012
Source Host           : localhost:3306
Source Database       : kamo

Target Server Type    : MYSQL
Target Server Version : 80012
File Encoding         : 65001

Date: 2020-04-29 12:02:39
*/

SET FOREIGN_KEY_CHECKS=0;

-- ----------------------------
-- Table structure for director
-- ----------------------------
DROP TABLE IF EXISTS `director`;
CREATE TABLE `director` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT COMMENT '表id',
  `director_id` varchar(50) NOT NULL DEFAULT '' COMMENT '导演id',
  `move_id` varchar(30) NOT NULL DEFAULT '' COMMENT '电影id',
  `name` varchar(30) NOT NULL DEFAULT '' COMMENT '导演名称',
  `created_at` datetime NOT NULL,
  `updated_at` datetime NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of director
-- ----------------------------
