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

function isLocal() {
    return process.env.NODE_ENV === 'development' ? true : false;
}

function isEnv(apiType) {
    if (process.env.NODE_ENV === 'development') {
        return `/${apiType}`;
    } else if (process.env.NODE_ENV === 'production') {
        if (apiType === 'devAPI') {
            return 'http://dev.jeeas.cn';
        } else if (apiType === 'musicAPI') {
            return 'https://music.jeeas.cn';
        }

    }
}

function removePending(pending, key, isRequest) {
    if (pending[key] && isRequest) {
        pending[key]('取消重复请求');
        //throw new axios.Cancel('cancel request');
    }
    delete pending[key]
}

function getRequestIdentify(config, isReuest) {
  let url = config.url;
  //console.log(url)
  if (isReuest) {
    url = config.baseURL + config.url.substring(1, config.url.length)
  }
  return config.method === 'get' ? encodeURIComponent(url + JSON.stringify(config.params)) : encodeURIComponent(config.url + JSON.stringify(config.data))
}

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
function formatDate(date, fmt) {
    if (!date) {
        date = new Date();
    } else {
        date = new Date(date);
    }
    if (fmt === undefined) {
        fmt = 'yyyy-MM-dd hh:mm:ss';
    }
    var o = {
        'M+': date.getMonth() + 1, //月份
        'd+': date.getDate(), //日
        'h+': date.getHours(), //小时
        'm+': date.getMinutes(), //分
        's+': date.getSeconds(), //秒
        'q+': Math.floor((date.getMonth() + 3) / 3), //季度
        'S': date.getMilliseconds() //毫秒
    };
    if (/(y+)/.test(fmt)) fmt = fmt.replace(RegExp.$1, (date.getFullYear() + '').substr(4 - RegExp.$1.length));
    for (var k in o)
        if (new RegExp('(' + k + ')').test(fmt)) fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (('00' + o[k]).substr(('' + o[k]).length)));
    return fmt;
}
function basePath(isFlag){
    if(isFlag){
        return '/';
    }else{
        return '';
    }
}
export {
	debounce,
	isEnv,
	renderHtml,
	checkPath,
    formatDate,
    basePath,
    isLocal,
    removePending,
    getRequestIdentify
};