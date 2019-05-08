const express = require('express')
const cookieParser = require('cookie-parser')
const bodyParser = require('body-parser')
const httpStatus = require('http-status')
const expressValidation = require('express-validation')
const APPError = require('./helper/AppError.js')
const path = require('path')
require('env2')('./.env')
const config = require('./config')
const jwt = require('./untils/token')
const admin = require('./routes/user')
const app = express()
app.set('trust proxy', 'loopback')

app.all('*', function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*")
    res.header("Access-Control-Allow-Headers", "X-Requested-With")
    res.header("Access-Control-Allow-Methods", "POST,GET")
    res.header("X-Powered-By", ' 3.2.1')
        // res.header("Content-Type", "application/json;charset=utf-8");
    next()
})

// 配置中间件
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))
app.use(cookieParser())
app.use(express.static(path.join(__dirname, 'public')))
    // 路由配置
app.use('/v1', admin)
app.use('/static', express.static('static'))
    // if error is not an instanceOf APIError, convert it.
app.use((err, req, res, next) => {
    console.log('1')
    let errorMessage;
    let errorCode;
    let errorStatus;
    // express validation error 所有傳入參數驗證錯誤
    if (err instanceof expressValidation.ValidationError) {
        if (err.errors[0].location === 'query' || err.errors[0].location === 'body') {
            errorMessage = err.errors[0].messages;
            errorCode = 400;
            errorStatus = httpStatus.BAD_REQUEST;
        }
        const error = new APPError.APIError(errorMessage, errorStatus, true, errorCode);
        return next(error);
    }
    return next(err);
});

// error handler, send stacktrace only during development 錯誤後最後才跑這邊
app.use((err, req, res, next) => {
    console.log('2')
    res.status(err.status).json({
        message: err.isPublic ? err.message : httpStatus[err.status],
        code: err.code ? err.code : httpStatus[err.status],
        stack: config.env === 'development' ? err.stack : {}
    });
    next();
});
// // catch 404 and forward to error handler 处理404错误 并向下传递错误
// app.use(function(req, res, next) {
//     var err = new Error('一个不存在的页面');
//     err.status = 404;
//     next(err);
// })

// app.use(function(req, res, next) {
//     res.locals.message = err.message
//     res.locals.error = req.app.get('env') === 'developement' ? err : {}

//     res.status(err.status || 500)
//     res.render('error')
// })


module.exports = app
