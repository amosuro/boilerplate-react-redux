import { SEED_APP_CONFIG } from './config.js';
import path from 'path';
import HtmlWebpackPlugin from 'html-webpack-plugin';

module.exports = {
    entry: {
        app: path.resolve(__dirname, './src/app.js')
    },
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: '[name].bundle.js'
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                loader: 'babel-loader'
            }
        ]
    },
    plugins: [
        new HtmlWebpackPlugin({
            title: SEED_APP_CONFIG.TITLE,
            filename: 'app.html',
            template: './src/app.html',
            inject: false
        })
    ],
    devServer: {
        contentBase: path.resolve(__dirname, 'dist'),
        port: 4000,
        hot: true
    }
};
