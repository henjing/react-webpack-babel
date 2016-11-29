import axios from 'axios';
import store from '../store';
import { getProvincesUrl, getVillageDetailListUrl, getCitiesByProvinceUrl, getDistrictsByCityUrl, getVillagesByDistrictUrl, addVillageUrl } from '../appConstants/urlConfig';
import { updateAppInteractionState } from '../actions/app-actions';
import { message } from 'antd';
import qs from 'qs';
import commonAjax, { commonGetAjax } from '../helpers/commonAjax';

export function getProvinces(config, callback) {
    return axios.get(getProvincesUrl, formData(config))
        .then(data => {
            const response = data.data;
            if (response.status == 1) {
                store.dispatch(updateAppInteractionState(Object.assign({}, { provinces : {...response} })));
                if (callback) callback(response);
            }
            return response;
        }).then(response => {
            if (response.status == 0) {
                store.dispatch(updateAppInteractionState(Object.assign({}, { provinces : {...response} })));
                // message.warning(response.info);
            }
        }).catch(errHandler)
}

export function getCities(config, sucCallback, failCallback) {
    return commonAjax(getCitiesByProvinceUrl, config, function (info) {
        // store.dispatch(updateAppInteractionState(Object.assign({}, { cities : [...info] })));
        if (sucCallback) sucCallback(info);
    }, function (info) {
        // store.dispatch(updateAppInteractionState(Object.assign({}, { cities : [...info] })));
        if (failCallback) failCallback(info);
    })
}

export function getDistricts(config, sucCallback, failCallback) {
    return commonAjax(getDistrictsByCityUrl, config, function (info) {
        // store.dispatch(updateAppInteractionState(Object.assign({}, { cities : [...info] })));
        if (sucCallback) sucCallback(info);
    }, function (info) {
        // store.dispatch(updateAppInteractionState(Object.assign({}, { cities : [...info] })));
        if (failCallback) failCallback(info);
    })
}

export function getVillages(config, sucCallback, failCallback) {
    return commonAjax(getVillagesByDistrictUrl, config, function (info) {
        // store.dispatch(updateAppInteractionState(Object.assign({}, { cities : [...info] })));
        if (sucCallback) sucCallback(info);
    }, function (info) {
        // store.dispatch(updateAppInteractionState(Object.assign({}, { cities : [...info] })));
        if (failCallback) failCallback(info);
    })
}

export function addVillage(config, sucCallback, failCallback) {
    return commonAjax(addVillageUrl, config, function (info) {
        // store.dispatch(updateAppInteractionState(Object.assign({}, { cities : [...info] })));
        if (sucCallback) sucCallback(info);
    }, function (info) {
        // store.dispatch(updateAppInteractionState(Object.assign({}, { cities : [...info] })));
        if (failCallback) failCallback(info);
    })
}

// export function getCities(config, callback) {
//     return axios.post(getCitiesByProvinceUrl, formData(config))
//         .then(data => {
//             const response = data.data;
//             // if (response.status == 1) {
//             if (response) {
//                 store.dispatch(updateAppInteractionState(Object.assign({}, { cities : [...response] })));
//                 if (callback) callback();
//             }
//             return response;
//         }).then(response => {
//             if (response.status == 0) {
//                 store.dispatch(updateAppInteractionState(Object.assign({}, { cities : [...response] })));
//                 // message.warning(response.info);
//             }
//         }).catch(errHandler)
// }

export function getVillageDetailList(config, callback) {
    return axios.post(getVillageDetailListUrl, formData(config))
        .then(data => {
            const response = data.data;
            if (response.status == 1) {
            // if (response) {
                store.dispatch(updateAppInteractionState(Object.assign({}, { villages : {...response}})));
                if (callback) callback();
            }
            return response;
        }).then(response => {
            if (response.status == 0) {
                store.dispatch(updateAppInteractionState(Object.assign({}, { villages : {...response} }, { villages : { info : []}})));
                // message.warning(response.info);
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