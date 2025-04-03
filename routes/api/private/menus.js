const express = require('express');
const router = express.Router();
const Menus = require("../../../controllers/sys-menus.controller");

/**
 * 创建菜单信息
 * @route POST /api/private/menus/create
 * @group 菜单管理 
 */
router.post("/create", Menus.create);
/**
 * 删除菜单信息
 * @route POST /api/private/menus/delete
 * @group 菜单管理
 */
router.post("/delete", Menus.delete);
/**
 * 查询菜单信息列表
 * @route POST /api/private/menus/list
 * @group 菜单管理
 */
router.post("/list", Menus.findAll);
/**
 * 更新菜单信息列表
 * @route POST /api/private/menus/update
 * @group 菜单管理
 */
router.post("/update", Menus.update);

/**
 * 菜单启用
 * @route POST /api/private/menus/state
 * @group 菜单管理
 */
router.post("/state", Menus.state);
/**
 * 角色菜单
 * @route POST /api/private/menus/RolesMenus
 * @group 菜单管理
 */
router.get("/RolesMenus", Menus.rolesMenus);

module.exports = router;
