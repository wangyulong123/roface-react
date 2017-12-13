var webpack = require('webpack');
var path = require('path');
var HtmlWebpackPlugin = require('html-webpack-plugin');
var ExtractTextPlugin = require('extract-text-webpack-plugin');

module.exports = {
    devtool: 'cheap-module-source-map',
    entry: [require.resolve('babel-polyfill'), path.resolve(__dirname, '../src/index')],
    output: {
        path: path.resolve(__dirname, '../static'),
        filename: "bundle.js"
    },
    plugins: [
        new HtmlWebpackPlugin({
            inject: true,
            template: path.resolve(__dirname, '../public/index.html')
        }),
        new ExtractTextPlugin('style.css'),
        new webpack.optimize.UglifyJsPlugin({
          // 使用webpack自带的文件压缩插件
          compress: {
            // 去除console.log
            drop_console: true
          },
          // 如果启用了压缩无法生成map文件，需要在此处开启
          sourceMap: true,
        })
    ],
    module: {
        loaders: [
            {
                test: /\.(js|tsx|jsx)$/,
                loader: 'babel-loader'
            },
            {
                test: /\.css$/,
                loader: ExtractTextPlugin.extract({
                    fallback: "style-loader", use: [{
                        loader: "css-loader",
                        options:{
                          minimize: true //css压缩
                        }
                    }, { loader: "postcss-loader", options: { plugins: () => [ require('autoprefixer') ]}}]
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