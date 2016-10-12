import { Select, Form } from 'antd';
const Option = Select.Option;
const FormItem = Form.Item;
const createForm = Form.create;
import React from 'react';
import { Row, Col } from 'antd';
import SearchInput from './searchInput';
import { connect } from 'react-redux';
import { getPeople } from '../../api/people-api';
import store from '../../store';
import { updatePeopleSearch } from '../../actions/people-actions';

let App = React.createClass({

  handleChange(value) {
      // console.log('value', value);
      store.dispatch(updatePeopleSearch({ village_info_id : value}));
      if (value == 'all') {
          store.dispatch(updatePeopleSearch({ village_info_id : ''}));
      }
      getPeople();
  },
  render() {
    let villageSelection = this.props.villageState.info.map((option) => {
       return (
           <Option key={option.id} value={option.id}>{option.province + option.city + option.district + option.village}</Option>
       )
    });
    villageSelection.unshift(
        <Option key={'all'} value={'all'}>{'所有村'}</Option>
    );
    const { getFieldDecorator } = this.props.form;
    if (this.props.isReset) {
        this.props.form.resetFields();
    }
      
    return (
      <Row>
        <Col md={12} lg={10} className="lineHeight" style={{width : 380}}>
            <span className="spanWidth">所在村查询:</span>
            <Form inline style={{display : 'inline-block'}}>
                <FormItem>
                    {getFieldDecorator('village')(
                        <Select
                            showSearch
                            style={{ width : 200, marginLeft : 8 }}
                            onSelect={this.handleChange}
                            notFoundContent="没有可选择的内容"
                            optionFilterProp="children"
                        >
                          {villageSelection}
                        </Select>
                    )}
                </FormItem>
            </Form>
        </Col>
        <Col md={10} lg={6} className="lineHeight">
            <SearchInput placeholder="输入姓名、手机号" style={{ width: 200 }} />
        </Col>
      </Row>
    );
  }
});

const mapStateToProps = function (store) {
    return {
        villageState : Object.assign({}, {...store.villageState}),
        isReset : store.peopleSearchState.isReset
    }
};

App = createForm()(App);

export default connect(mapStateToProps)(App);