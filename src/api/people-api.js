import axios from 'axios';
import store from '../store';
import { getPeopleSuccess } from '../actions/people-actions';
import { getPeopleUrl } from '../appConstants/urlConfig';
import { message } from 'antd';

// 拿到贫困户列表

export function getPeople() {
    return axios.post(getPeopleUrl)
        .then(data => {
            const response = data.data;
            if (response.status === 1) {
                store.dispatch(getPeopleSuccess(response.info));
            }
            return response;
        }).then(response => {
            if (response.status === 0) {
                message.warning(response.info);
            }
        }).catch(err => {
            message.error('服务器错误! ' + err);
        })
}