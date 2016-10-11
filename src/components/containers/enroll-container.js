import React from 'react';
import { connect } from 'react-redux';
import { Row, Col, Button, Table, Popconfirm, Modal, Form, Input, Select, message } from 'antd';
import { getEnrollList, getEnrollPeopleList } from '../../api/enroll-api';
import { enrollModal } from '../../actions/enroll-actions';
const FormItem = Form.Item;
const createForm = Form.create;
const Option = Select.Option;

let EnrollContainer = React.createClass({

    showModal() {
        this.props.dispatch(enrollModal({ visible : true }));
        const keys = this.state.keys;
        this.props.form.setFieldsValue({ keys });
    },

    componentWillMount() {
        const keys = this.state.keys;
        this.props.form.setFieldsValue({ keys });
    },

    hideModal() {
        this.props.dispatch(enrollModal({ visible : false }));
        const initialState = this.getInitialState();
        this.setState({...initialState}, function () {
            console.log('=======', this.state);
            this.props.form.setFieldsValue({
                keys : initialState.keys
            });
            this.props.form.resetFields();
        });

    },

    changeAfterChangeVillage(value) {
        const initialState = {
            selectedVillageId : value,
            keys : [1],
            uuid : 1
        };

        this.props.form.resetFields();
        this.props.form.setFieldsValue({
            keys : initialState.keys
        });
        this.setState({...initialState});
    },

    selectVillage(value) {
        const villageId = this.state.selectedVillageId;
        console.log('value', value, 'villageId', villageId);
        if (!villageId) {
            this.setState({ selectedVillageId : value, selectDisabled : false});
        } else if ( value != villageId) {
            this.changeAfterChangeVillage(value);
        }
    },

    validateVillage() {
        return ((rule, value, callback) => {
            if (!this.state.selectedVillageId) {
                callback(['请先选择村庄!']);
            } else {
                callback();
            }
        }).bind(this);

    },
    
    componentDidMount() {
        getEnrollList();
        getEnrollPeopleList();
    },

    getInitialState() {
        return {
            selectedVillageId : '',
            selectDisabled : true,
            keys : [1],
            uuid : 1
        }
    },

    handleAddRow(e) {
        if (e) e.preventDefault();
        if (this.state.selectedVillageId) {
            let uuid = this.state.uuid + 1;
            this.setState({ uuid : uuid}, (() => {
                const { form } = this.props;
                let keys = form.getFieldValue('keys');
                keys = keys.concat(uuid);
                console.log('testest', keys);
                form.setFieldsValue({
                    keys
                });
                this.setState({ keys});
            }).bind(this));
        } else {
            message.warning('请先选择村庄!');
        }
        // console.log('test: getInitialState', this.getInitialState());
    },

    remove(k) {
        console.log('kkkkkkkk', k);
        return (() => {
            const { form } = this.props;
            let keys = this.state.keys;
            console.log('keyskeyskeys', keys);
            keys = keys.filter((key) => {
                return key !== k;
            });
            this.setState({ keys : keys }, (() => {
                form.setFieldsValue({ keys });
            }).bind(this));
        }).bind(this);
    },

    renderDetail(record) {
        var rowList = [];
        var row = '';
        // console.log('++++++++++++++++', record);
        // window.record = record;
        // var length = record['productInfo'].length;
        // console.log('length', length);

        try {
            for (var i = 0; i < record['productInfo'].length; i++) {
                const obj = record['productInfo'][i];
                row = (
                    <p key={obj['id']}>
                        <span>{i+1}.</span> &nbsp;
                        <span>{obj['product_name']}</span> &nbsp;
                        <span>{obj['product_num']}</span>
                        <span>{obj['product_unit']}</span>
                    </p>
                );
                rowList.push(row);
            }
        } catch (e) {}
        return rowList;
    },

    getColumns() {
        return [{
            title : '头像',
            dataIndex : 'people_head_img',
            key : 'people_head_img',
            render : (text, record, index) => {
                return (
                    <img style={{ width : 42, height : 42}} src={text} alt="people_head_img" />
                )
            }
        }, {
            title : '姓名',
            dataIndex : 'people_name',
            key : 'people_name'
        }, {
            title : '联系电话',
            dataIndex : 'people_phone',
            key : 'people_phone'
        }, {
            title : '地址',
            dataIndex : 'address',
            key : 'address'
        }, {
            title : '产品详情',
            key : 'productInfo',
            render : (text, record, index) => {
                // console.log('record================', text, record);
                return this.renderDetail(record);
            }
        }, {
            title : '录入时间',
            dataIndex : 'add_time',
            key : 'add_time'
        }, {
            title : '操作',
            render : (text, record, index) => {
                return (
                    <Col>
                        <Button size="small" onClick={this.handleClick(record)} icon="file">打印预览</Button>
                        &nbsp;
                        <Popconfirm title="确认删除此信息吗" onConfirm={this.deleteRow(record)} okText="删除" cancelText="取消">
                            <Button size="small" icon="delete">删除</Button>
                        </Popconfirm>
                    </Col>
                )
            }
        }]
    },

    handleClick(record) {
        return () => {
            this.props.dispatch(productModal({ visible : true, type : 'edit', formState : Object.assign({}, record)}));
        }
    },

    deleteRow(record) {
        return () => {
            deleteProduct({ id : record.id});
        }
    },

    handleSubmit(e) {
        if(e) e.preventDefault();
        let config = {};

        this.props.form.validateFieldsAndScroll((errors, values) => {
            if (errors) {
                console.log('errors', errors);
                return;
            }
            console.log('values! ', values);
            config = values;
        });
        
    },

    productPrice() {
        return ((rule, value, callback) => {
            try {
                if(/^\d+(\.\d{1,2})?$/.test(String(value))) {
                    callback();
                } else {
                    callback(['最多两位小数点'])
                }
            } catch (e) {
                callback([]);
            }
        }).bind(this);
    },

    test() {
        return ((value, option) => {
            console.log('test value', value); // value就是我想要的
            console.log('test option', option);
            return true;
        }).bind(this);
    },

    render() {
        const columns = this.getColumns();
        const dataSource = this.props.orderState.info;
        const villageId = this.state.selectedVillageId;

        const peopleDataSource = this.props.peopleList.filter((option) => {
            return option.village_info_id == villageId;
        }).map((option) => {
            return (
                <Option key={option.id} value={option.id}>{option.name}</Option>
            )
        });

        const productDataSource = this.props.productList.filter((option) => {
            return option.village_info_id == villageId;
        }).map((option) => {
            return (
                <Option key={option.id} value={option.id}>{option.product_name}</Option>
            )
        });

        const visible = this.props.modalVisible;
        const { getFieldDecorator, getFieldValue } = this.props.form;
        const selectOptions = this.props.villageState.info.map(function (option) {
            return (
                <Option key={option.id} value={option.id}>{option.province + option.city + option.district + option.village}</Option>
            )
        });
        const formItemLayout = {
            labelCol : { span : 6 },
            wrapperCol : { span : 18}
        };
        const formItemProductLayout = {
            labelCol : { span : 6 },
            wrapperCol : { span : 13}
        };
        const formItemUnitLayout = {
            labelCol : { span : 11 },
            wrapperCol : { span : 13}
        };
        const disabled = this.state.selectDisabled;

        let formItems = '';

        try {
            formItems = getFieldValue('keys').map((k) => {
                // console.log('kkkkkkkk', k);
                return (
                    <Col>
                        <Col span={16}>
                            <FormItem {...formItemProductLayout} hasFeedback label={`产品${k}`} key={k}>
                                {getFieldDecorator(`product${k}`, {
                                    rules : [{
                                        required : true, whitespace : true, message : '必填项'
                                    }, {
                                        validator : this.validateVillage()
                                    }]
                                })(
                                    <Select
                                        placeholder="选择产品"
                                        showSearch
                                        onSelect={this.test()}
                                        disabled={disabled}
                                        notFoundContent="没有可选择的内容"
                                        optionFilterProp="children"
                                    >
                                        {productDataSource}
                                    </Select>
                                )}
                            </FormItem>
                        </Col>

                        <Col span={7} pull={2}>
                            <FormItem {...formItemUnitLayout} hasFeedback label={'数量' + '(斤)'} key={'num' + k}>
                                {getFieldDecorator(`num${k}`, {
                                    rules : [
                                        {required : true, whitespace : true, message : '必填项'},
                                        {validator : this.productPrice()}
                                    ]
                                })(
                                    <Input disabled={disabled} type="number"/>
                                )}
                            </FormItem>
                        </Col>
                        <Col span={1} style={{paddingTop : 5}}>
                            {k != 1 ? (
                                <Button size="small" icon="close" onClick={this.remove(k)} />
                            ) : ''}
                        </Col>
                    </Col>
                )
            });
        } catch (e) {}

        return (
            <div className="container-fluid">
                <Row>
                    <Col>
                        <Button onClick={this.showModal} style={{marginBottom : 20}} type="primary" icon="plus">添加订单</Button>
                        &nbsp;
                        <Button onClick={this.showModal} style={{marginBottom : 20}} type="primary" icon="download">导出数据</Button>
                    </Col>
                    <Col>
                        <Modal title="订单信息录入" visible={visible} onOk={this.handleSubmit} onCancel={this.hideModal}>
                            <Form horizontal>
                            <Row>
                                <Col span={16}>
                                    <FormItem {...formItemLayout} hasFeedback label="村庄">
                                        {getFieldDecorator('village_info_id', {
                                            rules : [{ required : true, message : '必填项' }]
                                        })(
                                            <Select
                                                onSelect={this.selectVillage}
                                                placeholder="请先选择所在村">
                                                {selectOptions}
                                            </Select>
                                        )}
                                    </FormItem>
                                </Col>
                                <Col span={16}>
                                    <FormItem {...formItemLayout} hasFeedback label="姓名">
                                        {getFieldDecorator('name', {
                                            rules : [
                                                {required : true, whitespace : true, message : '必填项'},
                                                {validator : this.validateVillage()}
                                            ]
                                        })(
                                            <Select
                                                placeholder="选择农户"
                                                showSearch
                                                disabled={disabled}
                                                notFoundContent="没有可选择的内容"
                                                onSelect={this.test()}
                                                optionFilterProp="children"
                                                >
                                                {peopleDataSource}
                                            </Select>


                                        )}
                                    </FormItem>
                                </Col>

                                {formItems}

                                <Col span={16}>
                                    <Row>
                                        <Col span={6}/>
                                        <Col>
                                            <a onClick={this.handleAddRow}>增加产品...</a>
                                        </Col>
                                    </Row>
                                </Col>
                            </Row>
                            </Form>

                        </Modal>

                    </Col>
                </Row>
                <Row>
                    <Col>
                        <Table columns={columns} dataSource={dataSource} />
                    </Col>
                </Row>
            </div>
        )
    }
});

EnrollContainer = createForm()(EnrollContainer);

const mapStateToProps = function (store) {
    return {
        peopleList : store.enrollState.enrollPeople,
        orderState : store.enrollState.enrollOrder,
        productList : store.productListState.info,
        modalVisible : store.enrollState.modalVisible,
        villageState : store.villageState
    }
};

export default connect(mapStateToProps)(EnrollContainer);