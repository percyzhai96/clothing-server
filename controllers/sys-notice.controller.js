const db = require("../models");
const DAO = require("../dao/DAO");
const Notice = db.notice;
const Op = db.Op;

// Create and Save a new Notice
exports.create = async (req, res) => {
    const pm = req.body;
    // 请求验证
    if (!pm.title || !pm.content || !pm.type) return res.sendResult({ data: '', code: 605, message: "缺少必要参数！" })
    const notice = {
        title: pm.title,
        content: pm.content,
        spare1: pm.spare1,
        spare2: pm.spare2,
        type: pm.type,
        state: pm.state || false,
    };
    if (pm.state) {
        DAO.doQuery(`UPDATE sys_notice SET state=0 WHERE type = ${pm.type}`, update => {
            if (update.code == 200) {
                DAO.create(Notice, notice, data => {
                    res.sendResult(data)
                })
            } else {
                res.sendResult({ data: '', code: 605, message: "创建失败！" })
            }
        })
    } else {
        DAO.create(Notice, notice, data => {
            res.sendResult(data)
        })
    }
};

// Retrieve all Notice from the database.
exports.findAll = (req, res) => {
    const pm = req.body;
    DAO.list(Notice, pm, list => {
        res.sendResult(list)
    })
};

// 获取一条微信公共
exports.wxFindOne = (req, res) => {
    const pm = req.body;
    Notice.findOne({where:{ type: pm.type,state:1 }}).then(data => {
        res.sendResult({data,code: 200, message: '查询成功！'})
    })
};
exports.findOne = (req, res) => {
    DAO.doQuery(`SELECT * FROM sys_notice WHERE type =1 and state=1`, data => {
        if (data.code == 200) return res.sendResult({ data: data.data[0], code: 200, message: "查询成功！" })
        res.sendResult(data)
    })
};

// Update a Notice by the id in the request
exports.update = (req, res) => {
    const pm = req.body;
    // 请求验证
    if (!pm.id) return res.sendResult({ data: '', code: 605, message: "ID不能为空！" })
    if (pm.state) {
        DAO.doQuery(`UPDATE sys_notice SET state=0 WHERE type = ${pm.type}`, update => {
            if (update.code == 200) {
                DAO.update(Notice, pm, { id: pm.id }, data => {
                    res.sendResult(data)
                })
            } else {
                res.sendResult({ data: '', code: 605, message: "创建失败！" })
            }
        })
    } else {
        DAO.update(Notice, pm, { id: pm.id }, data => {
            res.sendResult(data)
        })
    }
};

// Delete a Notice with the specified id in the request
exports.delete = (req, res) => {
    const pm = req.body;
    // 请求验证
    if (!pm.id) return res.sendResult({ data: '', code: 605, message: "ID不能为空！" })
    DAO.delete(Notice, { id: pm.id }, data => {
        res.sendResult(data)
    })

};

exports.query = (req, res) => {
    const pm = req.body;
    let sql = 'SELECT * FROM `sys_notice`'
    DAO.doQuery(sql, data => {
        res.sendResult(data)
    })
};