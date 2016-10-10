import React from 'react';
import { connect } from 'react-redux';
import { Row, Col, Button, Table, Popconfirm, Modal, Form, Input, Select, AutoComplete } from 'antd';
import { getEnrollList, getEnrollPeopleList } from '../../api/enroll-api';
import { enrollModal } from '../../actions/enroll-actions';
const FormItem = Form.Item;
const createForm = Form.create;
const Option = Select.Option;
const AutoOption = AutoComplete.Option;

let EnrollContainer = React.createClass({

    showModal() {
        this.props.dispatch(enrollModal({ visible : true }));
    },

    hideModal() {
        this.props.dispatch(enrollModal({ visible : false }));
        this.props.form.resetFields();
        const initialState = this.getInitialState();
        this.setState({...initialState});
    },
    
    componentDidMount() {
        getEnrollList();
        getEnrollPeopleList();
    },

    getInitialState() {
        return {
            productRowNum : 1,
            productRowList : [],
            selectedVillageId : ''
        }
    },

    prevDataSourceSelect(dataSource, flag) {
        return (value, option) => {
            this.onPeopleSelect(value, option, dataSource, flag);
        }
    },

    renderFormRow() {
        const formItemProductLayout = {
            labelCol : { span : 6 },
            wrapperCol : { span : 13}
        };
        const formItemUnitLayout = {
            labelCol : { span : 11 },
            wrapperCol : { span : 13}
        };
        const { getFieldDecorator } = this.props.form;
        const number = this.state.productRowNum;
        const productRowList = this.state.productRowList;
        const productRawDataSource = this.props.productList;
        const productDataSource = productRawDataSource.map((option) => {
            return (
                <AutoOption key={option.id} value={option.product_name}>{option.product_name}</AutoOption>
            )
        });
        const productRow = (
            <Col>
                <Col span={16}>
                    <FormItem {...formItemProductLayout} hasFeedback label="产品">
                        {getFieldDecorator('products' + (number + 1), {
                            rules : [{
                                required : true, whitespace : true, message : '必填项'
                            }]
                        })(
                            <AutoComplete
                                onSelect={this.prevDataSourceSelect(productRawDataSource, 'product')}
                                onChange={this.onPeopleChange}>
                                {productDataSource}
                            </AutoComplete>
                        )}
                    </FormItem>
                </Col>

                <Col span={8} pull={2}>
                    <FormItem {...formItemUnitLayout} hasFeedback label={'数量' + '(斤)'}>
                        {getFieldDecorator('nums' + (number + 1), {
                            rules : [
                                {required : true, whitespace : true, message : '必填项'},
                                {validator : this.productPrice}
                            ]
                        })(
                            <Input type="number"/>
                        )}
                    </FormItem>
                </Col>
            </Col>
        );
        productRowList.push(productRow);
        this.setState({ productRowNum : number + 1, productRowList : productRowList});
    },

    handleAddRow(e) {
        if (e) e.preventDefault();
        this.renderFormRow();
        console.log('test: getInitialState', this.getInitialState());
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

    onPeopleSelect(value, option) {
        console.log('select value', value);
        console.log('select option', option);
        console.log('商品在列表中的位置', option.props.index);
        window.option = option;
    },

    onPeopleChange(value) {
        console.log('change value', value);
    },

    productPrice(rule, value, callback) {
        try {
            if(/^\d+(\.\d{1,2})?$/.test(String(value))) {
                callback();
            } else {
                callback(['最多两位小数点'])
            }
        } catch (e) {
            callback([]);
        }
    },

    render() {
        const columns = this.getColumns();
        const dataSource = this.props.orderState.info;

        const peopleRawDataSource = this.props.peopleList;
        const peopleDataSource = peopleRawDataSource.map((option) => {
            return (
                <AutoOption key={option.id} value={option.name}>{option.name}</AutoOption>
            )
        });

        const productRawDataSource = this.props.productList;
        const productDataSource = productRawDataSource.map((option) => {
            return (
                <AutoOption key={option.id} value={option.product_name}>{option.product_name}</AutoOption>
            )
        });

        const visible = this.props.modalVisible;
        const { getFieldDecorator } = this.props.form;
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
                                            <Select>
                                                {selectOptions}
                                            </Select>
                                        )}
                                    </FormItem>
                                </Col>
                                <Col span={16}>
                                    <FormItem {...formItemLayout} hasFeedback label="姓名">
                                        {getFieldDecorator('name', {
                                            rules : [
                                                {required : true, whitespace : true, message : '必填项'}
                                            ]
                                        })(
                                            <AutoComplete
                                                onSelect={this.prevDataSourceSelect(peopleRawDataSource, 'people')}
                                                onChange={this.onPeopleChange}>
                                                {peopleDataSource}
                                            </AutoComplete>
                                        )}
                                    </FormItem>
                                </Col>

                                <Col span={16}>
                                    <FormItem {...formItemProductLayout} hasFeedback label="产品">
                                        {getFieldDecorator('products', {
                                            rules : [
                                                {required : true, whitespace : true, message : '必填项'}
                                            ]
                                        })(
                                            <AutoComplete
                                                onSelect={this.onPeopleSelect}
                                                onChange={this.onPeopleChange}>
                                                {productDataSource}
                                            </AutoComplete>
                                        )}
                                    </FormItem>
                                </Col>

                                <Col span={8} pull={2}>
                                    <FormItem {...formItemUnitLayout} hasFeedback label={'数量' + '(斤)'}>
                                        {getFieldDecorator('nums', {
                                            rules : [
                                                {required : true, whitespace : true, message : '必填项'},
                                                {validator : this.productPrice}
                                            ]
                                        })(
                                            <Input type="number"/>
                                        )}
                                    </FormItem>
                                </Col>

                                {this.state.productRowList.length == 0 ? '' : this.state.productRowList}
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