import React, { Component } from 'react';
import { connect } from 'react-redux'

import apiAccess from '../Helpers/apiAccess'
import { Form, Input, Tooltip, Icon, Cascader, Select, Row, Col, Checkbox, Button, InputNumber, Upload } from 'antd';

const FormItem = Form.Item;
const Option = Select.Option;


class EditAgencyModal extends Component{

  constructor(props){
    super(props)
    this.state = {
       selectedAgency: this.props.selectedAgency
    }
  }


  handleSubmit(e) {
    e.preventDefault();
    this.props.form.validateFieldsAndScroll((err, values) => {
      if (!err) {

          let payload = {agency_name: this.props.form.getFieldValue('agencyName'),
                         phone: this.props.form.getFieldValue('phone'),
                         email: this.props.form.getFieldValue('email')}

            console.log(payload)

            apiAccess({
              url: 'http://localhost:8000/agencies/update/'+ this.state.selectedAgency._id,
              method: 'POST',
              payload: payload,
              attemptAction: () => this.props.dispatch({ type: 'UPDATE_AGENCY_ATTEMPT' }),
              successAction: (json) => this.props.dispatch({ type: 'UPDATE_AGENCY_SUCCESS', json }),
              failureAction: () => this.props.dispatch({ type: 'UPDATE_AGENCY_FAILED' })
            })
          }else
              console.log("error")
      });

  }


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
 }


 checkTel(rule, value, callback){
   if(!value.match(/^[0-9]+$/) || value.length != 9){
     callback('the input should be an appropriate phone number');
   }else {
     callback()
   }
 }


 checkAgencyName(rule, value, callback){
   if(value.length > 50 ){
     callback('Agency name should not exceed 50 characters');
   }else {
    callback()
  }
}


  render() {

    // console.log(this.props.selectedAgency)

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

    return (

      <div>
      <Form horizontal onSubmit={this.handleSubmit.bind(this)}>
        <FormItem
          {...formItemLayout}
          label="Agency Name"
          hasFeedback
        >
          {getFieldDecorator('agencyName', {
            initialValue: this.state.selectedAgency.agencyName,
            rules: [{
              required: true, message: 'Please input your agency name!'
            }, {
              validator: this.checkAgencyName,
            }],
          })(
            <Input />
          )}
        </FormItem>

        <FormItem
          {...formItemLayout}
          label="Email"
          hasFeedback
        >
          {getFieldDecorator('email', {
            initialValue: this.state.selectedAgency.email,
            rules: [{
              type: 'email', message: 'The input is not valid E-mail!'
            }],
          })(
            <Input />
          )}
        </FormItem>
        <FormItem
          {...formItemLayout}
          label="Phone"
          hasFeedback
        >
          {getFieldDecorator('phone', {
            initialValue: this.state.selectedAgency.phone,
            rules: [{
              validator: this.checkTel
            }],
          })(
            <Input />
          )}
        </FormItem>

        <FormItem {...tailFormItemLayout}>
          <Button type="primary" htmlType="submit" size="large">Add Agency</Button>
        </FormItem>
      </Form>
      </div>
    );
  }
}


export default Form.create({})(EditAgencyModal);
