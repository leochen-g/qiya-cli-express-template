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