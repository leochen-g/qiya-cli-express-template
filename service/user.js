const models = require('../models')
const APPError = require('../helper/AppError.js')
const jwt = require('../until/token')
const uuid = require('uuid/v1')
const timestamps = {
    updated_at: new Date(),
    created_at: new Date(),
}

module.exports = {
    login: (req) => { //登录
        return new Promise(async(resolve, reject) => {
            const { username, password } = req
            const result = {}
            const user = await models.users.findAll({
                where: { name: username }
            })
            if (user.length < 1) {
                return reject(new APPError.LoginNoUserError())
            } else {
                if (user[0].password === password) {
                    result.token = jwt.createJwt({ user_id: user[0].user_id, name: user[0].name })
                    return resolve(result)
                } else {
                    return reject(new APPError.LoginPasswordError())
                }
            }
        })
    },
    sign: (req) => { //注册
        return new Promise((resolve, reject) => {
            const { username, password, avatar_url, gender } = req
            const result = {}
            const user_id = uuid().replace(/-/g, '')
            models.users.findOrCreate({
                where: {
                    name: username
                },
                defaults: {
                    user_id: user_id,
                    name: username,
                    avatar_url: avatar_url,
                    gender: gender,
                    password: password,
                    ...timestamps
                }
            }).then(([user, created]) => {
                console.log('查询结果', created)
                if (created) {
                    result.result = '注册成功'
                    return resolve(result)
                } else {
                    return reject(new APPError.UserExistError())
                }
            })
        })
    }
}