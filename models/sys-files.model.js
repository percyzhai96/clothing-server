//模型创建 https://www.sequelize.com.cn/core-concepts/model-basics#%E5%AD%97%E7%AC%A6%E4%B8%B2

//文件管理
module.exports = (sequelize, Sequelize) => {
    return sequelize.define("files",
        {
            id: {
                type: Sequelize.UUID,
                notNull: true,
                primaryKey: true,
                defaultValue: Sequelize.UUIDV4 // 或 DataTypes.UUIDV1
            },
            userAccount:{
                type: Sequelize.STRING,
                comment: '上传用户',
            },
            url:{
                type: Sequelize.STRING,
                comment: '文件地址',
            },
            ext:{
                type: Sequelize.STRING,
                comment: '文件后缀',
            },
            name:{
                type: Sequelize.STRING,
                comment: '文件名称',
            },
            size:{
                type: Sequelize.STRING,
                comment: '文件大小',
            },
            content: {
                type: Sequelize.TEXT("long"),
                comment: '备注',
            },
            record_state:{
                type: Sequelize.INTEGER,
                comment: '记录状态 0 启用 1 删除',
                defaultValue: 0
            }
        }, {
            tableName: 'sys_files'
        });
};
