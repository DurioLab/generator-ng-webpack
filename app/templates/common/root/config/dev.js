"use strict";
let baseConfig =  require('./base');
let webpack = require('webpack');


let devConfig = Object.assign({}, baseConfig, {

    devtool: 'inline-source-map',

    plugins: [
        new webpack.HotModuleReplacementPlugin(),
        new webpack.NoErrorsPlugin(),
        new webpack.ResolverPlugin(
            new webpack.ResolverPlugin.DirectoryDescriptionFilePlugin("bower.json", ["main"])
        )
    ]

});


module .exports = devConfig;




