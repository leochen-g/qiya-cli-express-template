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

// require 將相同目錄底下的 .js 以 model.name 當索引值放到 db 物件中。
// 執行每一個 model 的 「define」將 資料表與 js 對應上
fs
    .readdirSync(__dirname)
    .filter(file => {
        return (file.indexOf('.') !== 0) && (file !== basename) && (file.slice(-3) === '.js')
    })
    .forEach(file => {
        var model = sequelize['import'](path.join(__dirname, file))
        db[model.name] = model
    })
    // 來執行 db 物件裡的每一個 .associate method
    // 執行每一個 「model 關聯」 的設定，也就是關聯式資料庫的 foreign key 的設定與 js 對應上。
Object.keys(db).forEach(modelName => {
    if (db[modelName].associate) {
        db[modelName].associate(db)
    }
})

// 將全域的物件與類別，也放進 db 物件中。
// 將所有關於 MVC 的 M 都收斂在 db 裡
db.sequelize = sequelize
db.Sequelize = Sequelize
module.exports = db