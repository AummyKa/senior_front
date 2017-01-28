import React, { PropTypes, Component } from 'react';

import apiAccess from '../Helpers/apiAccess'
import { Form, Input, Tooltip, Icon, Cascader, Select, Row, Col, Checkbox, Button } from 'antd';


const FormItem = Form.Item;
const Option = Select.Option;
const residences = [{
  value: 'Bangkok',
  label: 'Bangkok',

}, {
  value: 'Chiangmai',
  label: 'Chiangmai',

}, {
  value: 'Phuket',
  label: 'Phuket',

}];

const role = [{
  value: 'Customer Service',
  label: 'Customer Service',

}, {
  value: 'Operation',
  label: 'Operation',

}, {
    value: 'Finance',
    label: 'Finance',
}, {
    value: 'Tour Guide',
    label: 'Tour Guide'
}, {
    value: 'Manager',
    label: 'Manager'

}];

const RegistForm = Form.create()(React.createClass({

  getInitialState() {
    return {
      passwordDirty: false,
      email: "",
      password: "",
      confirm: "",
      nickname: "",
      name:"",
      Surname:"",
      role:"",
      residence:"",
      phone:""
      }
    },
  handleSubmit(e) {
    e.preventDefault();
    this.props.form.validateFieldsAndScroll((err, values) => {
      if (!err) {

        let payload = {email: this.props.form.getFieldValue('email'),
                      password: this.props.form.getFieldValue('password'),
                      confirm: this.props.form.getFieldValue('confirm'),
                      nickname: this.props.form.getFieldValue('nickname'),
                      name:this.props.form.getFieldValue('name'),
                      surname:this.props.form.getFieldValue('surname'),
                      role:this.props.form.getFieldValue('role'),
                      residence:this.props.form.getFieldValue('residence'),
                      phone:this.props.form.getFieldValue('phone')}

          apiAccess({
            url: 'http://localhost:8000/register',
            method: 'POST',
            payload: payload,
            attemptAction: () => this.props.dispatch({ type: 'REGIST_ATTEMPT' }),
            successAction: (json) => this.props.dispatch({ type: 'REGIST_SUCCESS', json }),
            failureAction: () => this.props.dispatch({ type: 'REGIST_FAILED' })
          })
        }else
            console.log("error")
      });
  },

  handlePasswordBlur(e) {
    const value = e.target.value;
    this.setState({ passwordDirty: this.state.passwordDirty || !!value });
  },
  checkPassword(rule, value, callback) {
    const form = this.props.form;
    if (value && value !== form.getFieldValue('password')) {
      callback('Two passwords that you enter is inconsistent!');
    } else {
      callback();
    }
  },
  checkConfirm(rule, value, callback) {
    const form = this.props.form;
    if (value && this.state.passwordDirty) {
      form.validateFields(['confirm'], { force: true });
    }
    callback();
  },

  render() {

    const { getFieldDecorator } = this.props.form;
    const formItemLayout = {
      labelCol: { span: 6 },
      wrapperCol: { span: 14 },
    };
    const tailFormItemLayout = {
      wrapperCol: {
        span: 14,
        offset: 6,
      },
    };
    const prefixSelector = getFieldDecorator('prefix', {
      initialValue: '66',
    })(
      <Select className="icp-selector">
        <Option value="86">+66</Option>
      </Select>
    );
    return (
      <Form horizontal onSubmit={this.handleSubmit}>
        <FormItem
          {...formItemLayout}
          label="E-mail"
          hasFeedback
        >
          {getFieldDecorator('email', {
            rules: [{
              type: 'email', message: 'The input is not valid E-mail!',
            }, {
              required: true, message: 'Please input your E-mail!',
            }],
          })(
            <Input />
          )}
        </FormItem>
        <FormItem
          {...formItemLayout}
          label="Password"
          hasFeedback
        >
          {getFieldDecorator('password', {
            rules: [{
              required: true, message: 'Please input your password!',
            }, {
              validator: this.checkConfirm,
            }],
          })(
            <Input type="password" onBlur={this.handlePasswordBlur} />
          )}
        </FormItem>
        <FormItem
          {...formItemLayout}
          label="Confirm Password"
          hasFeedback
        >
          {getFieldDecorator('confirm', {
            rules: [{
              required: true, message: 'Please confirm your password!',
            }, {
              validator: this.checkPassword,
            }],
          })(
            <Input type="password" />
          )}
        </FormItem>
        <FormItem
          {...formItemLayout}
          label={(
            <span>
              Nickname&nbsp;
              <Tooltip title="What do you want other to call you?">
                <Icon type="question-circle-o" />
              </Tooltip>
            </span>
          )}
          hasFeedback
        >
          {getFieldDecorator('nickname', {
            rules: [{ required: true, message: 'Please input your nickname!' }],
          })(
            <Input />
          )}
        </FormItem>
        <FormItem
          {...formItemLayout}
          label={(
            <span>
              Name&nbsp;
            </span>
          )}
          hasFeedback
        >
          {getFieldDecorator('name', {
            rules: [{ required: true, message: 'Please input your name!' }],
          })(
            <Input />
          )}
        </FormItem>
         <FormItem
          {...formItemLayout}
          label={(
            <span>
              Surname&nbsp;
            </span>
          )}
          hasFeedback
        >
          {getFieldDecorator('surname', {
            rules: [{ required: true, message: 'Please input your surname!' }],
          })(
            <Input />
          )}
        </FormItem>
        <FormItem
          {...formItemLayout}
          label="role"
        >
          {getFieldDecorator('role', {
            initialValue: ['CEO', 'Customer Service', 'Operation','Finance','Tour Guide','Manager'],
            rules: [{ type: 'array', required: true, message: 'Please select your role!' }],
          })(
            <Cascader options={role} />
          )}
        </FormItem>
        <FormItem
          {...formItemLayout}
          label="Habitual Residence"
        >
          {getFieldDecorator('residence', {
            initialValue: ['Bangkok', 'Chiangmai', 'Phuket'],
            rules: [{ type: 'array', required: true, message: 'Please select your habitual residence!' }],
          })(
            <Cascader options={residences} />
          )}
        </FormItem>
        <FormItem
          {...formItemLayout}
          label="Phone Number"
        >
          {getFieldDecorator('phone', {
            rules: [{ required: true, message: 'Please input your phone number!' }],
          })(
            <Input addonBefore={prefixSelector} />
          )}
        </FormItem>

        <FormItem {...tailFormItemLayout}>
          <Button type="primary" htmlType="submit" size="large">Register</Button>
        </FormItem>
      </Form>
    );
  },
}));




export default RegistForm;
