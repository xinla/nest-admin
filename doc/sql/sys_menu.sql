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

 Date: 22/10/2024 09:23:06
*/

SET NAMES utf8mb4;
SET FOREIGN_KEY_CHECKS = 0;

-- ----------------------------
-- Table structure for sys_menu
-- ----------------------------
DROP TABLE IF EXISTS `sys_menu`;
CREATE TABLE `sys_menu` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `create_time` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT '创建时间',
  `update_time` datetime DEFAULT NULL ON UPDATE CURRENT_TIMESTAMP COMMENT '更新时间',
  `desc` varchar(100) DEFAULT NULL COMMENT '菜单描述',
  `parent_id` bigint DEFAULT NULL COMMENT '父级id',
  `order` varchar(8) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL DEFAULT '1' COMMENT '排序',
  `path` varchar(100) DEFAULT NULL COMMENT '路由地址',
  `component` varchar(100) DEFAULT NULL COMMENT '组件路径',
  `type` enum('catalog','menu','button') CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL DEFAULT 'catalog' COMMENT '菜单类型，默认catalog',
  `icon` varchar(100) DEFAULT NULL COMMENT '菜单图标',
  `is_hidden` char(1) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL DEFAULT '0' COMMENT '是否隐藏: 1是，0否，默认0',
  `is_active` char(1) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL DEFAULT '1' COMMENT '是否激活: 1是，0否，默认1',
  `is_delete` char(1) DEFAULT NULL COMMENT '是否删除: NULL未删除，1删除',
  `create_user` varchar(255) DEFAULT NULL COMMENT '创建人',
  `update_user` varchar(255) DEFAULT NULL COMMENT '更新人',
  `name` varchar(255) DEFAULT NULL COMMENT '菜单名称',
  PRIMARY KEY (`id`) USING BTREE,
  KEY `FK_7cef4adcf9b01b2c6f14d52b0f3` (`parent_id`) USING BTREE,
  CONSTRAINT `FK_7cef4adcf9b01b2c6f14d52b0f3` FOREIGN KEY (`parent_id`) REFERENCES `sys_menu` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=25 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- ----------------------------
-- Records of sys_menu
-- ----------------------------
BEGIN;
INSERT INTO `sys_menu` (`id`, `create_time`, `update_time`, `desc`, `parent_id`, `order`, `path`, `component`, `type`, `icon`, `is_hidden`, `is_active`, `is_delete`, `create_user`, `update_user`, `name`) VALUES (5, '2024-08-06 22:03:07', '2024-10-02 15:34:32', '', NULL, '1', 'system', '', 'catalog', '', '0', '1', NULL, '', '', '系统管理');
INSERT INTO `sys_menu` (`id`, `create_time`, `update_time`, `desc`, `parent_id`, `order`, `path`, `component`, `type`, `icon`, `is_hidden`, `is_active`, `is_delete`, `create_user`, `update_user`, `name`) VALUES (6, '2024-08-06 22:20:45', '2024-10-02 15:34:33', '用户管理', 5, '1', 'users', 'system/users/index', 'menu', '', '0', '1', NULL, '', '', '用户管理');
INSERT INTO `sys_menu` (`id`, `create_time`, `update_time`, `desc`, `parent_id`, `order`, `path`, `component`, `type`, `icon`, `is_hidden`, `is_active`, `is_delete`, `create_user`, `update_user`, `name`) VALUES (7, '2024-08-06 22:22:56', '2024-10-02 15:34:33', '', 5, '2', 'roles', 'system/roles/index', 'menu', '', '0', '1', NULL, '', '', '角色管理');
INSERT INTO `sys_menu` (`id`, `create_time`, `update_time`, `desc`, `parent_id`, `order`, `path`, `component`, `type`, `icon`, `is_hidden`, `is_active`, `is_delete`, `create_user`, `update_user`, `name`) VALUES (8, '2024-08-06 22:30:06', '2024-10-02 15:34:33', '', 5, '3', 'menus', 'system/menus/index', 'menu', '', '0', '1', NULL, '', '', '菜单管理');
INSERT INTO `sys_menu` (`id`, `create_time`, `update_time`, `desc`, `parent_id`, `order`, `path`, `component`, `type`, `icon`, `is_hidden`, `is_active`, `is_delete`, `create_user`, `update_user`, `name`) VALUES (9, '2024-08-15 00:04:06', '2024-10-02 15:34:33', '', NULL, '2', 'content', '', 'catalog', '', '0', '1', NULL, '', '', '内容管理');
INSERT INTO `sys_menu` (`id`, `create_time`, `update_time`, `desc`, `parent_id`, `order`, `path`, `component`, `type`, `icon`, `is_hidden`, `is_active`, `is_delete`, `create_user`, `update_user`, `name`) VALUES (10, '2024-08-15 00:06:53', '2024-10-02 15:34:33', '通知管理', 5, '4', 'notices', 'system/notices/index', 'menu', '', '0', '1', NULL, '', '', '通知管理');
INSERT INTO `sys_menu` (`id`, `create_time`, `update_time`, `desc`, `parent_id`, `order`, `path`, `component`, `type`, `icon`, `is_hidden`, `is_active`, `is_delete`, `create_user`, `update_user`, `name`) VALUES (11, '2024-08-15 00:10:33', '2024-10-02 15:34:33', '系统监控', NULL, '2', 'systemMonitor', '', 'catalog', '', '0', '1', NULL, '', '', '系统监控');
INSERT INTO `sys_menu` (`id`, `create_time`, `update_time`, `desc`, `parent_id`, `order`, `path`, `component`, `type`, `icon`, `is_hidden`, `is_active`, `is_delete`, `create_user`, `update_user`, `name`) VALUES (12, '2024-08-15 00:22:13', '2024-10-02 15:34:33', '登录日志', 11, '1', 'loginLog', 'systemMonitor/loginLog/index', 'menu', '', '0', '1', NULL, '', '', '登录日志');
INSERT INTO `sys_menu` (`id`, `create_time`, `update_time`, `desc`, `parent_id`, `order`, `path`, `component`, `type`, `icon`, `is_hidden`, `is_active`, `is_delete`, `create_user`, `update_user`, `name`) VALUES (13, '2024-08-15 00:22:59', '2024-10-02 15:34:33', '操作日志', 11, '2', 'operateLog', '', 'catalog', '', '0', '1', '1', '', '', '操作日志');
INSERT INTO `sys_menu` (`id`, `create_time`, `update_time`, `desc`, `parent_id`, `order`, `path`, `component`, `type`, `icon`, `is_hidden`, `is_active`, `is_delete`, `create_user`, `update_user`, `name`) VALUES (14, '2024-08-15 00:23:45', '2024-10-02 15:34:34', '', 11, '1', 'onlineUser', 'systemMonitor/onlineUser/index', 'menu', '', '0', '1', NULL, '', '', '在线用户');
INSERT INTO `sys_menu` (`id`, `create_time`, `update_time`, `desc`, `parent_id`, `order`, `path`, `component`, `type`, `icon`, `is_hidden`, `is_active`, `is_delete`, `create_user`, `update_user`, `name`) VALUES (15, '2024-08-15 00:27:21', '2024-10-02 15:34:34', '服务监控', 11, '2', 'osInfo', 'systemMonitor/osInfo/index', 'menu', '', '0', '1', NULL, '', '', '服务监控');
INSERT INTO `sys_menu` (`id`, `create_time`, `update_time`, `desc`, `parent_id`, `order`, `path`, `component`, `type`, `icon`, `is_hidden`, `is_active`, `is_delete`, `create_user`, `update_user`, `name`) VALUES (16, '2024-08-15 00:33:54', '2024-10-02 15:34:34', '文章管理', 9, '1', 'articleManage', '', 'catalog', '', '0', '1', NULL, '', 'admin', '文章管理');
INSERT INTO `sys_menu` (`id`, `create_time`, `update_time`, `desc`, `parent_id`, `order`, `path`, `component`, `type`, `icon`, `is_hidden`, `is_active`, `is_delete`, `create_user`, `update_user`, `name`) VALUES (17, '2024-08-15 00:36:52', '2024-10-02 15:34:35', '配置管理', 5, '5', 'configs', 'system/configs/index', 'menu', '', '0', '1', NULL, '', '', '配置管理');
INSERT INTO `sys_menu` (`id`, `create_time`, `update_time`, `desc`, `parent_id`, `order`, `path`, `component`, `type`, `icon`, `is_hidden`, `is_active`, `is_delete`, `create_user`, `update_user`, `name`) VALUES (18, '2024-08-15 00:41:15', '2024-10-02 15:34:35', '首页', NULL, '1', 'index', '', 'catalog', 'dashboard', '0', '1', NULL, '', '', '首页');
INSERT INTO `sys_menu` (`id`, `create_time`, `update_time`, `desc`, `parent_id`, `order`, `path`, `component`, `type`, `icon`, `is_hidden`, `is_active`, `is_delete`, `create_user`, `update_user`, `name`) VALUES (19, '2024-08-15 00:44:53', '2024-10-02 15:34:35', '首页', 18, '1', 'index', 'index/index', 'menu', '', '1', '1', NULL, '', '', '首页');
INSERT INTO `sys_menu` (`id`, `create_time`, `update_time`, `desc`, `parent_id`, `order`, `path`, `component`, `type`, `icon`, `is_hidden`, `is_active`, `is_delete`, `create_user`, `update_user`, `name`) VALUES (20, '2024-08-15 01:12:57', '2024-10-02 15:34:36', '应用工具', NULL, '6', 'appTools', '', 'catalog', '', '0', '1', NULL, '', '', '应用工具');
INSERT INTO `sys_menu` (`id`, `create_time`, `update_time`, `desc`, `parent_id`, `order`, `path`, `component`, `type`, `icon`, `is_hidden`, `is_active`, `is_delete`, `create_user`, `update_user`, `name`) VALUES (21, '2024-08-15 01:14:35', '2024-10-02 15:34:36', '', 20, '1', 'poster', 'appTools/poster/index', 'menu', '', '0', '1', NULL, '', '', '宣传海报');
INSERT INTO `sys_menu` (`id`, `create_time`, `update_time`, `desc`, `parent_id`, `order`, `path`, `component`, `type`, `icon`, `is_hidden`, `is_active`, `is_delete`, `create_user`, `update_user`, `name`) VALUES (22, '2024-08-15 01:15:47', '2024-10-02 15:34:36', '', 20, '1', 'forms', 'appTools/forms/index', 'menu', '', '0', '1', NULL, '', '', '访问表单');
INSERT INTO `sys_menu` (`id`, `create_time`, `update_time`, `desc`, `parent_id`, `order`, `path`, `component`, `type`, `icon`, `is_hidden`, `is_active`, `is_delete`, `create_user`, `update_user`, `name`) VALUES (23, '2024-10-19 00:24:43', '2024-10-19 00:25:25', NULL, 16, '1', 'index', 'content/articleManage/index', 'menu', NULL, '1', '1', NULL, 'admin', 'admin', '文章列表');
INSERT INTO `sys_menu` (`id`, `create_time`, `update_time`, `desc`, `parent_id`, `order`, `path`, `component`, `type`, `icon`, `is_hidden`, `is_active`, `is_delete`, `create_user`, `update_user`, `name`) VALUES (24, '2024-10-19 00:26:05', NULL, NULL, 16, '2', 'aev', 'content/articleManage/aev', 'menu', NULL, '1', '1', NULL, 'admin', NULL, '{新增}');
COMMIT;

SET FOREIGN_KEY_CHECKS = 1;
