var fs = require('fs');
var path = require('path');
var generators = require('yeoman-generator');
var _ = require('lodash');
var exec = require('child_process').exec;


module.exports = generators.Base.extend({

    constructor: function () {

        generators.Base.apply(this, arguments);
        //this.argument('appname', { type: String, required: false });
        //this.haveNameArg = this.appname ? true : false;
        //this.appname = this.appname || path.basename(process.cwd());

        this.haveNameArg = false;
        this.appname = path.basename(process.cwd());
        this.scriptAppName = _.camelCase(this.appname);

    },

    writing: function () {

        let APP_FOLDER = '../../templates/common/app',
            ROOT_FOLDER = '../../templates/common/root',
            JS_FOLDER = '../../templates/javascripts',
            DEST_ROOT = this.haveNameArg ? this.scriptAppName : '.';


        this.fs.copyTpl(
            this.templatePath(ROOT_FOLDER + '/_package.json'),
            this.destinationPath(DEST_ROOT + '/package.json'),
            {
                name: this.scriptAppName
            }
        );
        this.fs.copyTpl(
            this.templatePath(ROOT_FOLDER + '/_bower.json'),
            this.destinationPath(DEST_ROOT + '/bower.json'),
            {
                name: this.scriptAppName.toLowerCase()
            }
        );

        this.fs.copy(this.templatePath(ROOT_FOLDER + '/test/**'), this.destinationPath(DEST_ROOT + '/test/'));
        this.fs.copy(this.templatePath(ROOT_FOLDER + '/config/**'), this.destinationPath(DEST_ROOT + '/config/'));
        this.fs.copy(this.templatePath(ROOT_FOLDER + '/gulpfile.js'), this.destinationPath(DEST_ROOT + '/gulpfile.js'));
        this.fs.copy(this.templatePath(ROOT_FOLDER + '/.babelrc'), this.destinationPath(DEST_ROOT + '/.babelrc'));
        this.fs.copy(this.templatePath(ROOT_FOLDER + '/karma.conf.js'), this.destinationPath(DEST_ROOT + '/karma.conf.js'));
        this.fs.copy(this.templatePath(ROOT_FOLDER + '/webpack.config.js'), this.destinationPath(DEST_ROOT + '/webpack.config.js'));
        this.fs.copy(this.templatePath(ROOT_FOLDER + '/.gitignore'), this.destinationPath(DEST_ROOT + '/.gitignore'));


        this.fs.copyTpl(
            this.templatePath(JS_FOLDER + '/config/base.js'),
            this.destinationPath(DEST_ROOT + '/src/config/base.js'),
            {
                name: this.scriptAppName
            }
        );

        this.fs.copy(this.templatePath(JS_FOLDER + '/config/dev.js'), this.destinationPath(DEST_ROOT + '/src/config/dev.js'));
        this.fs.copy(this.templatePath(JS_FOLDER + '/config/dist.js'), this.destinationPath(DEST_ROOT + '/src/config/dist.js'));
        this.fs.copy(this.templatePath(JS_FOLDER + '/config/test.js'), this.destinationPath(DEST_ROOT + '/src/config/test.js'));

        this.fs.copy(this.templatePath(JS_FOLDER + '/home.controller.js'), this.destinationPath(DEST_ROOT + '/src/pages/home/home.controller.js'));
        this.fs.copy(this.templatePath(JS_FOLDER + '/app.js'), this.destinationPath(DEST_ROOT + '/src/app.js'));
        this.fs.copy(this.templatePath(JS_FOLDER + '/app.router.js'), this.destinationPath(DEST_ROOT + '/src/app.router.js'));
        this.fs.copy(this.templatePath(JS_FOLDER + '/app.run.js'), this.destinationPath(DEST_ROOT + '/src/app.run.js'));


        this.fs.copyTpl(
            this.templatePath(APP_FOLDER + '/index.html'),
            this.destinationPath(DEST_ROOT + '/src/index.html'),
            {
                name: this.scriptAppName
            }
        );

        this.fs.copy(this.templatePath(APP_FOLDER + '/modules/README'), this.destinationPath(DEST_ROOT + '/src/modules/README'));
        this.fs.copy(this.templatePath(APP_FOLDER + '/widgets/README'), this.destinationPath(DEST_ROOT + '/src/widgets/README'));

        this.fs.copy(this.templatePath(APP_FOLDER + '/assets/**'), this.destinationPath(DEST_ROOT + '/src/assets/'));

        this.fs.copy(this.templatePath(APP_FOLDER + '/home.html'), this.destinationPath(DEST_ROOT + '/src/pages/home/home.html'));
        this.fs.copy(this.templatePath(APP_FOLDER + '/404.html'), this.destinationPath(DEST_ROOT + '/src/404.html'));
        this.fs.copy(this.templatePath(APP_FOLDER + '/app.scss'), this.destinationPath(DEST_ROOT + '/src/app.scss'));

        this.fs.copy(this.templatePath(APP_FOLDER + '/home.scss'), this.destinationPath(DEST_ROOT + '/src/pages/home/home.scss'));
        this.fs.copy(this.templatePath(APP_FOLDER + '/favicon.ico'), this.destinationPath(DEST_ROOT + '/src/favicon.ico'));
        this.fs.copy(this.templatePath(APP_FOLDER + '/robots.txt'), this.destinationPath(DEST_ROOT + '/src/robots.txt'));


    },
    install: function () {
        //if(this.haveNameArg){
        //    let command = 'cd ' + this.scriptAppName;
        //    this.spawnCommand(command);
        //}
        console.log('running `npm install & bower install`');
        this.npmInstall();
        this.bowerInstall();
    }
});