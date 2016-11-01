var React = require('react');

var RowInTableRow = React.createClass({
    getInitialState : function () {
        return {
            row : this.props.row
        }
    },
    render : function () {
        return (
            <div className="row">
                <div className="col-sm-8 kd-cell-product">
                    <img src={this.state.row.goods_img} alt="" className="img-rounded kd-rowInTableRow-img" />
                    <span>{this.state.row.goods_name}</span>
                </div>
                <div className="col-sm-2 kd-cell-price">
                    <span>{this.state.row.goods_price}</span>
                </div>
                <div className="col-sm-2 kd-cell-num">
                    <span>{this.state.row.goods_num}</span>
                </div>
            </div>
        )
    }
});

module.exports = RowInTableRow;