import React from 'react';
import { connect } from 'react-redux';
import styles from './people-container.less';
import { Row, Col } from 'antd';
import VillageSelect from '../views/villageSelect';
import DatePicker from '../views/datePicker';
import AddPeopleForm from '../views/addPeopleForm';

const PeopleContainer = React.createClass({
    render : function () {
        return (
            <div className="container-fluid">
                <Row>
                    <Col sm={20}>
                        <VillageSelect />
                        <DatePicker />
                    </Col>
                    <Col sm={4} className={styles.lineHeight}>
                        <h1>4567</h1>
                        <span>当前贫困户</span>
                    </Col>
                </Row>
                <AddPeopleForm />
            </div>
        )
    }
});

const mapStateToProps = function (store) {
    return Object.assign({}, store.peopleState);
};

export default connect(mapStateToProps)(PeopleContainer);