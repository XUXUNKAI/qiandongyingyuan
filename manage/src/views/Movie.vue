<template>
  <div class="movie">
    <div class="movie-title">
      <el-row>
        <el-col :span="21">
          <el-form :model="formInfo" ref="form" label-width="80px">
            <el-row :gutter="10">
              <el-col :span="8">
                <el-form-item class="f-item" label="电影名称">
                  <el-input v-model="formInfo.name"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item class="f-item" label="电影状态">
                  <el-select v-model="formInfo.status" placeholder="选择商品状态">
                      <el-option label="上架" value="上架"></el-option>
                      <el-option label="下架" value="下架"></el-option>
                    </el-select>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item class="f-item" label="上映日期">
                  <el-date-picker type="date" placeholder="选择日期" v-model="formInfo.date" style="width: 100%;"></el-date-picker>
                </el-form-item>
              </el-col>
            </el-row>
          </el-form>
        </el-col>
        <el-col :span="3" class="btn-col">
          <el-button class="btn" type="danger" @click="search(0)">搜索</el-button>
        </el-col>
      </el-row>
    </div>
    <div class="post">
      <el-button type="danger" @click="goPage">发布电影</el-button>
    </div>
    
    <el-table class="table-box" border :data="tableData">
      <el-table-column prop="num" label="序号" width="50" align="center"></el-table-column>
      <el-table-column prop="name" label="电影名称" align="center"></el-table-column>
      <el-table-column prop="status" label="状态" width="60" align="center"></el-table-column>
      <el-table-column prop="date" label="上映日期" width="100" align="center"></el-table-column>
      <el-table-column prop="createdAt" label="创建时间" align="center"></el-table-column>
      <el-table-column prop="updatedAt" label="更新时间" align="center"></el-table-column>
      
      <el-table-column label="操作" width="300" align="center" fixed="right">
        <template slot-scope="scope">
          <el-button type="success" size="mini" @click="viewMovie(scope.row.movieId, 1)">查看</el-button>
          <el-button type="primary" size="mini" @click="viewMovie(scope.row.movieId, 2)">编辑</el-button>
          <el-button type="danger" size="mini" @click="removeMovie(scope.row.movieId, scope.$index)">删除</el-button>
          <el-button type="info" size="mini" v-if="scope.row.status == '上架'" @click="movieStatus(scope.row, 0)">下架</el-button>
          <el-button v-else type="warning" size="mini" @click="movieStatus(scope.row, 1)">上架</el-button>
        </template>
      </el-table-column>
    </el-table>

    <div class="p1">
      <el-pagination class="el-page" prev-text="上一页"  next-text="下一页" layout="prev, pager, next" :page-size="pageNum" :total="total" @current-change="currentChange" :current-page="page"></el-pagination>
    </div>

  </div>
</template>

<script>
  import {tool} from '../tool/tool'
  export default {
    name: 'Movie',
    data() {
      return {
        formInfo: {
          status: '',
          name: '',
          date: ''
        },

        tableData: [
          
        ],

        //总数据量
        total: 0,

        //每页展示数据量
        pageNum: 2,

        //当前页码
        page: 1
      };
    },

    created() {
      //查询电影列表
      this.search();
    },

    methods: {
      goPage() {
        this.$router.push({name: 'ReleaseMovie'});
      },

      //查看电影
      viewMovie(movieId, flag) {
        //flag: 1：查看，2：编辑
        this.$router.push({name: 'ReleaseMovie', query: {movieId, flag}});
      },

      //上下架
      movieStatus(item, status) {

        this.axios({
          method: 'POST',
          url: '/movieStatus',
          data: {
            movieId: item.movieId,
            status
          }
        }).then(result => {
          
          if (result.data.result[0] == 1) {
            item.status = status == 0 ? '下架' : '上架';
            
          }
        }).catch(err => {
          
        })
      },

      // 删除电影
      removeMovie(movieId, index) {
        this.axios({
          method: 'POST',
          url: '/removeMovie',
          data: {
            movieId
          }
        }).then(result => {
          


          if (result.data.code == 1130) {
            this.tableData.splice(index, 1);
            this.tableData.forEach((v, i) => {
              v.num = (i + 1);
            })
          }

          this.$message({
            message: result.data.msg,
            duration: 2000,
            type: result.data.code == 1130 ? 'success' : 'error'
          })
          
        }).catch(err => {
          
        })
      },

      //查询
      search(offset = 0) {
        

        //获取条件, 排除空条件
        let condition = {};
        for (let key in this.formInfo) {
          if (this.formInfo[key] == '' || this.formInfo[key] == null) {
            continue;
          }

          let value = this.formInfo[key];

          if (key == 'date' ) {
            //如果key是日期
            value = tool.formatDate(this.formInfo[key], 'yyyy-MM-dd');
          }
          condition[key] = value;
        }

        condition.offset = offset;
        condition.limit = this.pageNum;

        //排序字段
        condition.orderKey = 'date';

        

        this.axios({
          method: 'GET',
          url: '/search',
          params: condition
        }).then(result => {
          

          this.page = 1;

          //数量总数
          this.total = result.data.result.count;

          this.movieDate(result.data.result.rows);

        }).catch(err => {
          
        })


      },

      //处理电影日期
      movieDate(data) {
        let date  = ['date', 'createdAt', 'updatedAt'];
          data.forEach((v, i) => {
            v.num = i + 1;
           for (let key in v) {
             if (date.indexOf(key) > -1) {
               if (key == 'date') {
                 v[key] = tool.formatDate(new Date(v[key]), 'yyyy-MM-dd');
               } else {
                 v[key] = tool.formatDate(new Date(v[key]), 'yyyy-MM-dd hh:mm:ss');
               }
             }
           }
          })

          this.tableData = data;
      },

      //按页码查询电影数据
      getMovieListByPage(page) {

        //获取条件, 排除空条件
        let condition = {};
        for (let key in this.formInfo) {
          if (this.formInfo[key] == '' || this.formInfo[key] == null) {
            continue;
          }

          let value = this.formInfo[key];

          if (key == 'date' ) {
            //如果key是日期
            value = tool.formatDate(this.formInfo[key], 'yyyy-MM-dd');
          }
          condition[key] = value;
        }

        condition.offset = (page - 1) * this.pageNum;
        condition.limit = this.pageNum;

        condition.orderKey = 'date';

        

        this.axios({
          method: 'GET',
          url: '/movieLimit',
          params: condition
        }).then(result => {

          

          this.movieDate(result.data.result);

        }).catch(err => {
          
        })
      },

      //切换页码
      currentChange(e) {
        //e: 页码
        // 

        this.page = e;

        // 

        this.getMovieListByPage(e);
      }

    }
  }
</script>

<style lang="less" scoped>
  .movie{
    margin-top: 60px;
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    width: 100%;
    .p1{
      margin: 20px 0;
      text-align: center;
    }
    .el-page{
      font-weight: normal;
    }
    .table-box{
      width: 100%;
      margin-top: 20px;
    }
    .post{
      margin-top: 20px;
    }
    .btn-col{
      text-align: center;
    }
    .btn{
      background-color: #FF4971;
      border-color: #FF4971;
    }
    .f-item{
      margin-bottom: 0;
    }
    .movie-title{
      height: 40px;
      padding: 10px 0;
      background-color: #fff;
      margin-top: 20px;
    }
  }
</style>