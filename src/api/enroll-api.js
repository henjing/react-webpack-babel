import axios from 'axios';
import store from '../store';
import { getEnrollUrl, getPeopleForEnroll, getPrinterList, printPreview } from '../appConstants/urlConfig';
import { getEnrollSuccess, editProductSuccess, deleteProductSuccess, addProductSuccess, productModal } from '../actions/enroll-actions';
import { message } from 'antd';

export function getEnrollList() {
    return axios.post(getEnrollUrl)
        .then(data => {
            const response = data.data;
            if (response.status == 1) {
                store.dispatch(getProductSuccess(Object.assign([], response.info)));
            }
            return response;
        }).then(response => {
            if (response.status == 0) {
                
            }
        }).catch(errHandler)
}

// export function addProduct(config) {
//     return axios.post(addProductUrl, formData(config))
//         .then(data => {
//             const response = data.data;
//             if (response.status == 1) {
//                 message.success('添加产品成功');
//                 store.dispatch(productModal({ visible : false }));
//                 getProductList();
//             }
//             return response;
//         }).then(response => {
//             if (response.status == 0) {
//                 message.warning(response.info);
//             }
//         }).catch(errHandler)
// }
//
// export function editProduct(config) {
//     return axios.post(editProductUrl, formData(config))
//         .then(data => {
//             const response = data.data;
//             if (response.status == 1) {
//                 message.success('编辑产品成功');
//                 store.dispatch(productModal({ visible : false }));
//                 getProductList();
//             }
//             return response;
//         }).then(response => {
//             if (response.status == 0) {
//                 message.warning(response.info);
//             }
//         }).catch(errHandler)
// }
//
// export function deleteProduct(config) {
//     return axios.post(deleteProductUrl, formData(config))
//         .then(data => {
//             const response = data.data;
//             if (response.status == 1) {
//                 message.success('删除产品成功');
//                 store.dispatch(productModal({ visible : false }));
//                 getProductList();
//             }
//             return response;
//         }).then(response => {
//             if (response.status == 0) {
//                 message.warning(response.info);
//             }
//         }).catch(errHandler)
// }

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