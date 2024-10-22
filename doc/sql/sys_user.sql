/*
 Navicat Premium Data Transfer

 Source Server         : 139.224.22.197-nest
 Source Server Type    : MySQL
 Source Server Version : 80036
 Source Host           : 139.224.22.197:3306
 Source Schema         : nest_admin

 Target Server Type    : MySQL
 Target Server Version : 80036
 File Encoding         : 65001

 Date: 22/10/2024 09:21:59
*/

SET NAMES utf8mb4;
SET FOREIGN_KEY_CHECKS = 0;

-- ----------------------------
-- Table structure for sys_user
-- ----------------------------
DROP TABLE IF EXISTS `sys_user`;
CREATE TABLE `sys_user` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `password` varchar(50) NOT NULL DEFAULT 's3wmd2VReF1IjZhK59gLBY0OjYlzjA==' COMMENT '密码',
  `avatar` varchar(255) DEFAULT NULL COMMENT '头像地址',
  `phone` varchar(11) DEFAULT NULL,
  `create_time` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT '创建时间',
  `update_time` datetime DEFAULT NULL ON UPDATE CURRENT_TIMESTAMP COMMENT '更新时间',
  `dept_id` bigint DEFAULT NULL COMMENT '部门id',
  `is_active` char(1) NOT NULL DEFAULT '1' COMMENT '是否激活: 1是，0否，默认1',
  `is_delete` char(1) DEFAULT NULL COMMENT '是否删除: NULL未删除，1删除',
  `email` varchar(255) DEFAULT NULL,
  `gender` enum('man','woamn') DEFAULT NULL COMMENT '性别，默认 null',
  `create_user` varchar(255) DEFAULT NULL COMMENT '创建人',
  `update_user` varchar(255) DEFAULT NULL COMMENT '更新人',
  `name` varchar(255) DEFAULT NULL,
  `nickname` varchar(255) DEFAULT NULL COMMENT '昵称',
  PRIMARY KEY (`id`),
  KEY `FK_96bde34263e2ae3b46f011124ac` (`dept_id`),
  CONSTRAINT `FK_96bde34263e2ae3b46f011124ac` FOREIGN KEY (`dept_id`) REFERENCES `sys_dept` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=46 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- ----------------------------
-- Records of sys_user
-- ----------------------------
BEGIN;
INSERT INTO `sys_user` (`id`, `password`, `avatar`, `phone`, `create_time`, `update_time`, `dept_id`, `is_active`, `is_delete`, `email`, `gender`, `create_user`, `update_user`, `name`, `nickname`) VALUES (1, 's3wmd2VReF1IjZhK59gLBY0OjYlzjA==', 'avatar/2024-10-20/1729403412657-889305559.png', '18888888888', '2024-07-24 18:01:53', '2024-10-20 13:50:12', NULL, '1', NULL, '15494694@qq.com', 'man', '', 'admin', 'admin', '');
COMMIT;

SET FOREIGN_KEY_CHECKS = 1;
