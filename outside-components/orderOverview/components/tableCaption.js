var React = require('react');

var TableCaption = React.createClass({
    render : function () {
        return (
            <div>
                <div className="row kd-caption">
                    <div className="col-sm-1 kd-order-product kd-overview-product">产品名称</div>
                    <div className="col-sm-1 kd-order-price kd-overview-price">单价</div>
                    <div className="col-sm-1 kd-order-num kd-overview-num">数量</div>
                    <div className="col-sm-1 kd-order-sum kd-overview-sum">商品总价</div>
                    <div className="col-sm-1 kd-order-sum kd-overview-customer">下单用户</div>
                    <div className="col-sm-1 kd-order-add kd-overview-add">下单地址</div>
                    <div className="col-sm-1 kd-order-status kd-overview-status">交易状态</div>
                </div>
            </div>
        )
        
    }
});

module.exports = TableCaption;