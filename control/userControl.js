const service = require('../service/user')

module.exports = {
    login: async function(req, res, next) { // 登录
        service.login(req.body).then(result => {
            res.send({ 'head': { 'code': 0, msg: 'ok' }, data: result })
        }).catch(err => {
            next(err)
        })
    },
    sign: async function(req, res, next) { //注册
        service.sign(req.body).then(result => {
            res.send({ 'head': { 'code': 0, msg: 'ok' }, data: result })
        }).catch(err => {
            next(err)
        })
    }
}