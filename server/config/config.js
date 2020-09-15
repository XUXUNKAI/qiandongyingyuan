//配置层

//服务器地址端口配置
let serverOptions = {

  //地址，域名
  host: 'http://182.92.95.116',

  //端口
  port: 80,

  //请求体允许大小
  bodySize: 30 * 1024 + 'kb'
}

exports.serverOptions = serverOptions;

//mysql数据库配置
exports.mysqlOptions = {

  //数据库地址
  host: 'localhost',

  //数据库用户名
  user: 'root',

  //数据库密码
  password: 'a123456',

  //数据库名称
  database: 'kamo',

  //数据库语言
  dialect: 'mysql',

  //连接池
  pool: {
    
    //最小连接数
    min: 0,

    //最大连接数
    max: 10,

    //连接超时, 单位为毫秒
    acquire: 30000,

    //闲置时间, 释放连接，单位为毫秒
    idle: 10000
  },

  //东八区，北京标准时间
  timezone: '+08:00'
}

//配置用默认头像
exports.userOptions = {
  avatar: serverOptions.host + ':' + serverOptions.port + '/static/default.png',

  //userId前缀
  before: 'kamo'
}

//加盐配置
exports.saltOptions = {
  //密码加盐
  passwordSalt: 'p_moka',

  //token加盐
  tokenSalt: 't_moka'
}

//过期时间配置
exports.expiresOptions = {
  //验证码
  codeExpires: 5 * 60 * 1000,

  //token过期时间
  //60 ==> 60秒
  //'1h' ==> 1小时
  //'100' ==> 100毫秒
  //'2d' ==> 2天
  //'3 days' ==> 3天
  tokenExpires: '10d'
}

//发邮件配置
exports.emailOptions = {

  //发邮件地址
  host: 'smtp.126.com',

  //端口
  //25: 在阿里云服务器被禁止, 建议使用465端口
  port: 465,

  //465需要配置为true
  secure: true,

  //发邮件地址
  user: 'kangliuyong@126.com',

  //授权码
  pass: 'action2019'
  
}