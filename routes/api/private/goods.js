const express = require("express")
const router = express.Router()
const Goods = require("../../../controllers/sys-goods.controller")
/**
  * 新增进货商品
  * @route POST /api/private/goods/create
  * @group 商品管理
 */
router.post("/goods/create", Goods.create)

module.exports = router