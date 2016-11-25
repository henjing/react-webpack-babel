import React from 'react';
import SearchInput from '../views/common-search-input';
import { Row, Col, DatePicker, Select, Table } from 'antd';
import { connect } from 'react-redux';
const RangePicker = DatePicker.RangePicker;
import { getGoodsList, getCashierApplyList, getCashierApplyDetailList, decideCashierResult } from '../../api/cashier-api';
import { routeBase } from '../../appConstants/urlConfig';

const TemplateContainer = React.createClass({
    commonSearch() {
        let config = this.getSearchState();
        config['page'] = 1;
        getCashierApplyDetailList(config, this.getCashierResultSuccess, this.getCashierResultFail);
    },
    pageSearch(page) {
        let config = this.getSearchState();
        config['page'] = page;
        getCashierApplyDetailList(config, this.getCashierResultSuccess, this.getCashierResultFail);
    },
    updateSearchState(key, value) {
        this.setState({[key] : value});
    },
    getSearchState() {
        let { search, goods_id, page, type, account_sn} = this.state;
        return { search, goods_id, page, type, account_sn};
    },
    getColumns() {
        return [{
            title : '订单号',
            key : 'record_sn',
            dataIndex : 'record_sn'
        }, {
            title : '商品名称',
            key : 'goods_names',
            render(text, record, index) {
                let result = [];
                const dataSource = record.goods_names;
                for (let i = 0; i < dataSource.length; i++) {
                    result.push(
                        <p>{dataSource[i]}</p>
                    )
                }
                return result;
            }
        }, {
            title : '数量',
            key : 'goods_nums',
            render(text, record, index) {
                let result = [];
                const dataSource = record.goods_nums;
                for (let i = 0; i < dataSource.length; i++) {
                    result.push(
                        <p>{dataSource[i]}</p>
                    )
                }
                return result;
            }
        }, {
            title : '社区空店',
            key : 'store_name',
            dataIndex : 'store_name'
        }, {
            title : '结算单价',
            key : 'factory_accounts',
            render(text, record, index) {
                let result = [];
                const dataSource = record.factory_accounts;
                for (let i = 0; i < dataSource.length; i++) {
                    result.push(
                        <p>{dataSource[i]}</p>
                    )
                }
                return result;
            }
        }, {
            title : '结算总价',
            key : 'total',
            dataIndex : 'total'
        }, {
            title : '申请时间',
            key : 'account_time',
            dataIndex : 'account_time'
        }]
    },
    getInitialState() {
        return {
            search : '',
            page : 1,
            limit : 5,
            goods_id : 'all',
            goods : [],
            dataSource : [],
            totalMoney : 0, // 总金额
            totalRows : 0, // 总数
            totalNumber : 0, // 商品数量
            columns : this.getColumns(),
            account_sn : this.props.params.account_sn,
            type : 3,
        }
    },
    onSelect(value) {
        this.setState({goods_id : value}, function () {
            this.commonSearch();
        }.bind(this));
    },
    getCashierResultSuccess(info) {
       this.setState({
            dataSource : info.info,
            page : info.page,
            totalRows : info.totalRows,
            totalMoney : info.totalMoney,
            totalNumber : info.totalNumber,
            limit : info.limit || this.state.limit
        });
    },
    getCashierResultFail(info) {
        this.setState({dataSource : [], page : 1, totalMoney : 0, totalRows : 0, totalNumber : 0});
    },
    componentDidMount() {
        getCashierApplyDetailList({account_sn : this.state.account_sn, type : 3, goods_id : 'all'}, this.getCashierResultSuccess);
        getGoodsList({nopage : 1}, this.getGoodsListSuccess);
    },
    getGoodsListSuccess(info) {
        this.setState({ goods : info.info });
    },
    componentWillUnmount() {
        this.setState({...this.getInitialState()});
    },
    render() {
        let selectOptions = this.state.goods.map(function (option) {
            return (
                <Option key={option.id} value={option.id}>{option.goods_name}</Option>
            )
        });
        selectOptions.unshift(
            <Option key={'all'} value={'all'}>所有</Option>
        );
        const pagination = {
            current : parseInt(this.state.page),
            total : this.state.totalRows,
            onChange : this.pageSearch,
            defaultPageSize : this.state.limit
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
                                    placeholder="订单编号或社区空店名称"
                                    search={this.commonSearch}
                                    updateSearchState={this.updateSearchState}
                                    style={{width : '284px', marginLeft : '8px', paddingTop : '10px'}} />
                            </Col>
                            <Col>
                                <span className="spanWidth">筛选:</span>
                                <Select
                                    placeholder="按在售商品种类筛选"
                                    onSelect={this.onSelect}
                                    style={{width : '284px', marginLeft : '8px', paddingTop : '10px'}}>
                                    {selectOptions}
                                </Select>
                            </Col>
                        </Row>
                    </Col>
                    <Col sm={8}>
                        <Row type="flex" align="middle" justify="space-around" style={{height : '114px'}}>
                            <Col style={{textAlign : 'center'}}>
                                <h3>{this.state.totalNumber}</h3>
                                <p>商品数量</p>
                            </Col>
                            <Col style={{textAlign : 'center'}}>
                                <h3>{this.state.totalRows}</h3>
                                <p>订单总数</p>
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