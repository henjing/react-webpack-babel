import React from 'react';
import CashierTemplate from './cashier-template';
const type = '2'; // type: 0待审核 1已通过 2已付款 -1已驳回
import { routeBase } from '../../appConstants/urlConfig';
import { Button, Popconfirm, message, Modal, Input, Row, Col } from 'antd';
import { Link } from 'react-router';
import { getGoodsList, getCashierApplyList, getCashierApplyDetailList, decideCashierResult } from '../../api/cashier-api';
import { connect } from 'react-redux';
import store from '../../store';
import { updateAppInteractionState } from '../../actions/app-actions';

let account_sn = '';

function toggleModal(account) {
    return function() {
        store.dispatch(updateAppInteractionState({ cashierModalVisible : !store.getState().appInteractionState.cashierModalVisible}));
        account_sn = account;
    }
}

function hideModal() {
    store.dispatch(updateAppInteractionState({ cashierModalVisible : false}));
}

function applySuccessThis() {
    decideCashierResult({status : 2, account_sn : account_sn}, function (info) {
        message.success(info.info);
        hideModal();
        store.dispatch(updateAppInteractionState({ cashierRefreshCount : store.getState().appInteractionState.cashierRefreshCount + 1}));
    }, function (info) {
        message.error(info.info);
    });
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
            title : '处理时间',
            key : 'respond_time',
            dataIndex : 'respond_time'
        }, {
            title : '操作',
            render(text, record, index) {
                // console.log('record', record, 'text', text, 'index', index);
                // console.log('routeBase', routeBase);
                return (
                    <div>
                        <Link to={`${routeBase}paying/paying_detail/${record.account_sn}`}>
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
                <Modal visible={this.props.visible} onOk={applySuccessThis} onCancel={hideModal}>
                    <Row>
                        <Col><h2>确认付款?</h2></Col>
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