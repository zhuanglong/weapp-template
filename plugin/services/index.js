import request from '/utils/http/request';
import { tokenStorage } from '/storage/index';

// 带上 token 的请求方法
const requestWithToken = async (params) => {
  try {
    let token = tokenStorage.get();
    if (!token) {
      const res1 = await request({
        url: '/xx/getToken',
        method: 'POST'
      });
      token = res1.token;
      tokenStorage.set(token);
    }

    params.header = {
      ...params.header,
      Authorization: `Bearer ${token}`
    };
  
    const res2 = await request(params);
    if (res2.status === 'relogin') {
      // token 失效重新获取
      tokenStorage.del();
      return await requestWithToken(params);
    } else {
      return res2;
    }
  } catch (error) {
    throw error;
  }
}

// 登录
export function login(data) {
  return request({
    url: 'https://pv.sohu.com/cityjson',
    method: 'POST',
    data
  });
}

// 登出
export function logout(data) {
  return request({
    url: '/user/logout',
    method: 'POST',
    data
  });
}
