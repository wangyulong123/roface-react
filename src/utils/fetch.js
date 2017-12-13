import jquery from 'jquery';

export default (url, data, type) => {
  // 网络请求
  return new Promise((resolve, reject) => {
    jquery.ajax(url, {
      data,
      type,
      error: (xhr, status, err) => {
        reject(err);
      },
      complete: (res) => {
        resolve(res);
      },
    });
  });
};

