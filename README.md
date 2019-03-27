## 写在前面的话

对于经常使用node的开发人员来说，每次搭建后台服务，都需要考虑如何建立一个更好的文件结构，而大部分的工作都是重复的，有时候会直接拷贝以前的项目文件，但是需要删除或修改很多东西，而且有很多都不需要的文件，这就很烦恼。

想到像`vue-cli`那样的脚手架一键生成基础项目模版，那我何不做多个属于自己的项目模版。使用的时候只需要一行命令就可以省去很多劳动力，不仅省时省事，而且可以定制自己想要的项目模版。说干就干，做脚手架之前先把模版做好，根据之前做小程序时搭建的express后端服务，这里做了一个基于express的纯后端模版。

## 使用模版

目前已经发布了脚手架工具`qiya-cli`，可以使用此模版快速生成后端项目，使用方法如下：

    npm install qiya-cli -g
    qiya init

关于脚手架工具`qiya-cli`的更多功能可以参看[qiya-cli](https://www.npmjs.com/package/qiya-cli)，另外关于这个脚手架的搭建过程与发布，我会再写一篇文章详细介绍。

![](https://user-gold-cdn.xitu.io/2019/3/27/169be155ac1c0394?w=1434&h=800&f=jpeg&s=187604)


## 主要功能

<input type="checkbox" checked> 注册与登录接口

<input type="checkbox" checked> 支持JWT验证

<input type="checkbox" checked> Joi参数校验

<input type="checkbox" checked> 支持mysql的orm框架sequelize

<input type="checkbox" checked> apidoc接口文档自动生成

<input type="checkbox" checked> 全局参数配置

<input type="checkbox" checked> 自动重启

<input type="checkbox" disabled> redis支持

<input type="checkbox" disabled> 自动化测试

## 模版目录结构
```
.
├── README.md  // 说明文档
├── app.js  // express实例化文件
├── bin 
│   └── www // 主入口文件
├── config
│   ├── config.js // 数据库配置
│   └── index.js // 全局参数配置
├── control // Controller层目录
│   └── userControl.js
├── helper // 自定义API Error拋出错误信息
│   └── AppError.js
├── joi-rule // Joi 参数验证规则
│   └── user-validation.js
├── models // sequelize需要的数据库models
│   ├── index.js // 处理当前目录的所有model
│   └── user.js // user表的model
├── package-lock.json
├── package.json
├── public
│   └── apidoc // 自动生成的apidoc文档
├── routes // 路由目录
│   └── user.js
├── service // service层目录
│   └── user.js
└── until // jwt认证
    └── token.js
```

## 主要文件说明

> package.json

由于我的脚手架工`qiya-cli`使用了Metalsmith和Handlebars 修改模板文件,所以可以看到在项目名称、项目介绍、作者处使用模版语法。
此模版主要有三个`scripts`命令，`npm run dev`开发环境使用， `npm run start`生产环境使用， `npm run apidoc`自动生成apidoc文档（默认启动后访问 [http://localhost:4000/apidoc](http://localhost:4000/apidoc)即可看到api文档和进行接口测试），



        {
        "name": "{{project}}",
        "version": "1.0.0",
        "description": "{{description}}",
        "main": "index.js",
        "scripts": {
            "dev": "NODE_ENV=development nodemon ./bin/www",
            "start": "NODE_ENV=production node ./bin/www",
            "apidoc": "apidoc -i ./routes/ -o ./public/apidoc/",
            "test": "echo \"Error: no test specified\" && exit 1"
        },
        "author": "{{author}}",
        "license": "ISC",
        "dependencies": {
            "body-parser": "^1.18.3",
            "cookie-parser": "^1.4.4",
            "debug": "^4.1.1",
            "env2": "^2.2.2",
            "express": "^4.16.4",
            "express-validation": "^1.0.2",
            "http-status": "^1.3.1",
            "ioredis": "^4.6.2",
            "joi": "^14.3.1",
            "jsonwebtoken": "^8.5.1",
            "mysql2": "^1.6.5",
            "sequelize": "^5.1.0",
            "sequelize-cli": "^5.4.0",
            "uuid": "^3.3.2"
        },
        "apidoc": {
            "name": "{{project}}",
            "version": "1.0.0",
            "description": "{{project}}项目API文档",
            "title": "{{project}} API",
            "url": "http://localhost:4000",
            "forceLanguage": "zh-cn"
        },
        "devDependencies": {
            "nodemon": "^1.18.10"
        }
    }

> .env.example

为了防止敏感数据被放到git仓库中，我引入一个被 .gitignore 的 .env 的文件，以 key-value 的方式，记录系统中所需要的可配置环境参数。并同时配套一个.env.example 的示例配置文件用来放置占位，.env.example 可以放心地进入 git 版本仓库。在实际使用过程中，只需拷贝一份此文件重命名为.env，然后修改为真实的配置信息即可

    # 服务的启动名字和端口，但也可以缺省不填值，默认值的填写只是一定程度减少起始数据配置工作
    HOST = 127.0.0.1
    PORT = 4000

    # MySQL 数据库链接配置
    MYSQL_HOST = localhost
    MYSQL_PORT = 3306
    MYSQL_DB_NAME = 数据库名
    MYSQL_USERNAME = 数据库用户名
    MYSQL_PASSWORD = 数据库密码

    #jwt secret秘钥（自己设置一个复杂的）
    JWTSECRET = JWTSECRET

> routes > user.js

由于引入了apidoc，所以在写路由的时候注意按照以下格式书写api说明。如果是个人项目，可能会感觉麻烦，不需要这种方式，但是如果是协同工作或者项目比较大的时候，有一个良好的api文档就显的非常重要了。所以建议日常项目中养成写api文档的习惯，对以后的工作将会有很大的帮助。更详细的apidoc文档配置可以参考[https://www.jianshu.com/p/9353d5cc1ef8](https://www.jianshu.com/p/9353d5cc1ef8)或[官网](http://apidocjs.com/)

    const express = require('express')
    const router = express.Router()
    const control = require('../control/userControl')
    const validate = require('express-validation')
    const paramValidation = require('../joi-rule/user-validation')

    /**
    * @api {post} /v1/user/login 用户登录 
    * @apiDescription 用户登录
    * @apiName login
    * @apiGroup user
    * @apiParam {string} [username]  用户名
    * @apiParam {string} password 密码
    * @apiSuccess {sting} token token
    * @apiSuccessExample {json} Success-Response:
    * {head:{'code':0,'msg':'ok'},data:{'token':''}
    * @apiSampleRequest http://127.0.0.1:4000/v1/user/login
    * @apiError (Error 400) {String} EMPTY_ERROR [没有传入用户名或密码]
    * @apiErrorExample {json} 参数为空
    * {"message": ["\"password\" is not allowed to be empty"],"code": 400,"stack": {}}
    * @apiVersion 1.0.0
    */
    router.route('/user/login')
        .post(validate(paramValidation.userLogin), control.login)

    /**
    * @api {post} /v1/user/sign 用户注册 
    * @apiDescription 用户注册
    * @apiName sign
    * @apiGroup user
    * @apiParam {string} username  用户名
    * @apiParam {string} password 密码
    * @apiParam {string} gender 性别
    * @apiParam {string} avatar_url 头像
    * @apiSuccess {string} result result
    * @apiSuccessExample {json} Success-Response:
    * {head:{'code':0,'msg':'ok'},data:{'result':'注册成功'}
    * @apiSampleRequest http://127.0.0.1:4000/v1/user/sign
    * @apiError (Error 400) {String} EMPTY_ERROR [没有传入用户名或密码]
    * @apiErrorExample {json} 参数为空
    * {"message": ["\"password\" is not allowed to be empty"],"code": 400,"stack": {}}
    * @apiError (Error 200) {String} EXIST_USER_ERROR [用户名已存在]
    * @apiErrorExample {json} 用户已存在
    * {head:{'code':0,'msg':'ok'},data:{'result':'用户名已存在'}
    * @apiVersion 1.0.0
    */
    router.route('/user/sign')
        .post(validate(paramValidation.userSign), control.sign)

    module.exports = router

> joi-rule > user-validation.js

Joi参数校验规则

    const Joi = require('joi')

    module.exports = {
        //POST /v1/user/login 
        userLogin: {
            body: {
                username: Joi.string().required(),
                password: Joi.string().required(),
            }
        },
        // POST /v1/user/sign
        userSign: {
            body: {
                username: Joi.string().required(),
                password: Joi.string().regex(/^(?![0-9]+$)(?![a-z]+$)(?![A-Z]+$)(?!([^(0-9a-zA-Z)]|[\(\)])+$)([^(0-9a-zA-Z)]|[\(\)]|[a-z]|[A-Z]|[0-9]){6,}$/).min(8).required(),
                gender: Joi.any().allow('1', '2', '0'),
                avtar_url: Joi.string().regex(/^((ht|f)tps?):\/\/([\w\-]+(\.[\w\-]+)*\/)*[\w\-]+(\.[\w\-]+)*\/?(\?([\w\-\.,@?^=%&:\/~\+#]*)+)?/)
            }
        }
    }


> untils > token.js

jwt验证的实现逻辑，包括token的下发和校验

    const jwt = require('jsonwebtoken')

    // 下发token
    function createJwt(opt) {
        const payload = {
            user_id: opt.user_id,
            name: opt.name,
            exp: Math.floor(new Date().getTime() / 1000) + 60 * 60,
        }
        return jwt.sign(payload, process.env.JWTSECRET)
    }

    // 解析token
    function parse(token) {
        if (token) {
            try {
                return jwt.verify(token, process.env.JWTSECRET)
            } catch (err) {
                return null
            }
        }
        return null
    }

    // 验证token
    function verifyToken(token, user_id) {
        if (token) {
            jwt.verify(token, process.env.JWTSECRET, (error, decode) => {
                if (error) {
                    console.log('token 验证错误信息', error)
                    return false
                }
                if (decode.user_id) {
                    return user_id == decode.user_id
                } else {
                    return false
                }
            })
        } else {
            return false
        }
    }

    module.exports = {
        createJwt,
        parse,
        verifyToken
    }


> models > index.js

sequelize实例化，以及映射数据库表

    const fs = require('fs')
    const path = require('path')
    const Sequelize = require('sequelize')
    const configs = require('../config/config')
    const basename = path.basename(__filename)
    const env = process.env.NODE_ENV || 'development'
    const config = {
        ...configs[env],
        define: {
            underscored: true
        }
    }
    const db = {}
    let sequelize = null

    if (config.use_env_variable) { // 连线字串的方式连线
        sequelize = new Sequelize(process.env[config.use_env_variable], config)
    } else {
        sequelize = new Sequelize(config.database, config.username, config.password, config)
    }

    // require 将相同目录底下的 .js 以 model.name 当索引值放到 db 物件中。
    // 执行每一个 model 的 「define」将 资料表与 js 对应上
    fs
        .readdirSync(__dirname)
        .filter(file => {
            return (file.indexOf('.') !== 0) && (file !== basename) && (file.slice(-3) === '.js')
        })
        .forEach(file => {
            var model = sequelize['import'](path.join(__dirname, file))
            db[model.name] = model
        })
        // 来执行 db 物件裡的每一个 .associate method
        // 执行每一个 「model 关联」 的设定，也就是关联式资料库的 foreign key 的设定与 js 对应上。
    Object.keys(db).forEach(modelName => {
        if (db[modelName].associate) {
            db[modelName].associate(db)
        }
    })

    // 将全域的物件与类别，也放进 db 物件中。
    // 将所有关于 MVC 的 M 都收敛在 db 里
    db.sequelize = sequelize
    db.Sequelize = Sequelize
    module.exports = db


## 相关工具介绍

### sequelize

Sequelize是一款基于Nodejs功能强大的异步ORM框架。同时支持PostgreSQL, MySQL, SQLite and MSSQL多种数据库，很适合作为Nodejs后端数据库的存储接口，为快速开发Nodejs应用奠定扎实、安全的基础。

相关文档：

* [官网api文档](http://docs.sequelizejs.com/)


### apidoc

apidoc是一款可以由源代码中的注释直接自动生成api接口文档的工具，它几乎支持目前主流的所有风格的注释。例如：
Javadoc风格注释(可以在C#, Go, Dart, Java, JavaScript, PHP, TypeScript等语言中使用)

相关文档：

* [官网](http://apidocjs.com/)
* [【ApiDoc】官方文档(翻译)](https://www.jianshu.com/p/9353d5cc1ef8)

### JOI

joi就好比是一个验证器，你可以自己规范schema来限制资料格式，有点像是正规表示法，这边来举个例子好了，利如PORT只允许输入数字若输入字串就会被阻挡PORT: Joi.number()，这样有好处万一有使用者不按照规范输入数值他会在middleware抛出一个错误告诉你这边有问题要你马上修正。

相关文档：

* [git](https://github.com/hapijs/joi/blob/v13.0.2/API.md)

### JWT

JWT是JSON Web Token的缩写，通常用来解决身份认证的问题，JWT是一个很长的base64字串在这个字串中分为三个部分别用点号来分隔，第一个部分为Header，里面分别储存型态和加密方法，通常系统是预设HS256杂凑演算法来加密，官方也提供许多演算法加密也可以手动更改加密的演算法，第二部分为有效载荷，它和会话一样，可以把一些自的定义数据存储在Payload里例如像是用户资料，第三个部分为Signature，做为检查码是为了预防前两部分被中间人伪照修改或利用的机制。

Header（标头）：用来指定哈希算法（预设为HMAC SHA256）
Payload（内容）：可以放一些自己要传递的资料
Signature（签名）：为签名检查码用，会有一个serect string来做一个字串签署
把上面三个用「。」接起来就是一个完整的JWT了！

使用流程： 使用者登入-> 产生API Token -> 进行API 路径存取时先JWT 验证-> 验证成功才允许访问该API

相关文档：

 * [官网](https://jwt.io/)
 * [JSON Web Token 入门教程](http://www.ruanyifeng.com/blog/2018/07/json_web_token-tutorial.html)

 ## 更多模版

 目前此模版已存在`qiya-cli`中，后续将会在`qiya-cli`中添加更多的模版，方便日常开发，减少重复工作。

 目前计划中的项目模版

 * 基于mpvue的前端项目模版
 * 适用于小程序的后端项目模版，开箱即用（包含jwt验证）
 * 基于koa的纯后端项目模版
 * 基于vue2.x + Element的后台管理系统模版
 * ...

 ## 合作计划

 如果你有更好的项目模版，无论是前端还是后端，都欢迎提交PR到[https://github.com/gengchen528/qiya-cli](https://github.com/gengchen528/qiya-cli)，或者在下方留言。

 当然你的模版必须要有一份详细的功能说明及核心文件详解，并且在package.json中把项目名称使用`{{project}}`，项目说明使用`description`，作者使用`author`替换。

 我会把好的项目模版添加到`qiya-cli`中，并且注明模版提供者与提供者git链接。希望`qiya-cli`能够成为一个全面的项目模版工具，只要你想要的模版都能在`qiya-cli`中快速找到。

 ## 项目GIT链接
 
脚手架

[qiya-cli](https://github.com/gengchen528/qiya-cli)

模版：

[qiya-cli-express-template](https://github.com/gengchen528/qiya-cli-express-template)(此模版)



 ## 联系我

 如果你有好的项目模版，欢迎联系我

![](https://user-gold-cdn.xitu.io/2019/3/27/169be1579db87ef5?w=430&h=430&f=jpeg&s=38572)

