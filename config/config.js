const env2 = require('env2')

if (process.env.NODE_ENV === 'production') {
    env2('./.env.prod')
} else {
    env2('./.env')
}

const { env } = process

module.exports = {
    development: { // 开发环境 mysql 配置
        username: env.MYSQL_USERNAME,
        password: env.MYSQL_PASSWORD,
        database: env.MYSQL_DB_NAME,
        host: env.MYSQL_HOST,
        port: env.MYSQL_PORT,
        dialect: 'mysql',
        pool: {
            max: 10,
            min: 0,
            idle: 10000
        }
        // operatorsAliases: false // 此参数为自行追加，解决高版本 sequelize 连接警告
    },
    production: { // 生产环境 mysql配置
        username: env.MYSQL_USERNAME,
        password: env.MYSQL_PASSWORD,
        database: env.MYSQL_DB_NAME,
        host: env.MYSQL_HOST,
        port: env.MYSQL_PORT,
        dialect: 'mysql',
        pool: {
            max: 10,
            min: 0,
            idle: 10000
        }
        // operatorsAliases: false // 此参数为自行追加，解决高版本 sequelize 连接警告
    }
}