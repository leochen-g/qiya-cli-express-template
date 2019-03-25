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