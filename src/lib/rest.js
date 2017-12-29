import $ from 'jquery';
import config from './config';

/**
 * 拼接上配置的基础路径，最终计算出一个可以直接访问的URL地址，
 * 是整个rest异步访问非常重要的一项基础功能
 * @param url
 * @returns {string}
 */
export const getRequestURL = (url) => {
    return `${config.baseUrl}${url}`;
};

/**
 * 把URL参数中序列化对象转为JSON对象
 * 如:a=1&b=2&b=3&c=4 转为 {a:1,b:[2,3],c:4}
 * @param str
 */
export const unserializeURLParam = (strPara) => {
    let regResult;
    const ret = {};
    const regPara = /([^&=]+)=([\w\W]*?)(&|$|#)/g;
    while ((regResult = regPara.exec(strPara)) != null) {
        const k = regResult[1], v = regResult[2];
        if (!ret[k]) {
            ret[k] = v;
        } else if (Object.prototype.toString.call(ret[k]) === '[object Array]') {
            ret[k].push(v); //如果是数组，则直接把参值放进去
        } else {
            ret[k] = [ret[k]];  //如果之前的值，则转换成数组，把值放进去
            ret[k].push(v);
        }
    }
    return ret;
};

/**
 * 把URL中的URL地址和参数部分分解出来
 * http://www.amasoft.com/abc?a=1&b=2&b=3&c=4 {url:'http://www.amasoft.com/abc',param:{a:1,b[2,3],c:4}}
 * @param url
 * @returns {{url: string, param: {}}}
 */
export const parseURL = (url) => {
    const ret = {url: url, param: {}};

    const regUrl = /^([^\?]+)\?([\w\W]+)$/;
    const arrUrl = regUrl.exec(url);

    if (arrUrl && arrUrl[2]) {
        ret.url = arrUrl[1];
        ret.param = unserializeURLParam(arrUrl[2]);
    } else {
        return ret;
    }

    return ret;
};

export const restAjax = (url, type, data) => {
    // 网络请求
    const urlObject = parseURL(url);
    const reqURL = url.startsWith('http') ? urlObject.url : getRequestURL(urlObject.url);
    let paramObject = {};
    if (data) {
        if (typeof data !== 'object') {
            paramObject = unserializeURLParam(data);    //如果传的参数是字串，则对字串进行解析处理
        } else {
            paramObject = data;
        }
    }
    let reqData = urlObject.param || {};    //默认URL中参数填充，如果参数列表中有更新的，则使用更新的
    $.extend(reqData, paramObject);
    // console.log('url-param:',reqData,$.param(reqData));
    if (type.toLowerCase() === 'get' || type.toLowerCase() === 'delete') {
        reqData = $.param(reqData, true);
    }
    console.log('reqData:', reqData);

    return new Promise((resolve, reject) => {
        $.ajax({
            contentType: 'application/json;charset=utf-8',
            url: reqURL,
            data: typeof reqData === 'string' ? reqData : JSON.stringify(reqData),
            cache: false,
            type,
            error: (xhr, status, err) => {
                reject(err);
            },
            success: (result) => {
                if (result && result.status) {
                    reject(result);
                }
                resolve(result);
            },
        });
    });
};

export const get = (url, param) => {
    return restAjax(url, 'get', param);
};
export const post = (url, param) => {
    return restAjax(url, 'post', param);
};
export const put = (url, param) => {
    return restAjax(url, 'put', param);
};
export const del = (url, param) => {
    return restAjax(url, 'delete', param);
};
