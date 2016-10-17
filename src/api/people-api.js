import axios from 'axios';
import store from '../store';
import { getPeopleSuccess, getVillageSuccess, getPeopleReset } from '../actions/people-actions';
import { getPeopleUrl, getVillageUrl, addPeopleUrl, deletePeopleUrl, editPeopleUrl } from '../appConstants/urlConfig';
import { message } from 'antd';

// 拿到贫困户列表

export function getPeople() {
    return axios.post(getPeopleUrl, formData(store.getState().peopleSearchState))
        .then(data => {
            const response = data.data;
            if (response.status == 1) {
                store.dispatch(getPeopleSuccess(Object.assign({}, {...response})));
            }
            return response;
        }).then(response => {
            if (response.status == 0) {
                // message.warning(response.info);
                store.dispatch(getPeopleReset());
            }
        }).catch(err => {
            message.error('服务器错误! ' + err);
        })
}

export function getVillage() {
    return axios.post(getVillageUrl)
        .then(data => {
            const response = data.data;
            if (response.status == 1) {
                store.dispatch(getVillageSuccess(response));
            }
            return response;
        }).then(response => {
            if (response.status == 0) {
                // message.warning(response.info);
            }
        }).catch(err => {
            message.error('服务器错误! ' + err);
        })
}

export function addPeople(config, callback) {
    return axios.post(addPeopleUrl, formData(config))
        .then(data => {
            const response = data.data;
            if (response.status == 1) {
                message.success(response.info);
                getPeople();
                if(callback) callback();
            }
            return response;
        }).then(response => {
            if (response.status == 0) {
                message.warning(response.info);
            }
        }).catch(err => {
            message.error('服务器错误! ' + err);
        })
}

export function editPeople(config, callback) {
    return axios.post(editPeopleUrl, formData(config))
        .then(data => {
            const response = data.data;
            if (response.status == 1) {
                message.success(response.info);
                getPeople();
                if(callback) callback();
            }
            return response;
        }).then(response => {
            if (response.status == 0) {
                message.warning(response.info);
            }
        }).catch(err => {
            message.error('服务器错误! ' + err);
        })
}

export function deletePeople(config) {
    return axios.post(deletePeopleUrl, formData(config))
        .then(data => {
            const response = data.data;
            if (response.status == 1) {
                message.success(response.info);
                getPeople();
            }
            return response;
        }).then(response => {
            if (response.status == 0) {
                message.warning(response.info);
            }
        }).catch(err => {
            message.error('服务器错误! ' + err);
        })
}

function formData(config) {
    // console.log('11111111111', config);
    let formData = new FormData();
    
    for (let i in config) {
        if (config[i]) formData.append(i, config[i]);
    }
    
    return formData;
}