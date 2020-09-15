<template>
  <div class="release">

    <el-form class="form-box" :model="movieData" ref="form" label-width="120px">
      <el-row>
        <el-col :span="10">
          <el-form-item label="电影名称" prop="name">
            <el-input v-model="movieData.movie.name" :readonly="flag == 1"></el-input>
          </el-form-item>
        </el-col>
      </el-row>

      <el-row>
        <el-col :span="10">
          <el-form-item label="电影英文名称" prop="enname">
            <el-input v-model="movieData.movie.enname" :readonly="flag == 1"></el-input>
          </el-form-item>
        </el-col>
      </el-row>

       <el-row>
        <el-col :span="10">
          <el-form-item label="电影简介" prop="desc">
            <el-input resize="none" :autosize="{minRows: 3, maxRows: 6}" type="textarea" v-model="movieData.movie.desc" :readonly="flag == 1"></el-input>
          </el-form-item>
        </el-col>
      </el-row>

      <el-row>
        <el-col :span="10">
          <el-form-item label="电影类型" prop="type">
            <el-input v-model="movieData.movie.type" :readonly="flag == 1"></el-input>
          </el-form-item>
        </el-col>
      </el-row>

      <el-row>
        <el-col :span="10">
          <el-form-item label="电影时长" prop="duration">
            <el-input v-model="movieData.movie.duration" :readonly="flag == 1"></el-input>
          </el-form-item>
        </el-col>
      </el-row>

      <el-row>
        <el-col :span="10">
          <el-form-item label="上映日期" prop="date">
            <el-date-picker type="date" placeholder="选择日期" v-model="movieData.movie.date" style="width: 100%;" :disabled="flag == 1"></el-date-picker>
          </el-form-item>
        </el-col>
      </el-row>

      <!-- 电影模式 -->
      <el-row>
        <el-col :span="10">
          <el-form-item label="电影模式" prop="mode">
            <el-select v-model="movieData.movie.mode" placeholder="选择电影模式" style="width: 100%;" :disabled="flag == 1">
              <el-option label="2D" value="2D">2D</el-option>
              <el-option label="3D" value="3D">3D</el-option>
             </el-select>
          </el-form-item>
        </el-col>
      </el-row>
      
      <!-- 电影状态 -->
      <el-row>
        <el-col :span="10">
          <el-form-item label="电影状态" prop="mode">
            <el-radio-group v-model="movieData.movie.status" :disabled="flag == 1">
              <el-radio label="上架"></el-radio>
              <el-radio label="下架"></el-radio>
            </el-radio-group>
          </el-form-item>
        </el-col>
      </el-row>
      
      <!-- 电影封面 -->
      <div>
        <el-row v-for="(item, index) in movieData.moveImages" :key="index">
          <el-col :span="10">
            <el-form-item :class="{mb0: index == movieData.moveImages.length - 1}" :label="'电影封面' + (index + 1)" prop="url">


              <el-row>
                <el-col :span="15">
                 
                  <!-- 上传 -->
                  <KamoUpload @upload-file="upload($event, item)" :types="types" :disabled="flag == 1">
                    <img class="kamo-img" :src="item.url" alt="">
                  </KamoUpload>

                </el-col>
                 <el-col :span="7" v-if="movieData.moveImages.length > 1">
                    <div class="delete el-icon-remove-outline release-delete" @click="removeCover(item.coverId, index, item)" v-if="flag != 1"></div>
                </el-col>
              </el-row>
              
            </el-form-item>
          </el-col>
         
        </el-row>

        <el-row>
          <el-col :span="10">
            <el-form-item label="">
              <div class="add-box">
                <div class="delete el-icon-circle-plus-outline add" @click="addItem('moveImages', {type: '', url: ''}, 'url', '请先上传该图片')" v-if="flag != 1"></div>
              </div>
            </el-form-item>
          </el-col>
        </el-row>

      </div>


      <!-- 导演 -->
      <div>
        <el-row v-for="(item, index) in movieData.director" :key="index">
          <el-col :span="10">
            <el-form-item :class="{mb0: index == movieData.director.length - 1}" :label="'电影导演' + (index + 1)" prop="name">
              <el-input v-model="item.name" :readonly="flag == 1"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="14" v-if="movieData.director.length > 1">
            <div class="delete el-icon-remove-outline" v-if="flag != 1" @click="removeDirector(item.directorId, index)"></div>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="10">
            <el-form-item label="">
              <div class="delete el-icon-circle-plus-outline add" @click="addItem('director', {name: ''}, 'name', '请填写导演名称')" v-if="flag != 1"></div>
            </el-form-item>
          </el-col>
        </el-row>
      </div>

      <!-- 演员 -->
      <div>
        <div v-for="(item, index) in movieData.performer" :key="index">
          <el-row>
            <el-col :span="10">
              <el-form-item :label="'电影演员' + (index + 1)" prop="name">
                <el-input v-model="item.name" :readonly="flag == 1"></el-input>
              </el-form-item>
            </el-col>
            <el-col class="zhuyan" :span="2">
               <el-checkbox v-model="item.role" :border="true" :disabled="flag == 1">主演</el-checkbox>
            </el-col>
            <el-col :span="4" v-if="movieData.performer.length > 1">
              <div class="delete el-icon-remove-outline" v-if="flag != 1" @click="removePerformer(item.performerId, index, item)"></div>
            </el-col>
          </el-row>

          <el-row>
            <el-col :span="10">
              <el-form-item label="">
                <!-- 上传 -->
                  <KamoUpload @upload-file="upload($event, item)" :types="types" :disabled="flag == 1">
                    <img class="kamo-img" :src="item.url" alt="">
                  </KamoUpload>
              </el-form-item>
            </el-col>
          </el-row>
        </div>

        <el-row>
          <el-col :span="10">
            <el-form-item label="">
             <div class="add-box">
                <div class="delete el-icon-circle-plus-outline add" @click="addItem('performer', {name: '', url: '', role: false, type: ''}, 'name', '请填写演员名称')" v-if="flag != 1"></div>
              </div>
            </el-form-item>
          </el-col>
        </el-row>
        
      </div>
      
      <el-row v-if="flag != 1">
        <el-col>
          <el-form-item label="">
            <el-button type="primary" @click="sendMovie">发布</el-button>
          </el-form-item>
        </el-col>
      </el-row>
    </el-form>

  </div>
</template>

<script>
  import KamoUpload from '../components/KamoUpload.vue'
  import {tool} from '../tool/tool'
  export default {
    name: 'ReleaseMovie',
    data() {
      return {

        //0: 添加，1: 查看，2：编辑
        flag: 0,

        movieId: '',

        //允许上传图片类型
        types: ['png', 'jpg', 'jpeg', 'webp', 'gif'],

        //电影数据
        movieData: {
          movie: {
            name: '',
            enname: '',
            desc: '',
            type: '',
            duration: '',
            date: '',
            mode: '',
            status: '上架'
          },
          //电影封面
          moveImages: [
            {
              url: '',
              type: ''
            }
          ],

          //导演
          director: [
            {
              name: ''
            }
          ],

          //role: 1 ==> 主角，2：配角
          performer: [
            {
              name: '',
              role: false,
              url: '',
              type: ''
            }
          ]
        }
      };
    },

    created() {
      //截取查询参数
      let query = this.$route.query;
      // 
      this.flag = query.flag || 0;

      this.movieId = query.movieId;

      if (this.flag != 0) {
        this.movieList(this.movieId);
      }

      
    },

    methods: {

      //增加电影封面
      addItem(key, o, k, msg) {
        //key：数据字段名 moveImages, director, performer
        //o: 增加数据 {}
        //k: 判断前一个指定属性是否为空
        //msg: 提示文本

        //判断最后一个url属性是否为空
        let last = this.movieData[key][this.movieData[key].length - 1];

        if (last[k] == '') {
          this.$message({
            message: msg,
            duration: 2000,
            type: 'error'
          })
          return;
        }


        this.movieData[key].push(o);

      },

      //上传
      upload(e, item) {

        item.url = e.base64;
        item.type = e.type;

      },

      //发布
      sendMovie() {

        //验证表单
        let controls = {
          //电影名称
          name: {
            msg: '电影名称不能空且不能含有<>'
          },

          //电影英文名称
          enname: {
            msg: '电影英文名称不能空且不能含有<>'
          },

          //电影简介
          desc: {
            msg: '电影简介不能空且不能含有<>'
          },

          //电影类型
          type: {
            msg: '电影类型不能空且不能含有<>'
          },

          //电影时长
          duration: {
            msg: '电影时长不能空且不能含有<>'
          },

          //上映日期
          date: {
            msg: '上映日期不能空且不能含有<>'
          },

          //电影模式
          mode: {
            msg: '电影模式不能空且不能含有<>'
          }
          
        }

        for (let key in controls) {
          let v = this.movieData.movie[key];
          if (v == '' || /[<>]/.test(v)) {
            this.$message({
              message: controls[key].msg,
              duration: 2000,
              type: 'error'
            })
            return;
          }
        }

        let formData = {
          moveImages: {
            msg: '电影封面不能为空',
            k: 'url'
          },
          director: {
            msg: '电影导演不能为空且不能含有<>',
            k: 'name'
          },
          performer: {
            msg: '电影演员不能为空且不能含有<>',
            k: 'name'
          }
        };

        for (let key in formData) {
          if (!this.valid(key, formData[key].k, formData[key].msg)) {
            return;
          }
        }

        //发布电影
        let data = Object.assign({}, this.movieData);
        data.movie.date = tool.formatDate(new Date(data.movie.date), 'yyyy-MM-dd');

        if (this.flag == 2) {
          data.movie.movieId = this.movieId;
        }
        for (let key in data) {
          data[key] = JSON.stringify(data[key]);
        }

        //编辑电影
        if (this.flag == 2) {
          data.flag = 2;
        }

        

        // return;

        this.axios({
          method: 'POST',
          url: '/releaseMovie',
          data
        }).then(result => {
          
        }).catch(err => {
          
        })
        

      },

      //验证电影封面、导演、演员是否为空
      valid(key, k, msg) {
        for (let i = 0; i < this.movieData[key].length; i++) {
          if (this.movieData[key][i][k] == '' || (k == 'name' && /[<>]/.test(this.movieData[key][i][k]))) {
            this.$message({
              message: msg,
              duration: 2000,
              type: 'error'
            })
            return false;
          }

          if (key == 'performer' && this.movieData[key][i].url == '') {
            this.$message({
              message: '电影演员图片不能为空',
              duration: 2000,
              type: 'error'
            })
            return false;
          }
        }

        return true;
      },

      //查看电影
      movieList(movieId) {
        this.axios({
          method: 'GET',
          url: '/movieList',
          params: {
            movieId
          }
        }).then(result => {
          

          //电影数据
          let mData = result.data.result[0];
          mData.date = new Date(mData.date);
          for (let key in this.movieData.movie) {
            this.movieData.movie[key] = mData[key];
          }

          //封面
          result.data.result.forEach((v, i) => {
            
            if (v.mc_isremove == 0) {
              //判断封面是否存在
              let isHas = false;
              // 
                if (i == 0) {
                  // 
                  this.movieData.moveImages[0].url = v.coverImg;
                  this.movieData.moveImages[0].type = '';
                  this.movieData.moveImages[0].coverId = v.cover_id;
                  this.movieData.moveImages[0].isRemove = v.mc_isremove;
                } else {
                  //验证封面是否存在
                  for (let j = 0; j < this.movieData.moveImages.length; j++) {
                    if (this.movieData.moveImages[j].url == v.coverImg) {
                      isHas = true;
                      break;
                    }
                  }
                  if (!isHas) {
                    // 
                    this.movieData.moveImages.push({url: v.coverImg, type: '', coverId: v.cover_id, isRemove: v.mc_isremove});
                  }
                }

            } else {
              if (i == 0) {
                this.movieData.moveImages.pop();
              }
            }
            
          })

          if (this.movieData.moveImages.length == 0) {
            let v =  result.data.result[0];
            this.movieData.moveImages.push({url: '', type: ''});
          }


          //导演
          result.data.result.forEach((v, i) => {

            if (v.d_isremove == 0) {
              //判断导演是否存在
              let isHas = false;
              if (i == 0) {
                this.movieData.director[0].name = v.director;
                this.movieData.director[0].directorId = v.director_id;
                this.movieData.director[0].isRemove = v.d_isremove;
              } else {
                for (let j = 0; j < this.movieData.director.length; j++) {
                  if (this.movieData.director[j].name == v.director) {
                    isHas = true;
                    break;
                  }
                }
                if (!isHas) {
                  this.movieData.director.push({name: v.director, directorId: v.director_id, isRemove: v.d_isremove});
                }
              }
            } else {
              if (i == 0) {
                this.movieData.director.pop();
              }
            }
          })

          if (this.movieData.director.length == 0) {
            let v =  result.data.result[0];
            this.movieData.director.push({name: ''});
          }

          //演员
          result.data.result.forEach((v, i) => {

            if (v.p_isremove == 0) {
              //判断导演是否存在
              let isHas = false;
              if (i == 0) {
                this.movieData.performer[0].name = v.performerName;
                this.movieData.performer[0].url = v.perfermerImg;
                this.movieData.performer[0].role = v.role == 1;
                this.movieData.performer[0].type = '';
                this.movieData.performer[0].performerId = v.performer_id;
                this.movieData.performer[0].isRemove = v.p_isremove;
              } else {
                //验证封面是否存在
                for (let j = 0; j < this.movieData.performer.length; j++) {
                  if (this.movieData.performer[j].name == v.performerName) {
                    isHas = true;
                    break;
                  }
                }
                if (!isHas) {
                  this.movieData.performer.push({
                    name: v.performerName,
                    url: v.perfermerImg,
                    role: v.role == 1,
                    type: '',
                    performerId: v.performer_id,
                    isRemove: v.p_isremove
                  });
                }
              }
            } else {
              if (i == 0) {
                this.movieData.performer.pop();
              }
            }
          })

          if (this.movieData.performer.length == 0) {
            let v =  result.data.result[0];
            this.movieData.performer.push({url: '', type: ''});
          }

        }).catch(err => {
          
        })
      },

      //删除封面
      removeCover (id, index, item) {

        if (id == undefined || (id && item.type == '')) {
          this.movieData.moveImages.splice(index, 1);
          
          return;
        }

        this.axios({
          method: 'POST',
          url: '/removeCover',
          data: {
            id
          }
        }).then(result => {
          
          this.movieData.moveImages.splice(index, 1);
        }).catch(err => {
          
        })
      },

      //删除导演
      removeDirector (id, index) {

        

        if (id === undefined) {
          this.movieData.director.splice(index, 1);
          
          return;
        }


        this.axios({
          method: 'POST',
          url: '/removeDirector',
          data: {
            id
          }
        }).then(result => {
          
          this.movieData.director.splice(index, 1);
        }).catch(err => {
          
        })
      },


      //删除演员
      removePerformer(id, index, item) {
        this.axios({
          method: 'POST',
          url: '/removePerformer',
          data: {
            id
          }
        }).then(result => {
          
          this.movieData.performer.splice(index, 1);
        }).catch(err => {
          
        })
      }

    },

    //局部注册组件
    components: {
      KamoUpload,
    }
  }
</script>

<style lang="less" scoped>
  .release{
    background-color: #fff;
    margin-top: 60px;
    padding-top: 20px;
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    width: 100%;
    .kamo-img{
      width: 100%;
      display: block;
      position: relative;
      z-index: 2;
    }
    .zhuyan{
      margin-left: 20px;
    }
    .form-box{
      background-color: #fff;
    }
    .add-box{
      width: 178px;
    }
    .delete{
      width: 24px;
      height: 24px;
      border-radius: 50%;
      margin-top: 8px;
      margin-left: 20px;
      font-size: 24px;
      color: #FF4E70;
    }
    .release-delete{
      margin-left: 0;
      margin-top: 77px;
    }

    .mb0{
      margin-bottom: 0;
    }

    .add{
      display: block;
      margin: 10px auto 22px auto;
      color: #6a6a6a;
    }

    .avatar {
      width: 178px;
      height: 178px;
      display: block;
    }
  }
</style>