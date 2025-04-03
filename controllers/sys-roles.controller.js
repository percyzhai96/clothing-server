const db = require("../models");
const DAO = require("../dao/DAO");
const Roles = db.roles;
const Menus = db.menus;
const rolesMenus = db.rolesMenus;
const CONFIG = require('../config/index')
const Op = db.Op;


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


// Create and Save a new Roles-Menus  弃用！！！！
exports.createPermission = async (req, res) => {
    const pm = req.body;
    // 请求验证
    if (!pm.menuId) return res.sendResult({ data: '', code: 605, message: "菜单IDS不能为空！" })
    // Create a Roles
    const role = {
        roleName: pm.roleName,
        roleDesc: pm.roleDesc,
        menuId: pm.menuId,
    };
    res.sendResultAto('', 200, '操作成功')

};


// Create and Save a new Roles
exports.create = async (req, res) => {
    const pm = req.body;
    // 请求验证
    if (!pm.roleName) return res.sendResult({ data: '', code: 605, message: "角色名称不能为空！" })
    // Create a Roles
    const role = {
        roleName: pm.roleName,
        roleDesc: pm.roleDesc,
        roleCode: pm.roleCode,
        state:pm.state,
    };
    Roles.findOne({ where: { 'roleName': pm.roleName } }).then(singleRoles => {
        if (singleRoles && singleRoles.id) return res.sendResultAto(null, 605, '角色已存在！')
        DAO.create(Roles, role, data => {
            res.sendResult(data)
        })
    })
};

// Retrieve all Roles from the database.
exports.findAll = (req, res) => {
    const pm = req.body;
    pm.raw = false //是否开启原生查询   true 结果：tag.tag_name  false 结果：'tag':{"tag_name": "标签",}
    pm.include = [
        { model: Menus, },
    ]
    if (!req.user.roleId.includes(CONFIG.superAdminUserId)){
        pm.params = {
            ...pm.params,
            id:{[Op.notIn]: [CONFIG.superAdminUserId]}
        }
    }
    DAO.list(Roles, pm, list => {
        // logger.debug(`${req.method} ${req.baseUrl + req.path} *** 参数：${JSON.stringify(pm)}; 响应：${JSON.stringify(list)}`);
        res.sendResult(list)
    })
};

// Find a single Roles with an id
exports.findOne = (req, res) => {
    if (!req.body.params.id) return res.status(401).sendResultAto(null, 401,'请登录！');
    // 将pm.params.id 转成数组
    const pm = {
        raw: false,//是否开启原生查询   true 结果：tag.tag_name  false 结果：'tag':{"tag_name": "标签",}
        include: [
            { model: Menus , where: {record_state: 0 } },
        ],
        params: {
            id: req.body.params.id.split(','),
        },
    };
    DAO.list(Roles, pm, data => {
        // 将多个启用的角色路由组装成一个
        let Menus = [],roles=JSON.parse(JSON.stringify(data.data.data)),menus=[];
        // res.sendResultAto(roles.data.data, 200, '查询成功')
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
        res.sendResultAto({...roles[0],menus}, 200, '查询成功')
    })
};

// Update a Roles by the id in the request
exports.update = async (req, res) => {
    const pm = req.body;
    // 请求验证
    if (!pm.id) return res.sendResult({ data: '', code: 605, message: "ID不能为空！" })
    if (!pm.menus) return res.sendResult({ data: '', code: 605, message: "权限ID不能为空！" })
    let ms = await Menus.findAll({ where: { id: pm['menus'] } })
    Roles.findByPk(pm.id).then(function (role) {
        role.update(pm)
        role.setMenus(ms) //更新中间表
        res.sendResultAto(null, 201, '修改成功')
    })
};

// Delete a Roles with the specified id in the request
exports.delete = (req, res) => {
    const pm = req.body;
    // 请求验证
    if (!pm.id) return res.sendResult({ data: '', code: 605, message: "ID不能为空！" })
    if (pm.id.includes(CONFIG.adminRoleUserId)||pm.id.includes(CONFIG.superAdminUserId)) return res.sendResult({ data: '', code: 605, message: "存在不可删除的数据！" })
    rolesMenus.destroy({ where: { roleId: pm.id } }).then(_RoleMenu => {
        DAO.delete(Roles, { id: pm.id }, data => {
            res.sendResult(data)
        })
    }).catch(err => {
        res.sendResultAto(err, 605, '删除角色失败')
    })

};


// Delete Roles from the database.
exports.query = (req, res) => {
    const pm = req.body;
    let sql = 'SELECT * FROM `sys_roles`'
    DAO.doQuery(sql, data => {
        res.sendResult(data)
    })
};
