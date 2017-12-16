import config from './config';
import $ from 'jquery';


/**
 * 拼接上配置的基础路径，最终计算出一个可以直接访问的URL地址，
 * 是整个rest异步访问非常重要的一项基础功能
 * @param url
 * @returns {string}
 */
export const getRequestUrl = (url) => {
    return `${config.baseUrl}${url}`;
};

export const restAjax = (url,type,data) =>{
    // 网络请求
    var reqUrl = getRequestUrl(url);
    return new Promise((resolve, reject) => {
        $.ajax({
            url: reqUrl,
            data:data,
            cache: false,
            type: type,
            error: (xhr, status, err) => {
                reject(err);
            },
            success:(data, status) => {
                resolve(status);
            },
            complete: (data) => {
                resolve(status);
            },
        });
    });
};

export const get = (url,param) => {
    return restAjax(url,'get',param);
};
export const post = (url,param) => {
    return restAjax(url,'post',param);
};
export const put = (url,param) => {
    return restAjax(url,'put',param);
};
export const del = (url,param) => {
    return restAjax(url,'delete',param);
};


// export default {
//
// }