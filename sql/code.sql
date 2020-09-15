/*
Navicat MySQL Data Transfer

Source Server         : 我的数据库
Source Server Version : 80012
Source Host           : localhost:3306
Source Database       : kamo

Target Server Type    : MYSQL
Target Server Version : 80012
File Encoding         : 65001

Date: 2020-04-29 12:02:30
*/

SET FOREIGN_KEY_CHECKS=0;

-- ----------------------------
-- Table structure for code
-- ----------------------------
DROP TABLE IF EXISTS `code`;
CREATE TABLE `code` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT COMMENT '表id',
  `email` varchar(50) NOT NULL DEFAULT '' COMMENT '用户邮箱',
  `code` varchar(6) NOT NULL DEFAULT '' COMMENT '验证码',
  `created_at` datetime NOT NULL,
  `updated_at` datetime NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=9 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of code
-- ----------------------------
INSERT INTO `code` VALUES ('8', 'kangliuyong@126.com', '881254', '2020-04-28 09:28:39', '2020-04-28 09:28:39');
