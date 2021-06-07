import { toBase64, fromBase64 } from 'js-base64';

import * as services from '/services/index';

Page({
  data: {
    cityInfo: ''
  },

  onLoad() {
    const encoded = toBase64('This is a plugin page!');
    console.log(encoded);
    console.log(fromBase64(encoded));

    services.login({
      username: '123',
      password: 'xxx'
    }).then((res) => {
      this.setData({
        cityInfo: res.substring(res.indexOf('{'), res.indexOf('}') + 1)
      });
    });
  }
});
