var React = require('react');
var height = require('../constants/TableRowConstants.js');
var RowInTableRow = require('./rowInTableRow.js');

var TableRow = React.createClass({
    getInitialState : function () {
        return {
            height : 'auto',
            add_time : this.props.row.add_time || '',
            address : this.props.row.address || '',
            consignee : this.props.row.user_name || '',
            goods_infos : this.props.row.goods_infos || [],
            record_sn : this.props.row.order_sn || '',
            store_name : this.props.row.company_name || '',
            total_price : this.props.row.total_price || 0,
            mobile : this.props.row.cellphone || '',
        }
    },

    render : function () {
        var millSec = parseInt(this.state.add_time);
        var time = new Date(millSec * 1000);
        var add_time = time.toLocaleDateString() + ' ' + time.toLocaleTimeString();
        var length = this.state.goods_infos.length;
        var rows = [];
        var heightInside = height * length;
        var prices = 0;
        for (var i = 0; i < length; i++) {
            rows.push(
                <RowInTableRow key={i} row={this.state.goods_infos[i]} />
            );
            prices += parseFloat(this.state.goods_infos[i]['total_prices']);
        }
        
        return (
            <div className="row kd-order">
                <div className="col-sm-12 kd-order-overview">
                    <span>{add_time}</span>
                    <span>订单号：{this.state.record_sn}</span>
                    <span><i className="fa fa-home"></i>{this.state.store_name}</span>
                </div>
                <div className="clearfix"></div>
                <div className="col-sm-6 kd-order-cell kd-overview-order-cell">
                    {rows}
                </div>
                <div className="col-sm-2 kd-order-sum kd-overview-sum" style={{height : heightInside + 'px'}}>
                    <p>{prices}</p>

                </div>
                <div className="col-sm-2 kd-order-add kd-overview-customer" style={{height : heightInside + 'px'}}>
                    <p>{this.state.consignee}</p>
                    <p>{this.state.mobile}</p>
                </div>
                <div className="col-sm-2 kd-order-add kd-overview-add" style={{height : heightInside + 'px'}}>

                    <p>{this.state.address}</p>
                </div>
                <div className="col-sm-2 kd-order-status kd-overview-status" style={{height : heightInside + 'px'}}>
                    <p>已付款</p>
                    <p>订单已完成</p>
                </div>
            </div>
        )
    }
});

module.exports = TableRow;