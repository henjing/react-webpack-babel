import { Form, Input, Button, Row, Col, Table, Popconfirm, Select, message, Collapse } from 'antd';
import React from 'react';
import { connect } from 'react-redux';
import { getPrinterList, bindPrinter, delPrinter } from '../../api/printer-api';
const FormItem = Form.Item;
const createForm = Form.create;
const Option = Select.Option;
const Panel = Collapse.Panel;

let PrinterContainer = React.createClass({
    
    componentDidMount() {
        getPrinterList();
    },
    
    render() {
        const { getFieldDecorator } = this.props.form;
        const selectOptions = this.props.villageState.info.map(function (option) {
            return (
                <Option key={option.id} value={option.id}>{option.province + option.city + option.district + option.village}</Option>
            )
        });
        return (
            <div className="container-fluid">
                <Row>
                    <Col>
                        <Collapse>
                            <Panel header="点击此处添加打印机">
                              <Form inline onSubmit={this.handleSubmit}>
                                <FormItem
                                  label="打印机设备号"
                                >
                                  {getFieldDecorator('memobirdID', {
                                      rules : [{required : true, whitespace : true, message : '必填项'}]
                                  })(
                                    <Input style={{width : 200}} placeholder="双击打印机电源按钮,查看设备号" />
                                  )}
                                </FormItem>
                                <FormItem
                                  label="咕咕号"
                                >
                                  {getFieldDecorator('useridentifying', {
                                      rules : [{required : true, whitespace : true, message : '必填项'}]
                                  })(
                                    <Input placeholder="请进入APP查看咕咕号" />
                                  )}
                                </FormItem>
                                <FormItem label="所属村">
                                  {getFieldDecorator('village_info_id', {
                                      rules : [{required : true, whitespace : true, message : '必填项'}]
                                  })(
                                      <Select
                                          style={{width : 200}}
                                          placeholder="选择村"
                                          showSearch
                                          optionFilterProp="children"
                                        notFoundContent="没有可选择的内容"
                                        >
                                        {selectOptions}
                                      </Select>
                                  )}
                                </FormItem>
                                <Button type="primary" htmlType="submit">绑定</Button>
                              </Form>
                            </Panel>
                        </Collapse>
                    </Col>
                    <Col>
                        <Table pagination={false} columns={this.getColumns()} dataSource={this.props.printerList} />
                    </Col>
                </Row>
            </div>
        )
    },

  handleSubmit(e) {
    e.preventDefault();

    // console.log('Received values of form:', this.props.form.getFieldsValue());
        this.props.form.validateFieldsAndScroll((errors, values) => {
            if (errors) {
                console.log('errors', errors);
                return;
            }

            bindPrinter(values, function () {
                getPrinterList();
                this.props.form.resetFields();
            }.bind(this));
        });  
  },

    deleteRow(record) {
        return () => {
            console.log('delete record', record);
            delPrinter({print_id : record.id}, function () {
                getPrinterList();
            }.bind(this));
        }
    },

    getColumns() {
        return [{
            title : '打印机编号',
            dataIndex : 'id',
            key : 'id'
        }, {
            title : '打印机设备号',
            dataIndex : 'memobirdID',
            key : 'memobirdID'
        }, {
            title : '咕咕号',
            dataIndex : 'useridentifying',
            key : 'useridentifying'
        }, {
            title : '所属村庄',
            dataIndex : 'village_name',
            key : 'village_info_id'
        }, {
            title : '操作',
            render : (text, record, index) => {
                return (
                    <Col>
                        <Popconfirm title="确认取消绑定此设备吗" onConfirm={this.deleteRow(record)} okText="删除" cancelText="取消">
                            <Button size="small" icon="delete">删除</Button>
                        </Popconfirm>
                    </Col>
                )
            }
        }];
    }
});

PrinterContainer = createForm()(PrinterContainer);

const mapStateToProps = function (store) {
    return {
        printerList : store.printerState.info,
        villageState : store.villageState
    }
};

export default connect(mapStateToProps)(PrinterContainer);