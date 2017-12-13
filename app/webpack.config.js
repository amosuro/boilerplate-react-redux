var path = require("path"),
    ExtractTextPlugin = require('extract-text-webpack-plugin'),
    CopyWebpackPlugin = require('copy-webpack-plugin'),
    CleanWebpackPlugin = require('clean-webpack-plugin');

const outputPath = path.resolve(__dirname, "../out/production/resources/static");

module.exports = {
    entry: {
        main: path.resolve(__dirname, "./app/index.tsx"),
        "symphony-controller": path.resolve(__dirname, "./app/symphony/controller.ts")
    },
    output: {
        path: outputPath,
        filename: "[name].bundle.js"
    },
    // Enable sourcemaps for debugging webpack's output.
    devtool: "source-map",
    resolve: {
        // Add '.ts' and '.tsx' as resolvable extensions.
        extensions: ["", ".webpack.js", ".web.js", ".ts", ".tsx", ".js", ".jsx"]
    },
    module: {
        loaders: [
            {test: /\.tsx?$/, loader: "ts", exclude: /node_modules/},
            {test: /\.css$/, loader: ExtractTextPlugin.extract("style-loader", "css-loader")},
            {
                test: /\.less$/,
                loader: ExtractTextPlugin.extract("style-loader", "css-loader?sourceMap!less-loader?sourceMap")
            },
            {
                test   : /\.(gif|jpe?g|png|ttf|eot|svg|woff(2)?)(\?[a-z0-9=&.]+)?$/,
                loader : 'file-loader'
            }
        ],
        preLoaders: [
            // All output '.js' files will have any sourcemaps re-processed by 'source-map-loader'.
            {test: /\.js$/, loader: "source-map-loader"}
        ],
        // When importing a module whose path matches one of the following, just
        // assume a corresponding global variable exists and use that instead.
        // This is important because it allows us to avoid bundling all of our
        // dependencies, which allows browsers to cache those libraries between builds.
        externals: {
            "react": "React",
            "react-dom": "ReactDOM",
            'react/addons': true,
            'react/lib/ExecutionEnvironment': true,
            'react/lib/ReactContext': true,
            'react-addons-test-utils': 'react-dom',
            "jquery": "jQuery",
            "SYMPHONY": "SYMPHONY",
            "symphonyAppSettings": "symphonyAppSettings"
        }
    },
    plugins: [
        new CleanWebpackPlugin([outputPath], {
            verbose: true,
            dry: false
        }),
        new ExtractTextPlugin("style.css", {
            allChunks: true
        }),
        new CopyWebpackPlugin(
            [
                {
                    from: './images',
                    to: './images',
                    toType: 'dir'
                }
            ])
    ]
};
