import React from 'react';
import { connect } from 'react-redux';
import styles from './people-container.less';
import { Row, Col } from 'antd';

const PeopleContainer = React.createClass({
    render : function () {
        return (
            <div className="container-fluid">
                <Row>
                    <Col sm={20}>33</Col>
                    <Col sm={4}>44</Col>
                </Row>
            </div>
        )
    }
});

const mapStateToProps = function (store) {
    return {

    }
};

export default connect(mapStateToProps)(PeopleContainer);