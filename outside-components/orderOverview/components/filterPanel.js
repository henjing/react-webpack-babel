var React = require('react');
var fetch = require('../helpers/fetch.js');
var url = require('../constants/AppConstants.js');
var InputGroup = require('./inputGroup.js');
var DatepickerContainer = require('./datepickerContainer');

var FilterPanel = React.createClass({
    getInitialState : function () {
        return {
            timeLimit : '',
            buttonActive : ''
        }
    },
    componentDidMount : function () {

    },
    getDateStart : function (dateStart) {
        console.log('dateStart', dateStart);
        this.setState({dateStart : dateStart}, function () {
            this.props.get(this.state);
        });
    },
    getDateEnd : function (dateEnd) {
        console.log('dateEnd', dateEnd);
        this.setState({dateEnd : dateEnd}, function () {
            this.props.get(this.state);
        });
    },
    handleClick : function (flag) {
        return function () {
            this.setState({
                timeLimit : flag,
                buttonActive : flag
            }, function () {
                this.props.get(this.state);
            }.bind(this))
        }.bind(this)
    },
    show : function () {

    },
    render : function () {
        var dumpUrl = url.dump;
        return (
            <div>
                <div className="row kd-select order-select">
                    <div className="col-sm-8">
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
                    <div className="col-sm-4 kd-select-right order-select">
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