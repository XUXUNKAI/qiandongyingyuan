/*
Navicat MySQL Data Transfer

Source Server         : 我的数据库
Source Server Version : 80012
Source Host           : localhost:3306
Source Database       : kamo

Target Server Type    : MYSQL
Target Server Version : 80012
File Encoding         : 65001

Date: 2020-04-29 12:02:58
*/

SET FOREIGN_KEY_CHECKS=0;

-- ----------------------------
-- Table structure for performer
-- ----------------------------
DROP TABLE IF EXISTS `performer`;
CREATE TABLE `performer` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT COMMENT '表id',
  `performer_id` varchar(50) NOT NULL DEFAULT '' COMMENT '演员id',
  `move_id` varchar(30) NOT NULL DEFAULT '' COMMENT '电影id',
  `name` varchar(30) NOT NULL DEFAULT '' COMMENT '演员名称',
  `url` varchar(100) NOT NULL DEFAULT '' COMMENT '演员图片',
  `role` int(1) NOT NULL DEFAULT '2' COMMENT '演员主配角，1：主角，2：配角',
  `created_at` datetime NOT NULL,
  `updated_at` datetime NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of performer
-- ----------------------------
