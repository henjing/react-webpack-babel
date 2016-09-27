import axios from 'axios';
import store from '../store';
import { getPeopleSuccess } from '../actions/user-actions';
import { getPeopleUrl } from '../appConstants/urlConfig';

// 拿到贫困户列表

export function getPeople() {
    return axios.post(getPeopleUrl)
        .then(response => {
            console.log(response);
            store.dispatch(getPeopleSuccess(response.data.info));
        });
}