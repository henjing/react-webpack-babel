import React from 'react';
import { Row, Col, Button, Table, Popconfirm, Modal, Form, Input, Select, message, Cascader, TreeSelect, Upload, Icon } from 'antd';
import store from '../../store';
import { connect } from 'react-redux';
import { showVillageBankInfo, addVillageBank, deleteTuHuoJieSuanPicture } from '../../api/cashier-api';
const FormItem = Form.Item;
const createForm = Form.create;
const Option = Select.Option;
import { bankUpload } from '../../appConstants/urlConfig';

/*bugFix*/
import { selectStyle } from '../../appConstants/bugFix.js';

let TuHuoJieSuanContainer = React.createClass({
    getInitialState() {
        return {
            village_info_id: '',
            account_name: '',
            account_card: '',
            account_bank: '',
            isVisible: false,
            add_account_name: '',
            add_account_card: '',
            add_account_bank: ''
        }
    },
    componentWillUnmount() {
        this.setState(this.getInitialState());
    },
    componentDidMount() {
        if(this.props.villageList.length > 0) {
            let manualTrickSelectOption = this.props.villageList[0].id;
            this.handleSelect(manualTrickSelectOption);
        }
    },
    componentWillReceiveProps(nextProps) {
        console.log('nextProps', nextProps.villageList);
        if(this.props.villageList.length === 0 && nextProps.villageList.length > 0) {
            console.log('this will only appear ones.');
            let manualTrickSelectOption = nextProps.villageList[0].id;
            this.handleSelect(manualTrickSelectOption);
        }
    },
    handleSelect(value) {
        console.log('value', value);
        this.setState({village_info_id: value}, function () {
            this.updateBank();
        }.bind(this));
    },
    updateBank() {
        showVillageBankInfo({village_info_id: this.state.village_info_id}, function (info) {
            const {account_name, account_card, account_bank} = info.info;
            this.setState({account_name: account_name, account_bank: account_bank, account_card: account_card});
        }.bind(this), function (info) {
            this.setState({account_name: '', account_bank: '', account_card: ''});
        }.bind(this));
    },
    handleSubmit(e) {
        if(e) e.preventDefault();

        this.props.form.validateFieldsAndScroll((errors, values) => {
            if (errors) {
                console.log('errors', errors);
                return ;
            } else {
                console.log('values', values);
                addVillageBank(this.assembleBankInfo(values), function (info) {
                    message.success(info.info);
                    this.hideModal();
                    this.updateBank();
                }.bind(this), function (info) {
                    message.error(info.info);
                }.bind(this))
            }
        });
    },
    assembleBankInfo(values) {
        return Object.assign({}, {...values}, {village_info_id: this.state.village_info_id});
    },
    hideModal() {
        this.setState({isVisible: false, add_account_bank: '', add_account_card: '', add_account_name: ''});
    },
    openModal() {
        this.setState({isVisible: true});
    },
    validate_account_card(rule, value, callback) {
        // try {
        //     if(/^\d{16}|\d{19}$/.test(value)) {
        //         callback();
        //     } else {
        //         callback(['请输入正确的收款账号']);
        //     }
        // } catch (e) {
        //     callback(['请输入正确的收款账号']);
        // }
        callback();
    },
    getColumns() {
        return [
            {title: '收款账户名', dataIndex: 'account_name', key: 'account_name'},
            // {title: '收款账号', dataIndex: 'account_card', key: 'account_card'},
            {title: '收款账号', render: (text, record, index) => {
                return (
                    <span style={{fontSize: '18px'}}>{record.account_card}</span>
                )
            }},
            {title: '开户银行网点信息', dataIndex: 'account_bank', key: 'account_bank'}];
    },
    getDataSource() {
        const {account_name, account_card, account_bank, village_info_id} = this.state;
        return account_name ? [{account_name, account_card, account_bank, key: village_info_id}] : [];
    },
    render() {
        let selectOptions = this.props.villageList.map(function (option) {
            return (
                <Option key={option.id} value={option.id}>{option.province + option.city + option.district + option.village}</Option>
            )
        });
        let one = selectOptions[0];
        // console.log('one', one);
        const { getFieldDecorator } = this.props.form;
        const formItemLayout = {
            labelCol : { span : 6 },
            wrapperCol : { span : 13}
        };

        return (
            <div>
                <Row style={{paddingLeft : '15px'}}>
                    <Col style={{ paddingBottom : '8px', paddingTop : '8px'}}>
                        <span style={{display:'inline-block', width:'66px'}}>所在村查询:</span>
                        <Select
                            showSearch
                            style={selectStyle}
                            onSelect={this.handleSelect}
                            value={this.state.village_info_id}
                            notFoundContent="没有可选择的内容"
                            placeholder="查看村的结算信息"
                            optionFilterProp="children"
                            key="select">
                            {selectOptions}
                        </Select>
                        &nbsp;&nbsp;
                        {this.state.village_info_id && !this.state.account_name ? (
                            <Button type="primary" onClick={this.openModal}>添加收款账户</Button>
                        ) : ''}
                    </Col>
                </Row>
                <Row>
                    <Col>
                        <Table pagination={false} columns={this.getColumns()} dataSource={this.getDataSource()} />
                    </Col>
                </Row>
                <Modal title={'收款账户'} visible={this.state.isVisible} onOk={this.handleSubmit} onCancel={this.hideModal}>
                            <Form horizontal>
                                <FormItem {...formItemLayout} hasFeedback label="收款账户名">
                                    {getFieldDecorator('account_name', {
                                        rules : [{ required : true, message : '请输入正确的收款账户名', whitespace : true }]
                                    })(
                                        <Input />
                                    )}
                                </FormItem>
                                <FormItem {...formItemLayout} hasFeedback label="收款账号">
                                    {getFieldDecorator('account_card', {
                                        rules : [{ required : true, message : '请输入正确的收款账号', whitespace : true }, { validator : this.validate_account_card}]
                                    })(
                                        <Input />
                                    )}
                                </FormItem>
                                <FormItem {...formItemLayout} hasFeedback label="开户银行">
                                    {getFieldDecorator('account_bank', {
                                        rules : [{ required : true, message : '请输入正确的网点信息', whitespace : true }]
                                    })(
                                        <Input />
                                    )}
                                </FormItem>
                            </Form>
                </Modal>
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

TuHuoJieSuanContainer = createForm()(TuHuoJieSuanContainer);

export default connect(mapStateToProps)(TuHuoJieSuanContainer);
