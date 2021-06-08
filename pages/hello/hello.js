import { toBase64, fromBase64 } from 'js-base64';

import * as services from '../../services/index';

Page({
  data: {
    message: 'This is a page!',
    cityInfo: ''
  },

  onLoad() {
    const encoded = toBase64(this.data.message);
    console.log(encoded);
    console.log(fromBase64(encoded));
  },

  onLogin() {
    services.login({
      username: '123',
      password: 'xxx'
    }, (task) => {
      this.requestTask = task;
    }).then((res) => {
      this.setData({
        cityInfo: res.substring(res.indexOf('{'), res.indexOf('}') + 1)
      });
    });

    // 取消请求
    // setTimeout(() => {
    //   this.requestTask && this.requestTask.abort();
    // }, 300);
  }
});
