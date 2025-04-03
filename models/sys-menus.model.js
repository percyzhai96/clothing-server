//模型创建 https://www.sequelize.com.cn/core-concepts/model-basics#%E5%AD%97%E7%AC%A6%E4%B8%B2

// 菜单
module.exports = (sequelize, Sequelize) => {
    return sequelize.define("menus",
        {
            id:{
                type: Sequelize.UUID,
                notNull: true,
                primaryKey: true,
                defaultValue: Sequelize.UUIDV4 // 或 DataTypes.UUIDV1
            },
            parentId: {
                type: Sequelize.STRING(36),
                comment: '父级ID',
            },
            path: {
                type: Sequelize.STRING,
                comment: '菜单路径',
            },
            title: {
                type: Sequelize.STRING(100),
                comment: '菜单标题',
            },
            icon: {
                type: Sequelize.STRING,
                comment: '菜单图标',
            },
            menuDesc:{
                type: Sequelize.STRING(200),
                comment: '描述',
            },
            menuType: {
                type: Sequelize.STRING(10),
                comment: '菜单类型',
            },
            orderNum: {
                type: Sequelize.INTEGER,
                comment: '菜单排序',
            },
            isShow: {
                type: Sequelize.BOOLEAN,
                notNull: true,
                notEmpty: true,
                defaultValue: 0,
                comment: '菜单是显示',
            },
            state: {
                type: Sequelize.BOOLEAN,
                defaultValue: 0,
                comment: '状态',
            },
            authority: {
                type: Sequelize.STRING,
                comment: '操作标识',
            },
            record_state:{
                type: Sequelize.INTEGER,
                comment: '记录状态 0 启用 1 删除',
                defaultValue: 0
            }
        }, {
        tableName: 'sys_menus'
    });
};
