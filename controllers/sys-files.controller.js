const db = require("../models");
const logger = require("../utils/utils.logger");
const DAO = require("../dao/DAO");
const Files = db.files;
const Op = db.Op;
const multer = require('multer');
const path = require('path');
const fs = require('fs');
let uploadDir = multer({ dest: 'uploads_files/files' }).single('file') //存放文件夹
const chalk = require("chalk");

// size：初始文件大小
function getfilesize(size) {
    if (!size)
        return "";

    var num = 1024.00; //byte

    if (size < num)
        return size + "B";
    if (size < Math.pow(num, 2))
        return (size / num).toFixed(2) + "K"; //kb
    if (size < Math.pow(num, 3))
        return (size / Math.pow(num, 2)).toFixed(2) + "M"; //M
    if (size < Math.pow(num, 4))
        return (size / Math.pow(num, 3)).toFixed(2) + "G"; //G
    return (size / Math.pow(num, 4)).toFixed(2) + "T"; //T
}

function walkSync(currentDirPath, callback) {
    fs.readdirSync(currentDirPath, { withFileTypes: true }).forEach(function (dirent) {
        var filePath = path.join(currentDirPath, dirent.name);
        if (dirent.isFile()) {
            callback(filePath, dirent);
        } else if (dirent.isDirectory()) {
            walkSync(filePath, callback);
        }
    });
}


// Create and Save a new Files 上传文件
exports.create = (req, res) => {
    uploadDir(req, res, function (err) {
        if (err instanceof multer.MulterError) {
            // 发生错误
        } else if (err) {
            // 发生错误
        }
        const pm = req.file;
        const userId = req.user.userId;
        let fileExtArray = pm.originalname.split(".");
        let ext = fileExtArray[fileExtArray.length - 1];
        let targetPath = pm.destination + '/' + pm.originalname;
        let imgName = pm.originalname;
        let size = getfilesize(pm.size);
        let fileArr = []
        walkSync('uploads_files/files', function (filePath, stat) {
            fileArr.push(stat.name)
        });

        if (fileArr.includes(imgName)) {
            console.log(chalk.bold.red(`【文件上传失败】 ${imgName} *** 文件名重复，请修改后再重新上传 地址：${req.method} ${req.baseUrl + req.path}`))
            return res.sendResult({
                data: null, code: 605, message: '文件名重复，请修改后再重新上传'
            })
        }
        //为上传成功的文件重命名（上传的文件默认不是文件的原名称）
        fs.rename(path.join(process.cwd(), "/" + req.file.path), path.join(process.cwd(), targetPath), function (err) {
            if (err) {
                console.log(chalk.bold.red(`【文件上传失败】 ${imgName} *** 上传文件失败 地址：${req.method} ${req.baseUrl + req.path}`))
                return res.sendResult({ data: null, code: 500, message: '上传文件失败' })
            }
            let newFile = {
                content: pm.content,
                url: `/static/files/${imgName}`,
                name: imgName,
                userId,
                size,
                ext,
            }
            DAO.create(Files, newFile, (data => {
                res.sendResult({
                    data, code: 201, message: '上传成功'
                })
            }))
        })
    })
};

// Retrieve all Files from the database.
exports.findAll = (req, res) => {
    const pm = req.body;
    DAO.list(Files, pm, list => {
        res.sendResult(list)
    })
};

//下载文件
exports.findOne = (req, res, next) => {
    Files.findByPk(req.query.id).then(file => {
        if(!file) return res.sendResult({}, 404, '文件不存在')
        let url = path.resolve(process.cwd(), file.url.replace('/static','uploads_files'))
        fs.access(url, function (err) {
            if(err){
                console.log(chalk.bold.red(`【文件不存在】 ${file.name} *** 文件不存在 地址：${req.method} ${req.baseUrl + req.path}`))
                return res.sendResult({}, 404, '文件不存在')
            }else{
                res.set({
                    "Content-type": "application/octet-stream",
                    "Content-Disposition": "attachment;filename=" + encodeURI(file.name),
                    'Content-Length': fs.statSync(url).size
                });
                let fReadStream = fs.createReadStream(url);
                fReadStream.pipe(res)
            }
        })

    })
};

// Update a Files by the id in the request
exports.update = (req, res) => {
    const pm = req.body;
    // 请求验证
    DAO.update(Files, pm, { id: pm.id }, data => {
        res.sendResult(data)
    })

};

// Delete a Files with the specified id in the request
exports.delete = (req, res) => {
    const pm = req.body;
    // 请求验证
    if (!pm.id) return res.sendResult({ data: '', code: 605, message: "ID不能为空！" })
    let url = path.resolve(process.cwd(), `uploads_files/files/${pm.name}`)
    //删除 static 目录下的目标文件
    fs.unlink(url, function (err) {
        if (!err) {
            DAO.delete(Files, { id: pm.id }, data => {
                res.sendResult(data)
            })
        } else {
            console.log(chalk.bold.red(`【文件不存在】 ${pm.name} *** 文件不存在 地址：${req.method} ${req.baseUrl + req.path}`))
            console.log(err)
        }
    })
};



