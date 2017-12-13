const webpack = require('webpack');

let prodConfig = {
    devtool: 'source-map',
    plugins: [
        new webpack.EnvironmentPlugin({
            NODE_ENV: 'production',
            DEBUG: false
        })
    ]
};

module.exports = prodConfig;