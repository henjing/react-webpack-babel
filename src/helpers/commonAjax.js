import axios from 'axios';
import { message } from 'antd';
import { logoutUrl } from '../appConstants/urlConfig';

export default function (url, config, suncCallback, failCallback) {
    return axios.post(url, formData(config))
        .then(data => {
            const response = data.data;
            if (response.status == 1) {
                if (suncCallback) suncCallback(response);
            }
            return response;
        }).then(response => {
            if (response.status == 0) {
                // message.warning(response.info);
                if (failCallback) failCallback(response);
            }
            return response;
        }).then(response => {
            if (response.status == -1) {
                window.location.pathname = logoutUrl;
            }
        }).catch(errHandler)
}

export function commonGetAjax (url, config, suncCallback, failCallback) {
    return axios.get(url, formData(config))
        .then(data => {
            const response = data.data;
            if (response.status == 1) {
                if (suncCallback) suncCallback(response);
            }
            return response;
        }).then(response => {
            if (response.status == 0) {
                // message.warning(response.info);
                if (failCallback) failCallback(response);
            }
            return response;
        }).then(response => {
            if (response.status == -1) {
                window.location.pathname = logoutUrl;
            }
        }).catch(errHandler)
}

function errHandler(err) {
    message.error('服务器错误! ' + err);
    console.log(err);
}

function formData(config) {
    // console.log('11111111111', config);
    let formData = new FormData();
    
    for (let i in config) {
        if (config[i]) formData.append(i, config[i]);
    }
    
    return formData;
}