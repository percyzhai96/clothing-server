const expressJwt = require('express-jwt')
const getPublicIP = require('./utils.ip')
const visits = require('./utils.visits')
const db = require("../models");
const DAO = require("../dao/DAO");
const Roles = db.roles
const Menus = db.menus
const rolesMenus = db.rolesMenus
const logger = require("./utils.logger");
const { whitelist, routes } = require("./utils.whitelist");
const { notifyRobot } = require("./utils.tools");
const chalk = require("chalk");
const CONFIG = require('../config/index')

// 当前用户路由信息
let userRoutes = {}

/**
 * token验证函数
 *
 * @param  {[type]}   req  请求对象
 * @param  {[type]}   res  响应对象
 * @param  {Function} next 传递事件函数
 */
exports.tokenAuth = expressJwt({
    secret: process.env["SIGN_KEY"],
    algorithms: ['HS256'],
    credentialsRequired: true, //对没有携带token的 接口不抛出错误
})

/**
 * 接口权限验证函数
 *
 * @param  {[type]}   req  请求对象
 * @param  {[type]}   res  响应对象
 * @param  {Function} next 传递事件函数
 */

//角色和菜单是多对多的
//addTags、getTags、setTags 操作中间表的方法 会自动创建
Roles.belongsToMany(Menus, {
    through: {
        model: rolesMenus,
        unique: false,
    }, foreignKey: 'roleId',
});
//addArticle、getArticle、setArticle
Menus.belongsToMany(Roles, {
    through: {
        model: rolesMenus,
        unique: false,
    }, foreignKey: 'menuId',
});

exports.permissionAuth = async (req, res, next) => {
    const reqPath = `${req.method} ${req.baseUrl}`
    const userInfo = req.user, user_ip = getPublicIP(req)
    // 如果是超级管理员跳过校验
    // if (Config.supertube.includes(userInfo.roleId)) return next();
    if (userInfo.roleId.includes(CONFIG.superAdminUserId)) return next();
    //请求的接口
    if (whitelist.includes(reqPath.toLowerCase())) {
        console.log(chalk.bold.green(`【白名单内通过】 ${userInfo.userAccount} 请求 ${req.method} ${req.baseUrl + req.path} *** 权限验证通过`))
        next()
        return
    }
    try {
        // 查询是否有缓存
        if (userRoutes[userInfo.userId] && userRoutes[userInfo.userId].end > +new Date()) {
            if (!userRoutes[userInfo.userId].path.includes(reqPath.toLowerCase())) {
                logger.error(`【未通过】 ${userInfo.userAccount} 请求 ${req.method} ${req.baseUrl + req.path} *** 权限未验证通过    ip : ${user_ip}`);
                return res.sendResultAto('', 604, '您没有该权限访问,请联系管理员配置该权限')
            }
            console.log(chalk.bold.green(`【通过】 ${userInfo.userAccount} 请求 ${req.method} ${req.baseUrl + req.path} *** 权限验证通过`));

            return next()
        }
        // 查询该用户是否有权限访问
        DAO.list(Roles, { raw: false, include: [{ model: Menus ,where: {record_state: 0 }}], params: { id: userInfo.roleId } }, data => {
            // 将多个启用的角色路由组装成一个
            let Menus = [], roles = JSON.parse(JSON.stringify(data.data.data)), preMenus = [];
            roles.forEach(item => {
                if (!item.state) {
                    Menus = Menus.concat(item.menus)
                }
            })
            // Menus去重
            Menus.forEach(item => {
                if (preMenus.includes(item.path.toLowerCase())) return;
                preMenus.push(item.path.toLowerCase());
            })
            // 存入缓存
            userRoutes[userInfo.userId] = {
                path: preMenus,
                end: +new Date() + 1000 * 60 * 30
            }
            if (!preMenus.includes(reqPath.toLowerCase())) {
                logger.error(`【未通过】 ${userInfo.userAccount} 请求 ${req.method} ${req.baseUrl + req.path} *** 权限未验证通过    ip : ${user_ip}`);
                return res.sendResultAto('', 604, '您没有该权限访问,请联系管理员配置该权限')
            }
            console.log(chalk.bold.green(`【通过】 ${userInfo.userAccount} 请求 ${req.method} ${req.baseUrl + req.path} *** 权限验证通过`));

            next()
        })
    } catch (err) {
        console.log('err=====', err);
        //在此处理错误
        logger.error(`${userInfo.userAccount} 请求 ${req.method} ${req.baseUrl + req.path} *** 权限未验证通过    ip : ${user_ip}`);
        res.status(401).sendResultAto(err, 401, '接口权限验证错误')
    }


}

