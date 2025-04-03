const express = require('express');
const router = express.Router();
const Users = require("../../../controllers/sys-users.controller");

/**
 * 创建用户信息
 * @route POST /api/private/users/create
 * @group 用户管理
 */
router.post("/create", Users.create);
/**
 * 删除用户信息
 * @route POST /api/private/users/delete
 * @group 用户管理 - delete of users
 * @param {number} id - 请输入用户ID
 * @param {string} authorization - 请输入token
 * @returns {object} 200 - An array of user info
 * @returns {object} 605 - 请求失败
 * @returns {Error}  default - Unexpected error
 */
router.post("/delete", Users.delete);
/**
 * 查询用户信息列表
 * @route POST /api/private/users/list
 * @group 用户管理
 */
router.post("/list", Users.findAll);
/**
 * 更新用户信息列表
 * @route POST /api/private/users/update
 * @group 用户管理
 */
router.post("/update", Users.update);
/**
 * 更新用户信息列表
 * @route POST /api/private/users/reset
 * @group 用户管理
 * @param {string} id.query.required - 请输入用户ID
 * @returns {object} 200 - An array of user info
 * @returns {object} 605 - 请求失败
 * @returns {Error}  default - Unexpected error
 */
router.post("/reset", Users.reset);

/**
 * 更新用户状态
 * @route POST /api/private/users/state
 * @group 用户管理
 * @param {string} id.query.required - 请输入用户ID
 * @returns {object} 200 - An array of user info
 * @returns {object} 605 - 请求失败
 * @returns {Error}  default - Unexpected error
 */
router.post("/state", Users.state);


/**
 * 个人信息
 * @route GET /api/private/users/infor
 * @group 个人中心
 */
router.get("/infor", Users.findOne);


/**
 * 发送邮箱验证码
 * @route POST /api/private/users/code
 * @group 个人中心
 */
router.post("/code", Users.replyMsg);

/**
 * 发送手机验证码
 * @route POST /api/private/users/code
 * @group 个人中心
 * @param {string} id.query.content - 邮箱
 * @returns {object} 200 - An array of user info
 * @returns {object} 605 - 请求失败
 * @returns {Error}  default - Unexpected error
 */
router.post("/msgcode", Users.replyPhoneMsg);


/**
 * 修改邮箱
 * @route POST /api/private/users/email
 * @group 个人中心
 * @param {string} id.query.content - 邮箱
 * @param {string} id.query.code - 验证码
 * @returns {object} 200 - An array of user info
 * @returns {object} 605 - 请求失败
 * @returns {Error}  default - Unexpected error
 */
router.post("/email", Users.updateEmail);

/**
 * 修改电话
 * @route POST /api/private/users/phone
 * @group 个人中心
 * @param {string} id.query.content - 邮箱
 * @param {string} id.query.code - 验证码
 * @returns {object} 200 - An array of user info
 * @returns {object} 605 - 请求失败
 * @returns {Error}  default - Unexpected error
 */
router.post("/phone", Users.updatePhone);


/**
 * 头像上传
 * @route GET /api/private/users/upload
 * @group 个人中心
 * @returns {object} 200 - An array of user info
 * @returns {object} 605 - 请求失败
 * @returns {Error}  default - Unexpected error
 */
router.post("/upload", Users.upload);

/**
 * 修改密码
 * @route POST /api/private/users/reclassify
 * @group 个人中心
 */
router.post("/reclassify", Users.reclassify);

/**
 * 修改昵称描述
 * @route POST /api/private/users/save
 * @group 个人中心
 */
router.post("/save", Users.save);


module.exports = router;
