import React, { Component } from 'react';
import { connect } from 'react-redux'

import apiAccess from '../Helpers/apiAccess'
import { Form, Input, Tooltip, Icon, Cascader, Select, Row, Col, Checkbox, Button, InputNumber, Upload } from 'antd';

const FormItem = Form.Item;
const Option = Select.Option;


const bookingMethodData = (arrayJSON) =>{

  let resultJSON = []
  let count = 0
  if(arrayJSON && arrayJSON.length > 0){
    for(let i =0;i<arrayJSON.length;i++){
      if(arrayJSON[i].type == "Individual"){
        arrayJSON[count]["key"] = count;
        resultJSON[count] = arrayJSON[i]
        count++
      }
    }
  }

  return resultJSON
}

class AddBookingMethodsModal extends Component{

  constructor(props){
    super(props)
    this.state={
      bookingMethodLists:[]
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

  componentWillMount(){
    this.getBookingMethods()
  }

  componentWillReceiveProps(nextProps){
    if(this.props.bookingMethodLists !== nextProps.bookingMethodLists){
      if(nextProps.bookingMethodLists){
        let bookingMethodLists = bookingMethodData(nextProps.bookingMethodLists)
        this.setState({bookingMethodLists:bookingMethodLists})
      }
    }
  }


  handleSubmit(e) {
    e.preventDefault();
    this.props.form.validateFieldsAndScroll((err, values) => {
      if (!err) {

          let payload = {name: this.props.form.getFieldValue('bookingMethodName'),
                         description: this.props.form.getFieldValue('description'),
                         type: 'Individual'}


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


 checkBookingMethodName(rule, value, callback){
   console.log(value)
    console.log(this.state.bookingMethodLists)
   for(let i=0; i<this.state.bookingMethodLists.length;i++){

     if(value == this.state.bookingMethodLists[i].name){
       callback('Booking method name is already used');
     }
   }

   if(value.length > 50 ){
     callback('Booking method name should not exceed 50 characters');
   }else{
    callback()
  }
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
          label="Booking Method Name"
          hasFeedback
          require={true}
        >
          {getFieldDecorator('bookingMethodName', {
            rules: [{
              required: true, message: 'Please input your agency name!'
            }, {
              validator: this.checkBookingMethodName.bind(this),
            }],
          })(
            <Input />
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
          <Button type="primary" htmlType="submit" size="large">Add Booking Methods</Button>
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

export default connect(mapStateToProps)(Form.create({})(AddBookingMethodsModal))
