var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

// 这是express自带的路径   此处又自己重新定义一个
var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.all('*', function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
 
  res.header("Access-Control-Allow-Methods", "PUT,POST,GET,DELETE,OPTIONS");
  
  res.header("X-Powered-By", ' 3.2.1')
  // res.setDateHeader("Date",new Date())
  res.header("Content-Type", "application/json;charset=utf-8");
  next();   // 这是回调函数
});

// 这是脚手架默认的路径 对应上面给注释了
// app.use('/', indexRouter);
// app.use('/users', usersRouter);

//  做登录的的文件
var apilist = require("./api/api.js");
app.use("/api/init",apilist);

// 将图表的数据提出来
var productlinemonitorlist = require("./api/productlinemonitor.js");
app.use("/api/productlinemonitor",productlinemonitorlist);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
