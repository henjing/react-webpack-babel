import axios from 'axios';
import store from '../store';
import { getProductUrl, editProductUrl, deleteProductUrl, addProductUrl } from '../appConstants/urlConfig';
import { getProductSuccess, getProductReset, productModal } from '../actions/product-actions';
import { message } from 'antd';

export function getProductList() {
    return axios.post(getProductUrl)
        .then(data => {
            const response = data.data;
            if (response.status == 1) {
                store.dispatch(getProductSuccess(Object.assign([], response.info)));
            }
            return response;
        }).then(response => {
            if (response.status == 0) {
                // message.info(response.info);
                store.dispatch(getProductReset(Object.assign([], response.info)));
            }
        }).catch(errHandler)
}

export function addProduct(config) {
    return axios.post(addProductUrl, formData(config))
        .then(data => {
            const response = data.data;
            if (response.status == 1) {
                message.success('添加产品成功');
                store.dispatch(productModal({ visible : false }));
                getProductList();
            }
            return response;
        }).then(response => {
            if (response.status == 0) {
                message.warning(response.info);
            }
        }).catch(errHandler)
}

export function editProduct(config) {
    return axios.post(editProductUrl, formData(config))
        .then(data => {
            const response = data.data;
            if (response.status == 1) {
                message.success('编辑产品成功');
                store.dispatch(productModal({ visible : false }));
                getProductList();
            }
            return response;
        }).then(response => {
            if (response.status == 0) {
                message.warning(response.info);
            }
        }).catch(errHandler)
}

export function deleteProduct(config) {
    return axios.post(deleteProductUrl, formData(config))
        .then(data => {
            const response = data.data;
            if (response.status == 1) {
                message.success('删除产品成功');
                store.dispatch(productModal({ visible : false }));
                getProductList();
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