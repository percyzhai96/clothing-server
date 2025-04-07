const express = require("express")
const router = express.Router()
const Goods = require("../../../controllers/sys-goods.controller")
/**
  * 新增进货商品
  * @route POST /api/private/goodsCreate
  * @group 商品管理
 */
router.post("/goodsCreate", Goods.create);

