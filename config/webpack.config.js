var config = require('./webpack.dev.config');
var CleanWebpackPlugin = require('clean-webpack-plugin');
var path = require('path');
var fs = require('fs-extra');
var buildPath = path.join(__dirname, '../build/lib');
var { build, findSync } = require('../src/utils/index');

module.exports = (env, argv) => {
	if (argv.mode === 'production') {
		//提取公共类库
		var vendor = ['react', 'react-dom', 'antd'];
		config.entry['lib/vendor'] = vendor;
		config.plugins.push(new CleanWebpackPlugin());

		if (!fs.existsSync(buildPath) || findSync(buildPath).length <= 2) {
			build();
		};

	} else if (argv.mode === 'development') {
		//开发模式不打包 以下资源
		// config.externals = {
		// 	"react": "React",
		// 	"react-dom": "ReactDOM"
		// };
		if (!fs.existsSync(buildPath) || findSync(buildPath).length <= 2) {
			build();
		};
	};
	return config;
}