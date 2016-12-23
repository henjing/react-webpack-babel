import commonAjax, { commonGetAjax} from '../helpers/commonAjax';
import {getCashierApplyUrlList, decideCashierApplyUrl, getCashierApplyDetailUrl, getCashierGoodsTypeList, villageBankInfo, addVillageBankInfo, deleteTuHuoJieSuanPictureUrl, addJieSuanInfoToVillageUrl, getJieSuanInfoFromVillageUrl, getJieSuanListForDianShangBu, successJieSuanApplyForDianShangBu} from '../appConstants/urlConfig';

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

// 土货结算
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

export function deleteTuHuoJieSuanPicture(config, sucCallback, failCallback) {
    return commonAjax(deleteTuHuoJieSuanPictureUrl, config, function (info) {
        if (sucCallback) sucCallback(info);
    }, function (info) {
        if (failCallback) failCallback(info);
    })
}

export function addJieSuanInfoToVillage(config, sucCallback, failCallback) {
    return commonAjax(addJieSuanInfoToVillageUrl, config, function (info) {
        if (sucCallback) sucCallback(info);
    }, function (info) {
        if (failCallback) failCallback(info);
    })
}

export function getJieSuanInfoFromVillage(config, sucCallback, failCallback) {
    return commonAjax(getJieSuanInfoFromVillageUrl, config, function (info) {
        if (sucCallback) sucCallback(info);
    }, function (info) {
        if (failCallback) failCallback(info);
    })
}

export function getJieSuanApplyListForDianShangBu(config, sucCallback, failCallback) {
    return commonAjax(getJieSuanListForDianShangBu, config, function (info) {
        if (sucCallback) sucCallback(info);
    }, function (info) {
        if (failCallback) failCallback(info);
    })
}

export function successJieSuanApplyFromDianShangBu(config, sucCallback, failCallback) {
    return commonAjax(successJieSuanApplyForDianShangBu, config, function (info) {
        if (sucCallback) sucCallback(info);
    }, function (info) {
        if (failCallback) failCallback(info);
    })
}