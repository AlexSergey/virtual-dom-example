const fs          = require('fs');
const path        = require('path');
const webpack     = require('webpack');
const HtmlWebpackPlugin  = require('html-webpack-plugin');

const NODE_ENV    = process.env.NODE_ENV;
const isDev       = NODE_ENV === 'development';
const isTest      = NODE_ENV === 'test';
var minimize = process.argv.indexOf('--minimize') !== -1

var webpackConfig = {
    devtool: minimize ? null : 'source-map',
    entry  : path.resolve(__dirname, 'src/app.js'),
    output: {
        path: './dist',
        filename: '[name].js'
    },
    module: {
        loaders: [
            {
                test: /\.html$/,
                loader: 'file?name=[name].[ext]'
            },
            {
                test: /\.(js|jsx)$/,
                loader: 'babel',
                exclude: /node_modules/,
            },
        ]
    },
    cache: true,
    profile: true,
    stats: {
        hash    : true,
        version : true,
        timings : true,
        assets  : true,
        chunks  : true,
        modules : true,
        reasons : true,
        children: true,
        source  : false,
        errors  : true,
        errorDetails: true,
        warnings    : true,
        publicPath  : true
    },
    devServer: {
        port  : 3000,
        hot   : true,
        noInfo: true,
        quiet : false,
        lazy  : false,
        historyApiFallback: true
    },
    plugins: [
        new webpack.DefinePlugin({
            'process.env': { NODE_ENV: JSON.stringify(NODE_ENV || 'development') }
        }),

        new HtmlWebpackPlugin({
            title: 'Virtual DOM',
            template: 'index.ejs'
        }),
    ],
};
if (minimize) {
    webpackConfig.plugins.unshift(new webpack.optimize.UglifyJsPlugin());
}

module.exports = webpackConfig;