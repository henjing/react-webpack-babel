var React = require('react');
var url = require('../constants/AppConstants.js');
var fetch = require('../helpers/fetch.js');

var errorFunc = function (err) {
    console.error(err);
    this.setState({
        todayTotal : '服务器错误',
        totalTotal : '服务器错误'
    });
};

var orderStat = React.createClass({
    componentDidMount : function () {
        fetch({}, url.getTotal, function (res) {
            if (res.status == 1) {
                this.setState({totalTotal : res.info});
            } else {
                this.setState({totalTotal : '服务器返回值为0'});
            }

        }.bind(this), errorFunc.bind(this));
        
        fetch({}, url.getTodayTotal, function (res) {
            // console.log('当天订单', res);
            if (res.status == 1) {
                this.setState({todayTotal : res.info});
            } else {
                this.setState({todayTotal : '服务器返回值为0'});
            }
        }.bind(this), errorFunc.bind(this));
    },
    getInitialState : function () {
        return {
            todayTotal : 0,
            totalTotal : 0
        }
    },
    render : function () {
        return (
            <div className="col-sm-4">
                <div className="row">
                    <div className="col-sm-6 kd-flex-search-panel">
                        <h2>{this.state.todayTotal}</h2>
                        <p>今日新增订单</p>
                    </div>
                    <div className="col-sm-6 kd-flex-search-panel">
                        <h2>{this.state.totalTotal}</h2>
                        <p>订单总数</p>
                    </div>
                </div>
            </div>
        )
    }
});

module.exports = orderStat;
