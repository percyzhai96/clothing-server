const express = require('express');
const router = express.Router();
const Files = require("../../../controllers/sys-files.controller");

/**
 * 创建文件管理信息
 * @route POST /api/private/files/create
 * @group 文件管理 - Operations files-admin
 * @param {string} files_content - 请输入文件管理内容
 * @returns {object} 200 - An array of files info
 * @returns {object} 605 - 请求失败
 * @returns {Error}  default - Unexpected error
 */

router.post("/create", Files.create);

/**
 * 下载文件
 * @route GET /api/private/files/findOne
 * @group 文件管理 - Operations files-admin
 * @param {string} files_content - 请输入下载文件名
 * @returns {object} 200 - An array of files info
 * @returns {object} 605 - 请求失败
 * @returns {Error}  default - Unexpected error
 */

router.get("/findOne", Files.findOne);


/**
 * 删除文件管理信息
 * @route POST /api/private/files/delete
 * @group 文件管理 - Operations files-admin
 * @param {number} id - 请输入文件管理ID
 * @param {string} authorization - 请输入token
 * @returns {object} 200 - An array of files info
 * @returns {object} 605 - 请求失败
 * @returns {Error}  default - Unexpected error
 */
router.post("/delete", Files.delete);
/**
 * 查询文件管理信息列表
 * @route POST /api/private/files/list
 * @group 文件管理 - Operations files-admin
 * @param {object} query - 请按固定查询规范
 * @returns {object} 200 - An array of files info
 * @returns {object} 605 - 请求失败
 * @returns {Error}  default - Unexpected error
 */
router.post("/list", Files.findAll);
/**
 * 更新文件管理信息列表
 * @route POST /api/private/files/update
 * @group 文件管理 - Operations files-admin
 * @param {string} files_content - 请输入文件管理内容
 * @returns {object} 200 - An array of files info
 * @returns {object} 605 - 请求失败
 * @returns {Error}  default - Unexpected error
 */
router.post("/update", Files.update);


module.exports = router;
