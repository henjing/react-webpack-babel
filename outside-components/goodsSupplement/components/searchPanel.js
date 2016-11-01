var React = require('react');
var OrderStat = require('./orderStat.js');
var DatepickerContainer = require('./datepickerContainer.js');

var SearchPanel = React.createClass({
    getInitialState : function () {
        return {
            search : '',
            dateStart : '',
            dateEnd : '',
            timeLimit : '',
            buttonActive : ''
        }
    },
    handleClick : function (flag) {
        return function () {
            if (flag == 'today') {this.setState({timeLimit : 'today', buttonActive : 'today'}, function () {
                this.props.get(this.state);
            }.bind(this))}
            if (flag == 'week') {this.setState({timeLimit : 'week', buttonActive : 'week'}, function () {
                this.props.get(this.state);
            }.bind(this))}
            if (flag == 'month') {this.setState({timeLimit : 'month', buttonActive : 'month'}, function () {
                this.props.get(this.state);
            }.bind(this))}

            if (flag == 'search') {
                this.setState({
                    search : this.refs.search.value
                }, function () {
                    this.props.get(this.state);
                }.bind(this))
            }
        }.bind(this)
    },
    getDateStart : function (dateStart) {
        console.log('dateStart', dateStart);
        this.setState({dateStart : dateStart});
    },
    getDateEnd : function (dateEnd) {
        console.log('dateEnd', dateEnd);
        this.setState({dateEnd : dateEnd});
    },
    render : function () {
        return (
            <div className="row kd-search">
                    <div className="col-sm-8">
                        <div className="row kd-flex-search">
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

                            <div className="col-sm-12">
                                <form className="form-inline">

                                <DatepickerContainer
                                    getDateStart={this.getDateStart}
                                    getDateEnd={this.getDateEnd} />

                                  <span
                                      onClick={this.handleClick('today')}
                                      className={"kd-date-picker" + ' ' + (this.state.buttonActive == 'today' ? 'active' : '')}>今日</span>
                                  <span
                                      onClick={this.handleClick('week')}
                                      className={"kd-date-picker " + (this.state.buttonActive == 'week' ? 'active' : '')}>本周</span>
                                  <span
                                      onClick={this.handleClick('month')}
                                      className={"kd-date-picker " + (this.state.buttonActive == 'month' ? 'active' : '')}>本月</span>
                                 </form>
                            </div>
                        </div>
                    </div>
                    <OrderStat />
                </div>
        )
    }
});

module.exports = SearchPanel;