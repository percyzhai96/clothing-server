//模型创建 https://www.sequelize.com.cn/core-concepts/model-basics#%E5%AD%97%E7%AC%A6%E4%B8%B2

//关于访客信息
module.exports = (sequelize, Sequelize) => {
    return sequelize.define("visitor",
        {
            id: {
                type: Sequelize.UUID,
                notNull: true,
                primaryKey: true,
                defaultValue: Sequelize.UUIDV4 // 或 DataTypes.UUIDV1
            },
            userAccount: {
                type: Sequelize.STRING(100),
                notEmpty: true,
                notNull: true,
                comment: '用户账号',
            },
            browser: {
                type: Sequelize.STRING,
                notEmpty: true,
                notNull: true,
                comment: '浏览器',
            },
            os: {
                type: Sequelize.STRING,
                notEmpty: true,
                notNull: true,
                comment: '操作系统',
            },
            type: {
                type: Sequelize.INTEGER(100),
                notEmpty: true,
                notNull: true,
                comment: '项目类型',
            },
            count: {
                type: Sequelize.INTEGER,
                notEmpty: true,
                notNull: true,
                comment: '访问次数',
                defaultValue: 1
            },
            ipaddr: {
                type: Sequelize.STRING(100),
                notEmpty: true,
                notNull: true,
                comment: 'IP',
            },
            loginLocation: {
                type: Sequelize.STRING,
                notEmpty: true,
                notNull: true,
                comment: '地址',
            },
            record_state:{
                type: Sequelize.INTEGER,
                comment: '记录状态 0 启用 1 删除',
                defaultValue: 0
            }

        }, {
            tableName: 'sys_log_visitor'
        });
};
