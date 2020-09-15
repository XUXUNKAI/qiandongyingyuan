let express = require('express');

let ejs = require('ejs');

let path = require('path');

let app = express();

//设置静态目录
app.use(express.static(__dirname + '/public'));

//设置模板引擎
app.set('views', path.resolve(__dirname, 'views'))

app.set('view engine', 'html');

app.engine('.html', ejs.__express);

app.get('/', (req, res) => {
  //渲染模板
  res.render('index');
})

app.listen(10000, () => {
  console.log('服务器运行于http://182.92.95.116:10000');
})