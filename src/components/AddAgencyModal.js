import React, { Component } from 'react';
import { connect } from 'react-redux'

import apiAccess from '../Helpers/apiAccess'
import { Form, Input, Tooltip, Icon, Cascader, Select, Row, Col, Checkbox, Button, InputNumber, Upload } from 'antd';

const FormItem = Form.Item;
const Option = Select.Option;

const agencyData = (arrayJSON) =>{
  console.log(arrayJSON)
  let resultJSON = []
  let count = 0
  if(arrayJSON && arrayJSON.length > 0){
    console.log(arrayJSON)
    for(let i =0;i<arrayJSON.length;i++){
      if(arrayJSON[i].type == "Agency"){
        arrayJSON[i]["key"] = count;
        resultJSON[count] = arrayJSON[i]
        count++
      }
    }
  }
  return resultJSON
}

class AddAgencyModal extends Component{

  constructor(props){
    super(props)
    this.state={
      agencyLists:[]
    }
  }


  handleSubmit(e) {
    e.preventDefault();
    this.props.form.validateFieldsAndScroll((err, values) => {
      if (!err) {

          let payload = {name: this.props.form.getFieldValue('agencyName'),
                         phone: this.props.form.getFieldValue('phone'),
                         email: this.props.form.getFieldValue('email'),
                         description: this.props.form.getFieldValue('description'),
                         type: 'Agency'}

            console.log(payload)

            apiAccess({
              url: 'bookingmethods/insert',
              method: 'POST',
              payload: payload,
              attemptAction: () => this.props.dispatch({ type: 'ADD_NEW_BOOKING_METHOD_ATTEMPT' }),
              successAction: (json) => this.props.dispatch({ type: 'ADD_NEW_BOOKING_METHOD_SUCCESS', json }),
              failureAction: () => this.props.dispatch({ type: 'ADD_NEW_BOOKING_METHOD_FAILED' })
            })
          }else
              console.log("error")
    });

  }


 checkAgencyName(rule, value, callback){
   for(let i=0; i<this.state.agencyLists.length;i++){
     if(value == this.state.agencyLists[i].name){
       callback('Agency name is already used');
     }
   }

   if(value.length > 50 ){
     callback('Agency name should not exceed 50 characters');
   }else{
    callback()
  }
}

getBookingMethods(){
  apiAccess({
    url: 'bookingmethods/',
    method: 'GET',
    payload: null,
    attemptAction: () => this.props.dispatch({ type: 'GET_BOOKING_METHODS_ATTEMPT' }),
    successAction: (json) => this.props.dispatch({ type: 'GET_BOOKING_METHODS_SUCCESS', json }),
    failureAction: () => this.props.dispatch({ type: 'GET_BOOKING_METHODS_FAILED' })
  })
}

componentWillReceiveProps(nextProps){
  if(this.props.bookingMethodLists !== nextProps.bookingMethodLists){
    if(nextProps.bookingMethodLists){
      let agencyLists = agencyData(nextProps.bookingMethodLists)
      this.setState({agencyLists:agencyLists})
    }
  }
}

componentWillMount(){
  this.getBookingMethods()
}


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

      <div>
      <Form onSubmit={this.handleSubmit.bind(this)}>
        <FormItem
          {...formItemLayout}
          label="Agency Name"
          hasFeedback
          require={true}
        >
          {getFieldDecorator('agencyName', {
            rules: [{
              required: true, message: 'Please input your agency name!'
            }, {
              validator: this.checkAgencyName.bind(this),
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
          })(
            <Input type="textarea" placeholder="Agency Email Contacts" autosize />
          )}
        </FormItem>
        <FormItem
          {...formItemLayout}
          label="Phone"
          hasFeedback
        >
          {getFieldDecorator('phone')(
            <Input type="textarea" placeholder="Agency Phone Contacts" autosize />
          )}
        </FormItem>

        <FormItem
          {...formItemLayout}
          label="Description"
          hasFeedback
        >
          {getFieldDecorator('description', {

          })(
            <Input type="textarea" rows={4} />
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

function mapStateToProps(state){
  return{
    bookingMethodLists: state.getBookingMethods.bookingMethodLists
  }
}

export default connect(mapStateToProps)(Form.create({})(AddAgencyModal))
