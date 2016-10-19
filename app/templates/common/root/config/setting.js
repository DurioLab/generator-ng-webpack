"use strict";

let path = require('path');


let rootPath = path.join(__dirname + '/..'),
    publicPath = '/assets/',
    srcPath = rootPath + '/src',
    port = 8000;

module.exports = {
    rootPath:rootPath,
    srcPath:srcPath,
    publicPath:publicPath,
    port: port,
    devServer: {
        contentBase: srcPath,
        historyApiFallback: true,
        hot: true,
        port: port,
        publicPath: publicPath,
        noInfo: false,
        stats: { colors: true }
    }
};

