import path from "path"
import webpack from "webpack"
import VueLoaderPlugin from "vue-loader/lib/plugin"
import MiniCssExtractPlugin from "mini-css-extract-plugin"
import HtmlWebpackPlugin from "html-webpack-plugin"
import autoprefixer from "autoprefixer"
import CopyWebpackPlugin from "copy-webpack-plugin"

const root = path.resolve(__dirname, "../")

const API_BASE = process.env.API_BASE ? process.env.API_BASE : "http://localhost/api/1.0"

const postcssLoader = {
    loader: "postcss-loader",
    options: {
        sourceMap: true,
        plugins: [
            autoprefixer({
                browsers: ["last 2 versions"],
            }),
        ],
    },
}

export default {
    entry: {
        app: path.resolve(root, "src/app.js"),
        background: path.resolve(root, "src/background.js"),
    },
    output: {
        path: path.resolve(root, "dist/"),
        filename: "js/[name].js",
    },
    module: {
        rules: [
            {
                test: /\.vue$/,
                loader: "vue-loader",
            },
            {
                test: /\.js$/,
                loader: "babel-loader",
                exclude: /node_modules/,
            },
            {
                test: /\.css$/,
                use: [
                    MiniCssExtractPlugin.loader,
                    {loader: "css-loader", options: {importLoaders: 1, sourceMap: true}},
                    postcssLoader,
                ],
            },
            {
                test: /\.scss$/,
                use: [
                    MiniCssExtractPlugin.loader,
                    {loader: "css-loader", options: {importLoaders: 2, sourceMap: true}},
                    postcssLoader,
                    {loader: "sass-loader", options: {sourceMap: true}},
                ],
            },
            {
                test: /\.styl(us)?$/,
                use: [
                    MiniCssExtractPlugin.loader,
                    {loader: "css-loader", options: {importLoaders: 2, sourceMap: true}},
                    postcssLoader,
                    {loader: "stylus-loader", options: {sourceMap: true}},
                ],
            },
        ],
    },
    resolve: {
        alias: {
            "vue$": path.resolve(root, "node_modules", "vue/dist/vue.runtime.esm.js"),
        },
    },
    plugins: [
        new webpack.DefinePlugin({
            API_BASE: JSON.stringify(API_BASE),
            API_SECRET: JSON.stringify(process.env.API_SECRET),
            CHRONICLE_BASE: JSON.stringify(process.env.CHRONICLE_BASE),
            SEARCH_BASE: JSON.stringify(process.env.SEARCH_BASE),
            MOCK_SERIAL: JSON.stringify(process.env.MOCK_SERIAL),
        }),
        new VueLoaderPlugin(),
        new MiniCssExtractPlugin({
            filename: "style/[name].css",
        }),
        new HtmlWebpackPlugin({
            template: path.resolve(root, "src/index.html"),
        }),
        CopyWebpackPlugin([
            {from: "src/manifest.json", to: ""},
            {from: "src/img", to: "img/"},
        ]),
    ],
}
