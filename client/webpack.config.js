const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = env => ({
    devtool: "source-map", // enable source maps for debugging
    devServer: {
        proxy: {
            "/api": "http://localhost:3000"
        }
    },
    resolve: {
        extensions: [".tsx", ".ts", ".js"]
    },
    entry: "./src/index.tsx",
    output: {
        filename: "bundle.js",
        path: path.join(__dirname, "dist")
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
        new HtmlWebpackPlugin({
            template: "./src/index.html",
            favicon: "./src/assets/favicon/favicon_compressed.png"
        })
    ]
})
