//模型

//导入Business模型
let Business = require(__basename + '/db/model/business.js');

//导入Code模型
let Code = require(__basename + '/db/model/code.js');

//导入Movie模型
let Movie = require(__basename + '/db/model/movie.js');

//导入MovieCover模型
let MovieCover = require(__basename + '/db/model/movieCover.js');

//导入Director模型
let Director = require(__basename + '/db/model/director.js');

//导入Performer模型
let Performer = require(__basename + '/db/model/performer.js');

//导出
module.exports = {
  Business,
  Code,
  Movie,
  MovieCover,
  Director,
  Performer
}