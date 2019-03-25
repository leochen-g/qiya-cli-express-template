const httpStatus = require('http-status')

/**
 * @extends Error
 */
class ExtendableError extends Error {
    constructor(message, status, isPublic, code) {
        super(message)
        this.message = message
        this.name = this.constructor.name
        this.status = status
        this.isPublic = isPublic
        this.code = code
        this.isOperrational = true
        Error.captureStackTrace(this, this.constructor.name)
    }
}

/**
 * Class representing an API error.
 * @extends ExtendableError
 */
class APIError extends ExtendableError {
    /**
     * Creates an API error.
     * @param {string} message - Error message.
     * @param {number} status - HTTP status code of error.
     * @param {boolean} isPublic - Whether the message should be visible to user or not.
     */
    constructor(message, status = httpStatus.INTERNAL_SERVER_ERROR, isPublic = false, code) {
        super(message, status, isPublic, code);
        this.name = 'APIError';
    }
}

/**
 * Class representing an MySQL error.
 * @extends ExtendableError
 */
class MySQLError extends ExtendableError {
    /**
     * Creates an API error.
     * @param {string} message - Error message.
     * @param {number} status - HTTP status code of error.
     * @param {boolean} isPublic - Whether the message should be visible to user or not.
     */
    constructor(message = 'Backend Error', status = httpStatus.INTERNAL_SERVER_ERROR, isPublic = true, code = 500) {
        super(message, status, isPublic, code);
        this.name = 'MySQLError';
    }
}

/**
 * 用户名未注册 Error
 * @extends ExtendableError
 */
class LoginNoUserError extends ExtendableError {
    /**
     * Creates an API error.
     * @param {string} message - Error message.
     * @param {number} status - HTTP status code of error.
     * @param {boolean} isPublic - Whether the message should be visible to user or not.
     */
    constructor(message = '用户未注册！', status = httpStatus.UNAUTHORIZED, isPublic = true, code = 401) {
        super(message, status, isPublic, code);
        this.name = 'LoginError';
    }
}

/**
 * 密碼錯誤 Error.
 * @extends ExtendableError
 */
class LoginPasswordError extends ExtendableError {
    /**
     * Creates an API error.
     * @param {string} message - Error message.
     * @param {number} status - HTTP status code of error.
     * @param {boolean} isPublic - Whether the message should be visible to user or not.
     */
    constructor(message = '你输入的密码错误！', status = httpStatus.UNAUTHORIZED, isPublic = true, code = 401) {
        super(message, status, isPublic, code);
        this.name = 'LoginError';
    }
}

/**
 * 用户已存在错误 Error.
 * @extends ExtendableError
 */
class UserExistError extends ExtendableError {
    /**
     * Creates an API error.
     * @param {string} message - Error message.
     * @param {number} status - HTTP status code of error.
     * @param {boolean} isPublic - Whether the message should be visible to user or not.
     */
    constructor(message = '用户已存在！', status = httpStatus.OK, isPublic = true, code = 200) {
        super(message, status, isPublic, code);
        this.name = 'signError';
    }
}

module.exports = {
    APIError,
    MySQLError,
    LoginNoUserError,
    LoginPasswordError,
    UserExistError
};