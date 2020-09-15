<template>
  <div class="home">
    <el-container class="home-box">
      <el-header class="home-header">
        <div class="fl clearfix">
          <div class="logo fl"></div>
          <div class="manage-name fl">电影后台管理中心</div>
        </div>
        <div class="fr clearfix info">
          <div class="fl info-item">{{todayDate.date}}</div>
          <div class="fl info-item">{{todayDate.day}}</div>
          <div class="fl logout-btn">退出</div>
        </div>
      </el-header>

      <el-container class="home-content">
        <el-aside class="aside">
          <div class="person-box">
            <div class="person-avatar fl">
              <img class="auto-img" :src="userInfo.avatar" alt="">
              <!-- 上传 -->
              <KamoUpload class="avatar-upload" @upload-file="uploadAvatar" :size="0.5"></KamoUpload>
            </div>
            <div class="person-name fl">{{userInfo.nickname}}</div>
          </div>
          <el-menu
            default-active="2"
            class="ul-menu"
            @open="handleOpen"
            @close="handleClose"
          >
            <el-submenu index="1">
              <template slot="title">
                <i class="el-icon-menu"></i>
                <span>商品管理</span>
              </template>
              <el-menu-item-group>
                <el-menu-item index="1-1">电影产品</el-menu-item>
              </el-menu-item-group>
            </el-submenu>

            <el-submenu index="2">
              <template slot="title">
                <i class="el-icon-s-comment"></i>
                <span>资讯管理</span>
              </template>
              <el-menu-item-group>
                <el-menu-item index="2-1">影视资讯</el-menu-item>
              </el-menu-item-group>
            </el-submenu>

            <el-submenu index="3">
              <template slot="title">
                <i class="el-icon-setting"></i>
                <span>设置</span>
              </template>
              <el-menu-item-group>
                <el-menu-item index="3-1">个人中心</el-menu-item>
              </el-menu-item-group>
            </el-submenu>

          </el-menu>
        </el-aside>

        <el-container class="content">
          <el-main class="p0 m-content">
            <div class="main-title">
              <span>商品管理 > </span>
              <span class="current-title">电影产品</span>
            </div>
            <div class="main-content">
              
              <!-- 二级路由 -->
              <router-view></router-view>

            </div>
          </el-main>

          <el-footer class="footer">
            Copyright © kangliuyong All Rights Reserved 备案/许可证编号为：粤ICP备19024022号
          </el-footer>
        </el-container>
      </el-container>
    </el-container>
  </div>
</template>

<script>
import {tool} from '../tool/tool'
import KamoUpload from '../components/KamoUpload'
export default {
  name: "Home",

  data() {
    return {
      todayDate: {
        date: '',
        day: ''
      },
      userInfo: {
        nickname: '',
        avatar: ''
      },

      //星期几
      days: ['星期日', '星期一', '星期二', '星期三', '星期四','星期五','星期六']
    };
  },

  created() {

    //获取当前时间
    let today = new Date();
    this.todayDate.date = tool.formatDate(today, 'yyyy年MM月dd日');
    this.todayDate.day = this.days[today.getDay()];
    

    this.axios({
      method: 'GET',
      url: '/business'
    }).then(result => {
      // 
      this.userInfo.nickname = result.data.result[0].nickname;
      this.userInfo.avatar = result.data.result[0].avatar;
    }).catch(err => {
      
    })

  },

  methods: {
    handleOpen(key, keyPath) {
      
    },
    handleClose(key, keyPath) {
      
    },

    // 上传头像
    uploadAvatar(e) {
      

      this.axios({
        method: 'POST',
        url: '/uploadBusinessAvatar',
        data: {
          type: e.type,
          base64: e.base64.replace(/^data:image\/[A-Za-z]+;base64,/, '')
        }
      }).then(result => {
        
        if (result.data.result[0] == 1) {
          this.userInfo.avatar = result.data.url;
        }

        this.$message({
          message: result.data.msg,
          duration: 2000,
          type: result.data.result[0] == 1 ? 'success' : 'error'
        })
      }).catch(err => {
        
      })

    }
  },

  //局部注册组件
  components: {
    KamoUpload
  }
};
</script>

<style lang="less" scoped>
.home {
  height: 100%;
  .home-box{
    height: 100%;
  }
  .main-content{
    margin-left: 20px;
    position: relative;
    z-index: 1;
    height: 100%;
  }
  .current-title{
    color: #FF4E70;
  }
  .main-title{
    background-color: #fff;
    height: 40px;
    line-height: 40px;
    padding-left: 20px;
    position: fixed;
    top: 60px;
    left: 201px;
    width: 100%;
    z-index: 2;
  }
  .content{
    background-color: #f5f5f5;
    margin-left: 201px;
  }
  .footer{
    background-color: #ddd;
    height: 40px !important;
    text-align: center;
    color: #444;
    line-height: 40px;
    font-size: 14px;
  }
  .ul-menu{
    border-right: none;
  }
  .person-box {
    height: 80px;
  }
  .person-avatar{
    height: 60px;
    width: 60px;
    background-color: #ddd;
    margin-top: 10px;
    border-radius: 50%;
    margin-left: 20px;
    overflow: hidden;
    position: relative;
  }
  .avatar-upload{
    position: absolute;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    opacity: 0;
  }
  .person-name{
    line-height: 80px;
    font-size: 18px;
    color: #444;
    margin-left: 10px;
    max-width: 100px;
    white-space: nowrap;
    text-overflow: ellipsis;
    overflow: hidden;
  }
  .aside {
    position: fixed;
    top: 60px;
    bottom: 0;
    width: 201px !important;
    background-color: #fff;
    border-right: 1px solid #e8e8e8;
  }
  .logout-btn {
    padding: 0 20px;
    cursor: pointer;
    background-color: rgba(255, 255, 255, 0.2);
  }
  .info-item {
    margin-right: 20px;
  }
  .info {
    line-height: 60px;
    color: #fff;
  }
  .manage-name {
    margin-left: 20px;
    line-height: 60px;
    color: #fff;
    font-size: 18px;
  }
  .logo {
    width: 50px;
    height: 50px;
    margin-top: 5px;
    background-color: #fff;
  }
  .home-header {
    position: sticky;
    top: 0;
    background-color: #ff4e70;
    z-index: 5;
  }
}
</style>
