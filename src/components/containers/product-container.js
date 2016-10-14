import React from 'react';
import { connect } from 'react-redux';
import { Row, Col, Button, Table, Popconfirm, Modal, Form, Input, Select } from 'antd';
import { addProduct, editProduct, deleteProduct } from '../../api/product-api';
import { productModal } from '../../actions/product-actions';
const FormItem = Form.Item;
const createForm = Form.create;
const Option = Select.Option;

let defaultKey = '';

let ProductContainer = React.createClass({

    showModal() {
        this.props.dispatch(productModal({ visible : true, type : 'add' }));
    },

    hideModal() {
        this.props.dispatch(productModal({ visible : false }));
        this.props.form.resetFields();
    },

    getColumns() {
        return [{
            title : '产品',
            dataIndex : 'product_name',
            key : 'product_name'
        }, {
            title : '单位',
            dataIndex : 'unit',
            key : 'unit'
        }, {
            title : '单价',
            dataIndex : 'price',
            key : 'price'
        }, {
            title : '所在村',
            dataIndex : 'villageInfo',
            key : 'villageInfo'
        }, {
            title : '录入时间',
            dataIndex : 'add_time',
            key : 'add_time'
        }, {
            title : '操作',
            render : (text, record, index) => {
                return (
                    <Col>
                        <Button onClick={this.handleClick(record)} size="small" icon="edit">编辑</Button>
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
            } else {
                console.log('values! ', values);
                config = values;
                if (this.props.productListState.type == 'add') {
                    addProduct(config);
                } else {
                    editProduct(Object.assign({}, config, { id : this.props.productListState.formState.id}));
                }
            }
        });
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

    selectVillage(value) {
        defaultKey = value;
    },

    render() {
        const columns = this.getColumns();
        const dataSource = this.props.productListState.info;
        const visible = this.props.productListState.visible;
        const type = this.props.productListState.type;
        const { getFieldDecorator } = this.props.form;
        const selectOptions = this.props.villageState.info.map(function (option) {
            return (
                <Option key={option.id} value={option.id}>{option.province + option.city + option.district + option.village}</Option>
            )
        });
        const formItemLayout = {
            labelCol : { span : 6 },
            wrapperCol : { span : 13}
        };

        try {
            if (!defaultKey) {
                defaultKey = this.props.villageState.info[0].id
            }
        } catch (e) {}

        return (
            <div className="container-fluid">
                <Row>
                    <Col>
                        <Button onClick={this.showModal} style={{marginBottom : 20}} type="primary" icon="plus">添加产品</Button>
                    </Col>
                    <Col>
                        <Modal title={type == 'add' ? '添加农产品' : '编辑农产品信息'} visible={visible} onOk={this.handleSubmit} onCancel={this.hideModal}>
                            <Form horizontal>
                                <FormItem {...formItemLayout} hasFeedback label="产品">
                                    {getFieldDecorator('product_name', {
                                        rules : [
                                            {required : true, whitespace : true, message : '必填项'}
                                        ]
                                    })(
                                        <Input maxLength="20"/>
                                    )}
                                </FormItem>
                                <FormItem {...formItemLayout} hasFeedback label="单位">
                                    {getFieldDecorator('unit', {
                                        rules : [
                                            {required : true, whitespace : true, message : '必填项'}
                                        ]
                                    })(
                                        <Input maxLength="10"/>
                                    )}
                                </FormItem>
                                <FormItem {...formItemLayout} hasFeedback label="单价">
                                    {getFieldDecorator('price', {
                                        rules : [
                                            {required : true, whitespace : true, message : '必填项'},
                                            {validator : this.productPrice}
                                        ]
                                    })(
                                        <Input type="number"/>
                                    )}
                                </FormItem>
                                <FormItem {...formItemLayout} hasFeedback label="村庄">
                                    {getFieldDecorator('village_info_id', {
                                        // initialValue : [defaultKey],
                                        rules : [{ required : true, message : '必填项' }]
                                    })(
                                        <Select
                                            optionFilterProp="children"
                                            onSelect={this.selectVillage}
                                            showSearch>
                                            {selectOptions}
                                        </Select>
                                    )}
                                </FormItem>
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

ProductContainer = createForm({
    mapPropsToFields(props) {
        if (props.productListState.type == 'edit') {
            const formState = props.productListState.formState;
            return {
                product_name : { value : formState.product_name},
                unit : { value : formState.unit},
                price : { value : formState.price},
                village_info_id : { value : formState.village_info_id }
            }
        }
        return {
            village_info_id : { value : defaultKey }
        }
    }
})(ProductContainer);

const mapStateToProps = function (store) {
    return {
        productListState : store.productListState,
        villageState : store.villageState
    }
};

export default connect(mapStateToProps)(ProductContainer);