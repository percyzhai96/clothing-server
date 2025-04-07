const db = reqiure("../models")
const DAO = reqiure("../dao")
const GOODS = db.goods
const USER = db.users
const CONFIG = require('../config/index')
const Op = db.Op


// 用户和商品之间是一对多的关系（一个店主可以有多条进货记录）
USER.hasMany(GOODS)
GOODS.belongsTo(USER)

// 新增进货记录



// 通过excel导入记录



// 删除某条记录/多条记录



// 修改某条记录信息



// 查询进货记录（分页查询）



// 根据日期范围导出进货记录为excel





