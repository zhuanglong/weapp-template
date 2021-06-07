const KEY = 'token';

const set = (data) => {
  wx.setStorageSync(KEY, data);
}

const get = () => {
  return wx.getStorageSync(KEY);
}

const del = () => {
  return wx.setStorageSync(KEY, '');
}

export default { set, get, del };
