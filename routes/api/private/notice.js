const express = require('express');
const router = express.Router();
const Notice = require("../../../controllers/sys-notice.controller");

/**
 * 创建
 * @route POST /api/private/notice/create
 * @group 公告管理
 */
router.post("/create", Notice.create);

/**
 * 删除
 * @route POST /api/private/notice/delete
 * @group 公告管理
 */
router.post("/delete", Notice.delete);

/**
 * 查询列表
 * @route POST /api/private/notice/list
 * @group 公告管理
 */
router.post("/list", Notice.findAll);

/**
 * 更新
 * @route POST /api/private/notice/update
 * @group 公告管理
 */
router.post("/update", Notice.update);

module.exports = router;
