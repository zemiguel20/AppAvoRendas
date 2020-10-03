const path = require('path');
const HtmlWebPackPlugin = require("html-webpack-plugin");

module.exports = {
    target: 'node',
    entry: './src/renderer.js',
    output: {
        filename: 'index.js',
        path: path.resolve(__dirname, 'build'),
    },
    module: {
        rules: [
            {
                test: /\.m?js$/,
                exclude: /(node_modules|bower_components)/,
                use: {
                    loader: 'babel-loader',

                }
            },
            {
                test: /\.html$/,
                exclude: /(node_modules|bower_components)/,
                use: [
                    {
                        loader: "html-loader"
                    }
                ]
            },
            {
                test: /\.css$/,
                use: ['style-loader', 'css-loader']
            }
        ]
    },
    plugins: [
        new HtmlWebPackPlugin({
            template: "./src/index.html",
            filename: "./index.html"
        })
    ]

};