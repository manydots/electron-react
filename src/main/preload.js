//预加载资源
require('../../build/lib/commons');
require('../../build/lib/vendor');
window.addEventListener('DOMContentLoaded', function() {

	window.onload = function() {
		require('../../build/index/index');
	};

});