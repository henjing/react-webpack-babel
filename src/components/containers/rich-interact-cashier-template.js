import React from 'react';
import SearchInput from '../views/common-search-input';
import { Row, Col, DatePicker, Select, Table, Button, message } from 'antd';
import { connect } from 'react-redux';
const RangePicker = DatePicker.RangePicker;
import { getGoodsList, getCashierApplyList, getCashierApplyDetailList, decideCashierResult } from '../../api/cashier-api';
import { routeBase } from '../../appConstants/urlConfig';

const TemplateContainer = React.createClass({
    commonSearch() {
        let config = this.getSearchState();
        config['page'] = 1;
        getCashierApplyList(config, this.getCashierResultSuccess, this.getCashierResultFail);
    },
    pageSearch(page) {
        let config = this.getSearchState();
        config['page'] = page;
        getCashierApplyList(config, this.getCashierResultSuccess, this.getCashierResultFail);
    },
    updateSearchState(key, value) {
        this.setState({[key] : value});
    },
    getSearchState() {
        let { search, dateStart, dateEnd, page, type} = this.state;
        return { search, dateStart, dateEnd, page, type};
    },
    getInitialState() {
        return {
            search : '',
            dateStart : '',
            dateEnd : '',
            page : 1,
            dataSource : [],
            totalMoney : 0, // 总金额
            totalRows : 0, // 总数
            columns : this.props.columns,
            type : this.props.type, // 3已结算 -2未结算 0审核中 1已通过 2已付款 -1已驳回
            isShowTime : this.props.isShowTime, // 是否显示申请时间筛选框
            // 交互部分
            visible : false,
            account_sn : '',
            text : '',
        }
    },
    onRangeChange(dates, dateStrings) {
        this.setState({ dateStart : dateStrings[0], dateEnd : dateStrings[1]}, function () {
            this.commonSearch();
        }.bind(this));
    },
    getCashierResultSuccess(info) {
       this.setState({
            dataSource : info.info,
            page : info.page,
            totalRows : info.totalRows,
            totalMoney : info.totalMoney
        });
    },
    getCashierResultFail(info) {
        this.setState({dataSource : [], page : 1, totalMoney : 0, totalRows : 0});
    },
    componentDidMount() {
        getCashierApplyList({type : this.state.type}, this.getCashierResultSuccess);
    },
    componentWillUnmount() {
        this.setState({...this.getInitialState()});
    },
    applySuccessThis(account_sn) {
        return function () {
            decideCashierResult({status : 1, account_sn : account_sn}, function (info) {
                message.success(info.info);
            }, function (info) {
                message.error(info.info);
            })
        }.bind(this);
    },
    
    render() {
        const pagination = {
            current : parseInt(this.state.page),
            total : this.state.totalRows,
            onChange : this.pageSearch
        };
        let columns = this.state.columns;

        return (
            <div>
                <Row style={{marginTop : '32px'}}>
                    <Col sm={14}>
                        <Row>
                            <Col>
                                <span className="spanWidth">搜索:</span>
                                <SearchInput
                                    placeholder="结算单号或厂家名"
                                    search={this.commonSearch}
                                    updateSearchState={this.updateSearchState}
                                    style={{width : '284px', marginLeft : '8px', paddingTop : '10px'}} />
                            </Col>
                            <Col>
                                <span className="spanWidth">日期:</span>
                                <RangePicker style={{width : '284px', marginLeft : '8px'}} onChange={this.onRangeChange} />
                            </Col>
                        </Row>
                    </Col>
                    <Col sm={8}>
                        <Row type="flex" align="middle" justify="space-around" style={{height : '114px'}}>
                            <Col style={{textAlign : 'center'}}>
                                <h3>{this.state.totalRows}</h3>
                                <p>结算单总数</p>
                            </Col>
                            <Col style={{textAlign : 'center'}}>
                                <h3>{this.state.totalMoney} <span style={{fontSize : '12px'}}>元</span></h3>
                                <p>总金额</p>
                            </Col>
                        </Row>
                    </Col>
                </Row>
                <Row>
                    <Col style={{marginTop : '32px'}}>
                        <Table pagination={pagination} columns={columns} dataSource={this.state.dataSource} />
                    </Col>
                </Row>
            </div>
        )
    }
});

export default TemplateContainer;