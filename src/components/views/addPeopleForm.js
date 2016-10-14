import React from 'react';
import { Button, Icon, Select, Modal } from 'antd';
import { Row, Col } from 'antd';
import styles from './addPeopleForm.less';
import { Form, Input, Upload } from 'antd';
import { addPeople, editPeople } from '../../api/people-api';
import { connect } from 'react-redux';
import { peopleFormAdd } from '../../actions/people-actions';
import { uploadUrl } from '../../appConstants/urlConfig';
const FormItem = Form.Item;
const createForm = Form.create;
const Option = Select.Option;

let defaultKey = '';

let AddPeopleForm = React.createClass({

    showModal() {
        this.props.dispatch(peopleFormAdd({ type : 'add', visible : true }));

    },

    hideModal() {
        this.props.dispatch(peopleFormAdd({ visible : false }));
        this.props.form.resetFields();
        this.setState({
            fileList : '',
            defaultFileList : ''
        });
    },

    getInitialState() {
        return {
            fileList : '',
            defaultFileList : ''
        }
    },

    componentWillReceiveProps(nextProps) {
        // console.log('下一个props', nextProps);
        const formState = nextProps.peopleFormState;
        if (formState.id && formState.type != 'add' && !this.props.peopleFormState.visible) {
            // console.log('这里有更新默认图片'); // 这个if条件值得深思
            this.setState({
                defaultFileList : [{
                    uid : formState.id,
                    name : formState.name,
                    status : 'done',
                    url : formState.head_img,
                    thumbUrl : formState.head_img
                }]
            });
        }
    },

    minLength(rule, value, callback) {
        try {
            if (value.length > 1) {
                   callback();
            } else {
                   callback(['姓名必须两个字以上']);
            }
        } catch (e) {
            callback(['不能为空'])
        }
    },

    phoneNum(rule, value, callback) {
        try {
            if(/(^(13\d|15[^4\D]|17[13678]|18\d)\d{8}|170[^346\D]\d{7})$/.test(value) || !value) {
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
            if(/(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/.test(value) || !value) {
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
                return ;
            } else {
                let finalConfig = Object.assign({}, {...this.props.form.getFieldsValue()});
                // console.log('原装的finalConfig', finalConfig);

                try {
                    finalConfig = Object.assign({}, {...finalConfig}, { head_img : this.state.fileList[0].response.info });
                } catch (e) {}

                if (this.props.peopleFormState.type === 'add') {
                    addPeople(finalConfig, this.hideModal);
                } else {
                    finalConfig = Object.assign({}, finalConfig, { id : this.props.peopleFormState.id});
                    editPeople(finalConfig, this.hideModal);
                }
            }
        });


    },

    uploadOnChange(info) {
        let fileList = info.fileList;

        // 1. Limit the number of uploaded files
        //    Only to show one recent uploaded files, and old ones will be replaced by the new
        fileList = fileList.slice(-1);
        this.setState({ fileList }, () => {
            console.log('this.state', this.state);
        });
    },

    selectVillage(value) {
        defaultKey = value;
    },

    render() {
        const { getFieldDecorator, isFieldValidating, getFieldError } = this.props.form;
        const formItemLayout = {
            labelCol : { span : 6},
            wrapperCol : { span : 13 }
        };
        let fileList = this.state.fileList;
        let defaultFileList = this.state.defaultFileList;
        // 用antd貌似每个组件都会render很多次
        // console.log('fileList', fileList);
        // console.log('defaultFileList', defaultFileList);
        const selectOptions = this.props.villageState.info.map(function (option) {
            return (
                <Option key={option.id} value={option.id}>{option.province + option.city + option.district + option.village}</Option>
            )
        });
        // 制定select当前选中的条目
        try {
            if (!defaultKey) {
                defaultKey = this.props.villageState.info[0].id;
            }
        } catch (e) {}
        // this.props.form.setFieldsValue({ village_info_id : defaultKey });
        //
        const imgProps = {
          action: uploadUrl,
          listType: 'picture',
        };

        const idItem = (
            <FormItem {...formItemLayout} label="编号">
                <p className="ant-form-text" id="id" name="id">{this.props.peopleFormState.id}</p>
            </FormItem>
        );

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
                                        {required : true, whitespace : true, message : '必填项'},
                                        {validator : this.minLength}
                                    ]
                                })(
                                    <Input maxLength="10" />
                                )}
                            </FormItem>
                            <FormItem
                                {...formItemLayout} hasFeedback label="手机号码">
                                {getFieldDecorator('phone', {
                                    rules : [
                                        {validator : this.phoneNum,
                                            // required : true,
                                            message : '必填项,请输入正确的手机号码'}
                                    ]
                                })(
                                    <Input/>
                                )}
                            </FormItem>
                            <FormItem
                                {...formItemLayout} hasFeedback label="身份证号码">
                                {getFieldDecorator('identity_no', {
                                    rules : [{
                                        // required : true,
                                        whitespace : true, message : '请输入正确的身份证号码'
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
                                {...formItemLayout}
                                hasFeedback label="所在村">
                                {getFieldDecorator('village_info_id', {
                                    // initialValue : [defaultKey],
                                    rules : [{ required : true, message : '请输入村庄信息' }]
                                })(
                                    <Select 
                                        showSearch
                                        optionFilterProp="children"
                                        onSelect={this.selectVillage}>
                                        {selectOptions}
                                    </Select>
                                )}
                            </FormItem>
                            <FormItem
                                {...formItemLayout} hasFeedback label="上传头像">
                                {getFieldDecorator('head_img')(
                                    <Upload name="head_img" listType="picture"
                                        {...imgProps} fileList={fileList || defaultFileList} onChange={this.uploadOnChange}>
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
        if (props.peopleFormState.type === 'edit') {
            const formData = props.peopleFormState;
            return {
                id : { value : formData.id},
                name : { value : formData.name},
                identity_no : { value : formData.identity_no},
                profile : { value : formData.profile},
                remark : { value : formData.remark},
                phone : { value : formData.phone},
                village_info_id : { value : formData.village_info_id}
            }
        } else {
            return {
                village_info_id : { value : defaultKey }
            }
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