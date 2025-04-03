//各种通用工具类

const os = require('os');
const UAParser = require("ua-parser-js");
const db = require("../models");
let { md5 } = require("./utils.crypto");
let logger = require("./utils.logger");
const Users = db.users
const WxUsers = db.wxusers
const Visitor = db.visitor
let request = require('request');
const sequelize = db.sequelize;
const { Op } = require("sequelize");
let headers = {
    "Content-Type": "application/json;charset=UTF-8",
    "X-Bce-Signature": "AppCode/0658cf6ba73046d39b52b5288f6c956b",
}
const getPublicIP = require('./utils.ip')


let options = {
    method: 'POST',
    headers: headers,
}
//时间格式化
Date.prototype.Format = function (fmt) { //author: meizz
    let o = {
        "M+": this.getMonth() + 1, //月份
        "d+": this.getDate(), //日
        "h+": this.getHours(), //小时
        "m+": this.getMinutes(), //分
        "s+": this.getSeconds(), //秒
        "q+": Math.floor((this.getMonth() + 3) / 3), //季度
        "S": this.getMilliseconds() //毫秒
    };
    if (/(y+)/.test(fmt)) fmt = fmt.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length));
    for (let k in o)
        if (new RegExp("(" + k + ")").test(fmt)) fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
    return fmt;
}
const utilsTools = {
    // 获取20几位的商品ID
    getGoodsId: () => {
        return new Date().Format("yyyyMMdd") + utilsTools.randomStr(10) + (new Date()).getMilliseconds()
    },
    //生成永不重复的id
    createRandomId: () => {
        return md5((new Date()).getTime() + '-' + Math.random().toString().substr(2, 5)
        ).toString()
    },
    //获取实时时间
    getDate: () => {
        return new Date().Format("yyyy-MM-dd hh:mm:ss")
    },
    format: (data, fmt = 'yyyy-MM-dd hh:mm:ss') => {
        return new Date(data).Format(fmt)
    },
    // 生成固定长度随机字符串
    randomStr: (len = 32) => {
        let t = "QWERTYUOPASDFGHJKLZXCVBNMqwertyuipasdfghjkzxcvbnm23456789";
        let val = "";
        for (let i = 0; i < len; i++) {
            val += t.charAt(Math.floor(Math.random() * t.length));
        }
        return val;
    },
    //对象参数为空就删除该属性
    deleteNullObj: (keywords) => {
        if (!keywords) {
            return keywords
        }
        for (let key in keywords) {
            if (keywords[key] === '') {
                delete keywords[key]
            }
        }
        return keywords
    },
    //扁平数组转换为树形结构
    listToTree: (data, key = { id: 'id', fid: "parentId", label: "name" }) => {
        let { id, fid, label } = key, obj = {}, parentList = [];
        // * 先生成parent建立父子关系
        data.forEach((item) => {
            obj[item[id]] = item;
        });
        data.forEach((item) => {
            item.value = item[id];
            item.label = item[label]
            let parent = obj[item[fid]];
            if (parent) {
                parent.children = parent.children || [];
                parent.children.push(item);
            } else {
                parentList.push(item);
            }
        });
        return parentList;
    },
    //树形结构转换为扁平数组
    treeToList: (tree) => {
        let queen = [];
        let out = [];
        queen = queen.concat(tree);
        while (queen.length) {
            let first = queen.shift();
            if (first.children) {
                queen = queen.concat(first.children)
                delete first['children'];
            }
            out.push(first);
        }
        return out;
    },

    visitorGene: (req, visitor, ip, id) => {
        try {
            Visitor.create(visitor).then(singleVisitor => {
                logger.info(`今日首次【登录日志】——账号：${req.body.username || req.body.openid} IP:${ip}`)
            }).catch(err => {
                logger.error(`今日首次【登录日志】异常：——账号：${req.body.username || req.body.openid} IP:${ip} err:${JSON.stringify(err)}`)
            })
        } catch (error) {
        }
    },
    //查询当天的访客
    queryFindOne: function (model, pm) {
        return new Promise((resolve, reject) => {
            model.findOne({
                where: {
                    [Op.and]: [
                        pm,
                        sequelize.where(
                            sequelize.fn('DATE', sequelize.col('createdAt')), // 表对应的字段
                            sequelize.literal('CURRENT_DATE')
                        )
                    ]
                },
            }).then(data => {
                resolve(data)
            }).catch(err => {
                reject(err)
            })
        })
    },
    //更新当天的老访客
    updateVisitorCount: function (model, pm, where) {
        return new Promise((resolve, reject) => {
            model.update(pm, { where }).then(data => {
                resolve(data)
            }).catch(err => {
                reject(err)
            })
        })
    },
    //  生成访客记录 获取ip和解析地址
    generateVisitorRecord: function (req, id) {
        let ip = getPublicIP(req), u = new UAParser(req.headers['user-agent'])
        request(`https://searchplugin.csdn.net/api/v1/ip/get?ip=${ip}`, { method: 'GET' },
            function (error, response, body) {
                if (error !== null) return logger.error(`访客ip地址解析错误：${ip}`);
                let _data = {
                    ipaddr: ip,
                    type: req.baseUrl.includes('admin') ? 1 : 0,
                    userAccount: req.body.username,
                    os: os.type() + os.release() + ' ' + os.arch(),
                    browser: u.getBrowser().name + '.v' + u.getBrowser().major,
                    loginLocation: JSON.parse(body).code === 200 ? JSON.parse(body).data.address : body
                }
                utilsTools.queryFindOne(Visitor, _data).then(todayVisitor => {
                    if (!todayVisitor) {
                        // 当日的新访客
                        utilsTools.visitorGene(req, _data, ip, id)
                    } else {
                        // 历史访客
                        utilsTools.updateVisitorCount(Visitor, { count: todayVisitor.count + 1 },
                            { id: todayVisitor.id }).then(update => {
                                logger.info(`【登录日志】——账号：${req.body.username} IP:${ip}`)
                            }).catch(err => {
                                logger.error(`【登录日志】异常：——账号：${req.body.username} IP:${ip} err:${JSON.stringify(err)}`)
                            })
                    }
                }).catch(err=>{
                    logger.error(`【登录日志】异常：——账号：${req.body.username} IP:${ip} err:${JSON.stringify(err)}`)
                   
                })
            })
    },
    // 生成一个不重复的用户账号
    generateUserAccount: function (_userAccount) {
        if (_userAccount.length > 5) {
            _userAccount = utilsTools.randomStr(3)
        }
        let length = Math.floor(Math.random() * 6)
        let userAccount = (_userAccount + new Date().Format("yyMdd") + utilsTools.randomStr(length < 2 ? 3 : length));
        return new Promise((resolve, reject) => {
            Users.findOne({ where: { 'userAccount': userAccount } }).then(singleUser => {
                if (!singleUser) {
                    resolve(userAccount)
                } else {
                    utilsTools.generateUserAccount(_userAccount).then(userAccount => {
                        resolve(userAccount)
                    })
                }
            })
        })
    },
    notifyRobot: function ({ title, content, cb }) { // 推送消息到企业微信机器人
        // request({
        //     url: "https://qyapi.weixin.qq.com/cgi-bin/webhook/send?key=xxxxxxxxxxx",
        //     method: 'POST',
        //     json: {msgtype: 'text',text: {
        //             content: `${title?('　　　　　　【'+title+'】\n'):''}${content}`
        //         }}
        // }, (error, response, body) => {
        //     cb&&cb(error, response, body)
        // })
    },
}
module.exports = utilsTools
