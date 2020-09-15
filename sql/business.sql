/*
Navicat MySQL Data Transfer

Source Server         : 我的数据库
Source Server Version : 80012
Source Host           : localhost:3306
Source Database       : kamo

Target Server Type    : MYSQL
Target Server Version : 80012
File Encoding         : 65001

Date: 2020-04-29 12:02:20
*/

SET FOREIGN_KEY_CHECKS=0;

-- ----------------------------
-- Table structure for business
-- ----------------------------
DROP TABLE IF EXISTS `business`;
CREATE TABLE `business` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT COMMENT '表id',
  `user_id` varchar(30) NOT NULL DEFAULT '' COMMENT '用户id',
  `email` varchar(50) NOT NULL DEFAULT '' COMMENT '用户邮箱',
  `password` varchar(32) NOT NULL DEFAULT '' COMMENT '用户密码',
  `nickname` varchar(30) NOT NULL DEFAULT '' COMMENT '用户昵称',
  `avatar` varchar(255) NOT NULL DEFAULT 'http://127.0.0.1:10000/static/default.png' COMMENT '用户昵称',
  `created_at` datetime NOT NULL,
  `updated_at` datetime NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of business
-- ----------------------------
INSERT INTO `business` VALUES ('1', 'kamo1588037329645', 'kangliuyong@126.com', 'e7b2237c37c04e134b44b78697ddfbc9', '王小明', 'http://127.0.0.1:10000/static/default.png', '2020-04-28 09:28:49', '2020-04-28 09:28:49');
