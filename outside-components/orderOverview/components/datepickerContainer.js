var React = require('react');
var DatePicker = require('react-datepicker');
var moment = require('moment');

require('react-datepicker/dist/react-datepicker.css');

var DatepickerContainer = React.createClass({
    handleChange : function (flag) {
        return function (momentObj) {
            // console.log('flag, string', flag, momentObj);
            if (flag == 'dateStart') {
                this.setState({startDate : momentObj});
                this.props.getDateStart(momentObj.format('YYYY/MM/DD'));
            } else if (flag == 'dateEnd') {
                this.setState({endDate : momentObj});
                this.props.getDateEnd(momentObj.format('YYYY/MM/DD'));
            }
        }.bind(this);
    },
    getInitialState : function () {
        return {

        }
    },
    render : function () {
        return (
            <div style={{display : 'inline-block'}}>
                <div className="form-group">
                  <span>日期：</span>
                    <div className="dateContainer" style={{display : 'inline-block'}}>
                        <DatePicker
                            selected={this.state.startDate}
                            locale="zh-cn"
                            placeholderText="开始日期"
                            onChange={this.handleChange('dateStart')}
                            className="kd-input-height"
                            dateFormat="YYYY/MM/DD" />
                    </div>
                </div>
                    <span> - </span>
                <div className="form-group">
                    <div className="dateContainer" style={{display : 'inline-block'}}>
                        <DatePicker
                            selected={this.state.endDate}
                            placeholderText="结束日期"
                            locale="zh-cn"
                            className="kd-input-height"
                            onChange={this.handleChange('dateEnd')}
                            dateFormat="YYYY/MM/DD" />
                    </div>
                </div>
            </div>
        )
    }
});

module.exports = DatepickerContainer;