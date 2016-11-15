import axios from 'axios';
import store from '../store';
import { getUserSuccess } from '../actions/user-actions';
import { getUserUrl } from '../appConstants/urlConfig';
import { message } from 'antd';

// get user auth and profile

export function getUser() {

    return axios.post(getUserUrl)
        .then(data => {
            // console.log(data);
            const response = data.data;
            // console.log('data', data);
            if (response.status === 1) {
                store.dispatch(getUserSuccess(response));
            }
            return response;
        }).then(response => {
            if (response.status === 0) {
                // 服务器没有返回值
                // message.warning(response.info);
            }
            return response;
        }).catch(err => {
            message.error('服务器错误! ' + err);
            // console.error(err);
        })
}