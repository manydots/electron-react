var CleanWebpackPlugin = require('clean-webpack-plugin');
var CopyWebpackPlugin = require('copy-webpack-plugin');
var path = require('path');
var fs = require('fs-extra');
var buildPath = path.join(__dirname, '../build/lib');
var config = require('./webpack.dev.config');
var {build,findSync} = require('../src/utils/index');

module.exports = (env, argv) => {
	if (argv.mode === 'production') {
		//提取公共类库
		var vendor = ['react', 'react-dom', 'react-router-dom', 'antd'];
		config.entry['lib/vendors'] = vendor;
		config.plugins.push(new CleanWebpackPlugin());

		//复制 /web/e-index.html 到 /build 文件夹下
		config.plugins.push(new CopyWebpackPlugin([{
			from: path.join(__dirname, '../web/e-index.html'),
			to: path.join(__dirname, '../build')
		}]))
		if (!fs.existsSync(buildPath) || findSync(buildPath).length <= 2) {
			build();
		};

	} else if (argv.mode === 'development') {
		//开发模式不打包 以下资源
		// config.externals = {
		// 	"react": "React",
		// 	"react-dom": "ReactDOM"
		// };
		config.devServer.proxy = {
			'/devAPI': {
				target: 'http://dev.jeeas.cn',
				pathRewrite: {
					'^/devAPI': ''
				},
				changeOrigin: true, // target是域名的话，需要这个参数，
				secure: false, // 设置支持https协议的代理
			},
			'/musicAPI': {
				target: 'https://music.jeeas.cn',
				pathRewrite: {
					'^/musicAPI': ''
				},
				changeOrigin: true,
				secure: false
			},
		};

		if (!fs.existsSync(buildPath) || findSync(buildPath).length <= 2) {
			build();
		};
	};
	return config;
}