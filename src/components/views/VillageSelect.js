import { Select } from 'antd';
const Option = Select.Option;
import React from 'react';
import { Row, Col } from 'antd';
import SearchInput from './searchInput';
import styles from './villageSelect.less';
import { connect } from 'react-redux';

const provinceData = ['Zhejiang', 'Jiangsu'];
const cityData = {
  Zhejiang: ['Hangzhou', 'Ningbo', 'Wenzhou'],
  Jiangsu: ['Nanjing', 'Suzhou', 'Zhenjiang'],
};

const App = React.createClass({
  getInitialState() {
    return {
      cities: cityData[provinceData[0]],
      secondCity: cityData[provinceData[0]][0],
    };
  },
  handleProvinceChange(value) {
    this.setState({
      cities: cityData[value],
      secondCity: cityData[value][0],
    });
  },
  onSecondCityChange(value) {
    this.setState({
      secondCity: value,
    });
  },
  render() {
    const provinceOptions = provinceData.map(province => <Option key={province}>{province}</Option>);
    const cityOptions = this.state.cities.map(city => <Option key={city}>{city}</Option>);
    return (
      <Row>
        <Col md={12} lg={10} className="lineHeight" style={{width : 380}}>
            <span className="spanWidth">所在村查询:</span>
            <Select defaultValue={provinceData[0]} style={{ width: 90, marginLeft : 8 }} onChange={this.handleProvinceChange}>
              {provinceOptions}
            </Select>
            <Select value={this.state.secondCity} style={{ width: 90, marginLeft : 8 }} onChange={this.onSecondCityChange}>
              {cityOptions}
            </Select>
        </Col>
        <Col md={10} lg={6} className="lineHeight">
            <SearchInput placeholder="input search text" onSearch={value => console.log(value)} style={{ width: 200 }} />
        </Col>
      </Row>
    );
  }
});

const mapStateToProps = function (store) {
    return Object.assign({}, store.villageState);
};

export default connect(mapStateToProps)(App);