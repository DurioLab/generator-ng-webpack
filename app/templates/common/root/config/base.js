"use strict";
/**
 * 通用配置
 */
let webpack = require('webpack');
let path = require('path');
let setting = require('./setting');


module.exports = {

    entry:{
        app:setting.srcPath + '/app.js'
    },

    output: {
        path: setting.rootPath + '/dist/assets',
        filename: 'bundle.js',
        publicPath: setting.publicPath
    },

    devtool: 'source-map',


    resolve: {
        extensions: ['', '.js'],
        modulesDirectories: ["node_modules", "bower_components"], //模块搜索路径
        noParse:[], //如果你确定一个模块中没有其它新的依赖 就可以配置这项
        alias: { //使用别名,做重定向 把用户的一个请求重定向到另一个路径
            modules:setting.srcPath + '/modules/',
            pages: setting.srcPath + '/pages/',
            widgets: setting.srcPath + '/widgets/',
            config: setting.srcPath + '/config/' + process.env.ANGULAR_ENV
        }
    },

    externals: {
        jquery: "jQuery"
    },

    colors:true,

    //模块配置
    module: {
        //preLoaders: [
        //    {
        //        test: /\.js$/,
        //        include: setting.srcPath,
        //        loader: 'eslint'
        //    }
        //],
        loaders: [

            //css处理  css-loader style-loader sass-loader less-loader postcss-loader
            {
                test: /\.css$/,
                loader: 'style!css' // ! 分离作用
            },
            {
                test: /\.scss/,
                loader: 'style!css!sass?outputStyle=expanded'
            },

            //js处理 babel-core babel-preset-es2015 babel-loader jsx-loader
            {
                test:/\.js$/,
                loader: "ng-annotate!babel",
                exclude: /node_modules/
            },

            //图片处理 url-loader
            {
                test: /\.(jpg|png)$/,
                loader: "url?limit=8192" // ?Query String作用
            },

            //文件处理  file-loader
            {
                test: /\.(png|jpg|jpeg|gif|svg|woff|woff2|ttf|eot)$/,
                loader: 'file'
            },

            //json处理  json-loader
            {
                test: /\.json$/,
                loader: 'json'
            },

            //html处理  raw-loader
            {
                test: /\.html$/,
                loader: 'raw'
            }

        ]
    }

};







