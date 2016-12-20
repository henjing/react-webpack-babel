import commonAjax, { commonGetAjax} from '../helpers/commonAjax';
import {getCashierApplyUrlList, decideCashierApplyUrl, getCashierApplyDetailUrl, getCashierGoodsTypeList, villageBankInfo, addVillageBankInfo} from '../appConstants/urlConfig';

export function getGoodsList(config, sucCallback, failCallback) {
    return commonAjax(getCashierGoodsTypeList, config, function (info) {
        if (sucCallback) sucCallback(info);
    }, function (info) {
        if (failCallback) failCallback(info);
    });
}

export function getCashierApplyList(config, sucCallback, failCallback) {
    return commonAjax(getCashierApplyUrlList, config, function (info) {
        if (sucCallback) sucCallback(info);
    }, function (info) {
        if (failCallback) failCallback(info);
    });
}

export function decideCashierResult(config, sucCallback, failCallback) {
    return commonAjax(decideCashierApplyUrl, config, function (info) {
        if (sucCallback) sucCallback(info);
    }, function (info) {
        if (failCallback) failCallback(info);
    });
}

export function getCashierApplyDetailList(config, sucCallback, failCallback) {
    return commonAjax(getCashierApplyDetailUrl, config, function (info) {
        if (sucCallback) sucCallback(info);
    }, function (info) {
        if (failCallback) failCallback(info);
    });
}

export function showVillageBankInfo(config, sucCallback, failCallback) {
    return commonAjax(villageBankInfo, config, function (info) {
        if (sucCallback) sucCallback(info);
    }, function (info) {
        if (failCallback) failCallback(info);
    })
}

export function addVillageBank(config, sucCallback, failCallback) {
    return commonAjax(addVillageBankInfo, config, function (info) {
        if (sucCallback) sucCallback(info);
    }, function (info) {
        if (failCallback) failCallback(info);
    })
}