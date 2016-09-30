import React from 'react';
import { Button, Icon } from 'antd';
import { Row, Col } from 'antd';
import styles from './addPeopleForm.less';
import { Form, Input} from 'antd';
const FormItem = Form.Item;
const createForm = Form.create;

const AddPeopleForm = React.createClass({
    render() {
        return (
            <Row>
                <Col className={styles.topCol}>
                    <Button type="primary" icon="plus" size="small">添加贫困户</Button>
                </Col>
                <Col className={styles.topForm} md={10}>
                    <CustomFormCreate formState={{name : {value : 'hehehe'}}} />
                </Col>
            </Row>
        )
    }
});

const CustomForm = React.createClass({

    minLength(rule, value, callback) {
        console.log('rule', rule);
        console.log('value', value);
        if (value.length > 3) {
            setTimeout(function(){
               callback();
            }, 300);
        } else {
            setTimeout(function(){
               callback([]);
            }, 300);
        }
    },

    handleSubmit(e) {
        e.preventDefault();
        console.log('Received values of form:', this.props.form.getFieldsValue());
        console.log(this._input);
        this._input.refs.input.focus();3
    },

    render() {
        const { getFieldDecorator, isFieldValidating, getFieldError } = this.props.form;
        const formItemLayout = {
            labelCol : { span : 4},
            wrapperCol : { span : 8 }
        };
        const buttonItemLayout = {
            wrapperCol : { span : 8, offset : 4}
        };
        return (
            <Form horizontal onSubmit={this.handleSubmit}>
                <FormItem
                    {...formItemLayout}
                    hasFeedback
                    help={isFieldValidating('name') ? '验证中...' : (getFieldError('name') || []).join(', ')}
                    label="姓名">
                    {getFieldDecorator('name', {
                        rules : [
                            {required : true, whitespace : true,
                                min : 4, message : '姓名必须最少两个字'},
                            {validator : this.minLength}
                        ],
                        trigger : 'onBlur'
                    })(
                        <Input ref={(c)=> this._input = c} autoFocus maxLength="10" />
                    )}
                </FormItem>
                <FormItem
                    style={{marginTop : 24}}
                    {...buttonItemLayout}>
                    <Button type="primary" htmlType="submit">确认</Button>
                </FormItem>
            </Form>
        )
    }
});

const CustomFormCreate = createForm({
    mapPropsToFields(props) {
        console.log('props2333333',props);
        return props.formState;
    }
    ,
    onFieldsChange(props, fields) {
        console.log('props======', props, 'fields=====', fields);
    }
})(CustomForm);

export default AddPeopleForm;