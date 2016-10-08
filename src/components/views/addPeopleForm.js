import React from 'react';
import { Button, Icon, Select, Modal } from 'antd';
import { Row, Col } from 'antd';
import styles from './addPeopleForm.less';
import { Form, Input, Upload } from 'antd';
import { addPeople, editPeople } from '../../api/people-api';
import { connect } from 'react-redux';
import { peopleFormAdd, peopleFormEdit } from '../../actions/people-actions';
import store from '../../store';
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
                // setTimeout(function(){
                   callback();
                // }, 300);
            } else {
                // setTimeout(function(){
                   callback(['姓名必须两个字以上']);
                // }, 300);
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
        var finalConfig = config;
        try {
            finalConfig = Object.assign({}, {...config}, { head_img : this.state.fileList[0].response.info})
        } catch (e) {}
        console.log('-----------', finalConfig);
        if (this.props.peopleFormState.type === 'add') {
            addPeople(finalConfig);
        } else {
            editPeople(Object.assign({}, {...store.getState().peopleFormState}, {...config}));
        }
    },

    uploadOnChange(info) {
        console.log('filechange-========', info);
        let fileList = info.fileList;

        // 3. filter successfully uploaded files according to response from server
        // fileList = fileList.filter((file) => {
        //   if (file.response) {
        //     return file.response.status === 'success';
        //   }
        //   return true;
        // });

        // 2. read from response and show file link
        // fileList = fileList.map((file) => {
        //   if (file.response) {
        //     // Component will show file.url as link
        //     file.url = file.response.url;
        //   }
        //   return file;
        // });

        // 1. Limit the number of uploaded files
        //    Only to show one recent uploaded files, and old ones will be replaced by the new
        fileList = fileList.slice(-1);

        // try {
        //     this.props.dispatch(peopleFormAdd({ fileList : fileList }));
        // } catch (e) {}
        this.setState({ fileList });

        // if (this.props.peopleFormState.type == 'add') {
        //     console.log('file111111', fileList);
        //     this.props.dispatch(peopleFormAdd({ head_img : fileList[0]}));
        // } else {
        //     this.props.dispatch(peopleFormEdit({ head_img : fileList[0]}));
        //     console.log('file', fileList);
        // }

    },

    getInitialState() {
        return {
            fileList : ''
        }
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
          action: '/Printinfo/doTest',
          listType: 'picture',
          // defaultFileList: [{
          //   uid: -1,
          //   name: 'xxx.png',
          //   status: 'done',
          //   url: 'https://os.alipayobjects.com/rmsportal/NDbkJhpzmLxtPhB.png',
          //   thumbUrl: 'https://os.alipayobjects.com/rmsportal/NDbkJhpzmLxtPhB.png',
          // }]
        };
        const trueImgProps = {
          action: '/Printinfo/doTest',
          listType: 'picture',
          defaultFileList: [{
            uid: -1,
            name: 'xxx.png',
            status: 'done',
            url: this.props.peopleFormState.head_img,
            thumbUrl: this.props.peopleFormState.head_img,
          }]
        };
        const addUpload = (
            <Upload name="head_img" listType="picture" {...imgProps} onChange={this.uploadOnChange} fileList={this.state.fileList}>
                <Button type="ghost">
                    <Icon type="upload" />点击上传
                </Button>
            </Upload>            
        );
        const editUpload = (
            <Upload name="head_img" listType="picture" {...trueImgProps} onChange={this.uploadOnChange} fileList={this.props.fileList}>
                <Button type="ghost">
                    <Icon type="upload" />点击上传
                </Button>
            </Upload>
        );
        const idItem = (
            <FormItem {...formItemLayout} label="编号">
                <p className="ant-form-text" id="id" name="id">{this.props.peopleFormState.id}</p>
            </FormItem>
        );
        const finalUpload = this.props.peopleFormState.type === 'edit' ? editUpload : addUpload;
        
        return (
            <Row>
                <Col className={styles.topCol}>
                    <Button type="primary" onClick={this.showModal} icon="plus">添加贫困户</Button>
                </Col>
                <Col className={styles.topForm} md={10}>
                    <Modal title={this.props.peopleFormState.type === 'add' ? '添加贫困户信息' : '编辑贫困户信息'} visible={this.props.peopleFormState.visible} onOk={this.handleSubmit} onCancel={this.hideModal}>

                        <Form horizontal onSubmit={this.handleSubmit}>
                            { this.props.peopleFormState.type === 'edit' ? (idItem) : ''}
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
                                    finalUpload
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
        if (props.peopleFormState.type === 'edit') {
            const formData = props.peopleFormState;
            return {
                id : { value : formData.id},
                name : { value : formData.name},
                identity_no : { value : formData.identity_no},
                profile : { value : formData.profile},
                remark : { value : formData.remark},
                phone : { value : formData.phone},
                village_info_id : { value : formData.village_info_id},
                // head_img : { value : formData.head_img}
            }
        } else {
            return {}
        }
    },

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