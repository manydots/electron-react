var webpack = require('webpack');
var path = require('path');
var MiniCssExtractPlugin = require('mini-css-extract-plugin');
var UglifyJsPlugin = require('uglifyjs-webpack-plugin');

module.exports = {
    entry: {
        'index/index': path.join(__dirname, '../src/renderer/index.js')
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
        contentBase: path.join(__dirname, "../web/"), //编译好的文件放在这里
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
    //在webpack.config.js中处理
    // externals: {
    //     "react": "React",
    //     "react-dom": "ReactDOM"
    // },
    plugins: [
        //未分离存在问题
        new MiniCssExtractPlugin({
            filename: 'css/[name].bundle.css'
        })
    ],
    optimization: {
        splitChunks: {
            //chunks: "all",//开发模式异常
            cacheGroups: {
                commons: {
                    chunks: "all",
                    name: "lib/commons",
                    chunks: "initial",
                    minChunks: 2
                }
            }
        },
        minimizer: [
            new UglifyJsPlugin({
                cache: true,
                parallel: true,
                uglifyOptions: {
                    warnings: false,
                    compress: {
                        unused: true,
                        dead_code: true,
                        drop_debugger: true,
                        drop_console: true,
                        pure_funcs: ['console.log'] // 移除console
                    },
                    mangle: true,
                    output: {
                        comments: false,
                        ascii_only: true
                    }
                }
            })
        ],
    },
    performance: {
        hints: false
    }
};