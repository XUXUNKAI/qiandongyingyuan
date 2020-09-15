<template>
  <div id="app" class="app">
    <router-view/>
  </div>
</template>

<style lang="less">
  html,body,.app{
    height: 100%;
  }
  .app{
    min-width: 1270px;
  }
  body{
    margin: 0 auto;
  }

  .fl{
    float: left;
  }

  .fr{
    float: right;
  }

  .clearfix::after{
    content: '';
    display: block;
    clear: both;
  }

  .auto-img{
    width: 100%;
    display: block;;
  }

  .p0{
    padding: 0;
  }
</style>
