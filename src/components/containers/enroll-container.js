import React from 'react';
import { connect } from 'react-redux';
import { Row, Col, Button, Table, Popconfirm, Modal, Form, Input, Select, message } from 'antd';
import { getEnrollList, getEnrollPeopleList, addEnrollProduct, deleteEnrollProduct, printPreview, submitPrint } from '../../api/enroll-api';
import { enrollCSVUrl } from '../../appConstants/urlConfig';
import { enrollModal, printPreviewModal } from '../../actions/enroll-actions';
const FormItem = Form.Item;
const createForm = Form.create;
const Option = Select.Option;
import _ from 'lodash';
import store from '../../store';

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
            // console.log('=======', this.state);
            this.props.form.setFieldsValue({
                keys : initialState.keys
            });
            this.props.form.resetFields();
        });

    },

    changeAfterChangeVillage(value) {
        const initialState = {
            selectedVillageId : value,
            keys : [1, 2, 3],
            uuid : 3,
            selectedProductId : []
        };

        this.props.form.resetFields();
        this.props.form.setFieldsValue({
            keys : initialState.keys
        });
        this.setState({...initialState});
    },

    selectVillage(value) {
        const villageId = this.state.selectedVillageId;
        // console.log('value', value, 'villageId', villageId);
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

    validateProduct(k) {
        return ((rule, value, callback) => {
            // 检查是否有产品被选择
            let selectedProductId = this.state.selectedProductId;
            selectedProductId[k] = value;
            // console.log('value', value, 'selected', selectedProductId);
            // value是否在数组里
            let key = _.findKey(selectedProductId, function (o) {
                return o == value;
            });
            let lastKey = _.findLastKey(selectedProductId, function (o) {
                return o == value;
            });
            // 两个位置不同,则要报错
            if (key != lastKey) {
                callback(['请选择不同产品']);
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
            keys : [1, 2, 3],
            uuid : 3,
            selectedProductId : [],
            printPreview : {
                primary_id : '',
                printor_id : ''
            }
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
                // console.log('testest', keys);
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
        // console.log('kkkkkkkk', k);
        return (() => {
            const { form } = this.props;
            let keys = this.state.keys;
            // console.log('keyskeyskeys', keys);
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
                        <span>{i+1}.</span>&nbsp;
                        <span>{obj['product_name']}</span>&nbsp;
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
            const primary_id = record.id;
            printPreview({primary_id});
        }
    },

    deleteRow(record) {
        return () => {
            deleteEnrollProduct({ primary_id : record.id}, function () {
                try {
                    this.getEnrollListContinuously();
                } catch (e) {
                    getEnrollList();
                }
            }.bind(this));
        }
    },

    getEnrollListContinuously() {
        const page = this.props.orderState.currentPage;
        if (page) {
            getEnrollList({page : page});
        } else {
            getEnrollList();
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
                config = this.handleFormData(values);
                addEnrollProduct(config, function () {
                    this.hideModal();
                    this.getEnrollListContinuously();
                    getEnrollPeopleList();
                }.bind(this));
            }
        });
        
    },

    handleFormData(valueObj) {
        let people_id = valueObj.name;
        let village_info_id = valueObj.village_info_id;
        let products = [];
        let nums = [];
        _.forEach(valueObj, function (value, key) {
            if (key.slice(0, 3) == 'num') {
                nums.push(value);
            }
            if (key.slice(0, 3) == 'pro') {
                products.push(value);
            }
        });
        return {
            people_id,
            village_info_id,
            products,
            nums
        };
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
            // console.log('test value', value); // value就是我想要的
            // console.log('test option', option);

            return true;
        }).bind(this);
    },

    testProduct() {
        return ((value, option) => {
            return true;
        }).bind(this);
    },

    handlePreviewSubmit(info) {
        return function () {
            submitPrint(Object.assign({}, {...this.state.printPreview}, {primary_id : info.info.primary_id}));
        }.bind(this);
    },

    hidePreviewModal(info) {
        return function () {
            store.dispatch(printPreviewModal(Object.assign({}, {...info}, { visible : false})));
        }
    },

    selectVillageForPrint(value) {
        console.log('打印预览的村庄选择', value);
        this.setState({
            printPreview : {
                printor_id : value
            }
        });
    },

    calculatePrice(valueObj) {
        const productList = this.props.productList;
        var numList = [];
        var productIdList = [];
        var priceList = [];
        for (let i in valueObj) {
            if (i.slice(0, 3) == 'num') {
                numList.push(valueObj[i]);
            }
            if (i.slice(0, 3) == 'pro') {
                productIdList.push(valueObj[i]);
            }
        }
        _.forEach(productIdList, function (value) {
            if (value) {
                const pos = _.findIndex(productList, function (o) {
                    return o.id == value;
                });
                if (pos != -1) {
                    let price = productList[pos].price;
                    priceList.push(parseFloat(price) * parseFloat(numList.shift()));
                }
            }
        });
        return priceList;
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
                <Option key={option.id} value={option.id}>
                    {option.product_name + '  ' + option.price + '元' + ' / ' + option.unit}
                </Option>
            )
        });

        const visible = this.props.modalVisible;
        const { getFieldDecorator, getFieldValue } = this.props.form;
        const selectOptions = this.props.villageState.info.map(function (option) {
            return (
                <Option key={option.id} value={option.id}>{option.province + option.city + option.district + option.village}</Option>
            )
        });
        const selectPrinterOptions = this.props.printerList.map(function (option) {
            return (
                <Option key={option.id} value={option.id}>{option.village_name}&nbsp;&nbsp;打印机编号:{option.id}</Option>
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

        const pagination = {
            current : parseInt(this.props.orderState.currentPage),
            total : this.props.orderState.totalRows,
            onChange : function (page) {
                getEnrollList({page : page});
            }
        };

        const printPreview = this.props.printPreview;

        // 计算总价
        let overallPrice = this.props.form.getFieldsValue();
        console.log('overallValues', overallPrice);
        let priceList = this.calculatePrice(overallPrice);
        console.log('priceList', priceList);
        try {
            overallPrice = priceList.reduce(function (a, b) {
                var aa = isNaN(a) ? 0 : a;
                var bb = isNaN(b) ? 0 : b;
                return aa + bb;
            });
        } catch (e){
            overallPrice = 0;
        }
        console.log('overallValues', overallPrice);
        //

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
                                        validator : this.validateProduct(k)
                                    }]
                                })(
                                    <Select
                                        placeholder="选择产品"
                                        showSearch
                                        onSelect={this.testProduct()}
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
                            <FormItem {...formItemUnitLayout} hasFeedback label={'数量'} key={'num' + k}>
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
                        <form action={enrollCSVUrl} style={{display : 'inline-block'}}>
                        <Button htmlType="submit" style={{marginBottom : 20}} type="primary" icon="download">导出数据</Button>
                        </form>
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
                                                showSearch
                                                optionFilterProp="children"
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
                                        <Col span={9}>
                                            <a onClick={this.handleAddRow}>增加产品...</a>
                                        </Col>
                                        <Col span={8}>
                                            {overallPrice > 0 ? (
                                                <span>总价: {overallPrice} 元</span>
                                            ) : ''}
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
                        <Table pagination={{...pagination}} columns={columns} dataSource={dataSource} />
                    </Col>
                </Row>
                <Modal title="打印预览" visible={printPreview.visible} onOk={this.handlePreviewSubmit(printPreview)} onCancel={this.hidePreviewModal(printPreview)}>
                    <Row type="flex" align="middle" justify="center">
                        <Col>
                            <img src={printPreview.info.path} alt=""/>
                        </Col>
                    </Row>
                    <Row type="flex" align="middle" justify="center">
                        <Col>
                            <Select
                                style={{width : 380}}
                                onSelect={this.selectVillageForPrint}
                                placeholder="在这里绑定打印设备">
                                {selectPrinterOptions}
                            </Select>
                        </Col>
                    </Row>
                </Modal>
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
        villageState : store.villageState,
        printPreview : store.enrollState.printPreview,
        printerList : store.printerState.info
    }
};

export default connect(mapStateToProps)(EnrollContainer);