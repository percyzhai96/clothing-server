const fs = require("fs");
const path = require("path");
const dbConfig = require("../config/db.config.js");
const _ = require('lodash');
const Sequelize = require("sequelize");
const {Op} = require("sequelize");
const sequelize = new Sequelize(dbConfig.DB, dbConfig.USER, dbConfig.PASSWORD, {
    host: dbConfig.HOST,
    dialect: dbConfig.dialect,
    operatorsAliases: false,
    timezone: '+08:00', //东八时区
    pool: {
        max: dbConfig.pool.max,
        min: dbConfig.pool.min,
        acquire: dbConfig.pool.acquire,
        idle: dbConfig.pool.idle
    }
});

const db = {};

db.Sequelize = Sequelize;//引入
db.sequelize = sequelize;//实例
db.Op = Op; //操作符

/* 系统表 */
//菜单
db.menus = require("./sys-menus.model.js")(sequelize, Sequelize);
//角色
db.roles = require("./sys-roles.model.js")(sequelize, Sequelize);
//角色-菜单
db.rolesMenus = require("./sys-roles_menus.model.js")(sequelize, Sequelize);
//用户
db.users = require("./sys-users.model.js")(sequelize, Sequelize);
// 公告
db.notice = require("./sys-notice.model.js")(sequelize, Sequelize);
//访客
db.visitor = require("./sys-log_visitor.model.js")(sequelize, Sequelize);
//文件管理
db.files = require("./sys-files.model.js")(sequelize, Sequelize);
// 进货管理
db.goods = require("./sys-goods.model.js")(sequelize,Sequelize);



module.exports = db;
