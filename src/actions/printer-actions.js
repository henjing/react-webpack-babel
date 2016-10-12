import * as types from './action-types';

export function getPrinterListSuccess(info) {
    return {
        type : types.GET_PRINTER_LIST_SUCCESS,
        info
    }
}

