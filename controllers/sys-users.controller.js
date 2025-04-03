const db = require("../models");
const getPublicIP = require('../utils/utils.ip');
const logger = require("../utils/utils.logger");
const { aes } = require("../utils/utils.crypto");
const { sendMailer, getSixCode } = require("../utils/utils.nodemailer");
const DAO = require("../dao/DAO");
const Files = db.files;
const path = require('path');
const fs = require('fs');
const multer = require('multer');
const CONFIG = require('../config/index')
let uploadDir = multer({ dest: 'uploads_files/avatar' }).single('file') //存放文件夹
const Users = db.users;
const Roles = db.roles;
const Op = db.Op;

Users.hasOne(Users, { foreignKey: 'id', sourceKey: 'parentId' });
Users.hasOne(Roles, { foreignKey: 'id', sourceKey: 'roleId', });
Roles.belongsTo(Users, { foreignKey: 'id', sourceKey: 'roleId' });

// Create and Save a new user
exports.create = (req, res) => {
    const pm = req.body;
    // 请求验证
    if (!req.body.userAccount) return res.sendResult({ data: '', code: 605, message: "账号不能为空" })

    if (!req.body.roleId) return res.sendResult({ data: '', code: 605, message: "角色不能为空！" })

    // Create a user
    const user = {
        userAccount: req.body.userAccount,
        pswd: req.body.userAccount + '123456',
        nickName: req.body.nickName,
        roleId: req.body.roleId,
        state: req.body.state || true,
        parentId: req.user.userId,
        endAt: req.body.endAt || null,
    };
    Users.findOne({ where: { 'userAccount': pm.userAccount } }).then(singleUser => {
        if (singleUser && singleUser.id) return res.sendResultAto(null, 605, '用户名已存在！')
        DAO.create(Users, user, data => {
            res.sendResult(data)
        })
    })
};

// Retrieve all user from the database.
exports.findAll = (req, res) => {
    const pm = req.body;
    pm.raw = false
    pm.include = [
        // { model: Roles, attributes: [['roleName', 'name'], 'id'] }, // 多个角色不适用
        { model: Users, attributes: [['nickName', 'parentName'], 'id',] },
    ]
    // 忽略字段
    pm.attributes = {
        exclude: ["imageCode", "emailCode", "phoneCode", "pswd"]
    }
    pm.params.nickName ? pm.params.nickName = {
        [Op.substring]: `%${pm.params.nickName}%`
    } : ''
    pm.params.userAccount ? pm.params.userAccount = {
        [Op.substring]: `%${pm.params.userAccount}%`
    } : ''
    DAO.list(Users, pm, list => {
        res.sendResult(list)
    })
};

// Find a single Users with an id
exports.findOne = (req, res) => {
    const pm = { params: { id: req.user.userId } }
    DAO.findOne(Users, pm, user => {
        let { pswd, phoneCode, emailCode, imageCode, userDesc, roleId, ...data } = user.data.dataValues
        res.sendResult({
            data, code: 200, message: '查询成功！'
        })
    })
};

// Update a Users by the id in the request
exports.update = (req, res) => {
    const pm = req.body;
    // 请求验证
    if (!pm.id) return res.sendResult({ data: '', code: 605, message: "ID不能为空！" })
    let { email, phone, nickName, endAt, roleId, userDesc, introduction, vipAt } = pm;
    DAO.update(Users, { email, phone, nickName, endAt, roleId, userDesc, introduction, vipAt }, { id: pm.id }, data => {
        res.sendResult(data)
    })

};

// 修改昵称描述
exports.save = (req, res) => {
    const pm = req.body;
    // 请求验证
    if (!pm.id) return res.sendResult({ data: '', code: 605, message: "ID不能为空！" })
    if (!pm.nickName) return res.sendResult({ data: '', code: 605, message: "姓名不能为空！" })
    DAO.update(Users, { nickName: pm.nickName, introduction: pm.introduction }, { id: pm.id }, data => {
        res.sendResult(data)
    })

};

// Update a Users by the id in the request
exports.reset = (req, res) => {
    const pm = req.body;
    // 请求验证
    if (!pm.userAccount || !pm.id) return res.sendResult({ data: '', code: 605, message: "缺少必要参数！" })
    Users.update({ pswd: pm.userAccount + 'pwd123456@' }, {
        where: {
            id: pm.id,
            userAccount: pm.userAccount
        }
    }).then(uD => {
        logger.info(`【重置密码】　${pm.userAccount}`)
        res.status(200).sendResultAto(null, 201, '重置密码成功')
    }).catch(err => {
        res.status(500).sendResultAto(err, 605, '重置错误')
    })

};

exports.state = (req, res) => {
    const pm = req.body;
    // 请求验证
    if (!pm.id || (!pm.state && !pm.userDesc)) return res.sendResult({ data: '', code: 605, message: "缺少必要参数！" })
    if (pm.id.includes(CONFIG.adminRoleUserId)||pm.id.includes(CONFIG.superAdminUserId)) return res.status(403).sendResultAto(null, 403, '存在不可删除的数据')
    Users.findByPk(pm.id).then(user => {
        if (!user) {
            return res.sendResult({ data: '', code: 605, message: "用户不存在！" });
        }
        const newState = !user.state;
        user.update({ state: newState, userDesc: pm.userDesc }).then(() => {
            res.status(200).sendResultAto(null, 201, '状态修改成功');
        }).catch(err => {
            res.status(500).sendResultAto(err, 605, '重置错误');
        });
    }).catch(err => {
        res.status(500).sendResultAto(err, 605, '查询错误');
    });
};



// Delete a Users with the specified id in the request
exports.delete = (req, res) => {
    const pm = req.body;
    // 请求验证
    if (!pm.id) return res.sendResult({ data: '', code: 605, message: "ID不能为空！" })
    if (pm.id==CONFIG.adminRoleUserId||pm.id==CONFIG.superAdminUserId) return res.status(403).sendResultAto(null, 403, '该用户不可删除！')
    DAO.delete(Users, { id: pm.id }, data => {
        res.sendResult(data)
    })
};

// size：初始文件大小
function getfilesize(size) {
    if (!size)
        return "";

    var num = 1024.00; //byte

    if (size < num)
        return size + "B";
    if (size < Math.pow(num, 2))
        return (size / num).toFixed(2) + "K"; //kb
    if (size < Math.pow(num, 3))
        return (size / Math.pow(num, 2)).toFixed(2) + "M"; //M
    if (size < Math.pow(num, 4))
        return (size / Math.pow(num, 3)).toFixed(2) + "G"; //G
    return (size / Math.pow(num, 4)).toFixed(2) + "T"; //T
}

// 上传头像
exports.upload = (req, res) => {
    uploadDir(req, res, function (err) {
        if (err instanceof multer.MulterError) {
            // 发生错误
        } else if (err) {
            // 发生错误
        }

        const pm = req.file;
        const userAccount = req.user.userAccount;
        const userid = req.user.userId;
        let fileExtArray = pm.mimetype.split("/");
        let ext = fileExtArray[fileExtArray.length - 1];
        let size = getfilesize(pm.size);
        let targetPath = pm.destination + '/' + userid + '.' + ext;
        let imgName = userid + '.' + ext;
        if (pm.size > 5240000) {
            return res.sendResult({
                data: null, code: 605, message: '文件过大，最大支持5M'
            })
        }
        fs.rename(path.join(process.cwd(), "/" + req.file.path), path.join(process.cwd(), targetPath), function (err) {
            if (err) {
                console.log(chalk.bold.red(`【文件上传失败】 ${imgName} *** 上传文件失败 地址：${req.method} ${req.baseUrl + req.path}`))
                return res.sendResult({ data: null, code: 500, message: '上传文件失败' })
            }
            let newFile = {
                content: "用户头像",
                url: `/static/avatar/${imgName}`,
                name: imgName,
                userAccount,
                size,
                ext,
            }
            DAO.update(Users, { avatar: newFile.url }, { id: userid }, data => {
                res.sendResult(data)
            })
            DAO.doQuery(`SELECT id from sys_files where userAccount='${userAccount}' and content='用户头像'`, data => {
                if (data.code = 200) {
                    let id = data.data.flat(Infinity)
                    if (id.length) {
                        DAO.update(Files, newFile, { id: id[0].id }, () => { })
                    } else {
                        DAO.create(Files, newFile, () => { })
                    }
                }

            })
        })
    })
};


// 发送验证码
exports.replyMsg = (req, res) => {
    const pm = req.body;
    if (!pm.email) return res.sendResult({ data: '', code: 605, message: "邮箱不能为空！" })
    pm.content = getSixCode();
    sendMailer({ email: pm.email, content: pm.content, type: 1, userAccount: req.user.userAccount }).then(info => {
        //去修改状态
        DAO.update(Users, { emailCode: `${pm.email + pm.content}` }, { id: req.user.userId }, (email) => {
            setTimeout(() => {
                DAO.update(Users, { emailCode: '' }, { id: req.user.userId }, () => { })
            }, 1000 * 60 * 3)
            res.sendResult({
                data: null, code: 201, message: '发送成功！'
            })
        })
    }).catch(err => {
        res.status(500).sendResultAto(err, 605, '回复失败！')
    })

};


// 修改邮箱
exports.updateEmail = (req, res) => {
    const pm = req.body;
    if (!pm.content) return res.sendResult({ data: '', code: 605, message: "邮箱不能为空！" })
    if (!pm.code) return res.sendResult({ data: '', code: 605, message: "验证码不能为空！" })
    let sql = `SELECT emailCode from sys_users where id='${req.user.userId}'`
    DAO.doQuery(sql, data => {
        if (data.code == 200) {
            let emailCode = data.data.flat(Infinity)
            if (!emailCode[0].emailCode) return res.sendResult({ data: '', code: 605, message: "验证码已过期！" })
            if (emailCode[0].emailCode === `${pm.content + pm.code}`) {
                DAO.update(Users, { emailCode: "", email: pm.content }, { id: req.user.userId }, () => {
                    res.sendResult({
                        data: null, code: 201, message: '更新成功！'
                    })
                })
                return
            }
        }
        res.sendResult({
            data: null, code: 605, message: '验证码错误！'
        })
    })
};


exports.replyPhoneMsg = (req, res) => {
    const pm = req.body;
    if (!pm.phone) return res.sendResult({ data: '', code: 605, message: "手机号不能为空！" })
    res.sendResult({
        data: null, code: 605, message: '暂未开通！'
    })
    return
    DAO.update(Users, { imageCode: `${pm.phone + pm.content}` }, { id: req.user.userId }, () => {
        res.sendResult({
            data: null, code: 201, message: '发送成功！'
        })
    })
}

// 修改电话
exports.updatePhone = (req, res) => {
    const pm = req.body;
    if (!pm.content) return res.sendResult({ data: '', code: 605, message: "电话不能为空！" })
    if (!pm.code) return res.sendResult({ data: '', code: 605, message: "验证码不能为空！" })
    let sql = `SELECT imageCode from sys_users where id='${req.user.userId}'`
    DAO.doQuery(sql, data => {
        if (data.code == 200) {
            let imageCode = data.data.flat(Infinity)
            if (imageCode[0].imageCode === `${pm.content + pm.code}`) {
                DAO.update(Users, { imageCode: "", phone: pm.content }, { id: req.user.userId }, () => {
                    res.sendResult({
                        data: null, code: 201, message: '更新成功！'
                    })
                })
                return
            }
        }
        res.sendResult({
            data: null, code: 605, message: '验证码错误！'
        })
    })
};

// 修改密码
exports.reclassify = (req, res) => {
    const pm = {
        pswd: aes.en(req.user.userAccount + req.body.pwd),
        userAccount: req.user.userAccount,
        id: req.user.userId,
    }
    Users.findOne({ where: pm }).then(user => {
        if (!user) res.sendResult({ data: '', code: 605, message: "旧密码不正确！" })
        DAO.update(Users, { pswd: (user.userAccount + req.body.newPwd) }, { id: user.id }, () => {
            logger.info(`【修改密码】　${pm.userAccount} 新密码：${req.body.newPwd} ip：${getPublicIP(req)}`)
            res.sendResult({
                data: null, code: 201, message: '密码修改成功！请重新登录'
            })
        })
    }).catch(err => {
        res.sendResult({ data: '', code: 605, message: "旧密码不正确！" })
    })
}
