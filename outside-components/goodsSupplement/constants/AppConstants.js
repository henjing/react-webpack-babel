var url = {
    getTotal : '/Store/getTotal',
    getTodayTotal : '/Store/getTodayTotal',
    goodsSupply : '/Store/storeSupplement',
    sendGoods : '/Store/sendGoods',
    getExpress : '/Store/getExpressList',
    getOrderNotSendYet : '/Store/getWaitSendCount',
    dump : '/Store/makeOutList'
};

var config = {
    getTotal : {
        isNull : true
    },
    getTodayTotal: {
        isNull : true
    },
    goodsSupply: {
        search : 'string',
        dateStart : 'date-string, like 2015-09-09',
        dateEnd : 'end-string',
        timeLimit : '' || 'today' || 'week' || 'month',
        status : 'all - 全部' || '0 - 未发货' || '1 - 已发货',
        page : 'number'
    },
    sendGoods : {
        record_cn : '发货订单号,例如sn234567',
        company : '快递公司名称',
        sn : '快递单号'
    }
};

module.exports = url;