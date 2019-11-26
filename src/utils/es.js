import React from 'react';

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

function renderHtml() {
  return (<div className="spinner">
        <div className="spinner-container container1">
	        <div className="circle1">&nbsp;</div>
	        <div className="circle2">&nbsp;</div>
	        <div className="circle3">&nbsp;</div>
	        <div className="circle4">&nbsp;</div>
      	</div>
      <div className="spinner-container container2">
        <div className="circle1">&nbsp;</div>
        <div className="circle2">&nbsp;</div>
        <div className="circle3">&nbsp;</div>
        <div className="circle4">&nbsp;</div>
      </div>
      <div className="spinner-container container3">
        <div className="circle1">&nbsp;</div>
        <div className="circle2">&nbsp;</div>
        <div className="circle3">&nbsp;</div>
        <div className="circle4">&nbsp;</div>
      </div>
    </div>);
}

function checkPath(ctx, notNeedDeal) {
    let notNeed = false;
    for (let item of notNeedDeal) {
        if (item.type == 'startsWith') {
            for (let v of item.path.split(',')) {
                if (ctx.url.startsWith(v)) {
                    notNeed = true;
                    break;
                }
            }

        } else if (item.type == 'endsWith') {
            for (let v of item.path.split(',')) {
                if (ctx.url.endsWith(v)) {
                    notNeed = true;
                    break;
                }
            }
        }
    }
    return notNeed;
}
export {
	debounce,
	isEnv,
	renderHtml,
	checkPath
};