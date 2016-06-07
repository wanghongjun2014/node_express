var http = require('http');
var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

var controllers = require('./controllers/controller');

var app = express();

//记录请求的信息
app.use(logger('dev'));

// 设置静态视图目录

app.set('views', path.join(__dirname, 'views'));

// 设置模板引擎

app.set('view engine', 'ejs');

// 设置静态资源目录

var options = {
  dotfiles: 'ignore',
  etag: true,
  extensions: ['htm', 'html'],
  index: false,
  maxAge: 10000,
  redirect: false,
  setHeaders: function (res, path, stat) {
    res.set('x-timestamp', Date.now());
  }
}


app.use(express.static(path.join(__dirname, 'public'),options));


//转化请求
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser('node-plafrom'));


controllers.forEach(function (item) {
  app.use(item.url,require('./routes/'+item.controller));
})

// 请求错误出处理
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});


var print = 8000;

app.listen(print,function () {
    console.log('node 监听http端口'+print);
});

module.exports = app;
