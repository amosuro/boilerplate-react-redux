const webpack = require('webpack');
const bundleUtils = require('./bundle-utils');
const buildConfig = bundleUtils.getBuildConfig();

let devConfig = {
    devtool: 'eval-source-map',
    plugins: [
        new webpack.EnvironmentPlugin({
            NODE_ENV: 'development',
            DEBUG: true
        })
    ],
    devServer: {
        inline: false,
        hot: false,
        port: 4000,
        https: true,
        contentBase: false,
        headers: {
            "Access-Control-Allow-Origin": "*"
        }
    },
};

module.exports = devConfig;