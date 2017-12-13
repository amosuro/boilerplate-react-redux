const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const WebpackCleanupPlugin = require('webpack-cleanup-plugin');
const ExtractTextPlugin = require("extract-text-webpack-plugin");
const bundleUtils = require('./bundle-utils');
const buildConfig = bundleUtils.getBuildConfig();

module.exports = {
    entry: {
        app: path.resolve(buildConfig.srcDir, 'index'),
        controller: path.resolve(buildConfig.srcDir, 'hooks/controller')
    },
    output: {
        path: buildConfig.distDir,
        filename: '[name].bundle.js',
        publicPath: 'https://localhost:4000/'
    },
    resolve: {
        // Look for modules in .js(x) files first, then .js
        extensions: ['.jsx', '.js'],
        // add 'src' to the modules, so that when you import files you can do so with 'src' as the relative route
        modules: ['src', 'node_modules']
    },
    module: {
        rules: [
            {
                test: /\.jsx?$/,
                loader: ['babel-loader'],
                include: buildConfig.srcDir
            },
            {
                test: /\.(css|scss)$/,
                use: ExtractTextPlugin.extract({
                    fallback: "style-loader",
                    use: [
                        {
                            loader: 'css-loader',
                            options: {sourceMap: true}
                        },
                        {
                            loader: 'postcss-loader',
                            options: {sourceMap: true}
                        },
                        {
                            loader: 'sass-loader',
                            options: {sourceMap: true}
                        }
                    ]
                }),
                include: [/node_modules/, buildConfig.srcDir]
            },
            {
                test: /\.(png|jpe?g|gif)$/,
                use: ['file-loader']
            }
        ]
    },
    plugins: [
        new WebpackCleanupPlugin(),
        new HtmlWebpackPlugin({
            filename: 'index.html',
            template: path.resolve(buildConfig.srcDir, 'index.html'),
            chunks: ['app'],
            hash: true
        }),
        new ExtractTextPlugin({
            filename: "[name].css"
        })
    ],

    externals: {
        'react/addons': true,
        'react/lib/ExecutionEnvironment': true,
        'react/lib/ReactContext': true,
        'react-addons-test-utils': 'react-dom'
    },
    node: {
        fs: "empty"
    }
};
