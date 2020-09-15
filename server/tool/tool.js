//工具库

//导入文件系统模块
let fs = require('fs');

//导入加密模块
let crypto = require('crypto');

//导入发邮件模块
let nodemailer  = require('nodemailer');

//导入token模块，token就是一串加密的字符串，一般用于身份验证
let jsonwebtoken = require('jsonwebtoken');

//创建发邮件实例
let transporter = nodemailer.createTransport({
  host: config.emailOptions.host,
  port: config.emailOptions.port,
  secure: config.emailOptions.secure,
  auth: {
    user: config.emailOptions.user,
    pass: config.emailOptions.pass
  }
})

class Tool {

  //加密
  encodeString(value, salt) {
    let md5 = crypto.createHash('md5');

    let md5Value = md5.update(value + salt).digest('hex');

    return md5Value;
  }


  //发邮件
  sendMail(options, fn) {
    //options接受邮件配置，object
    //fn(err, data) {}, 回调函数，err: 发邮件失败错误对象, data: 发邮件成功的信息对象

    transporter.sendMail(options, fn);
  }

  //随机生成验证码
  validCode() {
    let code = Math.random().toString().slice(-6);

    return code;
  }

  //生成token
  createToken(o) {
    jsonwebtoken.sign({
      data: o.value
    }, o.salt, {
      expiresIn: o.expires
    }, o.success);
  }

  //验证token
  verifyToken(o) {
    jsonwebtoken.verify(o.token, o.salt, o.success);
  }


  //cookie字符串转换普通对象
  transformCookie(cookie) {
    let cookies = cookie.split(/; /);
    let cookiesObject = {};
    cookies.forEach(v => {
      let value = v.split(/=/);
      cookiesObject[value[0]] = value[1];
    })

    return cookiesObject;
  }

  //上传文件
  uploadFile(o) {

    return new Promise((resolve, reject) => {
      //post请求会将base64码的+自动转为空格
      //将base64码的空格转换为+
      let base64 = o.url.replace(/ /g, '+');

      let buffer = new Buffer(base64, 'base64');

      //自动命名文件名
      let filename = 'kamo' + Math.random().toString().slice(2) + new Date().getTime() + '.' + o.type;

      //写入文件
      fs.writeFile(__basename + '/upload/' + filename, buffer, err => {
        if (err) {
          reject();
        } else {
          o.url = config.serverOptions.host + ':' + config.serverOptions.port + '/static/' + filename;
          delete o.type;
          if (o.role !== undefined) {
            o.role = o.role ? 1 : 2;
          }
          resolve();
        }
      })
    })
  }

}


module.exports = new Tool();