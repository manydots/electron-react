const path = require('path');
var MiniCssExtractPlugin = require('mini-css-extract-plugin');
module.exports = {
    entry: {
        index: path.join(__dirname, '../src/renderer/index.js')
    },
    output: {
        path: path.join(__dirname, '../build'), //输出文件的绝对路径
        filename: '[name].js',
    },
    resolve: {
        extensions: [".jsx", ".js", ".json"],
        alias: {
            utils: path.join(__dirname, '../src/utils'),
        }
    },
    devServer: {
        contentBase: path.join(__dirname, "../"), //编译好的文件放在这里
        host: 'localhost',
        port: 8088,
        inline: true,
        compress: true,
        open: true
    },
    module: {
        rules: [{
            test: /\.(jsx|js)?$/,
            exclude: /node_modules/,
            use: {
                loader: 'babel-loader',
                options: {
                    presets: ["react", "env"]
                }
            }
        }, {
            test: /\.(css|less)$/,
            use: [{
                loader: 'style-loader'
            }, {
                loader: 'css-loader'
            }, {
                loader: 'less-loader',
                options: {
                    javascriptEnabled: true
                }
            }]
        }]
    },
    externals: {
        "react": "React",
        "react-dom": "ReactDOM"
    },
    plugins: [
        new MiniCssExtractPlugin({
            filename: '[name].bundle.css'
        })
    ],
    performance: {
        hints: false
    }
}