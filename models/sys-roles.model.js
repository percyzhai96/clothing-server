//模型创建 https://www.sequelize.com.cn/core-concepts/model-basics#%E5%AD%97%E7%AC%A6%E4%B8%B2


module.exports = (sequelize, Sequelize) => {
    return sequelize.define("roles",
        {
            id: {
                type: Sequelize.UUID,
                notNull: true,
                primaryKey: true,
                defaultValue: Sequelize.UUIDV4 // 或 DataTypes.UUIDV1
            },
            roleName: {
                type: Sequelize.STRING(100),
                notNull: true,
                notEmpty: true,
                comment: '角色名称',
            },
            roleCode: {
                type: Sequelize.STRING(100),
                notNull: true,
                notEmpty: true,
                comment: '角色编码',
            },
            state: {
                type: Sequelize.BOOLEAN,
                comment: '状态',
                defaultValue: true
            },
            roleDesc: {
                type: Sequelize.STRING(100),
                comment: '角色描述',
            },
            record_state:{
                type: Sequelize.INTEGER,
                comment: '记录状态 0 启用 1 删除',
                defaultValue: 0
            }
        }, {
        tableName: 'sys_roles'
    });
};
