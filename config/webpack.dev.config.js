var webpack = require('webpack');
var path = require('path');
var MiniCssExtractPlugin = require('mini-css-extract-plugin');
var UglifyJsPlugin = require('uglifyjs-webpack-plugin');
//console.log(process.env.NODE_ENV);

module.exports = {
    entry: {
        'index/index': path.join(__dirname, '../src/renderer/index.js')
    },
    output: {
        path: path.join(__dirname, '../build'), //输出文件的绝对路径
        filename: '[name].js',
        chunkFilename: 'index/[name].js'
    },
    resolve: {
        extensions: [".jsx", ".js", ".json"],
        alias: {
            utils: path.join(__dirname, '../src/utils'),
        }
    },
    devServer: {
        contentBase: path.join(__dirname, "../web/"), //编译好的文件放在这里
        host: '127.0.0.1',
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
            test: /\.(c|le)ss$/,
            use: [MiniCssExtractPlugin.loader, {
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
        new MiniCssExtractPlugin({
            filename: '[name].bundle.css',
            chunkFilename: 'index/[name].css'
        }),
        new webpack.HashedModuleIdsPlugin()
    ],
    optimization: {
        splitChunks: {
            cacheGroups: {
                // commons: {
                //     name: 'lib/commons',
                //     chunks: 'initial',
                //     minChunks: 2
                // },
                vendor: {
                    test: /[\\/]node_modules[\\/]/,
                    chunks: 'initial',
                    enforce: true,
                    priority: 10,
                    name: 'chunks/vendor'
                },
                common: {
                    chunks: "all",
                    minChunks: 2,
                    name: 'chunks/common',
                    enforce: true,
                    priority: 5
                },
            }
        },
        // runtimeChunk: {
        //     "name": "manifest"
        // },
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