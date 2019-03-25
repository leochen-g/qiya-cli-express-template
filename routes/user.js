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