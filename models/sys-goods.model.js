const { DataTypes } = require("sequelize/types/index.js")

module.exports = (sequelize, Sequelize) => {
  return sequelize.define('sys_goods', {
    // 主键id
    id: {
      type: DataTypes.UUID,
      notNull: true,
      primaryKey: true,
      defaultValue: Sequelize.UUIDV4 // 或 DataTypes.UUIDV1
    },
    // 进货方名称
    shopName: {
      type: DataTypes.STRING,
      notNull: true,
    },
    // 进货时间
    purchaseTime: {
      type: DataTypes.DATEONLY,
      defaultValue: DataTypes.NOW
    },
    // 商品款号
    styleNumber: {
      type: DataTypes.SMALLINT,
      notNull: true
    },
    // 商品名称
    goodName: {
      type: DataTypes.STRING,
      notNull: true,
      defaultValue: "",
    },
    // 商品数量
    goodNum: {
      type: DataTypes.INTEGER,
      notNull: true,
      defaultValue: 1,
    },
    // 商品单价
    unitPrice: {
      type: DataTypes.DECIMAL(10, 2),
      notNull: true,
    },
  })
}