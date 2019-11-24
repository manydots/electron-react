function debounce(fn, delay, immediate) {
	let timer;
	return function() {
		let self = this;
		let args = arguments;
		if (timer) {
			clearTimeout(timer)
		};
		if (immediate) {
			var callNow = !timer;
			timer = setTimeout(() => {
				timer = null;
			}, delay);
			if (callNow) {
				fn.apply(self, args);
			}
		} else {
			timer = setTimeout(function() {
				fn.apply(self, args)
			}, delay);
		}
	}
};

function isEnv() {
	if (process.env.NODE_ENV === 'development') {
		return '/devAPI';
	} else if (process.env.NODE_ENV === 'production') {
		return 'http://dev.jeeas.cn';
	}
};

export {
	debounce,
	isEnv
};