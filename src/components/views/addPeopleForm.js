import React from 'react';
import { Button, Icon, Select, Modal } from 'antd';
import { Row, Col } from 'antd';
import styles from './addPeopleForm.less';
import { Form, Input, Upload } from 'antd';
import { addPeople } from '../../api/people-api';
import { connect } from 'react-redux';
import { peopleFormAdd } from '../../actions/people-actions';
const FormItem = Form.Item;
const createForm = Form.create;
const Option = Select.Option;

let AddPeopleForm = React.createClass({

    showModal() {
        this.props.dispatch(peopleFormAdd({ type : 'add', visible : true }));
    },

    hideModal() {
        this.props.dispatch(peopleFormAdd({ type : 'add', visible : false }));
        this.props.form.resetFields();
    },

    minLength(rule, value, callback) {
        try {
            if (value.length > 1) {
                setTimeout(function(){
                   callback();
                }, 300);
            } else {
                setTimeout(function(){
                   callback(['姓名必须两个字以上']);
                }, 300);
            }
        } catch (e) {
            callback(['不能为空'])
        }
    },

    phoneNum(rule, value, callback) {
        try {
            if(/(^(13\d|15[^4\D]|17[13678]|18\d)\d{8}|170[^346\D]\d{7})$/.test(value)) {
                callback();
            } else {
                callback(['请输入正确的手机号码']);
            }
        } catch (e) {
            callback(['请输入正确的手机号码'])
        }
    },

    identityNum(rule, value, callback) {
        try {
            if(/(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/.test(value)) {
                callback();
            } else {
                callback(['请输入正确的身份证号']);
            }
        } catch (e) {
            callback(['请输入正确的身份证号'])
        }
    },

    handleSubmit(e) {
        if(e) e.preventDefault();

        this.props.form.validateFieldsAndScroll((errors, values) => {
            if (errors) {
                console.log('errors', errors);
                return;
            }
        });

        const config = Object.assign({}, {...this.props.form.getFieldsValue()});
        addPeople(config);
    },

    render() {
        const { getFieldDecorator, isFieldValidating, getFieldError } = this.props.form;
        const formItemLayout = {
            labelCol : { span : 6},
            wrapperCol : { span : 13 }
        };
        const selectOptions = this.props.villageState.info.map(function (option) {
            return (
                <Option key={option.id} value={option.id}>{option.province + option.city + option.district + option.village}</Option>
            )
        });
        const imgProps = {
          action: '/upload.do',
          listType: 'picture',
          defaultFileList: [{
            uid: -1,
            name: 'xxx.png',
            status: 'done',
            url: 'https://os.alipayobjects.com/rmsportal/NDbkJhpzmLxtPhB.png',
            thumbUrl: 'https://os.alipayobjects.com/rmsportal/NDbkJhpzmLxtPhB.png',
          }]
        };

        return (
            <Row>
                <Col className={styles.topCol}>
                    <Button type="primary" onClick={this.showModal} icon="plus">添加贫困户</Button>
                </Col>
                <Col className={styles.topForm} md={10}>
                    <Modal title={this.props.peopleFormState.type === 'add' ? '添加贫困户信息' : '编辑贫困户信息'} visible={this.props.peopleFormState.visible} onOk={this.handleSubmit} onCancel={this.hideModal}>
                        {/*<CustomForm formState={{name : {value : 'hehehe'}}} />*/}
                        <Form horizontal onSubmit={this.handleSubmit}>
                            <FormItem
                                {...formItemLayout} hasFeedback label="姓名">
                                {getFieldDecorator('name', {
                                    rules : [
                                        {required : true, whitespace : true},
                                        {validator : this.minLength}
                                    ]
                                })(
                                    <Input ref={(c)=> this._input = c} maxLength="10" />
                                )}
                            </FormItem>
                            <FormItem
                                {...formItemLayout} hasFeedback label="手机号码">
                                {getFieldDecorator('phone', {
                                    rules : [
                                        {validator : this.phoneNum, required : true}
                                    ]
                                })(
                                    <Input/>
                                )}
                            </FormItem>
                            <FormItem
                                {...formItemLayout} hasFeedback label="身份证号码">
                                {getFieldDecorator('identity_no', {
                                    rules : [{
                                        required : true, whitespace : true
                                    }, {
                                        validator : this.identityNum
                                    }]
                                })(
                                    <Input/>
                                )}
                            </FormItem>
                            <FormItem
                                {...formItemLayout} hasFeedback label="简介">
                                {getFieldDecorator('profile', {
                                    rules : [{ whitespace : true }]
                                })(
                                    <Input type="textarea" maxLength="100"/>
                                )}
                            </FormItem>
                            <FormItem
                                {...formItemLayout} hasFeedback label="备注">
                                {getFieldDecorator('remark', {
                                    rules : [{ whitespace : true }]
                                })(
                                    <Input/>
                                )}
                            </FormItem>
                            <FormItem
                                {...formItemLayout} hasFeedback label="所在村">
                                {getFieldDecorator('village_info_id', {
                                    rules : [{ required : true }]
                                })(
                                    <Select>
                                        {selectOptions}
                                    </Select>
                                )}
                            </FormItem>
                            <FormItem
                                {...formItemLayout} hasFeedback label="上传头像">
                                {getFieldDecorator('head_img')(
                                    <Upload name="head_img" listType="picture" {...imgProps}>
                                        <Button type="ghost">
                                            <Icon type="upload" />点击上传
                                        </Button>
                                    </Upload>
                                )}
                            </FormItem>
                        </Form>
                    </Modal>
                </Col>
            </Row>
        )
    }
});

AddPeopleForm = createForm({
    mapPropsToFields(props) {
        console.log('props2333333',props);
        return {};
    }
    ,
    onFieldsChange(props, fields) {
        // console.log('props======', props, 'fields=====', fields);
    }
})(AddPeopleForm);

const mapStateToProps = function (store) {
    return {
        peopleFormState : store.peopleFormState,
        villageState : store.villageState
    }
};

export default connect(mapStateToProps)(AddPeopleForm);