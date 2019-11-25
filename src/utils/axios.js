import axios from 'axios';

//创建axios实例
const pending = {}
const CancelToken = axios.CancelToken;
const service = axios.create({
  baseURL: process.env.BASE_API, //node环境的不同，对应不同的baseURL
  timeout: 5000, // 请求的超时时间
  //header默认的Content-Type是'application/json;charset=UTF-8'
  // headers: {  
  //   "Content-Type": "application/x-www-form-urlencoded"
  // },
  crossDomain: true,
  withCredentials: true, // 允许携带cookie
  transformRequest: [function(data) {
    //发送请求前处理request的数据
    //console.log(data)
    let ret = '';
    for (let k in data) {
      ret += encodeURIComponent(k) + '=' + encodeURIComponent(data[k]) + '&'
    }
    return ret;
  }]
})

function removePending(key, isRequest) {
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

//request拦截器
service.interceptors.request.use(
  config => {
    // 发送请求之前，要做的业务
    let request = getRequestIdentify(config, true);
    //console.log(request)
    removePending(request, true);
    config.cancelToken = new CancelToken((cancel) => {
      pending[request] = cancel;
    });
    let apiType = config.data.apiType || 'devAPI';
    config.url = isEnv(apiType) + config.url;
    //console.log(config)
    return config;
  },
  error => {
    //错误处理代码
    return Promise.reject(error);
  }
)

//response拦截器
service.interceptors.response.use(
  response => {
    //数据响应之后，要做的业务
    if (response.status && response.status == 200) {
      return response.data;
    }
    return response;
  },
  error => {
    if (error.message.includes('timeout')) {
      console.log("timeout");
      return Promise.reject(error);
    }
    return Promise.reject(error)
  }
)

export {
  service as axios
};