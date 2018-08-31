const dotenv = require("dotenv");
const path = require("path");
const webpack = require("webpack");
const HtmlWebpackPlugin = require("html-webpack-plugin");

dotenv.config({ path: path.join(__dirname, "..", ".env") });

module.exports = {
    devtool: "source-map", // enable source maps for debugging
    devServer: {
        historyApiFallback: true,
        hot: true,
        proxy: {
            "/api": `http://localhost:${process.env.PORT}`
        }
    },
    resolve: {
        extensions: [".tsx", ".ts", ".js"]
    },
    entry: "./src/index.tsx",
    output: {
        filename: "bundle.js",
        path: path.join(__dirname, "dist"),
        publicPath: process.env.BASE
    },
    module: {
        rules: [
            {
                test: /\.tsx?$/,
                use: "ts-loader",
                exclude: /node_modules/
            },
            {
                test: /\.(png|svg|jpg|gif|eot|ttf|svg|woff|woff2)$/,
                use: "file-loader"
            },
            {
                test: /\.css$/,
                use: ["style-loader", "css-loader"]
            }
        ]
    },
    plugins: [
        new webpack.HotModuleReplacementPlugin(),
        new webpack.EnvironmentPlugin({
            BASE: process.env.BASE
        }),
        new HtmlWebpackPlugin({
            template: "./src/index.html",
            favicon: "./src/assets/favicon/favicon_compressed.png"
        })
    ]
}
