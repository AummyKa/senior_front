import React, { Component } from 'react';
import { connect } from 'react-redux'

import apiAccess from '../Helpers/apiAccess'
import { Form, Input, Tooltip, Icon, Cascader, Select, Row, Col, Checkbox, Button, InputNumber, Upload } from 'antd';
import { error } from './Modal'

const FormItem = Form.Item;
const Option = Select.Option;

const tourtypes = [{
  value: 'Half day',
  label: 'Half Day',

}, {
  value: 'Full day',
  label: 'Full Day',

},{
    value: 'Multi Day',
    label: 'MultiDay',
}];

function throwOptionTourTypeObject(data){
  let temp = []
  for (let i = 0; i < data.length; i++) {
    temp.push(<Option key= {i}>{data[i].value}</Option>);
  }
  return temp
}


class EachTourEditFormModal extends Component{

  constructor(props){
    super(props)
    this.state ={
      tour_id: this.props.tourId,
      tour_data:[],
      selectedTourType: ''
    }
  }

  componentWillMount(){
    this.getTourData()
  }

  componentWillReceiveProps(nextProps){
    console.log(nextProps.specific_tours_data)
    if(this.props.specific_tours_data !== nextProps.specific_tours_data){
      if(nextProps.specific_tours_data){
        this.setState({selectedTourType:nextProps.specific_tours_data.type})
        this.setState({tour_data:nextProps.specific_tours_data})
      }
    }
  }

  handleSubmit(e) {
    e.preventDefault();
    this.props.form.validateFieldsAndScroll((err, values) => {
      if (!err) {

        let payload = {tour_name: this.props.form.getFieldValue('tourname'),
                       tour_abbreviation: this.props.form.getFieldValue('tour_abbreviation'),
                       place: this.props.form.getFieldValue('place'),
                       type: this.props.form.getFieldValue('type'),
                       description:this.props.form.getFieldValue('description')}

          console.log(payload)

          apiAccess({
            url: 'http://localhost:8000/tours/update/'+this.state.tour_id,
            method: 'POST',
            payload: payload,
            attemptAction: () => this.props.dispatch({ type: 'UPDATE_EACH_TOUR_ATTEMPT' }),
            successAction: (json) => this.props.dispatch({ type: 'UPDATE_EACH_TOUR_SUCCESS', json }),
            failureAction: () => this.props.dispatch({ type: 'UPDATE_EACH_TOUR_FAILED' })
          })
        }else
            console.log("error")
      });

  }

  getTourData(){
    apiAccess({
      url: 'http://localhost:8000/tours/'+this.state.tour_id,
      method: 'GET',
      payload: null,
      attemptAction: () => this.props.dispatch({ type: 'GET_SPECIFIC_TOUR_DATA_ATTEMPT' }),
      successAction: (json) => this.props.dispatch({ type: 'GET_SPECIFIC_TOUR_DATA_SUCCESS', json }),
      failureAction: () => this.props.dispatch({ type: 'GET_SPECIFIC_TOUR_DATA_FAILED' })
    })
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

 checkTourName(rule, value, callback){
   if(value.length > 50 ){
     callback('Tour name should not exceed 50 characters');
   }else {
    callback()
  }
}

handleTourTypeSelect(value,option){
  this.setState({ selectedTourPeriod: tourtypes[value].value});
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
      <Form horizontal onSubmit={this.handleSubmit.bind(this)}>
        <FormItem
          {...formItemLayout}
          label="Toue Name"
          hasFeedback
        >
          {getFieldDecorator('tourname',
          {initialValue: this.state.tour_data.tour_name}, {
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
          {getFieldDecorator('tour_abbreviation',
          {initialValue: this.state.tour_data.tour_abbreviation},{
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
          {getFieldDecorator('place',
          {initialValue: this.state.tour_data.place}, {
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
            initialValue: this.state.tour_data.type,
            rules: [{required: true, message: 'Please select tour type!' }],
          })(
            <Select
               showSearch
               placeholder="Select a type of tour"
               optionFilterProp="children"
               onSelect={this.handleTourTypeSelect.bind(this)}
               filterOption={(input, option) => option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}
             >
              {throwOptionTourTypeObject(tourtypes)}
             </Select>
          )}
        </FormItem>

        <FormItem
          {...formItemLayout}
          label="Description"
          hasFeedback
        >
          {getFieldDecorator('description',
          {initialValue: this.state.tour_data.description},)(
            <Input type="textarea" rows={4} />
          )}
        </FormItem>

        <FormItem
          {...formItemLayout}
          label="Upload Tour Image"
        >
          <div className="dropbox">
            {getFieldDecorator('tourimage', {
              valuePropName: 'fileList',
              getValueFromEvent: this.normFile,
            })(
              <Upload.Dragger name="files" action="/upload.do">
                <p className="ant-upload-drag-icon">
                  <Icon type="inbox" />
                </p>
                <p className="ant-upload-text">Click or drag file to this area to upload</p>
                <p className="ant-upload-hint">Support for a single or bulk upload. Strictly prohibit from uploading company data or other band files</p>
              </Upload.Dragger>
            )}
          </div>
        </FormItem>


        <FormItem {...tailFormItemLayout}>
          <Button type="primary" htmlType="submit" size="large">Edit</Button>
        </FormItem>
      </Form>
    );
  }
}

const mapStateToProps = (state) => ({
  specific_tours_data: state.getSpecificTourData.specific_tours_data
})

export default connect(mapStateToProps)(Form.create({})(EachTourEditFormModal));
