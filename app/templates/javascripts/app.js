'use strict';

//全局配置 能够根据构建环境,加载不同的配置 [ dev,  dist,  test ]
import config from 'config';

//样式
requireAll(require.context('.',true,/\.(scss|css)$/));


require('jquery');
require('angular');
require('angular-ui-router');



//模块
requireAll(require.context('./modules',true,/\.js$/))

//应用
let appModule = angular.module(config.moduleName,['ui.router']);

window.__APP = {
    _ng:window.angular,
    _am:appModule
};

//配置
require('./app.router')();
require('./app.run')();



//页面
runModule(requireAll(require.context("./pages", true, /\.js$/)));

//组件
runModule(requireAll(require.context("./widgets", true, /\.js$/)));


function requireAll(requireContext) {
    return requireContext.keys().map(requireContext);
}
function runModule(modules){
    modules.map(function (func) {
        typeof func == 'function' && func();
    });
}



