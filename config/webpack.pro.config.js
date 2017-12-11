var path = require('path');
var HtmlWebpackPlugin = require('html-webpack-plugin');
var ExtractTextPlugin = require('extract-text-webpack-plugin');

module.exports = {
    devtool: 'inline-source-map',
    entry: path.resolve(__dirname, '../src/index'),
    output: {
        path: path.resolve(__dirname, '../static'),
        filename: "bundle.js"
    },
    plugins: [
        new HtmlWebpackPlugin({
            inject: true,
            template: path.resolve(__dirname, '../public/index.html')
        }),
        new ExtractTextPlugin('style.css')
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
                    fallback: "style-loader", use: "css-loader"
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