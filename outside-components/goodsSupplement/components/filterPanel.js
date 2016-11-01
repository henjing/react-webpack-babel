var React = require('react');
var fetch = require('../helpers/fetch.js');
var url = require('../constants/AppConstants.js').getOrderNotSendYet;
var dumpUrl = require('../constants/AppConstants.js').dump;
var InputGroup = require('./inputGroup.js');

var FilterPanel = React.createClass({
    getInitialState : function () {
        return {
            status : 'all',
            orderNotSendYet : '',
            buttonActive : ''
        }
    },
    componentDidMount : function () {
        fetch({}, url, function (res) {
            console.log('获取未完成订单', res);
            this.setState({orderNotSendYet: res.info});
        }.bind(this), function (err) {
            console.error(err);
        }.bind(this))
    },
    handleClick : function (flag) {
        return function () {
            this.setState({
                status : flag,
                buttonActive : flag
            }, function () {
                this.props.get(this.state, 'filter');
            }.bind(this))
        }.bind(this)
    },
    show : function () {
        if (typeof this.state.orderNotSendYet !== 'number') {
            return null
        } else {
            return (
                <i>{this.state.orderNotSendYet}</i>
            )
        }
    },
    render : function () {

        return (
            <div>
                <div className="row kd-select">
                        <div className="col-sm-8 kd-select-left">
                            <span
                                onClick={this.handleClick('all')}
                                className={"btn btn-default kd-type-picker" + ' ' + (this.state.buttonActive == 'all' ? 'active' : '') }>全部订单</span>
                            <span
                                onClick={this.handleClick('1')}
                                className={"btn btn-default kd-type-picker" + ' ' + (this.state.buttonActive == '1' ? 'active' : '') }>已发货订单</span>
                            <span
                                onClick={this.handleClick('0')}
                                className={"btn btn-default kd-type-picker" + ' ' + (this.state.buttonActive == '0' ? 'active' : '') }>未发货订单
                                {this.show()}
                            </span>
                        </div>
                        <div className="col-sm-4 kd-select-right">
                            <form action={dumpUrl} method="post">
                                <InputGroup config={this.props.config} />

                                <button
                                    type="submit"
                                    className="btn btn-success kd-button">
                                    <i className="fa fa-share-square-o"></i>
                                    导出列表
                                </button>
                            </form>
                        </div>
                </div>
            </div>
        )
    }
});

module.exports = FilterPanel;