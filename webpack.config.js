var SEED_APP_CONFIG = require('./config.js');
var path = require('path');
var HtmlWebpackPlugin = require('html-webpack-plugin');
var WebpackCleanupPlugin = require('webpack-cleanup-plugin');

module.exports = {
    entry: {
        app: path.resolve(__dirname, './src/index.jsx')
    },
    output: {
        path: path.resolve('dist'),
        filename: '[name][hash].bundle.js',
    },
    resolve: {
        // Look for modules in .js(x) files first, then .js
        extensions: ['.jsx', '.js'],

        // add 'src' to the modules, so that when you import files you can do so with 'src' as the relative route
        modules: ['src', 'node_modules'],
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                loader: 'babel-loader'
            },
            {
                test: /\.jsx?$/,
                loaders: ['babel-loader'],
                include: path.resolve('src')
            }
        ]
    },
    plugins: [
        new WebpackCleanupPlugin(),
        new HtmlWebpackPlugin({
            title: SEED_APP_CONFIG.TITLE,
            filename: 'index.html',
            template: './src/index.html'
        })
    ],
    devServer: {
        contentBase: path.resolve('dist'),
        port: 4000
    },
    externals: {
        'react/addons': true,
        'react/lib/ExecutionEnvironment': true,
        'react/lib/ReactContext': true,
        'react-addons-test-utils': 'react-dom',
    },
    node: {
        fs: "empty"
    }
};
