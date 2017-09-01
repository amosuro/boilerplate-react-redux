var SEED_APP_CONFIG = require('./config.js');
var path = require('path');
var HtmlWebpackPlugin = require('html-webpack-plugin');
var WebpackCleanupPlugin = require('webpack-cleanup-plugin');

module.exports = {
    entry: {
        app: path.resolve(__dirname, './src/app.tsx')
    },
    output: {
        path: path.resolve('dist'),
        filename: '[name][hash].bundle.js',
    },
    resolve: {
        // Look for modules in .ts(x) files first, then .js
        extensions: ['.ts', '.tsx', '.js'],

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
                test: /\.tsx?$/,
                loaders: ['babel-loader', 'ts-loader'],
                include: path.resolve('src')
            }
        ]
    },
    plugins: [
        new WebpackCleanupPlugin(),
        new HtmlWebpackPlugin({
            title: SEED_APP_CONFIG.TITLE,
            filename: 'app.html',
            template: './src/app.html'
        })
    ],
    devServer: {
        contentBase: path.resolve('dist'),
        port: 4000
    }
};
