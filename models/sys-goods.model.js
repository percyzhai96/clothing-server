const { DataTypes } = require("sequelize/types/index.js")

module.exports = (sequelize, Sequelize) => {
  return sequelize.define('sys_goods', {
    id: {
      type: DataTypes.UUID,
      notNull: true,
      primaryKey: true,
      defaultValue: Sequelize.UUIDV4 // 或 DataTypes.UUIDV1
    },
    shopName: {
      type: DataTypes.STRING,
      notNull: true,
    },
    purchaseTime: {
      type: DataTypes.DATEONLY,
      defaultValue: DataTypes.NOW
    },
    styleNumber: {
      type: DataTypes.SMALLINT,
      notNull: true
    },
    goodName: {
      type: DataTypes.STRING,
      notNull: true,
      defaultValue: "",
    },
    goodNum: {
      type: DataTypes.INTEGER,
      notNull: true,
      defaultValue: 1,
    },
    unitPrice: {
      type: DataTypes.DECIMAL(10, 2),
      notNull: true,
    },
  })
}