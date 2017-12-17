const http = require('http');
var util = require('util');
const express = require('express');
var moment = require('moment');

//CORS统一设置
var allowCrossDomain = function(req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
    res.header('Access-Control-Allow-Headers', 'Content-Type');
    res.header('Access-Control-Allow-Credentials','true');
    next();
};

const index = require('./routes/index');
const app = express();

app.use(allowCrossDomain);
// catch 404 and forward to error handler
app.use(function (req, res, next) {
    // const err = new Error('Not Found');
    // err.status = 404;
    next(err);
});

// error handler
// app.use(function (err, req, res, next) {
//     // set locals, only providing error in development
//     res.locals.message = err.message;
//     res.locals.error = req.app.get('env') === 'development' ? err : {};
//
//     // render the error page
//     res.status(err.status || 500);
//     res.render('error');
// });

app.use(function (err, req, res, next) {
    const url = req.originalUrl;
    const timestamp=moment().format("YYYY-MM-DD HH:mm:ss");
    console.log(`[${timestamp}] ${req.method} ${url}`);
    next();
});

/* ============================================= */
//这一句一定要放到这里来，否则前端的app.use都不会实现
/* ============================================= */

app.use('/', index);
const server = http.createServer(app).listen(3003);
server.on('listening', function () {
    var host = server.address().address;
    var port = server.address().port;
    console.log("应用实例，访问地址为 http://%s:%s", host, port)
})
