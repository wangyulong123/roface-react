var path = require('path');
var HtmlWebpackPlugin = require('html-webpack-plugin');
var OpenBrowserPlugin = require('open-browser-webpack-plugin');
var ExtractTextPlugin = require('extract-text-webpack-plugin');

var defaultConfig = require('./default.config');

module.exports = {
    devtool: 'cheap-module-eval-source-map',
    entry: {
        app: [require.resolve('babel-polyfill'), path.resolve(__dirname, '../src/index')]
    },
    output: {
        path: path.resolve(__dirname, '../static'),
        filename: "bundle.js"
    },
    plugins: [
        new HtmlWebpackPlugin({
            inject: true,
            template: path.resolve(__dirname, '../public/index.html')
        }),
        new OpenBrowserPlugin({ url: `${defaultConfig.protocol}://${defaultConfig.host}:${defaultConfig.port}` }),
        new ExtractTextPlugin('style.css')
    ],
    module: {
        loaders: [
            {
                test: /\.(js|tsx|jsx)$/,
                loader: 'babel-loader'
            },
            {
                test: /\.(js|tsx|jsx)$/,
                loader: "eslint-loader"
            },
            {
                test: /\.css$/,
                loader: ExtractTextPlugin.extract({
                    fallback: "style-loader",
                    use: [
                      { loader: "css-loader", options: { importLoaders: 0 }},
                      { loader: "postcss-loader", options: { plugins: () => [ require('autoprefixer') ]}}
                     ]
                })
            },
            {
                test: /\.less$/,
                loader: ExtractTextPlugin.extract({
                    fallback: 'style-loader',
                    use: ['css-loader', 'less-loader']
                })
            }
        ]
    }
}