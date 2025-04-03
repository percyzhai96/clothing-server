const db = require("../models");
const { aes } = require('../utils/utils.crypto')
const visits = require('../utils/utils.visits')
const DAO = require("../dao/DAO");
const Op = db.Op;
const Users = db.users;
const Roles = db.roles;
const jwt = require('jsonwebtoken')

exports.login = function (pm, cb) {
    //登录逻辑
    // Users.findOne({ where: { userAccount: pm.username, } }).then(async data => {
    // 登录时账号区分大小写
    Users.findOne({ where: {[db.Op.and]: [{userAccount: pm.username},
        db.sequelize.where(db.sequelize.fn('SHA1', db.sequelize.col('userAccount')),'=',db.sequelize.fn('SHA1', pm.username))]
        }}).then(async data => {
        if (!data) return cb(null, '账号或密码错误！')
        if (aes.en(data.userAccount + pm.password) === data.pswd) {
            //判断用户是否正常
            if (!data.state) {
                cb(null, '账户已被禁用！请联系管理员')
                return;
            }
            // 判断角色是否正常
            let _roles = await Roles.findAll({ where: { id: { [Op.in]: data.roleId } },attributes: ["id", "state"], });
            if (_roles.map(i=>i.state).every(value => value === true)) {
                cb(null, '账户已被禁用！请联系管理员')
                return;
            }
            // 频繁请求处理
            // let isFrequent = await visits.isFrequent(data.id,data.userAccount)
            // if(isFrequent) return cb('frequent_access_prohibited', '您的访问过于频繁，请稍后再试。')
            const roleId = _roles.filter(i=> !i.v).map(i=>i.id); // 过滤掉被禁用的角色
            // 生成token
            let token = 'Bearer ' + jwt.sign(
                {
                    userAccount: data.userAccount,
                    nickName: data.nickName,
                    roleId,
                    pswd: data.pswd,
                    userId: data.id
                },
                process.env["SIGN_KEY"],
                {
                    expiresIn: 3600 * 4 // 3小时
                }
            )
            let userInfo = {
                userAccount: data.dataValues.userAccount,
                avatar: data.dataValues.avatar,
                createdAt: data.dataValues.createdAt,
                loginAt: data.dataValues.loginAt,
                nickName: data.dataValues.nickName,
                email: data.dataValues.email,
                phone: data.dataValues.phone,
                userId: data.dataValues.id,
                roleId: roleId.join(','),
            }
            // 登录成功 // 修改登陆时间
            Users.update({ loginAt: new Date() }, { where: { id: data.id } })
            cb({ userInfo, token })
            return
        }
        cb(null, '账号或密码错误！')
    }).catch(err => {
        cb(null, '账号或密码错误！')
    })
}

exports.logout = function (req, cb) {
    cb()
}
