import React from 'react';
import { Row, Col, Button, Table, Popconfirm, Modal, Form, Input, Select, message, Cascader, TreeSelect, Upload, Icon, DatePicker } from 'antd';
import store from '../../store';
import { connect } from 'react-redux';
import { getJieSuanApplyListForDianShangBu, successJieSuanApplyFromDianShangBu} from '../../api/cashier-api';
const Option = Select.Option;

let TuHuoJieSuanContainer = React.createClass({
    getInitialState() {
        return {
            village_info_id: '',
            status: 'all',
            dataSource: [],
            currentPage: 1,
            totalRows: 1,
            pageSize: 1,
            message: ''
        }
    },
    componentWillUnmount() {
        this.setState(this.getInitialState());
    },
    componentDidMount() {
        if(this.props.villageList.length > 0) {
            this.handleSelect('all');
        }
    },
    componentWillReceiveProps(nextProps) {
        console.log('nextProps', nextProps.villageList);
        if(this.props.villageList.length === 0 && nextProps.villageList.length > 0) {
            console.log('this will only appear ones.');
            this.handleSelect('all');
        }
    },
    handleSelect(value) {
        this.setState({village_info_id: value}, function () {
            this.updateBank();
        }.bind(this));
    },
    handleStatusSelect(value) {
        this.setState({status: value}, function () {
            this.updateBank();
        }.bind(this));
    },
    handleMessageUpdate(value) {
        this.setState({message: value});
    },
    updateBank(page) {
        getJieSuanApplyListForDianShangBu({village_info_id: this.state.village_info_id, page: page ? page : '', status: this.state.status}, function (info) {
            this.setState({dataSource: info.info, currentPage: info.current_page, pageSize: info.list_rows, totalRows: info.total_rows});
        }.bind(this), function (info) {
            this.setState({dataSource: [], currentPage: 1, totalRows: 1, pageSize: 1});
        }.bind(this));
    },
    onPageChange(page) {
        this.updateBank(page);
    },
    confirmSuccess(record, status) {
        return function () {
            successJieSuanApplyFromDianShangBu({id: record.id, status: status, do_message: this.state.message}, function (info) {
                message.info(info.info);
                this.updateBank();
            }.bind(this), function (info) {
                message.error(info.info);
            }.bind(this));
        }.bind(this);
    },
    getColumns() {
        return [{title: '所在村', dataIndex: 'village', key: 'village'}, {title: '结算总价(元)', dataIndex: 'total_money', key: 'total_money'},
            {title: '交易清单', dataIndex: 'inbound_pictures', key: 'inbound_pictures', render: (text, record, index) => {
            let imgList = record.inbound_pictures.map(function (option) {
                return (
                    <span>
                        <a href={'/village/img_viewer?src=' + option} target="_blank"><img key={option} style={{width:120, height: 80}} src={option}/></a> &nbsp;
                    </span>
                )
            });
            return (
                <span>
                    {imgList}
                </span>
            )
            }},
            {title: '交易时间', dataIndex: 'store_time', key: 'store_time'},
            {title: '备注', dataIndex: 'introduce', key: 'introduce'},
            {title: '申请时间', dataIndex: 'add_time', key: 'add_time'},
            {title: '结算状态', dataIndex: 'pay_status', key: 'pay_status'},
            {title: '审核意见', dataIndex: 'do_message', key: 'do_message'},
            {title: '操作人', dataIndex: 'do_user', key: 'do_user'},
            {title: '结算时间', dataIndex: 'pay_time', key: 'pay_time'},
            {
                title: '操作',
                render: (text, record, index) => {
                    return record.pay_status === '申请中' ? (
                        <Col>
                            <Popconfirm title={<PopconfirmInput update={this.handleMessageUpdate} type="2" />} onConfirm={this.confirmSuccess(record, '2')} okText="确认" cancelText="取消">
                            <Button style={{marginTop: '2px'}} size="small" type="primary">通过</Button>
                            </Popconfirm>
                            &nbsp;&nbsp;
                            <Popconfirm title={<PopconfirmInput update={this.handleMessageUpdate} type="-1" />} onConfirm={this.confirmSuccess(record, '-1')} okText="确认" cancelText="取消">
                            <Button style={{marginTop: '2px'}} size="small" type="primary">驳回</Button>
                            </Popconfirm>
                        </Col>
                    ) : '';
                }
            }];
    },
    render() {
        let selectOptions = this.props.villageList.map(function (option) {
            return (
                <Option key={option.id} value={option.id}>{option.province + option.city + option.district + option.village}</Option>
            )
        });
        selectOptions.unshift(
            <Option key={'all'} value={'all'}>{'所有村'}</Option>
        );



        const pagination = {current: parseInt(this.state.currentPage), pageSize: this.state.pageSize, total: this.state.totalRows, onChange: this.onPageChange};

        return (
            <div>
                <Row style={{paddingLeft : '15px'}}>
                    <Col style={{ paddingBottom : '8px', paddingTop : '8px'}}>
                        <span style={{display:'inline-block', width:'66px'}}>所在村查询:</span>
                        <Select
                            showSearch
                            style={{ width : 282, marginLeft : 8 }}
                            onSelect={this.handleSelect}
                            value={this.state.village_info_id}
                            notFoundContent="没有可选择的内容"
                            placeholder="查看村的结算信息"
                            optionFilterProp="children"
                            key="select">
                            {selectOptions}
                        </Select>
                    </Col>
                </Row>

                <Row style={{paddingLeft : '15px'}}>
                    <Col style={{ paddingBottom : '8px', paddingTop : '8px'}}>
                        <span style={{display:'inline-block', width:'66px'}}>结算状态:</span>
                        <Select
                            style={{ width : 282, marginLeft : 8 }}
                            onSelect={this.handleStatusSelect}
                            value={this.state.status}
                            notFoundContent="没有可选择的内容"
                            placeholder="查看结算状态"
                            optionFilterProp="children"
                            key="select">
                            <Option key={'all'} value={'all'}>{'所有'}</Option>
                            <Option key={'1'} value={'1'}>{'申请中'}</Option>
                            <Option key={'2'} value={'2'}>{'已审核'}</Option>
                            <Option key={'3'} value={'3'}>{'已结款'}</Option>
                            <Option key={'-1'} value={'-1'}>{'已驳回'}</Option>
                        </Select>
                    </Col>
                </Row>
                <Row>
                    <Col>
                        <Table pagination={pagination} columns={this.getColumns()} dataSource={this.state.dataSource} />
                    </Col>
                </Row>
            </div>
        )
    }
});

const mapStateToProps = function (store) {
    return {
        villageList : store.villageState.info,
        admin : store.navbarLayoutState.info.super
    }
};

export default connect(mapStateToProps)(TuHuoJieSuanContainer);

const PopconfirmInput = React.createClass({
    getInitialState() {
        return {
            value : ''
        }
    },
    componentUnMount() {
        this.setState({value: ''});
    },
    componentDidMount() {
        this.props.update('');
    },
    onChange(e) {
        this.setState({value: e.target.value});
        this.props.update(e.target.value);
    },
    render() {
        return (
            <div>
                <h5>请输入{this.props.type === '2' ? '通过' : '驳回'}理由</h5>
                <br/>
                <Input onChange={this.onChange} value={this.state.value}/>
            </div>
        )
    }
});