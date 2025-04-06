let express = require('express');
let router = express.Router();
const getPublicIP = require('../../../../utils/utils.ip')
const Login = require("../../../../controllers/login.controller");
const logger = require("../../../../utils/utils.logger");
const utilTool = require("../../../../utils/utils.tools");
/**
 * 登录
 * @route POST /api/public/admin/login
 * @group 登录 - login
 * @param {string} userAccount - 请输入用户名
 * @param {string} pswd - 请输入密码
 * @returns {object} 200 - token
 * @returns {object} 500 - 登录失败错误
 * @returns {Error}  default - Unexpected error
 */

router.post("/", function (req, res) {
    const pm = req.body;
    // 请求验证+
    if (!pm.username) return res.sendResult({ data: '', code: 605, message: "用户名不能为空！" })

    if (!pm.password) return res.sendResult({ data: '', code: 605, message: "密码不能为空！" })

    if (!pm.code) return res.sendResult({ data: '', code: 605, message: "验证码不能为空！" })

    if (!req.session.code) return res.sendResult({ data: '', code: 605, message: "验证码已失效！" })

    if (req.session.code !== pm.code) return res.sendResult({ data: '', code: 605, message: "验证码错误！" })
    Login.login(pm, (data, err) => {
        if (err) {
            logger.error(`【${pm.username}】:${err}  ip : ${getPublicIP(req)}`)
            res.sendResultAto(null, 605, err)
            return
        }
        //记录访客
        // utilTool.generateVisitorRecord(req, data.userInfo.userId)
        res.sendResultAto(data, 200, '登录成功')
    })
});
/**
 * 登出
 * @route GET /api/public/admin/login/out
 * @group 登录 - login
 * @returns {object} 200 - 
 */
router.get("/out", (req, res) => {
    Login.logout(req, () => {
        res.sendResultAto(null, 200, '登出成功')
    })
})

module.exports = router;
