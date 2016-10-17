import axios from 'axios';
import store from '../store';
import { getPrinterListUrl, bindPrinterUrl, delPrinterUrl } from '../appConstants/urlConfig';
import { getPrinterListSuccess } from '../actions/printer-actions';
import { message } from 'antd';
import qs from 'qs';

export function getPrinterList(config, callback) {
    return axios.post(getPrinterListUrl, formData(config))
        .then(data => {
            const response = data.data;
            if (response.status == 1) {
                store.dispatch(getPrinterListSuccess(Object.assign({}, {...response})));
                if (callback) callback();
            }
            return response;
        }).then(response => {
            if (response.status == 0) {
                // message.warning(response.info);
            }
        }).catch(errHandler)
}

export function bindPrinter(config, callback) {
    return axios.post(bindPrinterUrl, formData(config))
        .then(data => {
            const response = data.data;
            if (response.status == 1) {
                message.success('绑定成功');
                if (callback) callback();
            }
            return response;
        }).then(response => {
            if (response.status == 0) {
                message.warning(response.info);
            }
        }).catch(errHandler)
}

export function delPrinter(config, callback) {
    return axios.post(delPrinterUrl, formData(config))
        .then(data => {
            const response = data.data;
            if (response.status == 1) {
                message.success('删除成功');
                if (callback) callback();
            }
            return response;
        }).then(response => {
            if (response.status == 0) {
                message.warning(response.info);
            }
        }).catch(errHandler)
}

// export function addEnrollProduct(config, callback) {
//     console.log('config', config);
//     return axios.post(addEnrollUrl, qs.stringify(config, {
//         arrayFormat : 'brackets'
//     }), {
//         headers : {
//             "Content-Type": "application/x-www-form-urlencoded"
//         }
//     })
//         .then(data => {
//             const response = data.data;
//             if (response.status == 1) {
//                 message.success('添加订单成功');
//                 if (callback) callback();
//             }
//             return response;
//         }).then(response => {
//             if (response.status == 0) {
//                 message.warning(response.info);
//             }
//         }).catch(errHandler)
// }

function errHandler(err) {
    message.error('服务器错误! ' + err);
}

function formData(config) {
    // console.log('11111111111', config);
    let formData = new FormData();
    
    for (let i in config) {
        if (config[i]) formData.append(i, config[i]);
    }
    
    return formData;
}