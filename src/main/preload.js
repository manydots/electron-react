//预加载资源
global.electron = require('electron');
require('../../build/lib/vendors');
require('../../build/index/chunks/vendor');
require('../../build/index/chunks/common');
window.addEventListener('DOMContentLoaded', function() {

	window.onload = function() {
		require('../../build/index/index');
	};

});