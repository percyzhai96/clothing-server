const express = require('express');
const router = express.Router();
const fs = require('fs');
const path = require("path");

/**
* 下载
* @route GET /api/public/download
* @param {string} n.query.required 文件名
* @param {string} p.query.required 路径
* @group 公共下载
*/
router.get("/", (req, res) => {
    let name = req.query.n,_path = req.query.p;
    if (!name) return res.status(404).sendResultAto(null, 404, '文件不存在');
    let filePath = path.resolve(process.cwd(), `uploads_files/${_path}/${name}`);
    if (!fs.existsSync(filePath)) return res.status(404).sendResultAto(null, 404, '文件不存在');
    // 将文件返回下载
    res.download(filePath, name, (err) => {
        if (err) {
            console.error('文件下载出错:', err);
            return res.status(500).sendResultAto(null, 500, '文件下载出错');
        }
        console.log('文件下载成功');
    });
})

module.exports = router;
