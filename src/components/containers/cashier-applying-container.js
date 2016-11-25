import React from 'react';
import CashierTemplate from './cashier-template';
const type = '0'; // type: 0待审核 1已通过 2已付款 -1已驳回
import { routeBase } from '../../appConstants/urlConfig';
import { Button, Popconfirm, message, Modal, Input, Row, Col } from 'antd';
import { Link } from 'react-router';
import { getGoodsList, getCashierApplyList, getCashierApplyDetailList, decideCashierResult } from '../../api/cashier-api';
import { connect } from 'react-redux';
import store from '../../store';
import { updateAppInteractionState } from '../../actions/app-actions';

let account_sn = ''; let text = '';

function applySuccessThis(account_sn) {
    return function () {
        decideCashierResult({status : 1, account_sn : account_sn}, function (info) {
            message.success(info.info);
            store.dispatch(updateAppInteractionState({ cashierRefreshCount : store.getState().appInteractionState.cashierRefreshCount + 1}));
        }, function (info) {
            message.error(info.info);
        })
    }
}

function toggleModal(account) {
    return function() {
        store.dispatch(updateAppInteractionState({ cashierModalVisible : !store.getState().appInteractionState.cashierModalVisible}));
        account_sn = account;
    }
}

function hideModal() {
    store.dispatch(updateAppInteractionState({ cashierModalVisible : false}));
}

function applyFailThis() {
    decideCashierResult({status : -1, account_sn : account_sn, reason : text}, function (info) {
        message.success(info.info);
        hideModal();
        store.dispatch(updateAppInteractionState({ cashierRefreshCount : store.getState().appInteractionState.cashierRefreshCount + 1}));
    }, function (info) {
        message.error(info.info);
    });
}

function textChange(e) {
    text = e.target.value;
}

const BalanceOrderContainer = React.createClass({
    getInitialState() {
        return {
            account_sn : '',
            text : ''
        }
    },
    getColumns() {
        return [{
            title : '结算单号',
            key : 'account_sn',
            dataIndex : 'account_sn'
        }, {
            title : '申请时间',
            key : 'account_time',
            dataIndex : 'account_time'
        }, {
            title : '厂商名称',
            key : 'factory_name',
            dataIndex : 'factory_name'
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
            title : '商品结算总价',
            key : 'goods_totals',
            render(text, record, index) {
                let result = [];
                const dataSource = record.goods_totals;
                for (let i = 0; i < dataSource.length; i++) {
                    result.push(
                        <p>{dataSource[i]}</p>
                    )
                }
                return result;
            }
        }, {
            title : '结算单总价',
            key : 'sn_total',
            dataIndex : 'sn_total'
        }, {
            title : '操作',
            render(text, record, index) {
                // console.log('record', record, 'text', text, 'index', index);
                // console.log('routeBase', routeBase);
                return (
                    <div>
                        <Popconfirm title="确认价格与数量相符,并通过此结算单?" okText="确认通过" cancelText="取消" onConfirm={applySuccessThis(record.account_sn)}>
                            <Button className="btn-warning" size="small" icon="smile-o">通过</Button>
                        </Popconfirm>
                        &nbsp;&nbsp;
                        <Button className="btn-danger" size="small" icon="frown-o" onClick={toggleModal(record.account_sn)}>驳回</Button>
                        &nbsp;&nbsp;
                        <Link to={`${routeBase}applying/apply_detail/${record.account_sn}`}>
                            <Button type="primary" size="small" icon="file-text">详情</Button>
                        </Link>
                    </div>
                )
            }
        }]
    },
    render() {
        const columns = this.getColumns();
        return this.props.children || (
            <div>
                <CashierTemplate columns={columns} type={type} />
                <Modal visible={this.props.visible} onOk={applyFailThis} onCancel={hideModal}>
                    <Row>
                        <Col span={4} style={{color : 'red'}}>驳回理由:</Col>
                        <Col span={20}>
                            <Input type="textarea" onChange={textChange} rows={4}/>
                        </Col>
                    </Row>
                </Modal>
            </div>
        )
    }
});
const mapStateToProps = function (store) {
    return {
        visible : store.appInteractionState.cashierModalVisible
    }
};

export default connect(mapStateToProps)(BalanceOrderContainer);