
// 添加统一的返回结果方法
module.exports = function (req, res, next) {
	res.sendResult = function (obj) {
		let type = obj.code < 300 ? 'success' : "error"
		var fmt = req.query.fmt ? req.query.fmt : "rest";
		if (fmt == "rest") {
			res.json(
				{
					"data": type=='error'?null:obj.data,
					"meta": {
						"msg": obj.message,
						"status": obj.code,
						"type": type
					}
				});
		}
	};
	//自定义格式
	res.sendResultAto = function (data, code, message) {
		var fmt = req.query.fmt ? req.query.fmt : "rest";
		let type = code < 300 ? 'success' : "error"
		if (fmt == "rest") {
			res.json(
				{
					data:type=='error'?null:data,
					"meta": {
						"msg": message,
						"status": code,
						"type": type

					}
				});
		}
	};
	next();
}

