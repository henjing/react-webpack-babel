var React = require('react');

var TableCaption = React.createClass({
    render : function () {
        return (
            <div>
                <div className="row kd-caption">
                    <div className="col-sm-1 kd-order-product">产品名称</div>
                    <div className="col-sm-1 kd-order-price">单价</div>
                    <div className="col-sm-1 kd-order-num">数量</div>
                    <div className="col-sm-1 kd-order-sum">商品总价</div>
                    <div className="col-sm-1 kd-order-add">收货地址</div>
                    <div className="col-sm-1 kd-order-status">交易状态</div>
                </div>
            </div>
        )
        
    }
});

module.exports = TableCaption;