var React = require('react');
var OrderStat = require('./orderStat.js');

var SearchPanel = React.createClass({
    getInitialState : function () {
        return {
            search : ''
        }
    },
    handleClick : function (flag) {
        return function () {

            if (flag == 'search') {
                this.setState({

                    search : this.refs.search.value

                }, function () {
                    this.props.get(this.state);
                }.bind(this))
            }
        }.bind(this)

    },
    render : function () {
        return (
            <div className="row kd-search order-flex-search">
                    <div className="col-sm-8">
                        <div className="row kd-flex-search order-flex-search">
                            <div className="col-sm-5">
                                <div className="kd-search-container">
                                    <div className="kd-search-box">
                                        <div className="search-icon">
                                            <i className="fa fa-search"></i>
                                        </div>
                                    </div>
                                    <input
                                        ref="search"
                                        type="text" placeholder="请输入名字,手机号或订单号" className="form-control kd-search-input" />
                                    <span
                                        onClick={this.handleClick('search')}
                                        className="kd-search-button btn btn-info">搜索</span>
                                </div>

                            </div>

                        </div>
                    </div>
                    <OrderStat />
                </div>
        )
    }
});

module.exports = SearchPanel;