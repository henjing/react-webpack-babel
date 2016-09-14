import axios from 'axios';
import store from '../store';
import { getUserSuccess } from '../actions/user-actions';
import { getUserUrl } from '../appConstants/urlConfig';

// get user auth and profile

export function getUser() {
    return axios.post(getUserUrl)
        .then(response => {
            store.dispatch(getUserSuccess(response.info));
            return response;
        });
}