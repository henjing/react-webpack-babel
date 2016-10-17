import axios from 'axios';
import store from '../store';
import { getEnrollUrl, getPeopleForEnroll, addEnrollUrl, delEnrollUrl, printPreviewUrl, submitPrintUrl } from '../appConstants/urlConfig';
import { getEnrollSuccess, getPeopleForEnrollSuccess, printPreviewModal, getEnrollReset } from '../actions/enroll-actions';
import { message } from 'antd';
import qs from 'qs';

export function getEnrollList(config, callback) {
    return axios.post(getEnrollUrl, formData(config))
        .then(data => {
            const response = data.data;
            if (response.status == 1) {
                store.dispatch(getEnrollSuccess(Object.assign({}, {...response})));
                if (callback) callback();
            }
            return response;
        }).then(response => {
            if (response.status == 0) {
                store.dispatch(getEnrollReset());
                // message.warning(response.info);
            }
        }).catch(errHandler)
}

export function getEnrollPeopleList(callback) {
    return axios.post(getPeopleForEnroll)
        .then(data => {
            const response = data.data;
            if (response.status == 1) {
                store.dispatch(getPeopleForEnrollSuccess(Object.assign([], response.info)));
                if (callback) callback();
            }
            return response;
        }).then(response => {
            if (response.status == 0) {
                // message.warning(response.info);
            }
        }).catch(errHandler)
}

export function addEnrollProduct(config, callback) {
    console.log('config', config);
    return axios.post(addEnrollUrl, qs.stringify(config, {
        arrayFormat : 'brackets'
    }), {
        headers : {
            "Content-Type": "application/x-www-form-urlencoded"
        }
    })
        .then(data => {
            const response = data.data;
            if (response.status == 1) {
                message.success('添加订单成功');
                if (callback) callback();
            }
            return response;
        }).then(response => {
            if (response.status == 0) {
                message.warning(response.info);
            }
        }).catch(errHandler)
}

export function printPreview(config, callback) {
    return axios.post(printPreviewUrl, formData(config))
        .then(data => {
            const response = data.data;
            if (response.status == 1) {
                store.dispatch(printPreviewModal(Object.assign({}, {visible : true}, {...response})));
                if (callback) callback();
            }
            return response;
        }).then(response => {
            if (response.status == 0) {
                message.warning(response.info);
            }
        }).catch(errHandler)
}

export function submitPrint(config, callback) {
    return axios.post(submitPrintUrl, formData(config))
        .then(data => {
            const response = data.data;
            if (response.status == 1) {
                message.success(response.info);
                if (callback) callback();
            }
            return response;
        }).then(response => {
            if (response.status == 0) {
                message.warning(response.info);
            }
        }).catch(errHandler)
}

export function deleteEnrollProduct(config, callback) {
    return axios.post(delEnrollUrl, formData(config))
        .then(data => {
            const response = data.data;
            if (response.status == 1) {
                message.success('删除产品成功');
                if (callback) callback();
            }
            return response;
        }).then(response => {
            if (response.status == 0) {
                message.warning(response.info);
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