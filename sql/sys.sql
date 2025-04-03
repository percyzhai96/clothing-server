/*
 Navicat Premium Data Transfer

 Source Server         : localhost
 Source Server Type    : MySQL
 Source Server Version : 100119
 Source Host           : localhost:3306
 Source Schema         : cloud-warehouse

 Target Server Type    : MySQL
 Target Server Version : 100119
 File Encoding         : 65001

 Date: 14/04/2024 23:37:14
*/

SET NAMES utf8mb4;
SET FOREIGN_KEY_CHECKS = 0;

-- ----------------------------
-- Table structure for sys_files
-- ----------------------------
DROP TABLE IF EXISTS `sys_files`;
CREATE TABLE `sys_files`  (
  `id` varchar(36) CHARACTER SET utf8 COLLATE utf8_bin NOT NULL,
  `userAccount` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL COMMENT '上传用户',
  `url` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL COMMENT '文件地址',
  `ext` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL COMMENT '文件后缀',
  `name` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL COMMENT '文件名称',
  `size` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL COMMENT '文件大小',
  `content` longtext CHARACTER SET utf8 COLLATE utf8_general_ci NULL COMMENT '备注',
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  `record_state` tinyint(1) NOT NULL COMMENT '记录状态 0 启用 1 删除',
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB CHARACTER SET = utf8 COLLATE = utf8_general_ci COMMENT = '系统文件记录表' ROW_FORMAT = DYNAMIC;

-- ----------------------------
-- Records of sys_files
-- ----------------------------

-- ----------------------------
-- Table structure for sys_log_visitor
-- ----------------------------
DROP TABLE IF EXISTS `sys_log_visitor`;
CREATE TABLE `sys_log_visitor`  (
  `id` varchar(36) CHARACTER SET utf8 COLLATE utf8_bin NOT NULL,
  `userAccount` varchar(100) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL COMMENT '用户账号',
  `browser` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL COMMENT '浏览器',
  `os` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL COMMENT '操作系统',
  `type` int NULL DEFAULT NULL COMMENT '项目类型',
  `count` int NULL DEFAULT 1 COMMENT '访问次数',
  `ipaddr` varchar(100) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL COMMENT 'IP',
  `loginLocation` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL COMMENT '地址',
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  `record_state` tinyint(1) NOT NULL COMMENT '记录状态 0 启用 1 删除',
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB CHARACTER SET = utf8 COLLATE = utf8_general_ci COMMENT = '系统登录日志表' ROW_FORMAT = COMPACT;

-- ----------------------------
-- Records of sys_log_visitor
-- ----------------------------

-- ----------------------------
-- Table structure for sys_menus
-- ----------------------------
DROP TABLE IF EXISTS `sys_menus`;
CREATE TABLE `sys_menus`  (
  `id` varchar(36) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  `parentId` varchar(36) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL COMMENT '父级ID',
  `orderNum` int NULL DEFAULT NULL COMMENT '菜单排序',
  `menuType` varchar(10) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL COMMENT '菜单类型',
  `isShow` tinyint(1) NULL DEFAULT 0 COMMENT '菜单是显示',
  `path` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL COMMENT '菜单路径',
  `title` varchar(100) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL COMMENT '菜单标题',
  `icon` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL COMMENT '菜单图标',
  `menuDesc` varchar(200) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL COMMENT '描述',
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  `authority` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL COMMENT '操作标识',
  `state` tinyint(1) NULL DEFAULT 0 COMMENT '状态',
  `record_state` tinyint(1) NOT NULL COMMENT '记录状态 0 启用 1 删除',
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB CHARACTER SET = utf8 COLLATE = utf8_general_ci COMMENT = '系统菜单' ROW_FORMAT = DYNAMIC;

-- ----------------------------
-- Records of sys_menus
-- ----------------------------
INSERT INTO `sys_menus` VALUES ('001', '1', 50, 'M', 1, 'charts', '图表', 'svg-icon-analysis', NULL, '2023-09-09 22:40:42', '2024-04-14 22:53:50', NULL, 0, 0);
INSERT INTO `sys_menus` VALUES ('001-1', '001', 1, 'C', 1, 'charts/VCharts', 'VCharts', 'el-icon-orange', NULL, '2023-09-09 22:56:12', '2024-04-14 22:41:41', NULL, 0, 0);
INSERT INTO `sys_menus` VALUES ('001-2', '001', 2, 'C', 1, 'charts/ECharts', 'ECharts', 'el-icon-orange', NULL, '2023-09-12 21:06:27', '2024-04-14 22:42:40', NULL, 0, 0);
INSERT INTO `sys_menus` VALUES ('002', '1', 51, 'M', 1, '/case', '组件模版', 'el-icon-cpu', NULL, '2023-09-11 20:48:31', '2024-04-14 22:53:58', NULL, 0, 0);
INSERT INTO `sys_menus` VALUES ('002-1', '002', 1, 'C', 1, '/case/md', 'markdown', 'el-icon-orange', NULL, '2023-10-09 10:05:25', '2024-04-14 22:48:32', NULL, 0, 0);
INSERT INTO `sys_menus` VALUES ('002-2', '002', 2, 'C', 1, '/case/code', '代码块', 'el-icon-orange', NULL, '2023-01-12 16:05:01', '2024-04-14 22:45:47', '', 0, 0);
INSERT INTO `sys_menus` VALUES ('002-3', '002', 3, 'C', 1, '/case/sign', '电子签名', 'el-icon-orange', NULL, '2023-02-06 15:56:30', '2024-04-14 22:47:30', NULL, 0, 0);
INSERT INTO `sys_menus` VALUES ('003', '1', 52, 'M', 1, 'test', '表格模版', 'el-icon-help', NULL, '2024-04-14 22:53:30', '2024-04-14 22:54:04', NULL, 0, 0);
INSERT INTO `sys_menus` VALUES ('003-1', '003', 1, 'C', 1, 'test/table', '普通', 'el-icon-orange', NULL, '2024-04-14 22:54:54', '2024-04-14 22:54:54', NULL, 0, 0);
INSERT INTO `sys_menus` VALUES ('003-2', '003', 2, 'C', 1, 'test/table2', '动态列', 'el-icon-orange', NULL, '2024-04-14 22:55:25', '2024-04-14 22:55:25', NULL, 0, 0);
INSERT INTO `sys_menus` VALUES ('005', '1', 98, 'M', 1, 'home', '个人中心', 'el-icon-user-solid', NULL, '2023-09-09 14:24:11', '2024-04-14 22:43:31', NULL, 0, 0);
INSERT INTO `sys_menus` VALUES ('005-1', '005', 1, 'C', 1, 'home/Index', '个人信息', 'el-icon-user-solid', NULL, '2023-09-09 14:09:36', '2023-12-18 09:10:40', NULL, 0, 0);
INSERT INTO `sys_menus` VALUES ('005-1-1', '005-1', NULL, 'B', 1, 'post /api/private/users/upload', '上传头像', 'svg-icon-circle', NULL, '2023-04-29 18:56:33', '2023-09-12 16:02:44', 'upload', 0, 0);
INSERT INTO `sys_menus` VALUES ('005-1-2', '005-1', NULL, 'B', 1, 'POST /api/private/users/code', '发送邮件', 'svg-icon-circle', NULL, '2023-04-30 19:01:10', '2023-04-30 19:01:10', 'code', 0, 0);
INSERT INTO `sys_menus` VALUES ('005-1-3', '005-1', NULL, 'B', 1, 'POST /api/private/users/email', '修改邮箱', 'svg-icon-circle', NULL, '2023-04-30 20:00:00', '2023-04-30 20:00:00', 'email', 0, 0);
INSERT INTO `sys_menus` VALUES ('005-1-4', '005-1', NULL, 'B', 1, 'POST /api/private/users/phone', '修改电话', 'svg-icon-circle', NULL, '2023-05-03 14:10:34', '2023-05-03 14:10:34', 'phone', 0, 0);
INSERT INTO `sys_menus` VALUES ('006', '1', 99, 'M', 1, '/system', '系统管理', 'el-icon-coordinate', NULL, '2022-04-26 14:15:37', '2024-04-14 22:43:09', '', 0, 0);
INSERT INTO `sys_menus` VALUES ('006-1', '006', 1, 'C', 1, '/system/notice', '公告管理', 'svg-icon-horn', NULL, '2023-09-23 00:20:39', '2023-09-23 00:20:39', NULL, 0, 0);
INSERT INTO `sys_menus` VALUES ('006-1-1', '006-1', 1, 'B', 1, 'POST /api/private/notice/list', '查询', 'svg-icon-circle', NULL, '2022-05-02 23:12:10', '2023-09-23 00:29:51', 'query', 0, 0);
INSERT INTO `sys_menus` VALUES ('006-1-2', '006-1', 1, 'B', 1, 'POST /api/private/notice/create', '添加', 'svg-icon-circle', NULL, '2022-05-02 23:14:18', '2023-09-23 00:29:56', 'add', 0, 0);
INSERT INTO `sys_menus` VALUES ('006-1-3', '006-1', 1, 'B', 1, 'POST /api/private/notice/delete', '删除', 'svg-icon-circle', NULL, '2022-05-02 23:14:42', '2023-09-23 00:30:01', 'delete', 0, 0);
INSERT INTO `sys_menus` VALUES ('006-1-4', '006-1', 1, 'B', 1, 'POST /api/private/notice/update', '修改', 'svg-icon-circle', NULL, '2022-05-02 23:15:04', '2023-09-23 00:30:05', 'update', 0, 0);
INSERT INTO `sys_menus` VALUES ('006-2', '006', 2, 'C', 1, 'system/userManage', '用户管理', 'el-icon-user', NULL, '2022-04-26 14:16:10', '2023-09-29 13:21:21', '', 0, 0);
INSERT INTO `sys_menus` VALUES ('006-2-1', '006-2', NULL, 'B', 1, 'POST /api/private/users/state', '账号状态', 'svg-icon-circle', NULL, '2023-04-22 02:54:23', '2023-04-22 02:54:23', 'state', 0, 0);
INSERT INTO `sys_menus` VALUES ('006-2-2', '006-2', 1, 'B', 1, 'POST /api/private/users/create', '添加', 'svg-icon-circle', NULL, '2022-04-27 15:54:43', '2022-04-27 15:54:43', 'add', 0, 0);
INSERT INTO `sys_menus` VALUES ('006-2-3', '006-2', 1, 'B', 1, 'POST /api/private/users/list', '查询', 'svg-icon-circle', NULL, '2022-04-27 15:55:13', '2022-04-27 15:55:13', 'query', 0, 0);
INSERT INTO `sys_menus` VALUES ('006-2-4', '006-2', 1, 'B', 1, 'POST /api/private/users/delete', '删除', 'svg-icon-circle', NULL, '2022-04-27 15:55:34', '2022-04-27 15:55:34', 'delete', 0, 0);
INSERT INTO `sys_menus` VALUES ('006-2-5', '006-2', 1, 'B', 1, 'POST /api/private/users/update', '修改', 'svg-icon-circle', NULL, '2022-04-27 15:55:55', '2022-04-27 15:55:55', 'update', 0, 0);
INSERT INTO `sys_menus` VALUES ('006-2-6', '006-2', 1, 'B', 1, 'POST /api/private/users/reset', '重置密码', 'svg-icon-circle', NULL, '2022-05-13 21:05:38', '2023-04-22 02:22:35', 'resetpwd', 0, 0);
INSERT INTO `sys_menus` VALUES ('006-3', '006', 3, 'C', 1, '/system/roleManage', '角色管理', 'svg-icon-order', NULL, '2022-04-26 14:16:23', '2023-09-29 13:25:19', '', 0, 0);
INSERT INTO `sys_menus` VALUES ('006-3-1', '006-3', NULL, 'B', 1, '#', '修改权限', 'svg-icon-circle', NULL, '2023-04-29 11:45:16', '2023-04-29 12:17:40', 'update:role', 0, 0);
INSERT INTO `sys_menus` VALUES ('006-3-2', '006-3', 1, 'B', 1, 'POST /api/private/roles/update', '修改', 'svg-icon-circle', NULL, '2022-04-27 15:52:04', '2022-04-27 15:53:55', 'update', 0, 0);
INSERT INTO `sys_menus` VALUES ('006-3-3', '006-3', 1, 'B', 1, 'POST /api/private/roles/list', '查询', 'svg-icon-circle', NULL, '2022-04-27 15:52:37', '2022-04-27 15:52:37', 'query', 0, 0);
INSERT INTO `sys_menus` VALUES ('006-3-4', '006-3', 1, 'B', 1, 'POST /api/private/roles/delete', '删除', 'svg-icon-circle', NULL, '2022-04-27 15:52:59', '2022-04-27 15:52:59', 'delete', 0, 0);
INSERT INTO `sys_menus` VALUES ('006-3-5', '006-3', 1, 'B', 1, 'POST /api/private/roles/create', '添加', 'svg-icon-circle', NULL, '2022-04-27 15:54:15', '2022-04-27 15:54:15', 'add', 0, 0);
INSERT INTO `sys_menus` VALUES ('006-4', '006', 4, 'C', 1, '/system/menuManage', '菜单管理', 'el-icon-menu', NULL, '2022-04-26 14:16:35', '2023-09-29 13:24:38', '', 0, 0);
INSERT INTO `sys_menus` VALUES ('006-4-1', '006-4', NULL, 'B', 1, 'post /api/private/menus/state', '菜单启用', 'svg-icon-circle', NULL, '2023-04-22 03:10:30', '2023-04-22 03:10:30', 'state', 0, 0);
INSERT INTO `sys_menus` VALUES ('006-4-2', '006-4', 1, 'B', 1, 'POST /api/private/menus/create', '添加', 'svg-icon-circle', NULL, '2022-04-27 15:50:26', '2023-04-21 01:57:49', 'add', 0, 0);
INSERT INTO `sys_menus` VALUES ('006-4-3', '006-4', 1, 'B', 1, 'POST /api/private/menus/list', '查询', 'svg-icon-circle', NULL, '2022-04-27 15:50:43', '2023-09-17 17:31:51', 'query', 0, 0);
INSERT INTO `sys_menus` VALUES ('006-4-4', '006-4', 1, 'B', 1, 'POST /api/private/menus/delete', '删除', 'svg-icon-circle', NULL, '2022-04-27 15:51:10', '2023-04-21 01:58:18', 'delete', 0, 0);
INSERT INTO `sys_menus` VALUES ('006-4-5', '006-4', 1, 'B', 1, 'POST /api/private/menus/update', '修改', 'svg-icon-circle', NULL, '2022-04-27 15:51:28', '2023-04-21 01:58:26', 'update', 0, 0);
INSERT INTO `sys_menus` VALUES ('006-5', '006', 5, 'C', 1, '/system/file', '文件管理', 'el-icon-files', NULL, '2023-02-06 15:54:39', '2023-09-29 13:22:49', '', 0, 0);
INSERT INTO `sys_menus` VALUES ('006-5-1', '006-5', 1, 'B', 1, 'POST /api/private/files/create', '上传', 'svg-icon-circle', NULL, '2023-02-06 15:56:13', '2023-04-28 22:53:23', 'add', 0, 0);
INSERT INTO `sys_menus` VALUES ('006-5-2', '006-5', 1, 'B', 1, 'POST /api/private/files/list', '查询', 'svg-icon-circle', NULL, '2023-02-06 15:56:30', '2023-02-06 15:56:30', 'query', 0, 0);
INSERT INTO `sys_menus` VALUES ('006-5-3', '006-5', 1, 'B', 1, 'POST /api/private/files/delete', '删除', 'svg-icon-circle', NULL, '2023-02-06 15:57:09', '2023-04-29 12:19:28', 'delete', 0, 0);
INSERT INTO `sys_menus` VALUES ('006-5-4', '006-5', 1, 'B', 1, 'get /api/private/files/findOne', '下载', 'svg-icon-circle', NULL, '2023-02-08 10:48:56', '2023-04-29 11:40:50', 'download', 0, 0);
INSERT INTO `sys_menus` VALUES ('006-6', '006', 6, 'C', 1, '/system/visitorInfo', '访客日志', 'el-icon-thumb', NULL, '2022-06-18 17:02:55', '2023-09-29 13:24:23', '', 0, 0);
INSERT INTO `sys_menus` VALUES ('006-6-1', '006-6', 1, 'B', 1, 'post /api/private/visitor/list', '查询', 'svg-icon-circle', NULL, '2022-06-18 17:03:17', '2023-04-21 01:57:03', 'query', 0, 0);

-- ----------------------------
-- Table structure for sys_notice
-- ----------------------------
DROP TABLE IF EXISTS `sys_notice`;
CREATE TABLE `sys_notice`  (
  `id` varchar(36) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL COMMENT '主键',
  `title` varchar(50) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL COMMENT '公告标题',
  `content` text CHARACTER SET utf8 COLLATE utf8_general_ci NULL COMMENT '公告内容',
  `type` varchar(1) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL COMMENT '1:PC公告2微信公共',
  `state` tinyint(1) NOT NULL DEFAULT 1 COMMENT '发布状态',
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  `record_state` tinyint(1) NOT NULL COMMENT '记录状态 0 启用 1 删除',
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB CHARACTER SET = utf8 COLLATE = utf8_general_ci COMMENT = '系统公告表' ROW_FORMAT = Compact;

-- ----------------------------
-- Records of sys_notice
-- ----------------------------

-- ----------------------------
-- Table structure for sys_roles
-- ----------------------------
DROP TABLE IF EXISTS `sys_roles`;
CREATE TABLE `sys_roles`  (
  `id` varchar(36) CHARACTER SET utf8 COLLATE utf8_bin NOT NULL,
  `roleName` varchar(100) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL COMMENT '角色名称',
  `roleDesc` varchar(100) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL COMMENT '角色描述',
  `roleCode` varchar(100) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL COMMENT '角色编码',
  `state` tinyint(1) NULL DEFAULT 1 COMMENT '状态',
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  `record_state` tinyint(1) NOT NULL COMMENT '记录状态 0 启用 1 删除',
  PRIMARY KEY (`id`) USING BTREE,
  INDEX `role_name`(`roleName` ASC) USING BTREE,
  INDEX `role_desc`(`roleDesc` ASC) USING BTREE
) ENGINE = InnoDB CHARACTER SET = utf8 COLLATE = utf8_general_ci COMMENT = '系统角色表' ROW_FORMAT = DYNAMIC;

-- ----------------------------
-- Records of sys_roles
-- ----------------------------
INSERT INTO `sys_roles` VALUES ('admin-autchan-admin', '管理员', '管理员', 'admin', 0, '2024-04-14 20:53:58', '2024-04-14 21:00:43', 0);
INSERT INTO `sys_roles` VALUES ('tadpole-autchan-tadpole', '超级管理员', '超级管理员', NULL, 0, '2022-04-26 11:49:25', '2023-09-11 21:24:39', 0);

-- ----------------------------
-- Table structure for sys_roles_menus
-- ----------------------------
DROP TABLE IF EXISTS `sys_roles_menus`;
CREATE TABLE `sys_roles_menus`  (
  `id` varchar(36) CHARACTER SET utf8 COLLATE utf8_bin NOT NULL,
  `roleId` varchar(36) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL COMMENT '角色ID',
  `menuId` varchar(36) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL COMMENT '菜单ID',
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB CHARACTER SET = utf8 COLLATE = utf8_general_ci COMMENT = '系统菜单角色关系表' ROW_FORMAT = DYNAMIC;

-- ----------------------------
-- Records of sys_roles_menus
-- ----------------------------
INSERT INTO `sys_roles_menus` VALUES ('02a7bc7f-0e60-40d0-8bb9-d689d7f53ea4', 'tadpole-autchan-tadpole', '001-1', '2024-04-14 23:36:50', '2024-04-14 23:36:50');
INSERT INTO `sys_roles_menus` VALUES ('06dab5f5-d4b2-4fb3-afce-81c0e6eff109', 'admin-autchan-admin', '002', '2024-04-14 23:36:47', '2024-04-14 23:36:47');
INSERT INTO `sys_roles_menus` VALUES ('11b107db-8d1e-4b1a-ba19-2efeac07918a', 'tadpole-autchan-tadpole', '006-6', '2024-04-14 23:36:50', '2024-04-14 23:36:50');
INSERT INTO `sys_roles_menus` VALUES ('14cab41b-7d4a-4f80-951e-18cf41c18d36', 'admin-autchan-admin', '006-2-1', '2024-04-14 23:36:47', '2024-04-14 23:36:47');
INSERT INTO `sys_roles_menus` VALUES ('17e65696-d0c7-453c-b1e3-a6764ac6439b', 'admin-autchan-admin', '006-5-3', '2024-04-14 23:36:47', '2024-04-14 23:36:47');
INSERT INTO `sys_roles_menus` VALUES ('1ef98f4c-909c-4c6c-b8be-1671b50344de', 'admin-autchan-admin', '005-1', '2024-04-14 23:36:47', '2024-04-14 23:36:47');
INSERT INTO `sys_roles_menus` VALUES ('1f7a1563-59b8-40f5-9682-d8add0715760', 'admin-autchan-admin', '001-2', '2024-04-14 23:36:47', '2024-04-14 23:36:47');
INSERT INTO `sys_roles_menus` VALUES ('22c303d6-8d86-4374-9863-d8c7cec163a3', 'tadpole-autchan-tadpole', '005-1-1', '2024-04-14 23:36:50', '2024-04-14 23:36:50');
INSERT INTO `sys_roles_menus` VALUES ('233bcdb0-b59b-4bd7-909d-a689216f2fe9', 'admin-autchan-admin', '006-6', '2024-04-14 23:36:47', '2024-04-14 23:36:47');
INSERT INTO `sys_roles_menus` VALUES ('25c4efe6-2b2e-4a39-9acf-0332a652c28d', 'tadpole-autchan-tadpole', '005-1-4', '2024-04-14 23:36:50', '2024-04-14 23:36:50');
INSERT INTO `sys_roles_menus` VALUES ('27967c2d-9e9e-451b-9b98-c4a209e62fbb', 'admin-autchan-admin', '006-4-4', '2024-04-14 23:36:47', '2024-04-14 23:36:47');
INSERT INTO `sys_roles_menus` VALUES ('28c2e741-9c55-4342-8374-edbf3e021dde', 'admin-autchan-admin', '005-1-4', '2024-04-14 23:36:47', '2024-04-14 23:36:47');
INSERT INTO `sys_roles_menus` VALUES ('2f2affd8-b99a-45c6-9f1c-198cc55066f7', 'tadpole-autchan-tadpole', '006-6-1', '2024-04-14 23:36:50', '2024-04-14 23:36:50');
INSERT INTO `sys_roles_menus` VALUES ('2f323023-5e02-4424-8f46-b67e4ea74ab5', 'admin-autchan-admin', '005-1-3', '2024-04-14 23:36:47', '2024-04-14 23:36:47');
INSERT INTO `sys_roles_menus` VALUES ('351f6481-60f9-4044-a185-c2aedee9694c', 'tadpole-autchan-tadpole', '006-2-1', '2024-04-14 23:36:50', '2024-04-14 23:36:50');
INSERT INTO `sys_roles_menus` VALUES ('36e21399-3526-4136-ab83-b445402471dd', 'admin-autchan-admin', '006-2', '2024-04-14 23:36:47', '2024-04-14 23:36:47');
INSERT INTO `sys_roles_menus` VALUES ('37b9f585-31df-4279-a521-f1bfe49d9ce9', 'tadpole-autchan-tadpole', '006-2-2', '2024-04-14 23:36:50', '2024-04-14 23:36:50');
INSERT INTO `sys_roles_menus` VALUES ('3f0f9a87-7ae8-4f74-bad3-739e070aef32', 'admin-autchan-admin', '002-2', '2024-04-14 23:36:47', '2024-04-14 23:36:47');
INSERT INTO `sys_roles_menus` VALUES ('3fb43269-b9f0-46e8-b4c3-2f90cf84a3ef', 'admin-autchan-admin', '006-4', '2024-04-14 23:36:47', '2024-04-14 23:36:47');
INSERT INTO `sys_roles_menus` VALUES ('40e52519-0d30-4262-97e6-9a05f565d6c5', 'admin-autchan-admin', '006-3-1', '2024-04-14 23:36:47', '2024-04-14 23:36:47');
INSERT INTO `sys_roles_menus` VALUES ('41379594-8540-4488-adbc-4510c4898b20', 'tadpole-autchan-tadpole', '006-5', '2024-04-14 23:36:50', '2024-04-14 23:36:50');
INSERT INTO `sys_roles_menus` VALUES ('418af445-6e42-48ea-9f15-307be2240b91', 'admin-autchan-admin', '006-4-3', '2024-04-14 23:36:47', '2024-04-14 23:36:47');
INSERT INTO `sys_roles_menus` VALUES ('444800c3-c969-43bc-a18b-b29997897b55', 'tadpole-autchan-tadpole', '006-3-5', '2024-04-14 23:36:50', '2024-04-14 23:36:50');
INSERT INTO `sys_roles_menus` VALUES ('46a3777a-a915-4b2e-bb5e-4850731337f9', 'admin-autchan-admin', '006-3-2', '2024-04-14 23:36:47', '2024-04-14 23:36:47');
INSERT INTO `sys_roles_menus` VALUES ('47048148-08a1-41d1-83a0-b9300bce7013', 'tadpole-autchan-tadpole', '005-1-3', '2024-04-14 23:36:50', '2024-04-14 23:36:50');
INSERT INTO `sys_roles_menus` VALUES ('477099f9-720a-481e-add7-c5d8d843dd07', 'tadpole-autchan-tadpole', '006-5-1', '2024-04-14 23:36:50', '2024-04-14 23:36:50');
INSERT INTO `sys_roles_menus` VALUES ('4ac743f3-d54d-4dfc-a28a-ae5e9a522001', 'tadpole-autchan-tadpole', '006-1-4', '2024-04-14 23:36:50', '2024-04-14 23:36:50');
INSERT INTO `sys_roles_menus` VALUES ('4bc69e20-455f-48f3-b861-fa107577ef40', 'admin-autchan-admin', '006-6-1', '2024-04-14 23:36:47', '2024-04-14 23:36:47');
INSERT INTO `sys_roles_menus` VALUES ('4c1b754d-e3fe-4212-adcd-541decc41b4b', 'tadpole-autchan-tadpole', '006-4-1', '2024-04-14 23:36:50', '2024-04-14 23:36:50');
INSERT INTO `sys_roles_menus` VALUES ('4ca9b090-3ef1-4655-8d49-e6a767d30946', 'admin-autchan-admin', '006-3-4', '2024-04-14 23:36:47', '2024-04-14 23:36:47');
INSERT INTO `sys_roles_menus` VALUES ('4d5f78c8-9491-4893-8de2-34e15dc6a19a', 'admin-autchan-admin', '006-1-4', '2024-04-14 23:36:47', '2024-04-14 23:36:47');
INSERT INTO `sys_roles_menus` VALUES ('4ea897e6-9c71-4483-97f5-b627a70ad0fe', 'tadpole-autchan-tadpole', '006-3-3', '2024-04-14 23:36:50', '2024-04-14 23:36:50');
INSERT INTO `sys_roles_menus` VALUES ('5594e492-0022-46d5-8eb8-fceea0c40c0f', 'tadpole-autchan-tadpole', '002-2', '2024-04-14 23:36:50', '2024-04-14 23:36:50');
INSERT INTO `sys_roles_menus` VALUES ('577ac529-5730-460b-9a35-5d59cc306ba0', 'admin-autchan-admin', '006-4-1', '2024-04-14 23:36:47', '2024-04-14 23:36:47');
INSERT INTO `sys_roles_menus` VALUES ('58255529-a2ce-4876-9177-d032735c085b', 'tadpole-autchan-tadpole', '006-3-4', '2024-04-14 23:36:50', '2024-04-14 23:36:50');
INSERT INTO `sys_roles_menus` VALUES ('59668c70-c627-494e-8f10-772b8e5f7487', 'tadpole-autchan-tadpole', '006-4-4', '2024-04-14 23:36:50', '2024-04-14 23:36:50');
INSERT INTO `sys_roles_menus` VALUES ('5a170186-99f4-42ac-a3de-e2910b5a654c', 'tadpole-autchan-tadpole', '002-3', '2024-04-14 23:36:50', '2024-04-14 23:36:50');
INSERT INTO `sys_roles_menus` VALUES ('5a3b1693-76c6-4c18-9fe8-3e60cc9037ca', 'admin-autchan-admin', '006-5', '2024-04-14 23:36:47', '2024-04-14 23:36:47');
INSERT INTO `sys_roles_menus` VALUES ('5e96eb22-fbbc-4f83-bc17-454a6e3c6c10', 'tadpole-autchan-tadpole', '006-3', '2024-04-14 23:36:50', '2024-04-14 23:36:50');
INSERT INTO `sys_roles_menus` VALUES ('5f7011c3-1a11-4c0b-9c89-4317e60733c3', 'tadpole-autchan-tadpole', '002', '2024-04-14 23:36:50', '2024-04-14 23:36:50');
INSERT INTO `sys_roles_menus` VALUES ('61cbbdd5-4149-4a03-bea6-793b73235857', 'admin-autchan-admin', '006-2-2', '2024-04-14 23:36:47', '2024-04-14 23:36:47');
INSERT INTO `sys_roles_menus` VALUES ('668a9e6a-4b77-43b0-8783-4db2f5e49046', 'tadpole-autchan-tadpole', '006-4', '2024-04-14 23:36:50', '2024-04-14 23:36:50');
INSERT INTO `sys_roles_menus` VALUES ('69345fc3-b495-4841-a494-b099f860c8c7', 'admin-autchan-admin', '006-1-1', '2024-04-14 23:36:47', '2024-04-14 23:36:47');
INSERT INTO `sys_roles_menus` VALUES ('71883b52-5304-4523-9f4b-40ee3e195ea4', 'admin-autchan-admin', '003', '2024-04-14 23:36:47', '2024-04-14 23:36:47');
INSERT INTO `sys_roles_menus` VALUES ('748ecaf9-73f4-4e26-b0fb-85ca13e7f825', 'admin-autchan-admin', '006-5-2', '2024-04-14 23:36:47', '2024-04-14 23:36:47');
INSERT INTO `sys_roles_menus` VALUES ('74a84fc4-898c-44d9-9034-8f3b53202456', 'admin-autchan-admin', '005-1-2', '2024-04-14 23:36:47', '2024-04-14 23:36:47');
INSERT INTO `sys_roles_menus` VALUES ('7529aa98-0d0c-4040-a32a-4583d9abe21f', 'admin-autchan-admin', '006-4-5', '2024-04-14 23:36:47', '2024-04-14 23:36:47');
INSERT INTO `sys_roles_menus` VALUES ('7ab39776-3090-493b-a332-56ca8527c74d', 'admin-autchan-admin', '005', '2024-04-14 23:36:47', '2024-04-14 23:36:47');
INSERT INTO `sys_roles_menus` VALUES ('7f388696-1979-405c-bef1-7068e0c9ace3', 'admin-autchan-admin', '006-2-3', '2024-04-14 23:36:47', '2024-04-14 23:36:47');
INSERT INTO `sys_roles_menus` VALUES ('82642c11-7a30-4fd9-b90f-38ba8f1542ac', 'admin-autchan-admin', '001-1', '2024-04-14 23:36:47', '2024-04-14 23:36:47');
INSERT INTO `sys_roles_menus` VALUES ('86afa71b-4fff-49ae-8cc5-9c99e455af16', 'admin-autchan-admin', '003-1', '2024-04-14 23:36:47', '2024-04-14 23:36:47');
INSERT INTO `sys_roles_menus` VALUES ('89746347-3d79-46b1-8c05-65e06affa87f', 'tadpole-autchan-tadpole', '006-4-3', '2024-04-14 23:36:50', '2024-04-14 23:36:50');
INSERT INTO `sys_roles_menus` VALUES ('8b15d7dd-6182-49ed-835a-58a5dc19ccd9', 'tadpole-autchan-tadpole', '006-2-5', '2024-04-14 23:36:50', '2024-04-14 23:36:50');
INSERT INTO `sys_roles_menus` VALUES ('8e89ab4d-c35d-4414-961b-bc5c34fe3cff', 'tadpole-autchan-tadpole', '006-3-1', '2024-04-14 23:36:50', '2024-04-14 23:36:50');
INSERT INTO `sys_roles_menus` VALUES ('9531e629-3fdb-4071-b7a5-e058cd383363', 'tadpole-autchan-tadpole', '006-1-2', '2024-04-14 23:36:50', '2024-04-14 23:36:50');
INSERT INTO `sys_roles_menus` VALUES ('95769900-2444-4678-9b9d-25137bd478df', 'tadpole-autchan-tadpole', '006-5-3', '2024-04-14 23:36:50', '2024-04-14 23:36:50');
INSERT INTO `sys_roles_menus` VALUES ('99f681ae-482e-4e01-8d19-db2b7466834a', 'admin-autchan-admin', '006-1', '2024-04-14 23:36:47', '2024-04-14 23:36:47');
INSERT INTO `sys_roles_menus` VALUES ('a1bcde33-0c3c-464b-88b4-6058fced87cf', 'tadpole-autchan-tadpole', '001-2', '2024-04-14 23:36:50', '2024-04-14 23:36:50');
INSERT INTO `sys_roles_menus` VALUES ('a24f3cee-9bc9-430d-96f4-320a2b387905', 'admin-autchan-admin', '006-1-3', '2024-04-14 23:36:47', '2024-04-14 23:36:47');
INSERT INTO `sys_roles_menus` VALUES ('a4487a81-03fe-4851-acdd-14b3eec59978', 'tadpole-autchan-tadpole', '006-2-6', '2024-04-14 23:36:50', '2024-04-14 23:36:50');
INSERT INTO `sys_roles_menus` VALUES ('a50a1e3b-1f3e-45af-ba44-6c7fb81122c7', 'admin-autchan-admin', '002-1', '2024-04-14 23:36:47', '2024-04-14 23:36:47');
INSERT INTO `sys_roles_menus` VALUES ('a60d3d2c-76a9-4a2c-a14f-e0e19b10c694', 'admin-autchan-admin', '005-1-1', '2024-04-14 23:36:47', '2024-04-14 23:36:47');
INSERT INTO `sys_roles_menus` VALUES ('a943a26c-5ab9-444d-9619-f1bba2a8592a', 'admin-autchan-admin', '001', '2024-04-14 23:36:47', '2024-04-14 23:36:47');
INSERT INTO `sys_roles_menus` VALUES ('aaf0a569-eda3-4f84-9376-6b0ed6bb7820', 'tadpole-autchan-tadpole', '006-2-4', '2024-04-14 23:36:50', '2024-04-14 23:36:50');
INSERT INTO `sys_roles_menus` VALUES ('ab7ead02-c65c-472e-bea6-c4566d76fec0', 'tadpole-autchan-tadpole', '006-2-3', '2024-04-14 23:36:50', '2024-04-14 23:36:50');
INSERT INTO `sys_roles_menus` VALUES ('ad53ddbb-eb27-4d4f-b68b-93f3565e2bdd', 'admin-autchan-admin', '006-1-2', '2024-04-14 23:36:47', '2024-04-14 23:36:47');
INSERT INTO `sys_roles_menus` VALUES ('ae369aaf-2d48-45dc-8951-118a50a2d82b', 'tadpole-autchan-tadpole', '006-2', '2024-04-14 23:36:50', '2024-04-14 23:36:50');
INSERT INTO `sys_roles_menus` VALUES ('aeb11043-0d97-449e-8fb7-3665302b12f1', 'tadpole-autchan-tadpole', '006-1', '2024-04-14 23:36:50', '2024-04-14 23:36:50');
INSERT INTO `sys_roles_menus` VALUES ('afb1ea22-c10f-428f-95da-fce9c5d5a8ac', 'admin-autchan-admin', '006', '2024-04-14 23:36:47', '2024-04-14 23:36:47');
INSERT INTO `sys_roles_menus` VALUES ('b33e3107-cd27-44ec-84a6-f77946966269', 'tadpole-autchan-tadpole', '006', '2024-04-14 23:36:50', '2024-04-14 23:36:50');
INSERT INTO `sys_roles_menus` VALUES ('b4366b67-d251-46b4-bf01-0a4e99845bb8', 'tadpole-autchan-tadpole', '006-4-2', '2024-04-14 23:36:50', '2024-04-14 23:36:50');
INSERT INTO `sys_roles_menus` VALUES ('bc5b5439-5c8b-4da0-a0eb-ceb736fbc3d9', 'admin-autchan-admin', '006-5-1', '2024-04-14 23:36:47', '2024-04-14 23:36:47');
INSERT INTO `sys_roles_menus` VALUES ('bd69e044-ffb0-4ef9-971d-7544c7e96ac4', 'tadpole-autchan-tadpole', '003-1', '2024-04-14 23:36:50', '2024-04-14 23:36:50');
INSERT INTO `sys_roles_menus` VALUES ('c47f3f2d-c5ad-4e9c-a998-64bf1ca27187', 'admin-autchan-admin', '006-3', '2024-04-14 23:36:47', '2024-04-14 23:36:47');
INSERT INTO `sys_roles_menus` VALUES ('c4cbd38b-c548-4dc0-b33c-7280580a74fa', 'tadpole-autchan-tadpole', '005-1-2', '2024-04-14 23:36:50', '2024-04-14 23:36:50');
INSERT INTO `sys_roles_menus` VALUES ('c4f70528-9129-4c09-ad79-53070dcb08ae', 'tadpole-autchan-tadpole', '006-5-2', '2024-04-14 23:36:50', '2024-04-14 23:36:50');
INSERT INTO `sys_roles_menus` VALUES ('c553807d-bc7f-466e-8285-c40a391d56c4', 'tadpole-autchan-tadpole', '005', '2024-04-14 23:36:50', '2024-04-14 23:36:50');
INSERT INTO `sys_roles_menus` VALUES ('cc7abcee-5c86-45c3-802a-e75a5a227b28', 'admin-autchan-admin', '006-4-2', '2024-04-14 23:36:47', '2024-04-14 23:36:47');
INSERT INTO `sys_roles_menus` VALUES ('cf0b2691-f3c2-4316-804e-d202b2af7d6c', 'tadpole-autchan-tadpole', '005-1', '2024-04-14 23:36:50', '2024-04-14 23:36:50');
INSERT INTO `sys_roles_menus` VALUES ('d18c71fa-b92d-4c55-bc60-f5cfdc6532be', 'admin-autchan-admin', '006-5-4', '2024-04-14 23:36:47', '2024-04-14 23:36:47');
INSERT INTO `sys_roles_menus` VALUES ('d359c089-8955-4f5f-82f8-3139d2887b0c', 'tadpole-autchan-tadpole', '006-3-2', '2024-04-14 23:36:50', '2024-04-14 23:36:50');
INSERT INTO `sys_roles_menus` VALUES ('d67bad9e-b241-4482-bda8-2d2dbd0abe0f', 'tadpole-autchan-tadpole', '006-1-3', '2024-04-14 23:36:50', '2024-04-14 23:36:50');
INSERT INTO `sys_roles_menus` VALUES ('d6b953b0-41d8-4393-954e-50da77637a6e', 'tadpole-autchan-tadpole', '002-1', '2024-04-14 23:36:50', '2024-04-14 23:36:50');
INSERT INTO `sys_roles_menus` VALUES ('d7169226-4209-4373-99fe-34e27d5c7b1c', 'admin-autchan-admin', '006-2-6', '2024-04-14 23:36:47', '2024-04-14 23:36:47');
INSERT INTO `sys_roles_menus` VALUES ('d89aff95-0648-4103-9736-f02fd22c7e18', 'admin-autchan-admin', '002-3', '2024-04-14 23:36:47', '2024-04-14 23:36:47');
INSERT INTO `sys_roles_menus` VALUES ('d8e72053-742a-4f37-8565-075115e18a51', 'tadpole-autchan-tadpole', '006-5-4', '2024-04-14 23:36:50', '2024-04-14 23:36:50');
INSERT INTO `sys_roles_menus` VALUES ('df1390ad-411b-4712-ae73-1299745e79d5', 'tadpole-autchan-tadpole', '003-2', '2024-04-14 23:36:50', '2024-04-14 23:36:50');
INSERT INTO `sys_roles_menus` VALUES ('e9ac89a3-2898-4b69-a14f-1621e9b6fe17', 'tadpole-autchan-tadpole', '003', '2024-04-14 23:36:50', '2024-04-14 23:36:50');
INSERT INTO `sys_roles_menus` VALUES ('e9b82487-9331-46ea-809d-1014a6fc309f', 'tadpole-autchan-tadpole', '006-4-5', '2024-04-14 23:36:50', '2024-04-14 23:36:50');
INSERT INTO `sys_roles_menus` VALUES ('ea738c24-edf3-40dc-b393-4ba4be100277', 'admin-autchan-admin', '006-2-5', '2024-04-14 23:36:47', '2024-04-14 23:36:47');
INSERT INTO `sys_roles_menus` VALUES ('ece0c6e5-1d76-4119-8a32-622bef92a11e', 'admin-autchan-admin', '006-2-4', '2024-04-14 23:36:47', '2024-04-14 23:36:47');
INSERT INTO `sys_roles_menus` VALUES ('ee99808a-d657-4584-93a1-8d430ce315fc', 'tadpole-autchan-tadpole', '001', '2024-04-14 23:36:50', '2024-04-14 23:36:50');
INSERT INTO `sys_roles_menus` VALUES ('f65eb102-9787-4ac6-9deb-cdbbfccad6c2', 'admin-autchan-admin', '003-2', '2024-04-14 23:36:47', '2024-04-14 23:36:47');
INSERT INTO `sys_roles_menus` VALUES ('f74acd6d-306f-44df-9851-94217cee69ad', 'admin-autchan-admin', '006-3-3', '2024-04-14 23:36:47', '2024-04-14 23:36:47');
INSERT INTO `sys_roles_menus` VALUES ('fa1b5403-187c-4211-846f-0b6d2cb005a7', 'admin-autchan-admin', '006-3-5', '2024-04-14 23:36:47', '2024-04-14 23:36:47');
INSERT INTO `sys_roles_menus` VALUES ('fe9de9f0-a1d8-46cb-8bbf-41de17c3af27', 'tadpole-autchan-tadpole', '006-1-1', '2024-04-14 23:36:50', '2024-04-14 23:36:50');

-- ----------------------------
-- Table structure for sys_users
-- ----------------------------
DROP TABLE IF EXISTS `sys_users`;
CREATE TABLE `sys_users`  (
  `id` varchar(36) CHARACTER SET utf8 COLLATE utf8_bin NOT NULL,
  `roleId` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL COMMENT '角色名称',
  `parentId` varchar(36) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL COMMENT '父级ID',
  `userAccount` varchar(100) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL COMMENT '账号',
  `pswd` text CHARACTER SET utf8 COLLATE utf8_general_ci NULL COMMENT '密码',
  `avatar` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL COMMENT '头像',
  `nickName` varchar(200) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT '小蝌蚪~' COMMENT '昵称',
  `phone` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL COMMENT '电话',
  `email` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL COMMENT '邮箱',
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  `loginAt` datetime NULL DEFAULT NULL COMMENT '上次登陆时间',
  `state` tinyint(1) NULL DEFAULT 1 COMMENT '状态',
  `userDesc` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL COMMENT '描述',
  `introduction` text CHARACTER SET utf8 COLLATE utf8_general_ci NULL COMMENT '个人简介',
  `imageCode` varchar(100) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL COMMENT '图形验证码',
  `emailCode` varchar(100) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL COMMENT '邮箱验证码',
  `phoneCode` varchar(100) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL COMMENT '短信验证码',
  `record_state` tinyint(1) NOT NULL COMMENT '记录状态 0 启用 1 删除',
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB CHARACTER SET = utf8 COLLATE = utf8_general_ci COMMENT = '系统用户表' ROW_FORMAT = DYNAMIC;

-- ----------------------------
-- Records of sys_users
-- ----------------------------
INSERT INTO `sys_users` VALUES ('0a80e850-0224-4f6f-8757-8ee60ea78e91', '0f893983-a069-45f3-8cdc-e6243ef683cd', '', 'admin', 'hpg0GA3OU2iXvFhOKk/dIw==', '/static/avatar/avatar.png', '管理员', NULL, NULL, '2024-04-14 15:41:19', '2024-04-14 16:07:15', NULL, 1, NULL, NULL, NULL, NULL, NULL, 0);
INSERT INTO `sys_users` VALUES ('tadpole-autchan-tadpole', 'tadpole-autchan-tadpole', NULL, 'autchan', '60QjvfIKRl3W4La8G9RxnCbb7N4EuK/LISPbM96Ru0k=', '/static/avatar/avatar.png', '超管', '', 'autchan@qq.com', '2022-04-26 21:53:54', '2024-04-14 22:32:38', '2024-04-14 22:32:38', 1, '', '我就是我，不一样的烟火！', NULL, NULL, NULL, 0);

SET FOREIGN_KEY_CHECKS = 1;
