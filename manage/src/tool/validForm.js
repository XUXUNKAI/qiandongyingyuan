class ValidForm {

  constructor() {
    //手机号正则表达式
    this.phone = {
      reg: /^1[3456789]\d{9}$/,
      msg: '请填写正确手机号'
    }

    //昵称正则表达式
    //含有字母,数字字母汉字组合
    this.nickname = {
      // reg: /^(?=.*[a-zA-Z])[0-9a-zA-Z\u4e00-\u9fa5]{1,12}$/,
      reg: /^[0-9a-zA-Z\u4e00-\u9fa5]{1,12}$/,
      msg: '昵称必须含有字母,数字字母汉字组合'
    }

    //密码正则表达式
    //首个字符是字母, 除了汉字的其他字符
    this.password = {
      reg: /^[a-zA-Z][^\u4e00-\u9fa5]{5,15}$/,
      msg: '密码首个字符是字母且不能含有汉字'
    }

    //密码正则表达式
    //首个字符是字母, 除了汉字的其他字符
    this.oldPassword = {
      reg: /^[a-zA-Z][^\u4e00-\u9fa5]{5,15}$/,
      msg: '旧密码首个字符是字母且不能含有汉字'
    }

    //邮箱正则表达式
    this.email = {
      reg: /^\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/,
      msg: '邮箱格式不正确'
    }

    //验证码验证
    this.code = {
      reg: /^[0-9]{6}$/,
      msg: '验证码必须为数字'
    }
  }


  valid(o, t) {

    /**
     * {
     *    nickname: '', 昵称
     *    phone: '', 手机号
     *    password: ', 密码
     *    address: '' 地址
     *    ...
     * }
     */

    for (let key in o) {
      if (!this[key].reg.test(o[key])) {
        t.$message({
          message: this[key].msg,
          duration: 2000,
          type: 'error'
        })

        //表单验证不通过
        return false;
      }
    }

    //表单验证通过
    return true;

  }

}

export const validForm = new ValidForm();