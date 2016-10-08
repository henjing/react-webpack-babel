import React from 'react';
import { connect } from 'react-redux';
import styles from './people-container.less';
import { Row, Col } from 'antd';
import VillageSelect from '../views/villageSelect';
import DatePicker from '../views/datePicker';
import AddPeopleForm from '../views/addPeopleForm';
import PeopleTable from '../views/peopleTable';
import { getPeople } from '../../api/people-api';

const PeopleContainer = React.createClass({

    componentDidMount() {
        getPeople();
    },

    render : function () {
        return (
            <div className="container-fluid">
                <Row>
                    <Col sm={20}>
                        <VillageSelect />
                        <DatePicker />
                    </Col>
                    <Col sm={4} className={styles.lineHeight}>
                        <h1>{this.props.totalRows}</h1>
                        <span>当前贫困户</span>
                    </Col>
                </Row>
                <AddPeopleForm />
                <PeopleTable />
            </div>
        )
    }
});

const mapStateToProps = function (store) {
    return Object.assign({}, {...store.peopleState});
};

export default connect(mapStateToProps)(PeopleContainer);