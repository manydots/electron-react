import axios from 'axios';
import store from 'store';
import {
  isEnv,
  isLocal,
  removePending,
  getRequestIdentify
} from './es';

//创建axios实例
const pending = {};
const CancelToken = axios.CancelToken;
const service = axios.create({
  baseURL: process.env.BASE_API, //node环境的不同，对应不同的baseURL
  timeout: 10000, // 请求的超时时间
  //header默认的Content-Type是'application/json;charset=UTF-8'
  // headers: {  
  //   "Content-Type": "application/x-www-form-urlencoded"
  // },
  crossDomain: true,
  withCredentials: true, // true允许携带cookie（设置true时，服务端需要单独配置）,false不携带
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

//request拦截器
service.interceptors.request.use(
  config => {
    // 发送请求之前，要做的业务
    //console.log(store.get('Authorization'));
    let request = getRequestIdentify(config, true);
    //console.log(request)
    removePending(pending, request, true);
    config.cancelToken = new CancelToken((cancel) => {
      pending[request] = cancel;
    });

    if (config.data) {
      let apiType = config.data.apiType || 'devAPI';
      config.url = isEnv(apiType) + config.url;
    }
    let connection = '&';
    if (config.url.indexOf('?') < 0) {
      connection = '?';
    };
    if (isLocal()) {
      config.url += `${connection}from=dev`;
    } else {
      config.url += `${connection}from=pro`;
    }
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