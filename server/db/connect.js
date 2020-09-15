//连接mysql数据库

let Sequelize = require('sequelize');

//new Sequelize(数据库名称, 数据库用户名, 数据库密码, 配置)
let connect = new Sequelize(config.mysqlOptions.database, config.mysqlOptions.user, config.mysqlOptions.password, {
  host: config.mysqlOptions.host,
  dialect: config.mysqlOptions.dialect,
  //连接池
  pool: config.mysqlOptions.pool,

  timezone: config.mysqlOptions.timezone
})

module.exports = connect;