//路由控制器层

//导入sequelize
let Sequelize = require('sequelize');

//sequelize操作符
let Op = Sequelize.Op;

//导入白名单
let list = require(__basename + '/list/list.js');

//导入API(服务层)
let api = require(__basename + '/api/api.js');

//导入工具库
let tool = require(__basename + '/tool/tool.js');


class RouterController {

  constructor() {}

  //验证白名单
  validWhiteListController(req, res, next) {
    if (list.hostWhiteList.indexOf(req.headers.origin) > -1) {
      //白名单验证通过
      next();
    } else {
      res.send({
        msg: '请求路径不合法',
        code: 0
      });
    }
  }

  //token验证
  verifyTokenController(req, res, next) {

    let url = req.url.split('?')[0];

    //判断需要token的请求路径
    if (list.tokenWhiteList.indexOf(url) === -1) {
      //不需要验证
      return next();
    }

    // 

    if (req.headers.cookie == undefined) {
      return res.send({msg: '请先登录', code: 1041});
    }

    //获取token
    let token = tool.transformCookie(req.headers.cookie).MOKATK;

    if (token == undefined) {
      res.send({msg: '请先登录', code: 1041});
    } else {

      //如果存在token, 需要验证token是否合法
      tool.verifyToken({
        token,
        salt: config.saltOptions.tokenSalt,
        success: (err, decode) => {
          //如果token验证失败
          if (err) {
            res.send({msg: '请先登录', code: 1041});
          } else {
            //如果验证通过
            // 

            //传递userId, 方便后面查询
            req.userId = decode.data;

            next();
          }
        }
      })

    }

  }

  //发邮件
  sendMailController(req, res) {
    // 

    //获取随机生成验证码
    let code = tool.validCode();
    

    //存储验证码
    api.createData('Code', {
      email: req.body.email,
      code
    }).then(() => {

      console.log('code ==> ', code);

      //测试不发邮件
      return res.send({
        msg: '测试不发邮件',
        code
      });

      //发邮件
      tool.sendMail({
        //发邮件地址
        from: config.emailOptions.user,

        //接受邮件地址
        to: req.body.email,

        //主题
        subject: '咔摩-验证码',

        //文本内容
        text: `验证码为：${code}，5分钟内有效`

      }, (err, data) => {
        if (err) {
          //如果发送失败
          res.send({
            msg: '发送验证码失败',
            code: 1011
          });
        } else {
          

          res.send({
            msg: '发送验证码成功',
            code: 1010
          });

        }
      })

    }).catch(() => {
      res.send({
        msg: '发送验证码失败',
        code: 1011
      });
    })

  }

  //注册
  registerController(req, res) {

    //截取post请求参数
    // 

    let userId = config.userOptions.before + new Date().getTime();

    //加密密码
    let password = tool.encodeString(req.body.password, config.saltOptions.passwordSalt);

    // 

    //获取当前时间
    let currentDate = new Date();

    let time = currentDate.getTime() - 5 * 60 * 1000;

    currentDate = new Date(time).toLocaleString();
    // 


    //验证验证码是否在5分钟内有效
    //删除过期的验证码
    api.destroyData('Code', {
      createdAt: {
        [Op.lt]: currentDate
      }
    })

    //查询验证码是否过期
    api.findData('Code', {
      email: req.body.email,
      createdAt: {
        [Op.gte]: currentDate
      }
    }).then(result => {
      // 
      if (result.length == 0) {
        res.send({
          msg: '验证码已过期',
          code: 1022
        });
      } else {
        if (result[0].dataValues.code == req.body.code) {
          //执行注册逻辑

          //验证当前邮箱是否被注册过
          api.findData('Business', {
            email: req.body.email
          }).then(result => {


            //该邮箱未被注册
            if (result.length == 0) {

              //注册新用户
              api.createData('Business', {
                userId,
                email: req.body.email,
                nickname: req.body.nickname,
                password
              }).then(result => {
                res.send({
                  msg: '注册成功',
                  code: 1000
                });
              }).catch(err => {
                res.send({
                  msg: '注册失败',
                  code: 1001
                });
              })

            } else {

              //该邮箱已被注册
              res.send({
                msg: '邮箱已被注册',
                code: 1003
              });

            }

          }).catch(err => {
            res.send({
              msg: '无法查询数据',
              code: 0
            })
          })

        } else {
          res.send({
            msg: '验证码错误',
            code: 1023
          });
        }
      }

    }).catch(() => {
      res.send({
        msg: '验证码验证失败',
        code: 1021
      })
    })

  }

  //登录
  loginController(req, res) {

    //查询用户
    api.findData('Business', {
      email: req.body.email
    }, ['userId', 'password']).then(result => {
      // 

      //如果用户不存在
      if (result.length == 0) {
        res.send({msg: '用户不存在', code: 1032})
      } else {
        //如果用户存在，则匹配密码
        //加密密码
        let password = tool.encodeString(req.body.password, config.saltOptions.passwordSalt);

        if (password === result[0].dataValues.password) {

          //前端使用一个正确的邮箱和密码跟服务器换取一个合法的token
          tool.createToken({

            //生成token字符串
            value: result[0].dataValues.userId,

            //token加盐
            salt: config.saltOptions.tokenSalt,

            //过期时间
            expires: config.expiresOptions.tokenExpires,

            //回调函数
            success: (err, token) => {
              // 
              if (err) {
                res.send({msg: '登陆失败', code: 1031});
              } else {
                res.send({msg: '登录成功', code: 1030, token});
              }
            }
          })

        } else {

          res.send({msg: '邮箱或者密码不正确', code: 1033});

        }
      }
 
    }).catch(() => {
      res.send({msg: '登陆失败', code: 1031});
    })

  }

  //查询商家信息
  findBusinessController(req, res) {
    api.findData('Business', {
      userId: req.userId
    }, ['nickname', 'avatar']).then(result => {
      res.send({msg: '查询用户信息成功', code: 1050, result});
    }).catch(() => {
      res.send({msg: '查询用户信息失败', code: 1051});
    })
  }

  //上传图片
  uploadController(req, res) {

  
   
  }

  //发布电影
  releaseMovieController(req, res) {

    //电影id
    let movieId = '';
    if (req.body.flag != 2) {
      movieId = 'movie_kamo' + new Date().getTime();
    }
    

    //记录所有pomise
    let uploadPromise = [];

    for (let key in req.body) {
      req.body[key] = JSON.parse(req.body[key]);

      let id = '';
      if (key == 'moveImages') {
        id = 'coverId';
      } else if (key == 'director') {
        id = 'directorId';
      } else if (key == 'performer') {
        id = 'performerId';
      }

        if (key == 'movie' || key == 'flag') {
          continue;
        }
        req.body[key].forEach((value, i) => {
          if (req.body.flag != 2) {
            value[id] = '_id' + Math.random().toString().slice(2) + i;
            value.movieId = movieId;
          }

          if (key == 'moveImages' || key == 'performer') {
            //判断图片是否为base64
            let base64Reg = /^data:image\/[A-Za-z]+;base64,/;
            if (base64Reg.test(value.url)) {
              
              value.url = value.url.replace(base64Reg, '');
              //上传图片
              uploadPromise.push(tool.uploadFile(value));
            } else {
              delete value.type;
            }
          }

        })
    }

    //当所有图片都上传完成
    Promise.all(uploadPromise).then(() => {

      let promise = [];

      let o = {
        moveImages: {
          model: 'MovieCover'
        },
        director: {
          model: 'Director'
        },
        performer: {
          model: 'Performer'
        }
      };

      //开启事务处理
      if (req.body.flag == 2) {
        //编辑的

        let movieId = req.body.movie.movieId;

        delete req.body.movie.movieId;

        api.transaction(t => {

          //更新电影表
          return api.updateData('Movie', req.body.movie, {
            movieId
          }, t).then(() => {

            //更新封面表数据
            //更新导演表数据
            //更新演员表数据
            for (let key in o) {

              let idName = '';

              if (key == 'moveImages') {
                idName = 'coverId';
              } else if (key == 'director') {
                idName = 'directorId';
              } else if (key == 'performer') {
                idName = 'performerId';
              }

              req.body[key].forEach((v, i) => {
                let id = v[idName];
                delete v[idName];

                if (idName == 'performerId') {
                  v.role = v.role ? 1 : 2;
                }

                // 
                // 

                if (id === undefined) {

                  v[idName] = '_id' + Math.random().toString().slice(2) + i;
                  v.movieId = movieId;

                  //创建
                  promise.push(api.createData(o[key].model, v, t));
                } else {
                  //更新
                  promise.push(api.updateData(o[key].model, v, {
                    [idName]: id
                  },t));
                }

                
              })
            }


            //等待所有表操作完成后返回结果
            return Promise.all(promise);

          })

        }).then(() => {
          res.send({msg: '发布电影成功', code: 1070, result: req.body});
        }).catch((err) => {
          
          res.send({msg: '发布电影失败', code: 1071});
        })

      } else {

         //电影id
         req.body.movie.movieId = movieId;

         //关联userId
        req.body.movie.userId = req.userId;

        //创建的
        api.transaction(t => {

          //创建电影表数据
          return api.createData('Movie', req.body.movie, t).then(() => {
  
            //创建封面表数据
            //创建导演表数据
            //创建演员表数据
  
            for (let key in o) {
              req.body[key].forEach(v => {
                promise.push(api.createData(o[key].model, v, t));
              })
            }
  
            //等待所有表操作完成后返回结果
            return Promise.all(promise);
  
          })
        
  
        }).then(() => {
          res.send({msg: '发布电影成功', code: 1070});
        }).catch(() => {
          res.send({msg: '发布电影失败', code: 1071});
        })
      }
     

      
    }).catch((err) => {
      
      res.send({msg: '上传图片失败', code: 1061});
    })

  }

  //获取电影列表
  movieController(req, res) {
    //获取userId

    let userId = req.userId;
    
    api.findData('Movie', {
      userId
    }).then(result => {
      res.send({msg: '获取电影列表数据成功', code: 1080, result});
    }).catch(() => {

      res.send({msg: '获取电影列表数据失败', code: 1081});
    })
  }

  //查看电影列表
  movieListController(req, res) {
    //获取userId

    let userId = req.userId;
    let movieId = req.query.movieId;
    
    let sql = "SELECT `m`.`movie_id`, `m`.`name`, `m`.`enname`, `m`.`desc`, `m`.`type`, `m`.`duration`, `m`.`date`, `m`.`mode`, `m`.`status`, `m`.`created_at`, `m`.`updated_at`, `d`.`director_id`, `d`.`name` AS `director`, `d`.`is_remove` AS `d_isremove`, `mc`.`cover_id`, `mc`.`url` AS `coverImg`, `mc`.`is_remove` AS `mc_isremove`, `p`.`performer_id`, `p`.`url` AS `perfermerImg`, `p`.`name` AS `performerName`, `p`.`role`, `p`.`is_remove` AS `p_isremove` FROM `movie` AS `m` INNER JOIN `director` AS `d` ON `m`.`user_id` = :userId AND `m`.`movie_id` = :movieId AND `m`.`movie_id` = `d`.`movie_id` INNER JOIN `moviecover` AS `mc` ON `m`.`movie_id` = `mc`.`movie_id` INNER JOIN `performer` AS `p` ON `m`.`movie_id` = `p`.`movie_id`";

    api.query(sql, {userId, movieId}).then(result => {
      res.send({msg: '查询电影列表数据成功', code: 1080, result});
    }).catch((err) => {

      res.send({msg: '查询电影列表数据失败', code: 1081});
    })

  }

  //删除电影封面
  removeCover(req, res) {
    //电影封面的模型：MovieCover，coverId
    let defaultUrl = config.serverOptions.host + ':' + config.serverOptions.port;
    api.updateData('MovieCover', {
      url: defaultUrl + '/static/cover_default.jpg',
      isRemove: 1
    }, {
      coverId: req.body.id
    }).then(result => {
      res.send({msg: '删除电影封面成功', code: 1090, result});
    }).catch(err => {
      res.send({msg: '删除电影封面失败', code: 1091});
    })

  }

  //删除导演
  removeDirector(req, res) {
    //导演的模型：Director，directorId
    api.updateData('Director', {
      isRemove: 1
    }, {
      directorId: req.body.id
    }).then(result => {
      res.send({msg: '删除导演成功', code: 1100, result});
    }).catch(err => {
      res.send({msg: '删除导演失败', code: 1101});
    })
  }

  //删除演员
  removePerformer(req, res) {
    //演员的模型：Performer，performerId
    let defaultUrl = config.serverOptions.host + ':' + config.serverOptions.port;
    api.updateData('Performer', {
      url: defaultUrl + '/static/performer_default.jpg',
      isRemove: 1
    }, {
      performerId: req.body.id
    }).then(result => {
      res.send({msg: '删除演员成功', code: 1110, result});
    }).catch(err => {
      res.send({msg: '删除演员失败', code: 1111});
    })
  }

  //上下架
  movieStatus(req, res) {
    api.updateData('Movie', {
      status: req.body.status == 0 ? '下架' : '上架'
    }, {
      movieId: req.body.movieId,
      userId: req.userId
    }).then(result => {
      res.send({msg: '下架成功', code: 1120, result});
    }).catch(() => {
      res.send({msg: '下架失败', code: 1121});
    })
  }

  //删除电影
  removeMovie(req, res) {
    
    //删除演员、删除导演、删除封面、删除电影
    //开启事务处理
    api.transaction(t => {
      //t: 事务处理对象

      //删除演员
      return api.destroyData('Performer', {
        movieId: req.body.movieId
      }, t).then(() => {

        //删除导演
        return api.destroyData('Director', {
          movieId: req.body.movieId
        }, t).then(() => {

          //删除封面
          return api.destroyData('MovieCover', {
            movieId: req.body.movieId
          }, t).then(() => {

            //删除电影
            return api.destroyData('Movie', {
              movieId: req.body.movieId,
              userId: req.userId
            }).then(() => {

              res.send({msg: '删除电影成功', code: 1130});

            }).catch(err => {
              res.send({msg: '删除电影失败', code: 1131});
            })

          }).catch(err => {
            res.send({msg: '删除电影失败', code: 1131});
          })

        }).catch(err => {
          res.send({msg: '删除电影失败', code: 1131});
        })

      }).catch(err => {
        res.send({msg: '删除电影失败', code: 1131});
      })

    })

  }

  //搜索电影
  search(req, res) {

    let o = {};

    if (req.query.date) {
      o.date = req.query.date + ' 08:00:00';
    }

    if (req.query.name) {
      o.name = {
        [Op.like]: '%' + req.query.name + '%'
      }
    }

    if (req.query.status) {
      o.status = req.query.status;
    }

    o.userId = req.userId;

    

    api.findAndCountAllData(
      'Movie', 
      o, 
      null,
      Number(req.query.offset),
      Number(req.query.limit),
      req.query.orderKey
    ).then(result => {
      res.send({msg: '搜索电影成功', code: 1140, result});
    }).catch(err => {
      res.send({msg: '搜索电影失败', code: 1141});
    })
  }

  //上传商家个人头像
  uploadBusinessAvatar(req, res) {

    let o = {
      type: req.body.type,
      url: req.body.base64
    };

    //上传图片
    tool.uploadFile(o).then(() => {

      //更新用户的头像
      api.updateData('Business', {
        avatar: o.url
      }, {
        userId: req.userId
      }).then(result => {
        res.send({msg: '上传商家个人头像成功', code: 1150, result, url: o.url});
      }).catch(err => {
        res.send({msg: '上传商家个人头像失败', code: 1151});
      })

      
    }).catch(() => {
      res.send({msg: '上传商家个人头像失败', code: 1151});
    })

    
  }

  //分页获取电影数据和电影总数量
  movieListLimit(req, res) {
    api.findAndCountAllData(
      'Movie', 
      {
        userId: req.userId
      },
      null,
      Number(req.query.offset),
      Number(req.query.limit)
    ).then(result => {
      res.send({msg: '获取电影列表数据成功', code: 1080, result});
    }).catch(err => {
      res.send({msg: '获取电影列表数据失败', code: 1081});
    })
  }

  //分页获取电影数据
  movieLimit(req, res) {

    let o = {};

    if (req.query.date) {
      o.date = req.query.date + ' 08:00:00';
    }

    if (req.query.name) {
      o.name = {
        [Op.like]: '%' + req.query.name + '%'
      }
    }

    if (req.query.status) {
      o.status = req.query.status;
    }

    o.userId = req.userId;

    api.findDataLimit(
      'Movie', 
      o,
      null,
      Number(req.query.offset),
      Number(req.query.limit),
      req.query.orderKey
    ).then(result => {
      res.send({msg: '获取电影列表数据成功', code: 1080, result});
    }).catch(err => {
      res.send({msg: '获取电影列表数据失败', code: 1081});
    })
  }


}

//导出
module.exports = new RouterController();