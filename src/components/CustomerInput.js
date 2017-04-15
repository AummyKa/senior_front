import React, { Component } from 'react';
import {connect} from 'react-redux';

import { InputNumber, Form, Input, Tooltip, Icon, Cascader, Select, Row, Col, Checkbox, Button } from 'antd';


import { error } from './Modal'

const FormItem = Form.Item;
const Option = Select.Option;



const CustomerInput = Form.create()(React.createClass({

  getInitialState() {
    this.getGuideList()
    return{
      guide_name: []
    }
  },

  handleSubmit(e){
      e.preventDefault();
      this.props.form.validateFieldsAndScroll((err, values) => {
        if (!err) {
          console.log('Received values of form: ', values);
        }
      });
    },

  handleChange(value){
    console.log(`selected ${value.capitalize()}`)
  },


  render(){
  const { getFieldDecorator } = this.props.form;
  const formItemLayout = {
    labelCol: { span: 6 },
    wrapperCol: { span: 14 },
  };
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
               Country;
             </span>
           )}
           hasFeedback
         >
           {getFieldDecorator('country', {
             rules: [{ required: true, message: 'Please input your country!' }],
           })(
             <Input />
           )}
         </FormItem>

     </Form>
   );
 },
}));


export default CustomerInput;
