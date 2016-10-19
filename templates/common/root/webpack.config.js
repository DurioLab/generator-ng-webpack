/**
 * Webpack配置文件
 **/
var path = require('path');
const args = require('minimist')(process.argv.slice(2));

const allowedEnvs = ['dev', 'dist', 'test'];

let env = 'dev';

if(args._.length > 0){
    let _arg = args._;
    if(_arg.indexOf('serve') !== -1){
        env = 'dev';
    } else if(_arg.indexOf('build') !== -1){
        env = 'dist';
    } else if(_arg.indexOf('test') !== -1){
        env = 'test';
    }
}

//if (args._.length > 0 && args._.indexOf('start') !== -1) {
//    env = 'test';
//} else if (args.env) {
//    env = args.env;
//} else {
//    env = 'dev';
//}

process.env.ANGULAR_ENV = env;

function buildConfig(wantedEnv) {
    let isValid = wantedEnv && wantedEnv.length > 0 && allowedEnvs.indexOf(wantedEnv) !== -1;
    let validEnv = isValid ? wantedEnv : 'dev';
    return require(path.join(__dirname, 'config/' + validEnv));
}

module.exports = buildConfig(env);
