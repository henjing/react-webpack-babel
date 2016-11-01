var url = {
    getOrder : '/Store/orderList',
    dump : '/Store/makeOutOrder',
    getTotalOrderCount : '/Store/getTotalOrderCount',
    getTodayOrderCount : '/Store/getTodayOrderCount'
};

var config = {
    getOrder: {
        search : 'string',
        dateStart : 'date-string, like 2015-09-09',
        dateEnd : 'end-string',
        timeLimit : '' || 'today' || 'week' || 'month',
        page : 'number'
    }
};

module.exports = url;