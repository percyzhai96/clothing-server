const db = require("../models/index")
const DAO = require("../dao/DAO")
const GOODS = db.goods
const USER = db.users
const CONFIG = require('../config/index')
const Op = db.Op

// 新增进货记录
exports.create = async (req, res) => {
  try {
    const pm = req.body
    // 验证是否有用户id
    if (!pm.userId) {
      return res.sendResultAto(null, 605, '用户ID不能为空')
    }
    let newGoods = {
      shopName: pm.shopName,
      purchaseTime: pm.purchaseTime,
      styleNumber: pm.styleNumber,
      goodName: pm.goodName,
      goodNum: pm.goodNum,
      unitPrice: pm.unitPrice,
      userId: pm.userId,
    }
    // 插入数据到数据库
    let data = await DAO.create(GOODS, newGoods)
    res.sendResult(data)
  } catch (error) {
    console.error('Error creating goods:', error)
    res.status(500).sendResultAto(error, 605, '创建失败')
  }
}

// 通过excel导入记录



// 删除某条记录/多条记录



// 修改某条记录信息



// 查询进货记录（分页查询）



// 根据日期范围导出进货记录为excel





