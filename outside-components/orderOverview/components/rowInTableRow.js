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
                <div className="col-sm-8 kd-cell-product kd-overview-cell-product">
                    <img src={this.state.row.img_path} alt="" className="img-rounded kd-rowInTableRow-img" />
                    <span>{this.state.row.goods_name}</span>
                </div>
                <div className="col-sm-2 kd-cell-price kd-overview-cell-price">
                    <span>{this.state.row.goods_prices}</span>
                </div>
                <div className="col-sm-2 kd-cell-num kd-overview-cell-num">
                    <span>{this.state.row.goods_numbers}</span>
                </div>
            </div>
        )
    }
});

module.exports = RowInTableRow;