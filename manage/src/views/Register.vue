<template>
  <div class="register">
    <div class="header"></div>
    <div class="box">
      <div class="form-box">
        <div class="title">咔摩管理平台系统</div>
        <div class="clearfix">
          <div class="fl title-item">
            <div class="item active">注册</div>
          </div>
          <div class="fr title-item">
            <div class="item">登录</div>
          </div>
        </div>
        <el-form class="info-box" :model="userInfo" label-width="40px">
          <el-form-item class="group" label="邮箱" prop="email">
            <el-input v-model="userInfo.email" placeholder="请输入邮箱"></el-input>
          </el-form-item>
          <el-form-item class="group" label="昵称">
            <el-input v-model="userInfo.nickname" placeholder="输入昵称(1-12字符)"></el-input>
          </el-form-item>
          <el-form-item class="group" label="密码">
            <el-input v-model="userInfo.password" placeholder="请输入密码(6-16字符)" show-password></el-input>
          </el-form-item>
          <el-form-item class="group">
            <el-row :gutter="20">
              <el-col :span="14">
                <el-input v-model="userInfo.code" placeholder="输入6位验证码"></el-input>
              </el-col>
              <el-col :span="10"><el-button type="primary" class="btn" :class="{'btn-disabled': isSend}" :disabled="isSend" @click="getEmailCode">{{text}}</el-button></el-col>
            </el-row>

          </el-form-item>
          <el-form-item>
            <el-button type="primary" class="btn" @click="register">立即注册</el-button>
          </el-form-item>
        </el-form>
      </div>
      <div class="line"></div>
    </div>
  </div>
</template>

<script>

  import {validForm} from '../tool/validForm'

  export default {
    name: 'Register',
    data() {
      return {
        isSend: false,
        text: '发送验证码',
        userInfo: {
          email: '',
          nickname: '',
          password: '',
          code: ''
        }
      };
    },

    methods: {

      //获取邮箱验证码
      getEmailCode() {
        //验证邮箱
        if (!validForm.valid({email: this.userInfo.email}, this)) {
          return;
        }

        this.isSend = true;

        //1分钟重新发送
        let time = 5;
        this.text = time + 's后重新发送';

        let timer = setInterval(() => {
          if (time == 0) {
            clearInterval(timer);
            timer = null;
            this.isSend = false;
            this.text = '发送验证码';
          } else {
            time--;
            this.text = time + 's后重新发送';
          }
        }, 1000)

        //发起获取验证码请求
        this.axios({
          method: 'POST',
          url: '/sendMail',
          data: {
            email: this.userInfo.email
          }
        }).then(result => {
          
        }).catch(err => {
          
        })
        
      },

      //注册
      register() {

        //验证表单
        if (!validForm.valid(this.userInfo, this)) {
          return;
        }

        //获取参数
        this.axios({
          method: 'POST',
          url: '/register',
          data: this.userInfo
        }).then(result => {
          
        }).catch(err => {
          
        })
        

      }

    }
  }
</script>

<style lang="less" scoped>
  .register{
    .form-box{
      position: relative;
      z-index: 2;
      padding: 20px;
      background-color: #fff;
    }
    .btn-disabled{
      opacity: .75;
    }
    .line{
      position: absolute;
      bottom: 1px;
      left: 0;
      width: 100%;
      height: 0;
      box-shadow: 0px 0px 4px 1px #aaa;
      z-index: 1;
    }
    .btn1{
      display: block;
      width: 100%;
    }
    .btn{
      display: block;
      width: 100%;
      background-color: #FF4971;
      border-color: #FF4971;
    }
    .group{
      margin-bottom: 20px;
    }
    .header{
      height: 280px;
      background-color: #FE6B6C;
    }
    .box{
      width: 440px;
      background-color: #fff;
      margin: -100px auto 0;
      position: relative;
    }

    .title{
      text-align: center;
      color: #FD3777;
      font-size: 28px;
      margin-bottom: 20px;
    }

    .title-item{
      width: 50%;
    }

    .item{
      width: 50px;
      margin: 0 auto;
      text-align: center;
      font-size: 18px;
      color: #848484;
      cursor: pointer;
    }

    .item.active{
      color: #444;
    }

    .info-box{
      margin-top: 20px;
    }
  }
</style>