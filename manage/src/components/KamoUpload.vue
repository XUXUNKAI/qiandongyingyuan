<template>
  <div class="kamo-upload">
    <label class="kamo-label" v-if="!disabled">
      <input class="kamo-file" type="file" @change="upload" />
      <div class="el-icon-plus kamo-icon"></div>
      <!-- 插槽 -->
      <slot></slot>
    </label>
    <div class="kamo-label" v-else>
      <div class="el-icon-plus kamo-icon"></div>
      <slot></slot>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'KamoUpload',

    props: {
      types: {
        type: Array,
        default() {
          //默认上传的类型
          return ['jpg', 'jpeg'];
        }
      },

      //上传图片大小, 默认为1MB
      size: {
        type: Number,
        default: 1
      },

      disabled: {
         type: Boolean,
         default: false 
      }
    },

    data() {
      return {
        imgUrl: ''
      };
    },

    methods: {
      upload(e) {
        let file = e.target.files[0];
        // 
        let type = file.type.split('/')[1];

        //验证文件类型
        if (this.types.indexOf(type) == -1) {
          this.$message({
            message: '图片类型为：' + this.types.join('，'),
            duration: 2000,
            type: 'error'
          })
          return;
        }

        //验证文件大小
        if (file.size / 1024 / 1024 > this.size) {
          this.$message({
            message: '图片大小最大为：' + this.size + 'MB',
            duration: 2000,
            type: 'error'
          })
          return;
        }
        

        let data = {
          //单位为B
          size: file.size,
          type
        };

        //创建文件阅读对象
        let fileReader = new FileReader();

        //监听文件是否读取完成
        fileReader.onload = (e) => {
          //this.$emit(自定义事件名称, 发射参数)
          data.base64 = e.target.result;
          this.$emit('upload-file', data);
        }

        //以路径方式读取文件
        fileReader.readAsDataURL(file);
        
      }
    }
  }
</script>

<style lang="less" scoped>
  .kamo-upload{
    width: 178px;
    height: 178px;
    border: 1px dashed #ddd;
    overflow: hidden;
  }
  .kamo-label{
    display: block;
    width: 100%;
    height: 100%;
    position: relative;
  }
  .kamo-file{
    display: none;
  }

  .kamo-icon{
    width: 30px;
    height: 30px;
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    margin: auto;
    font-size: 30px;
    color: #ddd;
    z-index: 1;
  }
</style>