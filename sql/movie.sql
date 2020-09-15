/*
Navicat MySQL Data Transfer

Source Server         : 我的数据库
Source Server Version : 80012
Source Host           : localhost:3306
Source Database       : kamo

Target Server Type    : MYSQL
Target Server Version : 80012
File Encoding         : 65001

Date: 2020-04-29 12:02:46
*/

SET FOREIGN_KEY_CHECKS=0;

-- ----------------------------
-- Table structure for movie
-- ----------------------------
DROP TABLE IF EXISTS `movie`;
CREATE TABLE `movie` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT COMMENT '表id',
  `movie_id` varchar(30) NOT NULL DEFAULT '' COMMENT '电影id',
  `name` varchar(30) NOT NULL DEFAULT '' COMMENT '电影名称',
  `enname` varchar(30) NOT NULL DEFAULT '' COMMENT '电影英文名称',
  `desc` varchar(255) NOT NULL DEFAULT '' COMMENT '电影简介',
  `type` varchar(30) NOT NULL DEFAULT '' COMMENT '电影类型',
  `duration` varchar(10) NOT NULL DEFAULT '' COMMENT '电影时长',
  `date` datetime NOT NULL COMMENT '上映日期',
  `mode` varchar(10) NOT NULL DEFAULT '' COMMENT '电影模式',
  `status` varchar(10) NOT NULL DEFAULT '' COMMENT '电影状态',
  `created_at` datetime NOT NULL,
  `updated_at` datetime NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of movie
-- ----------------------------
