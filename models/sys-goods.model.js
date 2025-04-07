module.exports = (sequelize, Sequelize) => {
  return sequelize.define('sys_goods', {
    // 主键id
    id: {
      type: Sequelize.UUID,
      allowNull: false,
      primaryKey: true,
      defaultValue: Sequelize.UUIDV4 // 或 DataTypes.UUIDV1
    },
    // 进货方名称
    shopName: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    // 进货时间
    purchaseTime: {
      type: Sequelize.DATEONLY,
      defaultValue: Sequelize.NOW
    },
    // 商品款号
    styleNumber: {
      type: Sequelize.STRING,
      allowNull: false
    },
    // 商品名称
    goodName: {
      type: Sequelize.STRING,
      allowNull: false,
      defaultValue: "",
    },
    // 商品数量
    goodNum: {
      type: Sequelize.INTEGER,
      allowNull: false,
      defaultValue: 1,
    },
    // 商品单价
    unitPrice: {
      type: Sequelize.DECIMAL(10, 2),
      allowNull: false,
    },

    sysUserId: {
      type: Sequelize.UUID,
      allowNull: false,
    }
  })
}