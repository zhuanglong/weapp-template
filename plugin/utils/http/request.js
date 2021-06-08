import { showLoading, hideLoading, matchHttpStatusCode } from './statusHandle';
import { baseURL } from '/utils/config';

const timeout = 5000;

function request(opts = {}, cancelToken) {
  return new Promise((resolve, reject) => {
    let throwError;
    const { noLoading, url, data, method } = opts;
    showLoading({ noLoading });

    const options = {
      url: url.startsWith('http') ? url : baseURL + url, // 加上基础 URL
      data,
      method,
      timeout,
      success: (response) => {
        hideLoading({ noLoading });
        const { data: res, statusCode } = response;
        if (statusCode === 200) {
          resolve(res);
        } else if (statusCode === 401) {
          throwError = new Error('登录已失效，请重新登陆！');
          throwError.status = 'relogin';
          resolve(throwError);
        } else {
          throwError = new Error(matchHttpStatusCode(statusCode));
          wx.showModal({
            title: '提示',
            content: throwError.message,
            showCancel: false,
            confirmText: '确定'
          });
          reject(throwError);
        }
      },
      fail: (error) => {
        console.warn('=== response err ===', error);
        hideLoading({ noLoading });
        if (error.errMsg === 'request:fail abort') {
          throwError = new Error('请求任务中断');
        } else {
          throwError = new Error('网络异常');
          wx.showModal({
            title: '提示',
            content: throwError.message,
            showCancel: false,
            confirmText: '确定'
          });
        }
        reject(throwError);
      }
    }

    const task = wx.request(options);
    if (typeof cancelToken === 'function') {
      cancelToken(task);
    }
  });
}

export default request;
