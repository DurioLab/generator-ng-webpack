"use strict";
let baseConfig =  require('./base');
let setting = require('./setting');
let webpack = require('webpack');


let testConfig = Object.assign({}, baseConfig, {

    //需要设置为空, 不然会重复打包
    entry: {},
    output: {},

    //生成内联sourcemap
    devtool: 'inline-source-map',

    module:{
        preLoaders: [ //测试代码覆盖率统计
            {
                test: /\.(js|jsx)$/,
                loader: 'isparta-instrumenter-loader',
                include: [
                    setting.srcPath
                ]
            }
        ],
        loaders: [ //除了js文件, 其它所有文件均不解析
            {
                test: /\.(png|jpg|gif|woff|woff2|css|sass|scss|less|styl|html)$/,
                loader: 'null-loader'
            },
            {
                test: /\.js$/,
                loader: 'ng-annotate!babel',
                include: [
                    setting.rootPath + '/src',
                    setting.rootPath + '/test'
                ]
            }
        ]
    },

    plugins: [
        //new ngAnnotatePlugin(),
        new webpack.ResolverPlugin(
            new webpack.ResolverPlugin.DirectoryDescriptionFilePlugin("bower.json", ["main"])
        )
    ]

});

module.exports = testConfig;