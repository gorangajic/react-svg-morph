var path = require('path');

module.exports = {
    context: path.resolve(__dirname, '..', '..'),
    entry: path.join(__dirname, 'app'),
    output: {
        path: path.join(__dirname),
        filename: 'build.js',
        publicPath: "/",
    },
    module: {
        loaders: [
            { test: /\.js$/, loader: 'babel-loader?stage=0', exclude: /(node_modules|bower_components)/ },
        ],
    },
};

