import React, { Component } from 'react';
import { connect } from 'react-redux'

import apiAccess from '../Helpers/apiAccess'
import { Form, Input, Tooltip, Icon, Cascader, Select, Row, Col, Checkbox, Button } from 'antd';
import { error } from './Modal'

const FormItem = Form.Item;
const Option = Select.Option;
const workplace = [{
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

const title = [{
  value: 'Ms.',
  label: 'Ms.',

}, {
  value: 'Mr.',
  label: 'Mr.',
}]

const contract = [{
  value: 'Full Time.',
  label: 'Full Time',
}, {
  value: 'Part Time',
  label: 'Part Time',
}]

const RegistForm = Form.create()(React.createClass({

  getInitialState() {
    return {
      passwordDirty: false,
      email: "",
      password: "",
      confirm: "",
      title: "",
      name:"",
      Surname:"",
      role:"",
      workplace:"",
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
                      title: this.props.form.getFieldValue('title')[0],
                      name:this.props.form.getFieldValue('name'),
                      surname:this.props.form.getFieldValue('surname'),
                      role:this.props.form.getFieldValue('role')[0],
                      workplace:this.props.form.getFieldValue('workplace')[0],
                      phone:"0"+ this.props.form.getFieldValue('phone'),
                      contract:this.props.form.getFieldValue('contract')[0]}

          console.log(payload)

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

      this.checkDuplicate
  },

  handlePasswordBlur(e) {
    const value = e.target.value;
    this.setState({ passwordDirty: this.state.passwordDirty || !!value });
  },
  checkPassword(rule, value, callback) {
    const form = this.props.form;

    if(value && value !== form.getFieldValue('password')){
      callback('Two passwords that you enter is inconsistent!');
    }else {
      callback();
    }

  },
  checkConfirm(rule, value, callback) {
    const form = this.props.form;
    if(value.length < 6 || value.length > 14 ) {
     callback('Your password must have 6 to 14 characters');
   }else if (value && this.state.passwordDirty) {
      form.validateFields(['confirm'], { force: true });
    }
    callback();
  },
  checkDuplicate() {
    if (!this.props.duplicated) {
      let title = "Email is already used, please try another email"
      return(
        <div>
          {error(title,"")}
        </div>
      )
    }

  },
  //name, surname
  checkString(rule, value, callback){
    if(!value.match(/^[a-zA-Z]/)){
      console.log("nooo")
      callback('input should contains only alphabets');
    }else if(value.length > 40 ) {
     callback('number of characters should not exceed 40 characters');
   }else {
     callback()
   }
 },
 checkTel(rule, value, callback){
   if(!value.match(/^[0-9]+$/) || value.length != 9){
     callback('the input should be an appropriate phone number');
   }else {
     callback()
   }
 },

 // isTourGuide(value, selectedOptions){
 //   let selected = value[0]
 //   if(selected == "Tour Guide"){
 //   }
 // },


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
              type: 'email', message: 'The input is not valid E-mail!'}]
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
          label="Title"
        >
          {getFieldDecorator('title', {
            initialValue: ['Mr.'],
            rules: [{ type: 'array', required: true, message: 'Please select your title!' }],
          })(
            <Cascader options={title} />
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
            rules: [{ required: true, message: 'Please input your name!' },
            {
              validator: this.checkString,
            }],
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
            rules: [{ required: true, message: 'Please input your surname!' },
            {
              validator: this.checkString,
            }],
          })(
            <Input />
          )}
        </FormItem>
        <FormItem
          {...formItemLayout}
          label="Role"
        >
          {getFieldDecorator('role', {
            rules: [{ type: 'array', required: true, message: 'Please select your role!' }],
          })(
            <Cascader options={role} />
          )}
        </FormItem>
        <FormItem
          {...formItemLayout}
          label="Contract"
        >
          {getFieldDecorator('contract', {
            rules: [{ type: 'array', required: true, message: 'Please select your type of contract!' }],
          })(
            <Cascader options={contract}/>
          )}
        </FormItem>
        <FormItem
          {...formItemLayout}
          label="Workplace"
        >
          {getFieldDecorator('workplace', {
            initialValue: ['Bangkok'],
            rules: [{ type: 'array', required: true, message: 'Please select your habitual workplace!' }],
          })(
            <Cascader options={workplace} />
          )}
        </FormItem>
        <FormItem
          {...formItemLayout}
          label="Phone Number"
        >
          {getFieldDecorator('phone', {
            rules: [{ required: true, message: 'Please input your phone number!' },
          { validator: this.checkTel}],
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

const mapStateToProps = (state) => ({
  duplicated: state.regist.duplicated
})

export default connect(mapStateToProps)(RegistForm);
