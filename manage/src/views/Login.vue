<template>
  <div class="register">
    <div class="header"></div>
    <div class="box">
      <div class="form-box">
        <div class="title">咔摩管理平台系统</div>
        <div class="clearfix">
          <div class="fl title-item">
            <div class="item">注册</div>
          </div>
          <div class="fr title-item">
            <div class="item active">登录</div>
          </div>
        </div>
        <el-form class="info-box" :model="userInfo" label-width="40px">
          <el-form-item class="group" label="邮箱" prop="email">
            <el-input v-model="userInfo.email" placeholder="请输入邮箱"></el-input>
          </el-form-item>
          <el-form-item class="group" label="密码">
            <el-input v-model="userInfo.password" placeholder="请输入密码" show-password></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" class="btn" @click="login">立即登录</el-button>
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
    name: 'Login',
    data() {
      return {
        userInfo: {
          email: '',
          password: ''
        }
      };
    },

    methods: {
      //登录
      login() {
        if (!validForm.valid(this.userInfo, this)) {
          return;
        }

        //发起请求
        this.axios({
          method: 'POST',
          url: '/login',
          data: this.userInfo
        }).then(result => {

          

          if (result.data.code == 1030) {
            this.$cookies.set('MOKATK', result.data.token, 60 * 60 * 24 * 10);
            this.$router.push({name: 'Movie'});
          }
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
    .line{
      position: absolute;
      bottom: 1px;
      left: 0;
      width: 100%;
      height: 0;
      box-shadow: 0px 0px 4px 1px #aaa;
      z-index: 1;
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