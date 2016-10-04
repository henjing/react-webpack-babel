import { DatePicker, Button } from 'antd';
import React from 'react';
const RangePicker = DatePicker.RangePicker;
import { Row, Col } from 'antd';
import styles from './datePicker.less';
import { connect } from 'react-redux';
import { getPeople } from '../../api/people-api';
import { updatePeopleSearch, resetPeopleSearch} from '../../actions/people-actions';
import moment from 'moment';

const datePicker = React.createClass({

    onChange(dates, dateStrings) {
      console.log('From: ', dates[0], ', to: ', dates[1]);
      console.log('From: ', dateStrings[0], ', to: ', dateStrings[1]);
        this.props.dispatch(updatePeopleSearch({ dateStart : dateStrings[0], dateEnd : dateStrings[1]}));
        getPeople();
    },

    handleClick(timeLimit) {
        return () => {
            this.props.dispatch(updatePeopleSearch({ timeLimit : timeLimit}));
            getPeople();
        }
    },

    handleReset() {
        document.getElementsByClassName('ant-calendar-picker-clear')[0].click();
        this.props.dispatch(resetPeopleSearch());
        getPeople();
    },

    render : function () {
        const typeState = this.props.searchState.timeLimit;
        return (
            <Row>
                <Col className="lineHeight" style={{minWidth : 640}}>
                    <span className="spanWidth">日期:</span>
                    <RangePicker style={{ width: 284, marginLeft: 8 }} onChange={this.onChange} />
                    <Button type={typeState == 'today' ? 'primary' : ''} onClick={this.handleClick('today')} className={styles.marginLeft}>今日</Button>
                    <Button type={typeState == 'week' ? 'primary' : ''} onClick={this.handleClick('week')} className={styles.marginLeft}>本周</Button>
                    <Button type={typeState == 'month' ? 'primary' : ''} onClick={this.handleClick('month')} className={styles.marginLeft}>本月</Button>
                    <Button onClick={this.handleReset} className={styles.marginLeft}>重置搜索条件</Button>
                </Col>
            </Row>
        )
    }
});

function mapStateToProps(store) {
    return {
        searchState : store.peopleSearchState
    }
}

export default connect(mapStateToProps)(datePicker);
  

