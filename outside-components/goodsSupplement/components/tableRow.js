var React = require('react');
var height = require('../constants/TableRowConstants.js');
var slogan = require('../constants/TableSloganConstants.js');
var RowInTableRow = require('./rowInTableRow.js');

var TableRow = React.createClass({
    getInitialState : function () {
        return {
            height : 'auto',
            add_time : this.props.row.add_time || '',
            address : this.props.row.address || '',
            consignee : this.props.row.consignee || '',
            goods_infos : this.props.row.goods_infos || [],
            record_sn : this.props.row.record_sn || '',
            status : this.props.row.status || '', // 0是没发货,1是已发货,2是已完成
            store_name : this.props.row.store_name || '',
            subsidy : this.props.row.subsidy || 0,
            total_price : this.props.row.total_price || 0,
            mobile : this.props.row.mobile || '',
            express_company : this.props.row.express_company || '',
            express_sn : this.props.row.express_sn || ''
        }
    },
    showButton : function () {
        if (this.state.status == 0) {
            return (
                <div>
                        <p>
                            <span onClick={this.openModal} className="btn btn-default">我要发货</span>
                        </p>
                        <p>
                            <span className="btn btn-default disabled">物流信息</span>
                        </p>
                </div>
            )
        } else if (this.state.status == 1 || this.state.status == 2) {
            return (
                <div>
                        <p>
                            <span>交易完成</span>
                        </p>
                        <p>
                            <span onClick={this.openModal} className="btn btn-default">物流信息</span>
                        </p>
                </div>
            )
        }
    },
    openModal : function () {
        if (this.state.status == 0) {
            this.props.setRow(this.props.row, 'deliver');
        } else if (this.state.status == 1 || this.state.status == 2) {
            this.props.setRow(this.props.row, 'display');
        }

        this.props.doOpen();
    },
    render : function () {
        var millSec = parseInt(this.state.add_time);
        var time = new Date(millSec * 1000);
        var add_time = time.toLocaleDateString() + ' ' + time.toLocaleTimeString();
        var length = this.state.goods_infos.length;
        var rows = [];
        var heightInside = height * length + 40;
        for (var i = 0; i < length; i++) {
            rows.push(
                <RowInTableRow key={i} row={this.state.goods_infos[i]} />
            )
        }
        
        return (
            <div className="row kd-order">
                <div className="col-sm-12 kd-order-overview">
                    <span>{add_time}</span>
                    <span>订单号：{this.state.record_sn}</span>
                    <span><i className="fa fa-home"></i>{this.state.store_name}</span>
                </div>
                <div className="clearfix"></div>
                <div className="col-sm-6 kd-order-cell">
                    {rows}
                    <div className="row">
                        <div className="col-sm-12 kd-cell-text">
                            <span>{slogan}</span>
                        </div>
                    </div>
                </div>
                <div className="col-sm-2 kd-order-sum" style={{height : heightInside + 'px'}}>
                    <p>{this.state.total_price}</p>
                    <p>（运费补贴：{this.state.subsidy}）</p>
                </div>
                <div className="col-sm-2 kd-order-add" style={{height : heightInside + 'px'}}>
                    <p>{this.state.consignee}</p>
                    <p>{this.state.mobile}</p>
                    <p>{this.state.address}</p>
                </div>
                <div className="col-sm-2 kd-order-status" style={{height : heightInside + 'px'}}>
                    {this.showButton()}
                </div>
            </div>
        )
    }
});

module.exports = TableRow;