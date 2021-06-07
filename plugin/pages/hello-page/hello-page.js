import * as services from '/services/index';

Page({
  data: {
    cityInfo: ''
  },

  onLoad() {
    console.log('This is a plugin page!');
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
