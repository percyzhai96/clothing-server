//模型创建 https://www.sequelize.com.cn/core-concepts/model-basics#%E5%AD%97%E7%AC%A6%E4%B8%B2

//标签
module.exports = (sequelize, Sequelize) => {
    return sequelize.define("notice",
        {
            id: {
                type: Sequelize.UUID,
                notNull: true,
                primaryKey: true,
                defaultValue: Sequelize.UUIDV4 // 或 DataTypes.UUIDV1
            },
            title: {
                type: Sequelize.STRING(50),
                notNull: true,
                comment: '公告标题',
            },
            content: {
                type: Sequelize.TEXT,
                comment: '公告内容',
            },
            type:{
                type: Sequelize.BOOLEAN,
                notNull: true,
                comment: '1:PC公告 2 小程序',
            },
            state:{
                type: Sequelize.BOOLEAN,
                comment: '状态',
                defaultValue: false
            },
            record_state:{
                type: Sequelize.INTEGER,
                comment: '记录状态 0 启用 1 删除',
                defaultValue: 0
            }
        }, {
        tableName: 'sys_notice',
    });
};
