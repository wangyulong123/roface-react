process.env.NODE_ENV = 'development';
var webpack = require('webpack');
// var path = require('path');
var config = require('../config/webpack.dev.config.js');
var defaultConfig = require('../config/default.config');
var host = defaultConfig.host;
var port = defaultConfig.port;
var protocol = defaultConfig.protocol;

var WebpackDevServer = require('webpack-dev-server');
var formatWebpackMessages = require('react-dev-utils/formatWebpackMessages');

config.entry.app.unshift(`webpack-dev-server/client?${protocol}://${host}:${port}/`);

var compiler = webpack(config);

compiler.plugin('invalid', function() {
    console.log('Compiling...');
});

compiler.plugin('done', function(stats) {
    var messages = formatWebpackMessages(stats.toJson({}, true));
    if (!messages.errors.length && !messages.warnings.length) {
        console.log('Compiled successfully!');
    }
    if (messages.errors.length) {
        console.log('Failed to compile.');
        return;
    }
    if (messages.warnings.length) {
        console.log('Compiled with warnings.');
        console.log('You may use special comments to disable some warnings.');
    }
});

var devServer = new WebpackDevServer(compiler, {
    historyApiFallback: true, // 所有的跳转都指向index.html
    stats: { colors: true },
    proxy: {
      '/api': {
        target: 'http://192.168.64.246:8080',
        changeOrigin: true,
        pathRewrite: {
          // '^/api': '/ICEManage'
          '^/api': '/'
        }
      }
    },
});

devServer.listen(port);