//模型创建 https://www.sequelize.com.cn/core-concepts/model-basics#%E5%AD%97%E7%AC%A6%E4%B8%B2

const { aes } = require('../utils/utils.crypto')

module.exports = (sequelize, Sequelize) => {
    return sequelize.define("sys_users", {
        id: {
            type: Sequelize.UUID,
            notNull: true,
            primaryKey: true,
            defaultValue: Sequelize.UUIDV4 // 或 DataTypes.UUIDV1
        },
        parentId:{
            type: Sequelize.STRING(36),
            comment: '父级ID',
        },
        avatar: {
            type: Sequelize.STRING,
            comment: '头像',
            defaultValue:"/static/avatar/avatar.png"
        },
        userAccount: {
            type: Sequelize.STRING(100),
            notNull: true,
            notEmpty: true,
            comment: '账号',
        },
        pswd: {
            type: Sequelize.TEXT,
            notEmpty: true,
            comment: '密码',
            set(value) {
                this.setDataValue('pswd', aes.en(value));
            }
        },
        nickName: {
            type: Sequelize.STRING(200),
            defaultValue: "",
            comment: '昵称',
        },
        loginAt: {
            type: Sequelize.DATE,
            comment: '上次登陆时间',
            defaultValue: null,
        },
        roleId: {
            type: Sequelize.STRING(255),
            notEmpty: true,
            comment: '角色id',
            set(value) {
                this.setDataValue('roleId', value.join(','));
            },
            get() {
                const rawValue = this.getDataValue('roleId');
                if (!rawValue) return [];
                return rawValue.split(',');
            }
        },
        state: {
            type: Sequelize.BOOLEAN,
            comment: '状态',
            defaultValue: true
        },
        introduction: {
            type: Sequelize.TEXT,
            comment: '个人简介',
        },
        phone: {
            type: Sequelize.STRING,
            comment: '电话',
        },
        email: {
            type: Sequelize.STRING,
            comment: '邮箱',
        },
        userDesc: {
            type: Sequelize.STRING,
            comment: '描述',
        },
        imageCode: {
            type: Sequelize.STRING(100),
            comment: '图形验证码',
        },
        emailCode: {
            type: Sequelize.STRING(100),
            comment: '邮箱验证码',
        },
        phoneCode: {
            type: Sequelize.STRING(100),
            comment: '短信验证码',
        },
        record_state:{
            type: Sequelize.INTEGER,
            comment: '记录状态 0 启用 1 删除',
            defaultValue: 0
        }
    });
};
