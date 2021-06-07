import { showLoading, hideLoading, matchHttpStatusCode } from './statusHandle';
import config from '/utils/config';

const timeout = 5000;

function request(options) {
  return new Promise((resolve, reject) => {
    let throwError;
    const { noLoading } = options;
    delete options.noLoading;
    showLoading({ noLoading });

    options = {
      ...options,
      timeout,
      success: (response) => {
        hideLoading({ noLoading });
        const { data, statusCode } = response;
        if (statusCode === 200) {
          resolve(data);
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
        throwError = new Error('网络异常');
        wx.showModal({
          title: '提示',
          content: throwError.message,
          showCancel: false,
          confirmText: '确定'
        });
        reject(throwError);
      }
    }

    // 加上基础 URL
    if (!options.url.startsWith('http')) {
      options.url = config.baseURL + options.url;
    }

    wx.request(options);
  });
}

export default request;
