let baseConfig = require('./base');

let config = {
    appEnv: 'test'
};

module.exports = Object.freeze(Object.assign({}, baseConfig, config)); //导出不可变对象

