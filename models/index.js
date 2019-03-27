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