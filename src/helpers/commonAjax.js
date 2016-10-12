import axios from 'axios';
import { message } from 'antd';

export default function (url, config, suncCallback, failCallback) {
    return axios.post(url, formData(config))
        .then(data => {
            const response = data.data;
            if (response.status == 1) {
                if (suncCallback) suncCallback();
            }
            return response;
        }).then(response => {
            if (response.status == 0) {
                message.warning(response.info);
                if (failCallback) failCallback();
            }
        }).catch(errHandler)
}

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