const HtmlWebpackPlugin = require('html-webpack-plugin');
const path = require('path');
const _source = path.resolve(__dirname, "source");
const _build = path.resolve(__dirname, "build");

module.exports = {
    entry: path.resolve(_source, "app.js"),
    output: {
        filename: "app.bundle.js",
        path: _build,
        publicPath: '/',
    },
    module: {
      loaders: [
          { test: /\.js$/, exclude:/node_modules/, loaders: ["babel-loader"] },
          { test: /\.s?css$/, exclude:/node_modules/, loaders: ["style-loader", "css-loader", "sass-loader"] },
          { }
      ]
    },
    devServer: {
        historyApiFallback: true
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: path.resolve(_source, "index.html"),
            filename: "index.html",
            inject: "body",
        }),
    ],
};
// avec eslint airbnb         { test: /\.js$/, exclude:/node_modules/, loaders: ["babel-loader", "eslint-loader"] },