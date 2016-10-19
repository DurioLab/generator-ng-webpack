// Karma configuration
// Generated on Sun Oct 16 2016 20:35:34 GMT+0800 (CST)
let webpackConfig = require('./webpack.config');

module.exports = function(config) {
  config.set({

    // base path that will be used to resolve all patterns (eg. files, exclude)
    basePath: './',


    //使用jasmine框架
    frameworks: ['jasmine'],


    //排除在外的文件列表
    exclude: [],


    //测试浏览器需要加载的文件列表 包括CDN远程文件\源文件\测试文件
    files: [
        'http://cdn.bootcss.com/jquery/3.1.1/jquery.min.js',
        'test/unit/loadtests.js'
    ],


    //预处理文件
    preprocessors: {
      'test/unit/loadtests.js': ['webpack','sourcemap']
    },

    //webpack配置
    webpack:webpackConfig,

    //webpackMiddleware: {
    //  // webpack-dev-middleware configuration
    //  // i.e.
    //  noInfo: true,
    //  // and use stats to turn off verbose output
    //  stats: {
    //    // options i.e.
    //    chunks: false
    //  }
    //},

    plugins: [
        require("karma-webpack"),
        require("karma-sourcemap-loader"),
        require("karma-phantomjs-launcher"),
        require("karma-jasmine"),
        require("karma-coverage"),
        require("karma-chrome-launcher")
    ],


    // 测试结果报告
    // available reporters: https://npmjs.org/browse/keyword/karma-reporter
    reporters: ['progress','coverage'],


    //coverage配置
    coverageReporter: {
      type : 'html',
      dir : 'coverage/'
    },

    //测试服务器端口
    port: 9876,


    // 启用输出本文颜色
    colors: true,


    // 日志级别
    // possible values: config.LOG_DISABLE || config.LOG_ERROR || config.LOG_WARN || config.LOG_INFO || config.LOG_DEBUG
    logLevel: config.LOG_INFO,


    //监听文件改变
    //autoWatch: true,


    // 测试浏览器
    // available browser launchers: https://npmjs.org/browse/keyword/karma-launcher
    browsers: ['PhantomJS'],

    // 持续集成模式
    // 如果设为true,运行之后退出, 否则,持续运行
    //singleRun: false,

    // 并行级别
    // how many browser should be started simultaneous
    concurrency: Infinity
  })
};

