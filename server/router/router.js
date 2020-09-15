//路由层

//导入路由控制器层
let routerController = require(__basename + '/routerController/routerController.js');

module.exports = app => {

  //白名单验证
  app.use(routerController.validWhiteListController);

  //token验证
  app.use(routerController.verifyTokenController);

  //发邮件
  app.post('/sendMail', routerController.sendMailController);

  //注册
  app.post('/register', routerController.registerController);

  //登录
  app.post('/login', routerController.loginController);

  //查询商家信息
  app.get('/business', routerController.findBusinessController);

  //上传图片
  app.post('/upload', routerController.uploadController);

  //发布电影
  app.post('/releaseMovie', routerController.releaseMovieController);

  //获取电影列表数据
  app.get('/movie', routerController.movieController);

  //查看电影数据
  app.get('/movieList', routerController.movieListController);

  //删除电影封面
  app.post('/removeCover', routerController.removeCover);

  //删除导演
  app.post('/removeDirector', routerController.removeDirector);

  //删除演员
  app.post('/removePerformer', routerController.removePerformer);

  //上下架
  app.post('/movieStatus', routerController.movieStatus);

  //删除电影
  app.post('/removeMovie', routerController.removeMovie);

  //搜索电影
  app.get('/search', routerController.search);

  //上传商家个人头像
  app.post('/uploadBusinessAvatar', routerController.uploadBusinessAvatar);

  //分页获取电影列表数据和总数量
  app.get('/movieListLimit', routerController.movieListLimit);

  //分页获取电影列表数据
  app.get('/movieLimit', routerController.movieLimit);

}