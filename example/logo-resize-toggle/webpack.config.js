var path = require('path');

module.exports = {
    entry: path.join(__dirname, 'main'),
    output: {
        path: path.join(__dirname),
        filename: 'build.js',
        publicPath: "/"
    },
    module: {
        loaders: [
            { test: /\.js$/, loader: 'babel-loader?stage=0', exclude: /(node_modules|bower_components)/ },
        ]
    }
};

