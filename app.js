
const express = require('express')
const getPublicIP = require('./utils/utils.ip')
const bodyParser = require('body-parser')
const path = require('path')
const chalk = require('chalk') // https://www.npmjs.com/package/chalk
const logger = require("./utils/utils.logger")
// 路由加载
const mount = require('mount-routes')
const app = express()
const cors = require('cors')// 解决跨域
// 托管静态资源
app.use('/static', express.static(__dirname + '/uploads_files'))


//访问 .env文件
const dotenv = require('dotenv')
dotenv.config()
const session = require('express-session')

//用来设置签名密钥
app.use(session({
    secret: "AUTCHAN_tadpole",	// 对cookie进行签名
    name: "session",	// cookie名称，默认为connect.sid
    resave: false,	// 强制将会话保存回会话容器
    rolling: false,	// 强制在每个response上设置会话标识符cookie
    saveUninitialized: true,
    cookie: {
        // 3天验证码过期
        maxAge: 300000
    }
}))


//处理请求参数解析
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))

const db = require("./models")
db.sequelize.sync()
// db.files.sync({ alter: true })

//解决跨域
app.use(cors())
// 设置跨域和相应数据格式
app.all('/api/*', function (req, res, next) {
    res.header('Access-Control-Allow-Origin', '*')
    res.header('Access-Control-Allow-Headers', 'X-Requested-With, token')
    res.header('Access-Control-Allow-Headers', 'X-Requested-With, Authorization')
    res.header('Content-Type', 'application/json;charset=UTF-8')
    res.header('Access-Control-Allow-Headers', 'Content-Type,Content-Length, Authorization, Accept,X-Requested-With')
    // res.header('Access-Control-Allow-Methods', 'PUT,POST,GET,DELETE,OPTIONS')
    res.header('Access-Control-Allow-Methods', 'POST,GET')
    if (req.method == 'OPTIONS') res.send(200)
    /*让options请求快速返回*/
    else next()
})

// 使用swagger API 文档
// https://www.npmjs.com/package/express-swagger-generator
const expressSwagger = require('express-swagger-generator')(app)
const options = require('./utils/swagger') //配置信息
expressSwagger(options)

// 统一响应机制
const UnifiedResponse = require('./utils/utils.resextra')
app.use(UnifiedResponse)

const admin_passport = require('./utils/utils.permission')

// 设置 passport 验证路径 ('/api/private/' 开头的都需要进行token)
app.use('/api/private/*', admin_passport.tokenAuth)
app.use('/api/private/*', admin_passport.permissionAuth)
//token 有效性中间件
app.use(function (err, req, res, next) {
    if (err.name === 'UnauthorizedError') {
        logger.error(`${req.method} ${req.baseUrl + req.path} *** 响应：${JSON.stringify({
            code: err.status || 401,
            message: '您没有访问权限！',
            ip: getPublicIP(req)
        })}`)
        res.status(401).sendResultAto(null, 401, '您没有访问权限！')
    }
})

// 带路径的用法并且可以打印出路由表  true 代表展示路由表在打印台
mount(app, path.join(process.cwd(), '/routes'), false)

// 处理无响应 如果没有路径处理就返回 Not Found
app.use(function (req, res, next) {
    res.status(404).sendResult({ data: null, code: 404, message: 'Not Found' })
})
app.listen(process.env.DEV_PORT, () => {
    console.log(chalk.bold.green(`项目启动成功: ${process.env.DEV_URL}:${process.env.DEV_PORT}`))
    console.log(chalk.bold.green(`接口文档地址: ${process.env.DEV_URL}:${process.env.DEV_PORT}/swagger`))
})

module.exports = app
