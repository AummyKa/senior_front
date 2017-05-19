import React, { Component } from 'react';
import { connect } from 'react-redux'

import apiAccess from '../Helpers/apiAccess'
import { Form, Input, Tooltip, Icon, Cascader, Select, Row, Col, Checkbox, Button, InputNumber, Upload, message } from 'antd';
import { error } from './Modal'
import { Modal } from 'react-bootstrap'

const FormItem = Form.Item;
const Option = Select.Option;

const type = [{
  value: 'Half day',
  label: 'Half Day',

}, {
  value: 'Full day',
  label: 'Full Day',

}, {
    value: 'Multi Day',
    label: 'MultiDay',
}];


function getBase64(img, callback) {
  const reader = new FileReader();
  reader.addEventListener('load', () => callback(reader.result));
  reader.readAsDataURL(img);
}




const AddNewTourModal = Form.create()(React.createClass({

  getInitialState() {
    return {

      }
    },

  handleSubmit(e) {
    e.preventDefault();
    this.props.form.validateFieldsAndScroll((err, values) => {
      if (!err) {

        let payload =
                  {
                   tour_name: this.props.form.getFieldValue('tourname'),
                   tour_abbreviation: this.props.form.getFieldValue('tour_abbreviation'),
                   place: this.props.form.getFieldValue('place'),
                   type: this.props.form.getFieldValue('type')[0],
                   description:this.props.form.getFieldValue('description')
                 }


          apiAccess({
            url: 'http://localhost:8000/tours/insert',
            method: 'POST',
            payload: payload,
            attemptAction: () => this.props.dispatch({ type: 'ADD_NEW_TOUR_ATTEMPT' }),
            successAction: (json) => this.props.dispatch({ type: 'ADD_NEW_TOUR_SUCCESS', json }),
            failureAction: () => this.props.dispatch({ type: 'ADD_NEW_TOUR_FAILED' })
          })
        }else
            console.log("error")
      });
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

 checkTourName(rule, value, callback){
   if(value.length > 50 ){
     callback('Tour name should not exceed 50 characters');
   }else {
    callback()
  }
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

    return (
      <Form horizontal onSubmit={this.handleSubmit}>
        <FormItem
          {...formItemLayout}
          label="Tour Name"
          hasFeedback
        >
          {getFieldDecorator('tourname', {
            rules: [{
              required: true, message: 'Please input your E-mail!'
            }, {
              validator: this.checkTourName,
            }],
          })(
            <Input />
          )}
        </FormItem>
        <FormItem
          {...formItemLayout}
          label="Tour Abbreviation"
          hasFeedback
        >
          {getFieldDecorator('tour_abbreviation', {
            rules: [{
              required: true, message: 'Please input a tour abbreviation!'
            }],
          })(
            <Input />
          )}
        </FormItem>
        <FormItem
          {...formItemLayout}
          label="Place"
          hasFeedback
        >
          {getFieldDecorator('place', {
            rules: [{
              required: true, message: 'Please input your place!',
            }],
          })(
            <Input />
          )}
        </FormItem>

        <FormItem
          {...formItemLayout}
          label="Type"
        >
          {getFieldDecorator('type', {
            initialValue: ['Half day'],
            rules: [{ type: 'array', required: true, message: 'Please select tour type!' }],
          })(
            <Cascader options={type} />
          )}
        </FormItem>

        <FormItem
          {...formItemLayout}
          label="Description"
          hasFeedback
        >
          {getFieldDecorator('description')(
            <Input type="textarea" rows={4} />
          )}
        </FormItem>

        <FormItem {...tailFormItemLayout}>
          <Button type="primary" htmlType="submit" size="large">Add Tour</Button>
        </FormItem>
      </Form>
    );
  },
}));

const mapStateToProps = (state) => ({
  duplicated: state.regist.duplicated
})

export default connect(mapStateToProps)(AddNewTourModal);
