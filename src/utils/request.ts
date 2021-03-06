// import qs from 'qs';
import axios from 'axios';
declare var window: any;
axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded;charset=UTF-8';
const instance = axios.create({
  baseURL: 'http://192.168.30.116:4000'
  // baseURL: 'http://192.168.1.5:4000'
  // baseURL: 'http://192.168.101.102:4000'
});

// instance.interceptors.request.use((config) => {
//     if (config.method === 'post') {
//       config.data = qs.stringify(config.data);
//     }
//     return config;
//   }, (error) => {
//     return Promise.reject(error);
//   });

// 根据返回结果和调用时参数进行提醒
// instance.interceptors.response.use((response) => {
//     const isNotify = response.config.notify;
//     const customNotifyMessage = response.config.notifyMessage;
//     const result = response.data;
//     const $Message = window._vueInstance.$Message;

//     let message = result.message;
//     if (isNotify) {
//       if (RESULTTYPE.NORMAL === result.type || result.type === 'NORMAL') {
//         $Message.success(message);
//       }
//       if (RESULTTYPE.WARRING === result.type || result.type === 'WARRING') {
//         $Message.warning(message);
//       }
//     }
//     if (result.type === RESULTTYPE.FAILED || result.type === 'FAILED') {
//       $Message.error(message);
//     }
//     if (result.type === 'INVALID_MODEL') {
//       window._vueInstance.$pub('on-invalid-model', result.data);
//     }
//     return response;
//   });

// 根据返回结果和调用时参数进行提醒
instance.interceptors.response.use((response: any) => {
  const isNotify = response.config.notify;
  // const customNotifyMessage = response.config.notifyMessage;
  const result = response.data;
  const $Message = window._vueInstance.$Message;
  let message = result.message;
  if (isNotify) {
    if (result.code === 0) {
      $Message.success(message);
    } else {
      $Message.warning(message);
    }
  }
  return response.data;
}, (error: any) => {
  if (error.response) {
    switch (error.response.status) {
      // http status handler
      case 404:
        console.log('请求的资源不存在！')
        break
      case 500:
        console.log('内部错误，请稍后重试！')
        break
      case 503:
        console.log('服务器正在维护，请稍等！')
        break
    }
  }
  return Promise.reject(error.response)
});

export default instance;
