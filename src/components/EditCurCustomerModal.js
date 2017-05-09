import React, { Component } from 'react';
import { connect } from 'react-redux'
import moment from 'moment';

import apiAccess from '../Helpers/apiAccess'
import { Form, Input, Tooltip, Icon, Cascader, Select, Row, Col, Checkbox, Button, TimePicker, InputNumber } from 'antd';
import { error } from './Modal'

const FormItem = Form.Item;
const Option = Select.Option;



function throwOptionAgencyObject(data){
  let temp = []
  for (let i = 0; i < data.length; i++) {
    temp.push(<Option key= {i}>{data[i].agency_name}</Option>);
  }
  return temp
}

const format = 'HH:mm';

const EditCurCustomerModal = Form.create()(React.createClass({

  getInitialState() {

    return {
      eachCustomer: this.props.eachCurCustomer,
      selectedTourName: "",
      selectedAgency: "",
      selectedTourType: "",
      selectedTourTime: "",
      agencyData:[],
      curTourID: this.props.curTourID,
      selectedAgency: this.props.eachCurCustomer.agency
      }
    },


  componentWillMount(){
    this.getAgencyList()
  },

  componentWillReceiveProps(nextProps){
    if(this.props.agencyData !== nextProps.agencyData){
      if(nextProps.agencyData){
        console.log(nextProps.agencyData)
        this.setState({agencyData: nextProps.agencyData})
      }
    }
  },

  getAgencyList(){
    apiAccess({
      url: 'http://localhost:8000/agencies',
      method: 'GET',
      payload: null,
      attemptAction: () => this.props.dispatch({ type: 'GET_AGENCY_ATTEMPT' }),
      successAction: (json) => this.props.dispatch({ type: 'GET_AGENCY_SUCCESS', json }),
      failureAction: () => this.props.dispatch({ type: 'GET_AGENCY_FAILED' })
    })

  },

  handleAgencySelect(value,option){
    this.setState({ selectedAgency: this.state.agencyData[value].agency_name });
  },

  handleSubmit(e) {
    e.preventDefault();
    this.props.form.validateFieldsAndScroll((err, values) => {
      if (!err) {

        console.log(values)

        let payload = {

          customer: {
            _id: this.state.eachCustomer._id,
            agency: this.state.selectedAgency,
            email: this.props.form.getFieldValue(`email`),
            phone: this.props.form.getFieldValue(`phone`),
            name: this.props.form.getFieldValue(`name`),
            country: this.props.form.getFieldValue(`country`),
            pickup_time: this.props.form.getFieldValue(`pickup_time`).format('HH:mm'),
            pickup_place: this.props.form.getFieldValue(`pickup_place`),
            participants: this.props.form.getFieldValue(`participants`),
            price: this.props.form.getFieldValue('price'),
            remark: this.props.form.getFieldValue(`remark`)
          },

          bookedTour: {
            _id: this.state.curTourID
          }

        }

        console.log(payload)

          apiAccess({
            url: 'http://localhost:8000/bookedtours/update-customer',
            method: 'POST',
            payload: payload,
            attemptAction: () => this.props.dispatch({ type: 'EDIT_CUSTOMER_IN_TOUR_ATTEMPT' }),
            successAction: (json) => this.props.dispatch({ type: 'EDIT_CUSTOMER_IN_TOUR_SUCCESS', json }),
            failureAction: () => this.props.dispatch({ type: 'EDIT_CUSTOMER_IN_TOUR_FAILED' })
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
   this.setState({ selectedAgency: this.state.agencyData[value].agency_name });
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
      <Form className = "add-tour-form" horizontal onSubmit={this.handleSubmit}>
        <Row>
          <Col span={8} offset={1}>
              <FormItem
                {...formItemLayout}
                label="Agency"
              >
                {getFieldDecorator(`agency`, {
                  initialValue: this.state.eachCustomer.agency
                })(
                  <Select
                     showSearch
                     style={{ width: '80%', marginRight: 11 }}
                     placeholder="Select an agency"
                     optionFilterProp="children"
                     onSelect={this.handleAgencySelect}
                     filterOption={(input, option) => option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}
                   >
                    {throwOptionAgencyObject(this.state.agencyData)}
                   </Select>
                )}
              </FormItem>

             <FormItem
               {...formItemLayout}
               label= {'Email : '}
               required={false}
             >
               {getFieldDecorator(`email`, {
                 initialValue: this.state.eachCustomer.email,
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
                 initialValue: this.state.eachCustomer.name,
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
                 initialValue: this.state.eachCustomer.country,
                 validateTrigger: ['onChange', 'onBlur'],

               })(
                 <Input placeholder="country"  style={{ width: '80%', marginRight: 11 }} />
               )}

             </FormItem>

             <FormItem
               {...formItemLayout}
               label={'Phone : '}
               required={false}
             >
               {getFieldDecorator(`phone`, {
                 validateTrigger: ['onChange', 'onBlur'],
                initialValue: this.state.eachCustomer.phone,

               })(
                 <Input placeholder="phone"  style={{ width: '80%', marginRight: 11 }} />
               )}

             </FormItem>

           </Col>

           <Col span={14} offset = {1}>

             <FormItem
               {...formItemLayout}
               label={'Price : '}
               required={false}
             >
               {getFieldDecorator(`price`, {
                 validateTrigger: ['onChange', 'onBlur'],
                  initialValue: this.state.eachCustomer.price,
               })(
                 <InputNumber min={0} max={100000} placeholder="price"  style={{ width: '30%', marginRight: 11 }} />
               )}

             </FormItem>

             <FormItem
               {...formItemLayout}
               label={'Pickup Place : '}
               required={false}
             >
               {getFieldDecorator(`pickup_place`, {
                 initialValue: this.state.eachCustomer.pickup_place,
                 validateTrigger: ['onChange', 'onBlur'],

               })(
                 <Input placeholder="choose a location"  style={{ width: '70%', marginRight: 11 }} />
               )}

             </FormItem>


           <FormItem
              {...formItemLayout}
              label="Pickup time"
            >
              {getFieldDecorator(`pickup_time`, {
                initialValue : moment(this.state.eachCustomer.pickup_time, format )
              })(
                <TimePicker
                  style={{ width: '30%', marginRight: 11}}
                  format={format} placeholder = "pickup" />
              )}
          </FormItem>

           <FormItem
              {...formItemLayout}
              label={'Participant : '}
            >

            {getFieldDecorator(`participants`, {
              initialValue: this.state.eachCustomer.participants
            })(
              <InputNumber
                style={{ width: '30%', marginRight: 11}}
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
               initialValue: this.state.eachCustomer.remark,
               validateTrigger: ['onChange', 'onBlur'],
             })(
               <Input type="textarea" rows={3} style={{ width: '70%' }} />
             )}

           </FormItem>
         </Col>
        </Row>


        <Row>
           <FormItem {...formItemLayoutWithOutLabel}>
             <Button type="primary" htmlType="submit" size="large">Submit</Button>
           </FormItem>
         </Row>

       </Form>
       </div>

     );

  },
}));

function mapStateToProps(state){
  return{
    agencyData: state.getAgency.agencyData
  }
}

export default connect(mapStateToProps)(EditCurCustomerModal);
