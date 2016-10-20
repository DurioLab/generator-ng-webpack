let gulp = require('gulp');
let gutil = require("gulp-util");
let webpack = require("webpack");
let WebpackDevServer = require("webpack-dev-server");
let webpackConfig = require('./webpack.config');
let setting = require('./config/setting');
let open = require('open');
let karmaServer = require('karma').Server;
let port = setting.port;

gulp.task('copy', function () {
    gulp.src(['./src/index.html','./src/favicon.ico','./src/robots.txt','./src/404.html'])
    .pipe(gulp.dest('./dist'));
});


gulp.task('serve', function() {
    new WebpackDevServer(webpack(webpackConfig), setting.devServer).listen(port, "localhost", function(err) {
        if(err) throw new gutil.PluginError("webpack-dev-server", err);

        // Server listening
        console.log('Listening at localhost:' + port);
        console.log('Opening your system browser...');

        //打开默认浏览器 iframe mode
        //open('http://localhost:' + port + '/webpack-dev-server/');

        //inline mode
        open('http://localhost:' + port);
    });
});

gulp.task('build', ['copy'] ,function () {
    webpack(webpackConfig, function(err, stats) {
        if(err) throw new gutil.PluginError("webpack", err);
        gutil.log("[webpack]", stats.toString({
            // output options
        }));
    });
});


gulp.task('test', function () {
    new karmaServer({
        configFile: __dirname + '/karma.conf.js',
        singleRun: false
    }, function () {}).start();
});

