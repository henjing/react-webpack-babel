import { Form, Input, Modal, Row, Col, message } from 'antd';
import classNames from 'classnames';
const createForm = Form.create;
const FormItem = Form.Item;
import React from 'react';
import './modifyPassword.css'
import { connect } from 'react-redux';
import { hidePasswordModal } from '../../actions/user-actions';
import { modifyPassword } from '../../api/password-api';

function noop() {
  return false;
}

let Demo = React.createClass({
  getInitialState() {
    return {
      dirty: false,
      passBarShow: false, // Whether to display a tooltip of password strength
      rePassBarShow: false,
      passStrength: 'L', // Password strength
      rePassStrength: 'L',
    };
  },

  handleSubmit() {
    this.props.form.validateFields((errors, values) => {
      if (errors) {
        console.log('Errors in form!!!');
        return;
      }
      // console.log('Submit!!!');
      console.log(values);
      var config = {
          password : values.oldPassword,
          newPassword : values.pass,
          repeat : values.rePass
      };
      modifyPassword(config, function () {
          message.success('修改密码成功');
          this.onHide();
      }.bind(this), function () {

      }.bind(this))
    });
  },

  getPassStrenth(value, type) {
    if (value) {
      let strength;
      // Customized the password strength, here is just a simple example
      if (value.length < 6) {
        strength = 'L';
      } else if (value.length <= 9) {
        strength = 'M';
      } else {
        strength = 'H';
      }
      this.setState({
        [`${type}BarShow`]: true,
        [`${type}Strength`]: strength,
      });
    } else {
      this.setState({
        [`${type}BarShow`]: false,
      });
    }
  },

  checkPass(rule, value, callback) {
    const form = this.props.form;
    this.getPassStrenth(value, 'pass');

    if (form.getFieldValue('pass') && this.state.dirty) {
      form.validateFields(['rePass'], { force: true });
    }

    callback();
  },

  checkPass2(rule, value, callback) {
    const form = this.props.form;
    this.getPassStrenth(value, 'rePass');

    if (value && value !== form.getFieldValue('pass')) {
      callback('输入的密码必须一致!');
    } else {
      callback();
    }
  },

  renderPassStrengthBar(type) {
    const strength = type === 'pass' ? this.state.passStrength : this.state.rePassStrength;
    const classSet = classNames({
      'ant-pwd-strength': true,
      'ant-pwd-strength-low': strength === 'L',
      'ant-pwd-strength-medium': strength === 'M',
      'ant-pwd-strength-high': strength === 'H',
    });
    const level = {
      L: 'Low',
      M: 'Middle',
      H: 'High',
    };

    return (
      <div>
        <ul className={classSet}>
          <li className="ant-pwd-strength-item ant-pwd-strength-item-1" />
          <li className="ant-pwd-strength-item ant-pwd-strength-item-2" />
          <li className="ant-pwd-strength-item ant-pwd-strength-item-3" />
          <span className="ant-form-text">
            {level[strength]}
          </span>
        </ul>
      </div>
    );
  },

    onHide() {
        this.props.dispatch(hidePasswordModal());
        this.setState({...this.getInitialState()});
        this.props.form.resetFields();
    },

  render() {
    const { getFieldDecorator } = this.props.form;
    return (
      <div>
        <Modal title="修改密码" visible={this.props.visible} onOk={this.handleSubmit} onCancel={this.onHide} maskClosable={true}>
            <Form vertical style={{ maxWidth: 600 }}>
              <Row type="flex" align="middle">
                <Col span={12}>
                  <FormItem label="原有密码">
                    {getFieldDecorator('oldPassword', {
                      rules: [
                        { required: true, whitespace: true, message: '请输入原有密码' },
                      ],
                    })(
                      <Input type="password"
                        onContextMenu={noop} onPaste={noop} onCopy={noop} onCut={noop}
                        autoComplete="off" id="pass"
                        onChange={(e) => {

                        }}
                        onBlur={(e) => {

                        }}
                      />
                    )}
                  </FormItem>
                </Col>
                <Col span={12}></Col>  
                <Col span={12}>
                  <FormItem label="新密码">
                    {getFieldDecorator('pass', {
                      rules: [
                        { required: true, whitespace: true, message: '请输入新密码' },
                        { validator: this.checkPass },
                      ],
                    })(
                      <Input type="password"
                        onContextMenu={noop} onPaste={noop} onCopy={noop} onCut={noop}
                        autoComplete="off" id="pass"
                        onChange={(e) => {
                          // console.log('Your password is stolen in this way', e.target.value);
                        }}
                        onBlur={(e) => {
                          const value = e.target.value;
                          this.setState({ dirty: this.state.dirty || !!value });
                        }}
                      />
                    )}
                  </FormItem>
                </Col>
                <Col span={12}>
                  {this.state.passBarShow ? this.renderPassStrengthBar('pass') : null}
                </Col>
              </Row>
              <Row type="flex" align="middle">
                <Col span={12}>
                  <FormItem label="确认新密码">
                    {getFieldDecorator('rePass', {
                      rules: [{
                        required: true,
                        whitespace: true,
                        message: '请再次输入密码',
                      }, {
                        validator: this.checkPass2,
                      }],
                    })(
                      <Input type="password"
                        onContextMenu={noop} onPaste={noop} onCopy={noop} onCut={noop}
                        autoComplete="off" id="rePass"
                      />
                    )}
                  </FormItem>
                </Col>
                <Col span={12}>
                  {this.state.rePassBarShow ? this.renderPassStrengthBar('rePass') : null}
                </Col>
              </Row>

            </Form>
        </Modal>
      </div>
    );
  },
});

Demo = createForm()(Demo);

function mapStateToProps(store) {
    return {
        visible : store.modifyPasswordState.visible
    }
}

export default connect(mapStateToProps)(Demo);
