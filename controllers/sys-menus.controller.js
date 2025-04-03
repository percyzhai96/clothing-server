const db = require("../models");
const DAO = require("../dao/DAO");
const CONFIG = require('../config/index')
const Menus = db.menus;
const Roles = db.roles;
const rolesMenus = db.rolesMenus
Roles.belongsToMany(Menus, {
    through: {
        model: rolesMenus,
        unique: false,
    }, foreignKey: 'roleId',
});
Menus.belongsToMany(Roles, {
    through: {
        model: rolesMenus,
        unique: false,
    }, foreignKey: 'menuId',
});


exports.create = (req, res) => {
    const pm = req.body;
    // 请求验证
    if (!pm.title) return res.sendResult({ data: '', code: 605, message: "菜单名称不能为空！" })
    if (!pm.parentId) return res.sendResult({ data: '', code: 605, message: "父级ID不能为空！" })
    if (!pm.path) return res.sendResult({ data: '', code: 605, message: "菜单路径不能为空！" })
    // Create a Menus
    const menu = {
        parentId: pm.parentId,
        path: pm.path,
        title: pm.title,
        menuType: pm.menuType,
        authority: pm.authority,
        isShow:pm.isShow,
        icon: pm.icon || 'el-icon-orange',
    };
    if(pm.path==='#'){
        DAO.create(Menus, menu, data => {
            res.sendResult(data)
        })
        return
    }
    Menus.findOne({ where: { 'path': pm.path } }).then(singleMenus => {
        if (singleMenus && singleMenus.id) return res.sendResultAto(null, 605, '菜单已存在！')
        DAO.create(Menus, menu, data => {
            res.sendResult(data)
        })
    })
};

// Retrieve all Menus from the database.
exports.findAll = (req, res) => {
    const pm = req.body;
    DAO.list(Menus, pm, list => {
        res.sendResult(list)
    })
};

// Find a single Menus with an id
exports.findOne = (req, res) => {
    const pm = req.body;
    DAO.findOne(Menus, pm, data => {
        // logger.debug(`${req.method} ${req.baseUrl + req.path} *** 参数：${JSON.stringify(pm)}; 响应：${JSON.stringify(data)}`);
        res.sendResult(data)
    })
};

// Update a Menus by the id in the request
exports.update = (req, res) => {
    const pm = req.body;
    // 请求验证
    if (!pm.id) return res.sendResult({ data: '', code: 605, message: "ID不能为空！" })
    DAO.update(Menus, pm, { id: pm.id }, data => {
        // logger.debug(`${req.method} ${req.baseUrl + req.path} *** 参数：${JSON.stringify(pm)}; 响应：${JSON.stringify(data)}`);
        res.sendResult(data)
    })

};

exports.state = (req, res) => {
    const pm = req.body;
    // 请求验证
    if (!pm.id) return res.sendResult({ data: '', code: 605, message: "ID不能为空！" })

    Menus.findByPk(pm.id).then(menus => {
        if (!menus) {
            return res.sendResult({ data: '', code: 605, message: "菜单不存在！" });
        }
        const newState = !menus.state
        menus.update({ state: newState }).then(() => {
            res.status(200).sendResultAto(null, 201, '状态修改成功');
        }).catch(err => {
            res.status(500).sendResultAto(err, 605, '重置错误');
        });
    }).catch(err => {
        res.status(500).sendResultAto(err, 605, '查询错误');
    });


};


// Delete a Menus with the specified id in the request
exports.delete = (req, res) => {
    const pm = req.body;
    // 请求验证
    if (!pm.id) return res.sendResult({ data: '', code: 605, message: "ID不能为空！" })
    DAO.delete(Menus, { id: pm.id }, data => {
        // logger.debug(`${req.method} ${req.baseUrl + req.path} *** 参数：${JSON.stringify(pm)}; 响应：${JSON.stringify(data)}`);
        res.sendResult(data)
    })
};

exports.rolesMenus = (req, res) => {
    if(req.user.roleId.includes(CONFIG.superAdminUserId)){
        let sql = 'SELECT * FROM `sys_menus` WHere `record_state`= 0'
        DAO.doQuery(sql, data => {
            if(data.code==200&& data.data.length>1){
                res.sendResultAto(data.data[0], 200, '查询成功！')
            }else{
                res.sendResult(data)

            }
        })
    }else{
        // 如果不是超级管理员，则返回当前用户所拥有的菜单
        let pm = {
            params: { id: req.user.roleId },
            raw: false, 
            include: [
                { model: Menus },
            ]
        }
        DAO.list(Roles, pm, data => {
            // 将多个启用的角色路由组装成一个
            let Menus = [],roles=JSON.parse(JSON.stringify(data.data.data)),menus=[];
            roles.forEach(item => {
                if (!item.state) {
                    Menus = Menus.concat(item.menus)
                }
            })
            // Menus去重
            Menus.forEach(item=>{
                if(menus.map(i=>i.id).includes(item.id)) return;
                menus.push(item);
            })
            res.sendResultAto(menus, 200, '查询成功')
        })
    }
};
