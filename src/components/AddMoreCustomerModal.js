import React, { PropTypes, Component } from 'react';
import { connect } from 'react-redux'
import moment from 'moment';

import apiAccess from '../Helpers/apiAccess'
import { Form, Input, Tooltip, Icon, Cascader, Select, Row, Col, Checkbox, Button, TimePicker, InputNumber } from 'antd';
import { error } from './Modal'

const FormItem = Form.Item;
const Option = Select.Option;


const agencies = [{
  value: 'N/A',
  label: 'N/A',
}, {
  value: 'Happy',
  label: 'Happy',
},{
  value: 'Hula hula',
  label: 'Hula hula',
}];

function throwOptionAgencyObject(data){
  let temp = []
  for (let i = 0; i < data.length; i++) {
    temp.push(<Option key= {i}>{data[i].value}</Option>);
  }
  return temp
}

const format = 'HH:mm';

const AddMoreCustomerModal = Form.create()(React.createClass({

  getInitialState() {

    return {

      }
    },
  handleSubmit(e) {
    e.preventDefault();
    // this.props.form.validateFieldsAndScroll((err, values) => {
    //   if (!err) {
    //
    //     let payload = {email: this.props.form.getFieldValue('email'),
    //                   password: this.props.form.getFieldValue('password'),
    //                   confirm: this.props.form.getFieldValue('confirm'),
    //                   title: this.props.form.getFieldValue('title'),
    //                   name:this.props.form.getFieldValue('name'),
    //                   surname:this.props.form.getFieldValue('surname'),
    //                   role:this.props.form.getFieldValue('role'),
    //                   workplace:this.props.form.getFieldValue('workplace'),
    //                   phone:"0"+ this.props.form.getFieldValue('phone')}
    //
    //       apiAccess({
    //         url: 'http://localhost:8000/register',
    //         method: 'POST',
    //         payload: payload,
    //         attemptAction: () => this.props.dispatch({ type: 'REGIST_ATTEMPT' }),
    //         successAction: (json) => this.props.dispatch({ type: 'REGIST_SUCCESS', json }),
    //         failureAction: () => this.props.dispatch({ type: 'REGIST_FAILED' })
    //       })
    //     }else
    //         console.log("error")
    //   });
    //
    //   this.checkDuplicate
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

 handleAgencySelect(value,option){
   this.setState({ selectedAgency: agencies[value].value });
 },



  render() {

    const { getFieldDecorator, getFieldValue } = this.props.form;
    const formItemLayout = {
      labelCol: { span: 4 },
      wrapperCol: { span: 20 },
    };
    //customer input form
  const formItemLayoutWithOutLabel = {
     wrapperCol: { span: 12, offset: 10 },
   };

     return (

         <div className = "customer-info">
          <Row>
          <Col span={11} offset={1}>

            <FormItem
              {...formItemLayout}
              label="Agency"
            >
              {getFieldDecorator(`agency`, {

              })(
                <Select
                   showSearch
                   style={{ width: '80%', marginRight: 11 }}
                   placeholder="Select a person"
                   optionFilterProp="children"
                   onSelect={this.handleAgencySelect}
                   filterOption={(input, option) => option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}
                 >
                  {throwOptionAgencyObject(agencies)}
                 </Select>
              )}
            </FormItem>

         <FormItem
           {...formItemLayout}
           label= {'Email : '}
           required={false}
         >
           {getFieldDecorator(`email`, {
             validateTrigger: ['onChange', 'onBlur'],
             rules: [{
               required: true,
               whitespace: true,
               message: "Please input customer's email.",
             }],
           })(
             <Input placeholder="email" style={{ width: '80%', marginRight: 11 }} />
           )}

         </FormItem>

         <FormItem
           {...formItemLayout}
           label={'Name : '}
           required={false}
         >
           {getFieldDecorator(`name`, {
             validateTrigger: ['onChange', 'onBlur'],
             rules: [{
               required: true,
               whitespace: true,
               message: "Please input customer's name.",
             }],
           })(
             <Input placeholder="name"  style={{ width: '80%', marginRight: 11 }} />
           )}

         </FormItem>

         <FormItem
           {...formItemLayout}
           label={'Country : '}
           required={false}
         >
           {getFieldDecorator(`country`, {
             validateTrigger: ['onChange', 'onBlur']
           })(
             <Input placeholder="country"  style={{ width: '80%', marginRight: 11 }} />
           )}

         </FormItem>


       </Col>
         <Col span={11} offset = {1}>

         <FormItem
           {...formItemLayout}
           label={'Pickup Place : '}
           required={false}
           labelCol={{
            sm: { span: 5 },
          }}
         >
           {getFieldDecorator(`pickup_place`, {
             validateTrigger: ['onChange', 'onBlur']
           })(
             <Input placeholder="pick up place"  style={{ width: '100%'}}/>
           )}
         </FormItem>


         <FormItem
            {...formItemLayout}
            label="Pickup time"
          >
            {getFieldDecorator(`pickup_time`, {
            })(
              <TimePicker
                style={{ width: '30%', marginRight: 11, marginLeft: 11}}
                format={format} placeholder = "pickup" />
            )}
          </FormItem>

         <FormItem
            {...formItemLayout}
            label={'Participant : '}
          >

          {getFieldDecorator(`participants`,{
          })(
            <InputNumber
              style={{ width: '30%', marginRight: 11, marginLeft: 11}}
              min={1}
              max={60}
            />
          )}

          </FormItem>
         <FormItem
           {...formItemLayout}
           label={'Remark : '}
           required={false}
         >
           {getFieldDecorator(`remark`, {
             validateTrigger: ['onChange', 'onBlur'],
           })(
             <Input type="textarea" rows={2} />
           )}

         </FormItem>
       </Col>
         </Row>
         <Row>

         <FormItem {...formItemLayoutWithOutLabel}>
           <Button type="primary" htmlType="submit" size="large">Add Customer</Button>
         </FormItem>

         </Row>
       </div>

     );

  },
}));

// const mapStateToProps = (state) => ({
//
// })

export default AddMoreCustomerModal;
