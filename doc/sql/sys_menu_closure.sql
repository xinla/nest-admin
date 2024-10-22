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

 Date: 22/10/2024 09:23:18
*/

SET NAMES utf8mb4;
SET FOREIGN_KEY_CHECKS = 0;

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
INSERT INTO `sys_menu_closure` (`id_ancestor`, `id_descendant`) VALUES (9, 23);
INSERT INTO `sys_menu_closure` (`id_ancestor`, `id_descendant`) VALUES (9, 24);
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
INSERT INTO `sys_menu_closure` (`id_ancestor`, `id_descendant`) VALUES (16, 23);
INSERT INTO `sys_menu_closure` (`id_ancestor`, `id_descendant`) VALUES (16, 24);
INSERT INTO `sys_menu_closure` (`id_ancestor`, `id_descendant`) VALUES (17, 17);
INSERT INTO `sys_menu_closure` (`id_ancestor`, `id_descendant`) VALUES (18, 18);
INSERT INTO `sys_menu_closure` (`id_ancestor`, `id_descendant`) VALUES (18, 19);
INSERT INTO `sys_menu_closure` (`id_ancestor`, `id_descendant`) VALUES (19, 19);
INSERT INTO `sys_menu_closure` (`id_ancestor`, `id_descendant`) VALUES (20, 20);
INSERT INTO `sys_menu_closure` (`id_ancestor`, `id_descendant`) VALUES (20, 21);
INSERT INTO `sys_menu_closure` (`id_ancestor`, `id_descendant`) VALUES (20, 22);
INSERT INTO `sys_menu_closure` (`id_ancestor`, `id_descendant`) VALUES (21, 21);
INSERT INTO `sys_menu_closure` (`id_ancestor`, `id_descendant`) VALUES (22, 22);
INSERT INTO `sys_menu_closure` (`id_ancestor`, `id_descendant`) VALUES (23, 23);
INSERT INTO `sys_menu_closure` (`id_ancestor`, `id_descendant`) VALUES (24, 24);
COMMIT;

SET FOREIGN_KEY_CHECKS = 1;
