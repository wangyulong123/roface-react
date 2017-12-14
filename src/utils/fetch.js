import jquery from 'jquery';

export const PFetch = (url, data) => {
  // 网络请求
  return new Promise((resolve, reject) => {
    jquery.ajax(url, {
      data,
      type: 'post',
      error: (xhr, status, err) => {
        reject(err);
      },
      complete: (res) => {
        resolve(res);
      },
    });
  });
};

export const GFetch = (url, data) => {
  // 网络请求
  return new Promise((resolve, reject) => {
    jquery.ajax(url, {
      data,
      type: 'get',
      error: (xhr, status, err) => {
        reject(err);
      },
      complete: (res) => {
        resolve(res);
      },
    });
  });
};

