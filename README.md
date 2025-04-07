# node-serve

- 项目技术栈基于 `express` `sequelize` `swagger-ui`；

### 安装依赖 node: '>=12.0.0'

```
npm install
```

### 启动项目

```
npm run serve
```


### 接口返回说明
```js
{
  "data": "数据",
  "meta": {
    "msg": "提示信息",
    "status": "状态码",
    "type": "error||success"
  }
}

"状态码":[
  "200":"成功，不带弹窗",
  "401":"token失效，重新登陆",
  "201":"成功，带弹窗",
]
```


### 目录结构说明

```
└──/config/                   配置文件
│  ├── /db.config.js/         数据库配置文件
│  ├── /index.js/             配置文件入口
│  ├──
├── /controllers/             控制器
│  ├── ...
│  │
├── /dao/                     数据库操作
│  ├── ...
│  │
├── /logs/                    日志文件
│  ├── ...
│  │
├── /models/                  数据库模型
│  ├── ...                    
│  │
├── /router/                  路由
│  ├── /api/                  配置文件入口
│  │    ├──/private/          私有路由
│  │    ├──/public/           公共路由
│  │
├── /uploads_files/           文件上传
│  ├── ...                    
│  │
├── /utils/                   工具方法文件夹
│  │  ├── /swagger/           swagger配置文件
│  │  ├── utils.crypto.js     加密解密
│  │  ├── utils.ip.js         获取ip
│  │  ├── utils.logger.js     日志工具类
│  │  ├── utils.nodemailer.js 邮件发送
│  │  ├── utils.permission.js 权限验证
│  │  ├── utils.resextra.js   统一返回结果
│  │  ├── utils.tools.js      通用工具类
│  │  ├── utils.visits.js     访问统计
│  │  └── ...
├── package.json
├── README.md

```

