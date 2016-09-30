import { DatePicker, Button } from 'antd';
import React from 'react';
const RangePicker = DatePicker.RangePicker;
import { Row, Col } from 'antd';
import styles from './datePicker.less';

function onChange(dates, dateStrings) {
  console.log('From: ', dates[0], ', to: ', dates[1]);
  console.log('From: ', dateStrings[0], ', to: ', dateStrings[1]);
}

const datePicker = React.createClass({
    render : function () {
        return (
            <Row>
                <Col className="lineHeight" style={{minWidth : 640}}>
                    <span className="spanWidth">日期:</span>
                    <RangePicker style={{ width: 284, marginLeft: 8 }} onChange={onChange} />

                    <Button className={styles.marginLeft} type="primary">今日</Button>
                    <Button className={styles.marginLeft}>本周</Button>
                    <Button className={styles.marginLeft} type="ghost">本月</Button>
                </Col>
            </Row>
        )
    }
});

export default datePicker;
  

