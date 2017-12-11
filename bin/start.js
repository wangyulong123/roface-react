var webpack = require('webpack');
// var path = require('path');
var config = require('../config/webpack.dev.config.js');
var host = 'localhost';
var port = 3004;
var protocol = 'http';

var WebpackDevServer = require('webpack-dev-server');
var openBrowser = require('react-dev-utils/openBrowser');
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
    stats: { colors: true },
});

devServer.listen(port);