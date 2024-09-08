/*
 Navicat Premium Data Transfer

 Source Server         : localhost-a1111111
 Source Server Type    : MySQL
 Source Server Version : 80029
 Source Host           : localhost:3306
 Source Schema         : nest

 Target Server Type    : MySQL
 Target Server Version : 80029
 File Encoding         : 65001

 Date: 08/09/2024 18:23:20
*/

SET NAMES utf8mb4;
SET FOREIGN_KEY_CHECKS = 0;

-- ----------------------------
-- Table structure for sys_config
-- ----------------------------
DROP TABLE IF EXISTS `sys_config`;
CREATE TABLE `sys_config` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `create_time` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT '创建时间',
  `create_user` varchar(30) NOT NULL DEFAULT '' COMMENT '创建人',
  `update_time` datetime DEFAULT NULL ON UPDATE CURRENT_TIMESTAMP COMMENT '更新时间',
  `update_user` varchar(30) NOT NULL DEFAULT '' COMMENT '更新人',
  `is_delete` char(1) DEFAULT NULL COMMENT '是否删除: NULL未删除，1删除',
  `system_name` varchar(100) NOT NULL DEFAULT '' COMMENT '系统名称',
  `system_logo` varchar(200) NOT NULL DEFAULT '' COMMENT '系统logo',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- ----------------------------
-- Records of sys_config
-- ----------------------------
BEGIN;
INSERT INTO `sys_config` (`id`, `create_time`, `create_user`, `update_time`, `update_user`, `is_delete`, `system_name`, `system_logo`) VALUES (1, '2024-08-18 23:31:34', 'admin', NULL, '', NULL, 'Nest Admin1', '');
COMMIT;

-- ----------------------------
-- Table structure for sys_dept
-- ----------------------------
DROP TABLE IF EXISTS `sys_dept`;
CREATE TABLE `sys_dept` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `create_time` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT '创建时间',
  `create_user` varchar(30) NOT NULL DEFAULT '' COMMENT '创建人',
  `update_time` datetime DEFAULT NULL ON UPDATE CURRENT_TIMESTAMP COMMENT '更新时间',
  `update_user` varchar(30) NOT NULL DEFAULT '' COMMENT '更新人',
  `name` varchar(30) NOT NULL DEFAULT '' COMMENT '部门名称',
  `parent_id` bigint DEFAULT NULL COMMENT '父级id',
  `is_delete` char(1) DEFAULT NULL COMMENT '是否删除: NULL未删除，1删除',
  PRIMARY KEY (`id`),
  KEY `FK_92dad1cb42d3b62bc9f2e8e58ba` (`parent_id`),
  CONSTRAINT `FK_92dad1cb42d3b62bc9f2e8e58ba` FOREIGN KEY (`parent_id`) REFERENCES `sys_dept` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=26 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- ----------------------------
-- Records of sys_dept
-- ----------------------------
BEGIN;
INSERT INTO `sys_dept` (`id`, `create_time`, `create_user`, `update_time`, `update_user`, `name`, `parent_id`, `is_delete`) VALUES (1, '2024-07-24 20:57:43', '', '2024-07-25 01:51:44', '', 'nestw', NULL, NULL);
INSERT INTO `sys_dept` (`id`, `create_time`, `create_user`, `update_time`, `update_user`, `name`, `parent_id`, `is_delete`) VALUES (2, '2024-07-24 21:03:18', '', '2024-07-25 13:53:11', '', 'nests', NULL, NULL);
INSERT INTO `sys_dept` (`id`, `create_time`, `create_user`, `update_time`, `update_user`, `name`, `parent_id`, `is_delete`) VALUES (3, '2024-07-24 21:03:34', '', '2024-07-25 14:15:34', '', 'nests2', NULL, NULL);
INSERT INTO `sys_dept` (`id`, `create_time`, `create_user`, `update_time`, `update_user`, `name`, `parent_id`, `is_delete`) VALUES (4, '2024-07-24 21:04:06', '', '2024-07-24 21:04:06', '', 'nests2s', NULL, NULL);
INSERT INTO `sys_dept` (`id`, `create_time`, `create_user`, `update_time`, `update_user`, `name`, `parent_id`, `is_delete`) VALUES (5, '2024-07-24 21:08:17', '', '2024-07-24 21:08:17', '', 'nests2sa', NULL, NULL);
INSERT INTO `sys_dept` (`id`, `create_time`, `create_user`, `update_time`, `update_user`, `name`, `parent_id`, `is_delete`) VALUES (6, '2024-07-24 21:09:40', '', '2024-07-25 14:27:21', '', 'nests2sa', NULL, NULL);
INSERT INTO `sys_dept` (`id`, `create_time`, `create_user`, `update_time`, `update_user`, `name`, `parent_id`, `is_delete`) VALUES (7, '2024-07-24 21:12:36', '', '2024-07-24 21:12:36', '', 'nests2sa', NULL, NULL);
INSERT INTO `sys_dept` (`id`, `create_time`, `create_user`, `update_time`, `update_user`, `name`, `parent_id`, `is_delete`) VALUES (12, '2024-07-25 00:00:56', '', '2024-07-25 14:15:57', '', 'xc', 1, NULL);
INSERT INTO `sys_dept` (`id`, `create_time`, `create_user`, `update_time`, `update_user`, `name`, `parent_id`, `is_delete`) VALUES (15, '2024-07-25 00:17:50', '', '2024-07-27 01:33:54', '', '123', NULL, NULL);
INSERT INTO `sys_dept` (`id`, `create_time`, `create_user`, `update_time`, `update_user`, `name`, `parent_id`, `is_delete`) VALUES (18, '2024-07-25 15:19:30', '', '2024-07-26 21:45:12', '', 'd', NULL, NULL);
INSERT INTO `sys_dept` (`id`, `create_time`, `create_user`, `update_time`, `update_user`, `name`, `parent_id`, `is_delete`) VALUES (19, '2024-07-25 15:19:39', '', '2024-07-25 15:19:39', '', 'd', 1, NULL);
INSERT INTO `sys_dept` (`id`, `create_time`, `create_user`, `update_time`, `update_user`, `name`, `parent_id`, `is_delete`) VALUES (20, '2024-07-25 15:19:52', '', '2024-07-25 15:19:52', '', 'd', 4, NULL);
INSERT INTO `sys_dept` (`id`, `create_time`, `create_user`, `update_time`, `update_user`, `name`, `parent_id`, `is_delete`) VALUES (21, '2024-07-27 01:34:01', '', '2024-07-27 01:34:01', '', '11', NULL, NULL);
INSERT INTO `sys_dept` (`id`, `create_time`, `create_user`, `update_time`, `update_user`, `name`, `parent_id`, `is_delete`) VALUES (22, '2024-07-27 01:34:15', '', '2024-07-27 01:34:15', '', '12', NULL, NULL);
INSERT INTO `sys_dept` (`id`, `create_time`, `create_user`, `update_time`, `update_user`, `name`, `parent_id`, `is_delete`) VALUES (23, '2024-07-27 01:36:25', '', '2024-07-27 01:36:25', '', '12', 1, NULL);
INSERT INTO `sys_dept` (`id`, `create_time`, `create_user`, `update_time`, `update_user`, `name`, `parent_id`, `is_delete`) VALUES (24, '2024-07-27 18:21:36', '', '2024-07-29 17:06:05', '', ' ', 22, NULL);
INSERT INTO `sys_dept` (`id`, `create_time`, `create_user`, `update_time`, `update_user`, `name`, `parent_id`, `is_delete`) VALUES (25, '2024-07-27 18:22:01', '', '2024-07-29 17:06:20', '', ' ', 22, NULL);
COMMIT;

-- ----------------------------
-- Table structure for sys_dept_closure
-- ----------------------------
DROP TABLE IF EXISTS `sys_dept_closure`;
CREATE TABLE `sys_dept_closure` (
  `id_ancestor` bigint NOT NULL,
  `id_descendant` bigint NOT NULL,
  PRIMARY KEY (`id_ancestor`,`id_descendant`),
  KEY `IDX_cfc440ee3ad8e00d7706a5769b` (`id_ancestor`),
  KEY `IDX_aec3172874d6b45638d3c50566` (`id_descendant`),
  CONSTRAINT `FK_aec3172874d6b45638d3c505667` FOREIGN KEY (`id_descendant`) REFERENCES `sys_dept` (`id`) ON DELETE CASCADE,
  CONSTRAINT `FK_cfc440ee3ad8e00d7706a5769b1` FOREIGN KEY (`id_ancestor`) REFERENCES `sys_dept` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- ----------------------------
-- Records of sys_dept_closure
-- ----------------------------
BEGIN;
INSERT INTO `sys_dept_closure` (`id_ancestor`, `id_descendant`) VALUES (1, 1);
INSERT INTO `sys_dept_closure` (`id_ancestor`, `id_descendant`) VALUES (1, 12);
INSERT INTO `sys_dept_closure` (`id_ancestor`, `id_descendant`) VALUES (1, 19);
INSERT INTO `sys_dept_closure` (`id_ancestor`, `id_descendant`) VALUES (1, 23);
INSERT INTO `sys_dept_closure` (`id_ancestor`, `id_descendant`) VALUES (2, 2);
INSERT INTO `sys_dept_closure` (`id_ancestor`, `id_descendant`) VALUES (3, 3);
INSERT INTO `sys_dept_closure` (`id_ancestor`, `id_descendant`) VALUES (4, 4);
INSERT INTO `sys_dept_closure` (`id_ancestor`, `id_descendant`) VALUES (4, 20);
INSERT INTO `sys_dept_closure` (`id_ancestor`, `id_descendant`) VALUES (5, 5);
INSERT INTO `sys_dept_closure` (`id_ancestor`, `id_descendant`) VALUES (6, 6);
INSERT INTO `sys_dept_closure` (`id_ancestor`, `id_descendant`) VALUES (7, 7);
INSERT INTO `sys_dept_closure` (`id_ancestor`, `id_descendant`) VALUES (12, 12);
INSERT INTO `sys_dept_closure` (`id_ancestor`, `id_descendant`) VALUES (15, 15);
INSERT INTO `sys_dept_closure` (`id_ancestor`, `id_descendant`) VALUES (18, 18);
INSERT INTO `sys_dept_closure` (`id_ancestor`, `id_descendant`) VALUES (19, 19);
INSERT INTO `sys_dept_closure` (`id_ancestor`, `id_descendant`) VALUES (20, 20);
INSERT INTO `sys_dept_closure` (`id_ancestor`, `id_descendant`) VALUES (21, 21);
INSERT INTO `sys_dept_closure` (`id_ancestor`, `id_descendant`) VALUES (22, 22);
INSERT INTO `sys_dept_closure` (`id_ancestor`, `id_descendant`) VALUES (22, 24);
INSERT INTO `sys_dept_closure` (`id_ancestor`, `id_descendant`) VALUES (22, 25);
INSERT INTO `sys_dept_closure` (`id_ancestor`, `id_descendant`) VALUES (23, 23);
INSERT INTO `sys_dept_closure` (`id_ancestor`, `id_descendant`) VALUES (24, 24);
INSERT INTO `sys_dept_closure` (`id_ancestor`, `id_descendant`) VALUES (25, 25);
COMMIT;

-- ----------------------------
-- Table structure for sys_login_log
-- ----------------------------
DROP TABLE IF EXISTS `sys_login_log`;
CREATE TABLE `sys_login_log` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `create_time` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT '创建时间',
  `create_user` varchar(30) NOT NULL DEFAULT '' COMMENT '创建人',
  `update_time` datetime DEFAULT NULL ON UPDATE CURRENT_TIMESTAMP COMMENT '更新时间',
  `update_user` varchar(30) NOT NULL DEFAULT '' COMMENT '更新人',
  `is_delete` char(1) DEFAULT NULL COMMENT '是否删除: NULL未删除，1删除',
  `account` varchar(30) NOT NULL DEFAULT '' COMMENT '登录账号',
  `ip` varchar(30) NOT NULL DEFAULT '' COMMENT 'ip地址',
  `address` varchar(30) NOT NULL DEFAULT '' COMMENT '登录地点',
  `browser` varchar(30) NOT NULL DEFAULT '' COMMENT '浏览器类型',
  `os` varchar(30) NOT NULL DEFAULT '' COMMENT '操作系统',
  `is_success` char(1) NOT NULL DEFAULT '1' COMMENT '是否登录成功: 1是，0否，默认1',
  `msg` varchar(30) NOT NULL DEFAULT '登录成功' COMMENT '提示消息',
  `password` varchar(30) NOT NULL DEFAULT '' COMMENT '登录密码',
  `session` varchar(200) NOT NULL DEFAULT '' COMMENT '会话编号',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=12 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- ----------------------------
-- Records of sys_login_log
-- ----------------------------
BEGIN;
INSERT INTO `sys_login_log` (`id`, `create_time`, `create_user`, `update_time`, `update_user`, `is_delete`, `account`, `ip`, `address`, `browser`, `os`, `is_success`, `msg`, `password`, `session`) VALUES (1, '2024-08-22 00:40:27', '', NULL, '', NULL, 'admin', 'localhost', '', 'Chrome', '', '0', '密码错误', '123456', '');
INSERT INTO `sys_login_log` (`id`, `create_time`, `create_user`, `update_time`, `update_user`, `is_delete`, `account`, `ip`, `address`, `browser`, `os`, `is_success`, `msg`, `password`, `session`) VALUES (2, '2024-08-22 00:42:18', '', NULL, '', NULL, 'admin', 'localhost', '', 'Chrome', '', '1', '登录成功', '123456', '');
INSERT INTO `sys_login_log` (`id`, `create_time`, `create_user`, `update_time`, `update_user`, `is_delete`, `account`, `ip`, `address`, `browser`, `os`, `is_success`, `msg`, `password`, `session`) VALUES (3, '2024-08-23 11:47:02', '', NULL, '', NULL, 'admin', 'localhost', '', 'Chrome', '', '1', '登录成功', '123456', '');
INSERT INTO `sys_login_log` (`id`, `create_time`, `create_user`, `update_time`, `update_user`, `is_delete`, `account`, `ip`, `address`, `browser`, `os`, `is_success`, `msg`, `password`, `session`) VALUES (4, '2024-08-24 16:08:46', '', NULL, '', NULL, 'admin', 'localhost', '', 'Chrome', '', '1', '登录成功', '123456', '');
INSERT INTO `sys_login_log` (`id`, `create_time`, `create_user`, `update_time`, `update_user`, `is_delete`, `account`, `ip`, `address`, `browser`, `os`, `is_success`, `msg`, `password`, `session`) VALUES (5, '2024-08-24 16:17:04', '', NULL, '', NULL, 'admin', 'localhost', '', 'Chrome', 'Mac OS', '1', '登录成功', '123456', '');
INSERT INTO `sys_login_log` (`id`, `create_time`, `create_user`, `update_time`, `update_user`, `is_delete`, `account`, `ip`, `address`, `browser`, `os`, `is_success`, `msg`, `password`, `session`) VALUES (6, '2024-08-24 18:32:08', '', NULL, '', NULL, 'admin', 'localhost', '', 'Chrome', 'Mac OS', '1', '登录成功', '123456', '');
INSERT INTO `sys_login_log` (`id`, `create_time`, `create_user`, `update_time`, `update_user`, `is_delete`, `account`, `ip`, `address`, `browser`, `os`, `is_success`, `msg`, `password`, `session`) VALUES (7, '2024-08-24 18:45:45', '', NULL, '', NULL, 'admin', 'localhost', 'Asia/Shanghai', 'Chrome', 'Mac OS', '1', '登录成功', '123456', '');
INSERT INTO `sys_login_log` (`id`, `create_time`, `create_user`, `update_time`, `update_user`, `is_delete`, `account`, `ip`, `address`, `browser`, `os`, `is_success`, `msg`, `password`, `session`) VALUES (8, '2024-08-26 23:42:58', '', NULL, '', NULL, 'admin', 'localhost', '', 'Chrome', 'Mac OS', '1', '登录成功', '123456', '');
INSERT INTO `sys_login_log` (`id`, `create_time`, `create_user`, `update_time`, `update_user`, `is_delete`, `account`, `ip`, `address`, `browser`, `os`, `is_success`, `msg`, `password`, `session`) VALUES (9, '2024-08-27 14:45:29', '', NULL, '', NULL, 'admin', 'localhost', '', 'Chrome', 'Mac OS', '1', '登录成功', '123456', 'JIUzI1NiIsInR5cCI6Ik');
INSERT INTO `sys_login_log` (`id`, `create_time`, `create_user`, `update_time`, `update_user`, `is_delete`, `account`, `ip`, `address`, `browser`, `os`, `is_success`, `msg`, `password`, `session`) VALUES (10, '2024-08-27 14:52:35', '', NULL, '', NULL, 'admin', 'localhost', '', 'Chrome', 'Mac OS', '1', '登录成功', '123456', 'JIUzI1NiIsInR5cCI6Ik');
INSERT INTO `sys_login_log` (`id`, `create_time`, `create_user`, `update_time`, `update_user`, `is_delete`, `account`, `ip`, `address`, `browser`, `os`, `is_success`, `msg`, `password`, `session`) VALUES (11, '2024-08-27 14:53:19', '', NULL, '', NULL, 'admin', 'localhost', '', 'Chrome', 'Mac OS', '1', '登录成功', '123456', 'JIUzI1NiIsInR5cCI6Ik');
COMMIT;

-- ----------------------------
-- Table structure for sys_menu
-- ----------------------------
DROP TABLE IF EXISTS `sys_menu`;
CREATE TABLE `sys_menu` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `create_time` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT '创建时间',
  `create_user` varchar(30) NOT NULL DEFAULT '' COMMENT '创建人',
  `update_time` datetime DEFAULT NULL ON UPDATE CURRENT_TIMESTAMP COMMENT '更新时间',
  `update_user` varchar(30) NOT NULL DEFAULT '' COMMENT '更新人',
  `name` varchar(30) NOT NULL DEFAULT '' COMMENT '菜单名称',
  `desc` varchar(100) NOT NULL DEFAULT '' COMMENT '菜单描述',
  `parent_id` bigint DEFAULT NULL COMMENT '父级id',
  `order` varchar(8) NOT NULL DEFAULT '1' COMMENT '排序',
  `path` varchar(100) NOT NULL DEFAULT '' COMMENT '路由地址',
  `component` varchar(100) NOT NULL DEFAULT '' COMMENT '组件路径',
  `type` enum('catalog','menu','button') NOT NULL DEFAULT 'catalog' COMMENT '菜单类型，默认catalog',
  `icon` varchar(100) NOT NULL DEFAULT '' COMMENT '菜单图标',
  `is_hidden` char(1) NOT NULL DEFAULT '0' COMMENT '是否隐藏: 1是，0否，默认0',
  `is_active` char(1) NOT NULL DEFAULT '1' COMMENT '是否激活: 1是，0否，默认1',
  `is_delete` char(1) DEFAULT NULL COMMENT '是否删除: NULL未删除，1删除',
  PRIMARY KEY (`id`),
  KEY `FK_7cef4adcf9b01b2c6f14d52b0f3` (`parent_id`),
  CONSTRAINT `FK_7cef4adcf9b01b2c6f14d52b0f3` FOREIGN KEY (`parent_id`) REFERENCES `sys_menu` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=23 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- ----------------------------
-- Records of sys_menu
-- ----------------------------
BEGIN;
INSERT INTO `sys_menu` (`id`, `create_time`, `create_user`, `update_time`, `update_user`, `name`, `desc`, `parent_id`, `order`, `path`, `component`, `type`, `icon`, `is_hidden`, `is_active`, `is_delete`) VALUES (5, '2024-08-06 22:03:07', '', '2024-08-06 22:03:07', 'admin', '系统管理', '', NULL, '1', 'system', '', 'catalog', '', '0', '1', NULL);
INSERT INTO `sys_menu` (`id`, `create_time`, `create_user`, `update_time`, `update_user`, `name`, `desc`, `parent_id`, `order`, `path`, `component`, `type`, `icon`, `is_hidden`, `is_active`, `is_delete`) VALUES (6, '2024-08-06 22:20:45', '', '2024-08-06 22:20:45', '', '用户管理', '用户管理', 5, '1', 'users', 'system/users/index', 'menu', '', '0', '1', NULL);
INSERT INTO `sys_menu` (`id`, `create_time`, `create_user`, `update_time`, `update_user`, `name`, `desc`, `parent_id`, `order`, `path`, `component`, `type`, `icon`, `is_hidden`, `is_active`, `is_delete`) VALUES (7, '2024-08-06 22:22:56', '', '2024-08-06 22:22:56', '', '角色管理', '', 5, '2', 'roles', 'system/roles/index', 'menu', '', '0', '1', NULL);
INSERT INTO `sys_menu` (`id`, `create_time`, `create_user`, `update_time`, `update_user`, `name`, `desc`, `parent_id`, `order`, `path`, `component`, `type`, `icon`, `is_hidden`, `is_active`, `is_delete`) VALUES (8, '2024-08-06 22:30:06', '', '2024-08-06 22:30:06', '', '菜单管理', '', 5, '3', 'menus', 'system/menus/index', 'menu', '', '0', '1', NULL);
INSERT INTO `sys_menu` (`id`, `create_time`, `create_user`, `update_time`, `update_user`, `name`, `desc`, `parent_id`, `order`, `path`, `component`, `type`, `icon`, `is_hidden`, `is_active`, `is_delete`) VALUES (9, '2024-08-15 00:04:06', '', '2024-08-15 00:04:06', '', '内容管理', '', NULL, '2', 'content', '', 'catalog', '', '0', '1', NULL);
INSERT INTO `sys_menu` (`id`, `create_time`, `create_user`, `update_time`, `update_user`, `name`, `desc`, `parent_id`, `order`, `path`, `component`, `type`, `icon`, `is_hidden`, `is_active`, `is_delete`) VALUES (10, '2024-08-15 00:06:53', '', '2024-08-15 00:06:53', '', '通知管理', '通知管理', 5, '4', 'notices', 'system/notices/index', 'menu', '', '0', '1', NULL);
INSERT INTO `sys_menu` (`id`, `create_time`, `create_user`, `update_time`, `update_user`, `name`, `desc`, `parent_id`, `order`, `path`, `component`, `type`, `icon`, `is_hidden`, `is_active`, `is_delete`) VALUES (11, '2024-08-15 00:10:33', '', '2024-08-15 00:10:33', '', '系统监控', '系统监控', NULL, '2', 'systemMonitor', '', 'catalog', '', '0', '1', NULL);
INSERT INTO `sys_menu` (`id`, `create_time`, `create_user`, `update_time`, `update_user`, `name`, `desc`, `parent_id`, `order`, `path`, `component`, `type`, `icon`, `is_hidden`, `is_active`, `is_delete`) VALUES (12, '2024-08-15 00:22:13', '', '2024-08-15 00:22:13', 'admin', '登录日志', '登录日志', 11, '1', 'loginLog', 'systemMonitor/loginLog/index', 'menu', '', '0', '1', NULL);
INSERT INTO `sys_menu` (`id`, `create_time`, `create_user`, `update_time`, `update_user`, `name`, `desc`, `parent_id`, `order`, `path`, `component`, `type`, `icon`, `is_hidden`, `is_active`, `is_delete`) VALUES (13, '2024-08-15 00:22:59', '', '2024-08-27 21:05:38', 'admin', '操作日志', '操作日志', 11, '2', 'operateLog', '', 'catalog', '', '0', '1', '1');
INSERT INTO `sys_menu` (`id`, `create_time`, `create_user`, `update_time`, `update_user`, `name`, `desc`, `parent_id`, `order`, `path`, `component`, `type`, `icon`, `is_hidden`, `is_active`, `is_delete`) VALUES (14, '2024-08-15 00:23:45', '', '2024-08-15 00:23:45', 'admin', '在线用户', '', 11, '1', 'onlineUser', 'systemMonitor/onlineUser/index', 'menu', '', '0', '1', NULL);
INSERT INTO `sys_menu` (`id`, `create_time`, `create_user`, `update_time`, `update_user`, `name`, `desc`, `parent_id`, `order`, `path`, `component`, `type`, `icon`, `is_hidden`, `is_active`, `is_delete`) VALUES (15, '2024-08-15 00:27:21', '', '2024-08-15 00:27:21', 'admin', '服务监控', '服务监控', 11, '2', 'osInfo', 'systemMonitor/osInfo/index', 'menu', '', '0', '1', NULL);
INSERT INTO `sys_menu` (`id`, `create_time`, `create_user`, `update_time`, `update_user`, `name`, `desc`, `parent_id`, `order`, `path`, `component`, `type`, `icon`, `is_hidden`, `is_active`, `is_delete`) VALUES (16, '2024-08-15 00:33:54', '', '2024-08-15 00:33:54', '', '文章管理', '文章管理', 9, '1', 'articleManage', '', 'catalog', '', '0', '1', NULL);
INSERT INTO `sys_menu` (`id`, `create_time`, `create_user`, `update_time`, `update_user`, `name`, `desc`, `parent_id`, `order`, `path`, `component`, `type`, `icon`, `is_hidden`, `is_active`, `is_delete`) VALUES (17, '2024-08-15 00:36:52', '', '2024-08-15 00:36:52', 'admin', '配置管理', '配置管理', 5, '5', 'configs', 'system/configs/index', 'menu', '', '0', '1', NULL);
INSERT INTO `sys_menu` (`id`, `create_time`, `create_user`, `update_time`, `update_user`, `name`, `desc`, `parent_id`, `order`, `path`, `component`, `type`, `icon`, `is_hidden`, `is_active`, `is_delete`) VALUES (18, '2024-08-15 00:41:15', '', '2024-08-15 00:41:15', 'admin', '首页', '首页', NULL, '1', 'index', '', 'catalog', 'dashboard', '0', '1', NULL);
INSERT INTO `sys_menu` (`id`, `create_time`, `create_user`, `update_time`, `update_user`, `name`, `desc`, `parent_id`, `order`, `path`, `component`, `type`, `icon`, `is_hidden`, `is_active`, `is_delete`) VALUES (19, '2024-08-15 00:44:53', '', '2024-08-15 16:43:58', 'admin', '首页', '首页', 18, '1', 'index', 'index/index', 'menu', '', '1', '1', NULL);
INSERT INTO `sys_menu` (`id`, `create_time`, `create_user`, `update_time`, `update_user`, `name`, `desc`, `parent_id`, `order`, `path`, `component`, `type`, `icon`, `is_hidden`, `is_active`, `is_delete`) VALUES (20, '2024-08-15 01:12:57', '', '2024-08-15 01:12:57', '', '应用工具', '应用工具', NULL, '6', 'appTools', '', 'catalog', '', '0', '1', NULL);
INSERT INTO `sys_menu` (`id`, `create_time`, `create_user`, `update_time`, `update_user`, `name`, `desc`, `parent_id`, `order`, `path`, `component`, `type`, `icon`, `is_hidden`, `is_active`, `is_delete`) VALUES (21, '2024-08-15 01:14:35', '', '2024-08-15 01:14:35', '', '宣传海报', '', 20, '1', '', '', 'catalog', '', '0', '1', NULL);
INSERT INTO `sys_menu` (`id`, `create_time`, `create_user`, `update_time`, `update_user`, `name`, `desc`, `parent_id`, `order`, `path`, `component`, `type`, `icon`, `is_hidden`, `is_active`, `is_delete`) VALUES (22, '2024-08-15 01:15:47', '', '2024-08-15 01:15:47', '', '访问表单', '', 20, '1', '', '', 'catalog', '', '0', '1', NULL);
COMMIT;

-- ----------------------------
-- Table structure for sys_menu_closure
-- ----------------------------
DROP TABLE IF EXISTS `sys_menu_closure`;
CREATE TABLE `sys_menu_closure` (
  `id_ancestor` bigint NOT NULL,
  `id_descendant` bigint NOT NULL,
  PRIMARY KEY (`id_ancestor`,`id_descendant`),
  KEY `IDX_ee0a4003eda64ae8081ebdde04` (`id_ancestor`),
  KEY `IDX_78f742978fc6b23a674732d027` (`id_descendant`),
  CONSTRAINT `FK_78f742978fc6b23a674732d027c` FOREIGN KEY (`id_descendant`) REFERENCES `sys_menu` (`id`) ON DELETE CASCADE,
  CONSTRAINT `FK_ee0a4003eda64ae8081ebdde042` FOREIGN KEY (`id_ancestor`) REFERENCES `sys_menu` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- ----------------------------
-- Records of sys_menu_closure
-- ----------------------------
BEGIN;
INSERT INTO `sys_menu_closure` (`id_ancestor`, `id_descendant`) VALUES (5, 5);
INSERT INTO `sys_menu_closure` (`id_ancestor`, `id_descendant`) VALUES (5, 6);
INSERT INTO `sys_menu_closure` (`id_ancestor`, `id_descendant`) VALUES (5, 7);
INSERT INTO `sys_menu_closure` (`id_ancestor`, `id_descendant`) VALUES (5, 8);
INSERT INTO `sys_menu_closure` (`id_ancestor`, `id_descendant`) VALUES (5, 10);
INSERT INTO `sys_menu_closure` (`id_ancestor`, `id_descendant`) VALUES (5, 17);
INSERT INTO `sys_menu_closure` (`id_ancestor`, `id_descendant`) VALUES (6, 6);
INSERT INTO `sys_menu_closure` (`id_ancestor`, `id_descendant`) VALUES (7, 7);
INSERT INTO `sys_menu_closure` (`id_ancestor`, `id_descendant`) VALUES (8, 8);
INSERT INTO `sys_menu_closure` (`id_ancestor`, `id_descendant`) VALUES (9, 9);
INSERT INTO `sys_menu_closure` (`id_ancestor`, `id_descendant`) VALUES (9, 16);
INSERT INTO `sys_menu_closure` (`id_ancestor`, `id_descendant`) VALUES (10, 10);
INSERT INTO `sys_menu_closure` (`id_ancestor`, `id_descendant`) VALUES (11, 11);
INSERT INTO `sys_menu_closure` (`id_ancestor`, `id_descendant`) VALUES (11, 12);
INSERT INTO `sys_menu_closure` (`id_ancestor`, `id_descendant`) VALUES (11, 13);
INSERT INTO `sys_menu_closure` (`id_ancestor`, `id_descendant`) VALUES (11, 14);
INSERT INTO `sys_menu_closure` (`id_ancestor`, `id_descendant`) VALUES (11, 15);
INSERT INTO `sys_menu_closure` (`id_ancestor`, `id_descendant`) VALUES (12, 12);
INSERT INTO `sys_menu_closure` (`id_ancestor`, `id_descendant`) VALUES (13, 13);
INSERT INTO `sys_menu_closure` (`id_ancestor`, `id_descendant`) VALUES (14, 14);
INSERT INTO `sys_menu_closure` (`id_ancestor`, `id_descendant`) VALUES (15, 15);
INSERT INTO `sys_menu_closure` (`id_ancestor`, `id_descendant`) VALUES (16, 16);
INSERT INTO `sys_menu_closure` (`id_ancestor`, `id_descendant`) VALUES (17, 17);
INSERT INTO `sys_menu_closure` (`id_ancestor`, `id_descendant`) VALUES (18, 18);
INSERT INTO `sys_menu_closure` (`id_ancestor`, `id_descendant`) VALUES (18, 19);
INSERT INTO `sys_menu_closure` (`id_ancestor`, `id_descendant`) VALUES (19, 19);
INSERT INTO `sys_menu_closure` (`id_ancestor`, `id_descendant`) VALUES (20, 20);
INSERT INTO `sys_menu_closure` (`id_ancestor`, `id_descendant`) VALUES (20, 21);
INSERT INTO `sys_menu_closure` (`id_ancestor`, `id_descendant`) VALUES (20, 22);
INSERT INTO `sys_menu_closure` (`id_ancestor`, `id_descendant`) VALUES (21, 21);
INSERT INTO `sys_menu_closure` (`id_ancestor`, `id_descendant`) VALUES (22, 22);
COMMIT;

-- ----------------------------
-- Table structure for sys_notice
-- ----------------------------
DROP TABLE IF EXISTS `sys_notice`;
CREATE TABLE `sys_notice` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `create_time` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT '创建时间',
  `create_user` varchar(30) NOT NULL DEFAULT '' COMMENT '创建人',
  `update_time` datetime DEFAULT NULL ON UPDATE CURRENT_TIMESTAMP COMMENT '更新时间',
  `update_user` varchar(30) NOT NULL DEFAULT '' COMMENT '更新人',
  `is_delete` char(1) DEFAULT NULL COMMENT '是否删除: NULL未删除，1删除',
  `title` varchar(30) NOT NULL DEFAULT '' COMMENT '公告标题',
  `is_active` char(1) NOT NULL DEFAULT '1' COMMENT '是否激活: 1是，0否，默认1',
  `content` varchar(200) NOT NULL DEFAULT '' COMMENT '公告内容',
  `remark` varchar(200) NOT NULL DEFAULT '' COMMENT '备注',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- ----------------------------
-- Records of sys_notice
-- ----------------------------
BEGIN;
INSERT INTO `sys_notice` (`id`, `create_time`, `create_user`, `update_time`, `update_user`, `is_delete`, `title`, `is_active`, `content`, `remark`) VALUES (1, '2024-08-18 01:28:14', 'admin', '2024-08-18 01:28:32', 'admin', NULL, '公告标题1', '1', '公告内容q', '备注q');
INSERT INTO `sys_notice` (`id`, `create_time`, `create_user`, `update_time`, `update_user`, `is_delete`, `title`, `is_active`, `content`, `remark`) VALUES (2, '2024-08-18 01:28:40', 'admin', '2024-08-18 01:29:27', 'admin', '1', 'e', '1', 'e', 'e');
INSERT INTO `sys_notice` (`id`, `create_time`, `create_user`, `update_time`, `update_user`, `is_delete`, `title`, `is_active`, `content`, `remark`) VALUES (3, '2024-08-18 01:28:47', 'admin', '2024-08-18 01:29:36', 'admin', '1', 'a', '0', 'a', 'a');
INSERT INTO `sys_notice` (`id`, `create_time`, `create_user`, `update_time`, `update_user`, `is_delete`, `title`, `is_active`, `content`, `remark`) VALUES (4, '2024-08-18 01:29:18', 'admin', '2024-08-18 01:29:27', 'admin', '1', 'er', '1', 'er', 'er');
COMMIT;

-- ----------------------------
-- Table structure for sys_role
-- ----------------------------
DROP TABLE IF EXISTS `sys_role`;
CREATE TABLE `sys_role` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `create_time` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT '创建时间',
  `create_user` varchar(30) NOT NULL DEFAULT '' COMMENT '创建人',
  `update_time` datetime DEFAULT NULL ON UPDATE CURRENT_TIMESTAMP COMMENT '更新时间',
  `update_user` varchar(30) NOT NULL DEFAULT '' COMMENT '更新人',
  `name` varchar(30) NOT NULL DEFAULT '',
  `remark` varchar(200) NOT NULL DEFAULT '' COMMENT '备注',
  `order` varchar(8) NOT NULL DEFAULT '1' COMMENT '排序',
  `permissionKey` varchar(30) NOT NULL DEFAULT '',
  `is_active` char(1) NOT NULL DEFAULT '1' COMMENT '是否激活: 1是，0否，默认1',
  `is_delete` char(1) DEFAULT NULL COMMENT '是否删除: NULL未删除，1删除',
  PRIMARY KEY (`id`),
  UNIQUE KEY `IDX_223de54d6badbe43a5490450c3` (`name`),
  UNIQUE KEY `IDX_3b1d0a27461f6c32a9eed6d8b9` (`permissionKey`)
) ENGINE=InnoDB AUTO_INCREMENT=28 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- ----------------------------
-- Records of sys_role
-- ----------------------------
BEGIN;
INSERT INTO `sys_role` (`id`, `create_time`, `create_user`, `update_time`, `update_user`, `name`, `remark`, `order`, `permissionKey`, `is_active`, `is_delete`) VALUES (1, '2024-08-03 11:30:42', '', '2024-08-05 13:30:12', '', 'admin', '都是', '1', 'admin', '1', NULL);
INSERT INTO `sys_role` (`id`, `create_time`, `create_user`, `update_time`, `update_user`, `name`, `remark`, `order`, `permissionKey`, `is_active`, `is_delete`) VALUES (2, '2024-08-03 19:46:41', '', '2024-08-16 15:08:57', '', 'ad', 'gfdsfdsafasf', '1.23', 'a d', '1', NULL);
COMMIT;

-- ----------------------------
-- Table structure for sys_role_menu
-- ----------------------------
DROP TABLE IF EXISTS `sys_role_menu`;
CREATE TABLE `sys_role_menu` (
  `roleId` bigint NOT NULL,
  `menuId` bigint NOT NULL,
  PRIMARY KEY (`roleId`,`menuId`),
  KEY `IDX_bdd82e5f4c2bedda41f89b69ba` (`roleId`),
  KEY `IDX_7e0fc887979c9dee7a3dbed7eb` (`menuId`),
  CONSTRAINT `fk_sys_menu_role` FOREIGN KEY (`menuId`) REFERENCES `sys_menu` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `fk_sys_role_menu` FOREIGN KEY (`roleId`) REFERENCES `sys_role` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- ----------------------------
-- Records of sys_role_menu
-- ----------------------------
BEGIN;
INSERT INTO `sys_role_menu` (`roleId`, `menuId`) VALUES (2, 5);
INSERT INTO `sys_role_menu` (`roleId`, `menuId`) VALUES (2, 6);
INSERT INTO `sys_role_menu` (`roleId`, `menuId`) VALUES (2, 7);
COMMIT;

-- ----------------------------
-- Table structure for sys_user
-- ----------------------------
DROP TABLE IF EXISTS `sys_user`;
CREATE TABLE `sys_user` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `name` varchar(30) NOT NULL DEFAULT '',
  `nickname` varchar(30) NOT NULL DEFAULT '' COMMENT '昵称',
  `password` varchar(50) NOT NULL DEFAULT 's3wmd2VReF1IjZhK59gLBY0OjYlzjA==' COMMENT '密码',
  `avatar` varchar(255) NOT NULL DEFAULT '' COMMENT '头像地址',
  `phone` varchar(11) NOT NULL DEFAULT '' COMMENT '手机号',
  `create_user` varchar(30) NOT NULL DEFAULT '' COMMENT '创建人',
  `update_user` varchar(30) NOT NULL DEFAULT '' COMMENT '更新人',
  `create_time` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT '创建时间',
  `update_time` datetime DEFAULT NULL ON UPDATE CURRENT_TIMESTAMP COMMENT '更新时间',
  `dept_id` bigint DEFAULT NULL COMMENT '部门id',
  `is_active` char(1) NOT NULL DEFAULT '1' COMMENT '是否激活: 1是，0否，默认1',
  `is_delete` char(1) DEFAULT NULL COMMENT '是否删除: NULL未删除，1删除',
  PRIMARY KEY (`id`),
  KEY `FK_96bde34263e2ae3b46f011124ac` (`dept_id`),
  CONSTRAINT `FK_96bde34263e2ae3b46f011124ac` FOREIGN KEY (`dept_id`) REFERENCES `sys_dept` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=22 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- ----------------------------
-- Records of sys_user
-- ----------------------------
BEGIN;
INSERT INTO `sys_user` (`id`, `name`, `nickname`, `password`, `avatar`, `phone`, `create_user`, `update_user`, `create_time`, `update_time`, `dept_id`, `is_active`, `is_delete`) VALUES (1, 'admin', '', 's3wmd2VReF1IjZhK59gLBY0OjYlzjA==', '2024-8-13/1723537431148-747657234.jpeg', '13216791561', '', '', '2024-07-24 18:01:53', '2024-08-17 00:54:40', 1, '1', NULL);
INSERT INTO `sys_user` (`id`, `name`, `nickname`, `password`, `avatar`, `phone`, `create_user`, `update_user`, `create_time`, `update_time`, `dept_id`, `is_active`, `is_delete`) VALUES (2, '', '', '', '', '', '', '', '2024-07-26 22:41:34', '2024-08-17 00:54:40', NULL, '1', NULL);
INSERT INTO `sys_user` (`id`, `name`, `nickname`, `password`, `avatar`, `phone`, `create_user`, `update_user`, `create_time`, `update_time`, `dept_id`, `is_active`, `is_delete`) VALUES (4, '12', '', '', '', '', '', '', '2024-07-27 02:22:13', '2024-08-17 00:54:40', NULL, '1', NULL);
INSERT INTO `sys_user` (`id`, `name`, `nickname`, `password`, `avatar`, `phone`, `create_user`, `update_user`, `create_time`, `update_time`, `dept_id`, `is_active`, `is_delete`) VALUES (6, '123', '', '', '', '', '', '', '2024-07-27 02:22:32', '2024-08-17 00:54:40', NULL, '1', NULL);
INSERT INTO `sys_user` (`id`, `name`, `nickname`, `password`, `avatar`, `phone`, `create_user`, `update_user`, `create_time`, `update_time`, `dept_id`, `is_active`, `is_delete`) VALUES (7, '22', '', '', '', '', '', '', '2024-07-27 02:25:10', '2024-08-17 00:54:40', NULL, '1', NULL);
INSERT INTO `sys_user` (`id`, `name`, `nickname`, `password`, `avatar`, `phone`, `create_user`, `update_user`, `create_time`, `update_time`, `dept_id`, `is_active`, `is_delete`) VALUES (8, '33', '', '', '', '', '', '', '2024-07-27 02:27:07', '2024-08-17 00:54:40', NULL, '1', NULL);
INSERT INTO `sys_user` (`id`, `name`, `nickname`, `password`, `avatar`, `phone`, `create_user`, `update_user`, `create_time`, `update_time`, `dept_id`, `is_active`, `is_delete`) VALUES (9, '22', '', '', '', '', '', '', '2024-07-27 02:53:58', '2024-08-17 00:54:40', NULL, '1', NULL);
INSERT INTO `sys_user` (`id`, `name`, `nickname`, `password`, `avatar`, `phone`, `create_user`, `update_user`, `create_time`, `update_time`, `dept_id`, `is_active`, `is_delete`) VALUES (10, '11', '', '', '', '', '', '', '2024-07-27 18:07:52', '2024-08-17 00:54:40', NULL, '1', NULL);
INSERT INTO `sys_user` (`id`, `name`, `nickname`, `password`, `avatar`, `phone`, `create_user`, `update_user`, `create_time`, `update_time`, `dept_id`, `is_active`, `is_delete`) VALUES (11, 'sdfdsfdsfdsfsdfdsf', '', '', '', '', '', '', '2024-07-27 18:18:44', '2024-08-17 00:54:40', 22, '1', NULL);
INSERT INTO `sys_user` (`id`, `name`, `nickname`, `password`, `avatar`, `phone`, `create_user`, `update_user`, `create_time`, `update_time`, `dept_id`, `is_active`, `is_delete`) VALUES (12, 'sdsdsdsdfsafafgdsfadsf', '', '', '', '', '', '', '2024-07-27 18:19:47', '2024-08-17 00:54:40', 22, '1', NULL);
INSERT INTO `sys_user` (`id`, `name`, `nickname`, `password`, `avatar`, `phone`, `create_user`, `update_user`, `create_time`, `update_time`, `dept_id`, `is_active`, `is_delete`) VALUES (13, 'dfggdfdfgdgdfggfdgf', '', '', '', '', '', '', '2024-07-27 18:21:07', '2024-08-17 00:54:40', 22, '1', NULL);
INSERT INTO `sys_user` (`id`, `name`, `nickname`, `password`, `avatar`, `phone`, `create_user`, `update_user`, `create_time`, `update_time`, `dept_id`, `is_active`, `is_delete`) VALUES (14, '', '', '', '', '', '', '', '2024-07-27 18:22:51', '2024-08-17 00:54:40', 22, '1', NULL);
INSERT INTO `sys_user` (`id`, `name`, `nickname`, `password`, `avatar`, `phone`, `create_user`, `update_user`, `create_time`, `update_time`, `dept_id`, `is_active`, `is_delete`) VALUES (15, '', '', '', '', '', '', '', '2024-07-27 18:24:31', '2024-08-17 00:54:40', NULL, '1', NULL);
INSERT INTO `sys_user` (`id`, `name`, `nickname`, `password`, `avatar`, `phone`, `create_user`, `update_user`, `create_time`, `update_time`, `dept_id`, `is_active`, `is_delete`) VALUES (16, 'aaaaa', '', '', '2024-8-13/1723534044817-836389812.jpeg', '163168891', '', '', '2024-07-29 09:26:50', '2024-08-17 00:54:40', 1, '1', NULL);
INSERT INTO `sys_user` (`id`, `name`, `nickname`, `password`, `avatar`, `phone`, `create_user`, `update_user`, `create_time`, `update_time`, `dept_id`, `is_active`, `is_delete`) VALUES (17, 'bb', '', '', '', '16', '', 'admin', '2024-07-29 19:26:27', '2024-08-17 01:28:53', 1, '1', '1');
INSERT INTO `sys_user` (`id`, `name`, `nickname`, `password`, `avatar`, `phone`, `create_user`, `update_user`, `create_time`, `update_time`, `dept_id`, `is_active`, `is_delete`) VALUES (18, 'cgdsfg', '', '', '', '19491', '', '', '2024-07-28 03:38:28', '2024-08-17 00:54:40', 1, '1', NULL);
INSERT INTO `sys_user` (`id`, `name`, `nickname`, `password`, `avatar`, `phone`, `create_user`, `update_user`, `create_time`, `update_time`, `dept_id`, `is_active`, `is_delete`) VALUES (19, 'sdfds', '', '', '', '', '', '', '2024-07-29 19:51:32', '2024-08-17 00:54:40', 1, '1', NULL);
INSERT INTO `sys_user` (`id`, `name`, `nickname`, `password`, `avatar`, `phone`, `create_user`, `update_user`, `create_time`, `update_time`, `dept_id`, `is_active`, `is_delete`) VALUES (20, 'admin2', '', 's3zqOFvQ9veFP6B/8h1W43ew', '2024-8-13/1723536593330-791793691.jpeg', '1896236', '', '', '2024-08-04 18:29:52', '2024-08-17 00:54:40', 1, '1', NULL);
INSERT INTO `sys_user` (`id`, `name`, `nickname`, `password`, `avatar`, `phone`, `create_user`, `update_user`, `create_time`, `update_time`, `dept_id`, `is_active`, `is_delete`) VALUES (21, 'dd', '', 's3wmd2VReF1IjZhK59gLBY0OjYlzjA==', '', '16349864', '', '', '2024-08-05 01:49:13', '2024-08-17 00:54:40', 1, '1', NULL);
COMMIT;

-- ----------------------------
-- Table structure for sys_user_role
-- ----------------------------
DROP TABLE IF EXISTS `sys_user_role`;
CREATE TABLE `sys_user_role` (
  `userId` bigint NOT NULL,
  `roleId` bigint NOT NULL,
  PRIMARY KEY (`userId`,`roleId`),
  KEY `IDX_3ec9b31612c830bf0221b9e7f3` (`roleId`),
  KEY `IDX_3c879483a655a9387b8c487608` (`userId`),
  CONSTRAINT `fk_sys_user_role_role` FOREIGN KEY (`roleId`) REFERENCES `sys_role` (`id`),
  CONSTRAINT `fk_sys_user_role_user` FOREIGN KEY (`userId`) REFERENCES `sys_user` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- ----------------------------
-- Records of sys_user_role
-- ----------------------------
BEGIN;
INSERT INTO `sys_user_role` (`userId`, `roleId`) VALUES (20, 2);
COMMIT;

-- ----------------------------
-- Table structure for sys_user_roles_sys_role
-- ----------------------------
DROP TABLE IF EXISTS `sys_user_roles_sys_role`;
CREATE TABLE `sys_user_roles_sys_role` (
  `sysUserId` bigint NOT NULL,
  `sysRoleId` bigint NOT NULL,
  PRIMARY KEY (`sysUserId`,`sysRoleId`),
  KEY `IDX_d1daac450217c1a1e384e99254` (`sysUserId`),
  KEY `IDX_45602f09af1715f5532db91a43` (`sysRoleId`),
  CONSTRAINT `FK_45602f09af1715f5532db91a43d` FOREIGN KEY (`sysRoleId`) REFERENCES `sys_role` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `FK_d1daac450217c1a1e384e99254a` FOREIGN KEY (`sysUserId`) REFERENCES `sys_user` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- ----------------------------
-- Records of sys_user_roles_sys_role
-- ----------------------------
BEGIN;
COMMIT;

SET FOREIGN_KEY_CHECKS = 1;
