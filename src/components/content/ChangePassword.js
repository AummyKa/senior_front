import React, { Component } from 'react';
import PropTypes from 'prop-types'
import {connect} from 'react-redux';
import { Row,Col,Table, Input, Button, Icon, Select , Form, Modal } from 'antd';


import apiAccess from '../../Helpers/apiAccess'
import { curGuideID } from '../../actions/action-spreadGuideID'


import Cookies from 'js-cookie'


const FormItem = Form.Item;

function success(){
  Modal.success({
    title: "Changing Password is successful!",
    content: "You can use your new password now"
  })
}

function error(){
  Modal.error({
    title: "Your password is not correct",
    content: "please input your password again",
  });
}


class ChangePassword extends Component{

  constructor(props) {
    super(props)

    this.state = {
      confirmDirty: false,
      changePasswordAccounce:false
    }
  }

  componentWillReceiveProps(nextProps){
    if(this.props.changeUserPasswordStatus !== nextProps.changeUserPasswordStatus){
      if(nextProps.changeUserPasswordStatus){
        success()
      }
    }
    if(this.props.passwordNotMatch !== nextProps.passwordNotMatch){
      if(nextProps.passwordNotMatch){
        error()
      }
    }
  }

  handleSubmit = (e) => {
   e.preventDefault();
   this.props.form.validateFieldsAndScroll((err, values) => {
     if (!err) {

       let current_user = Cookies.get('userID')

       let payload = {
                       _id: current_user,
                       old_password: this.props.form.getFieldValue('password'),
                       new_password: this.props.form.getFieldValue('new_password')
                     }

         console.log(payload)

         apiAccess({
           url: 'http://localhost:8000/change-password',
           method: 'POST',
           payload: payload,
           attemptAction: () => this.props.dispatch({ type: 'CHANGE_PASSWORD_ATTEMPT' }),
           successAction: (json) => this.props.dispatch({ type: 'CHANGE_PASSWORD_SUCCESS', json }),
           failureAction: () => this.props.dispatch({ type: 'CHANGE_PASSWORD_FAILED' })
         })
       }else
           console.log("error")
     });

 }

 handleConfirmBlur = (e) => {
    const value = e.target.value;
    this.setState({ confirmDirty: this.state.confirmDirty || !!value });
  }

  checkPassword = (rule, value, callback) => {
   const form = this.props.form;
   if (value && value !== form.getFieldValue('new_password')) {
     callback('Two passwords that you enter is inconsistent!');
   } else {
     callback();
   }
 }

 checkConfirm = (rule, value, callback) => {
   const form = this.props.form;
   if(value.length < 8 || value.length > 14 ) {
    callback('Your password must have 8 to 14 characters');
  }else if (value && this.state.passwordDirty) {
     form.validateFields(['confirm_new_password'], { force: true });
   }
   callback();
 }

  render() {

  const { getFieldDecorator } = this.props.form;
  const { autoCompleteResult } = this.state;

  const formItemLayout = {
    labelCol: {
      xs: { span: 24 },
      sm: { span: 4 },
    },
    wrapperCol: {
      xs: { span: 24 },
      sm: { span: 6 },
    },
  };

  const tailFormItemLayout = {
    wrapperCol: {
      xs: {
        span: 24,
        offset: 0,
      },
      sm: {
        span: 14,
        offset: 6,
      },
    },
  };


    return (
    <div style={{padding:'5%'}}>



    <div className="changePassword-label" style={{marginBottom:'30px'}}>
      <h2>Change Password</h2>
    </div>
    <Form onSubmit={this.handleSubmit}>

      <FormItem
        {...formItemLayout}
        label="Password"
        hasFeedback
      >
        {getFieldDecorator('password', {
          rules: [{
            required: true, message: 'Please input your password!',
          }],
        })(
          <Input type="password" />
        )}
      </FormItem>

      <FormItem
        {...formItemLayout}
        label="New Password"
        hasFeedback
      >
        {getFieldDecorator('new_password', {
          rules: [{
            required: true, message: 'Please input your new password!',
          }, {
            validator: this.checkConfirm,
          }],
        })(
          <Input type="password" />
        )}
      </FormItem>
      <FormItem
        {...formItemLayout}
        label="Confirm New Password"
        hasFeedback
      >
        {getFieldDecorator('confirm_new_password', {
          rules: [{
            required: true, message: 'Please confirm your new password!',
          }, {
            validator: this.checkPassword,
          }],
        })(
          <Input type="password" onBlur={this.handleConfirmBlur} />
        )}
      </FormItem>

      <FormItem {...tailFormItemLayout}>
          <Button type="primary" htmlType="submit" size="large" style={{backgroundColor:'#19BC9D', borderColor:'white'}}>Submit</Button>
      </FormItem>

      </Form>


    </div>
    );
  }
}

function mapStateToProps(state) {

    return {
      changeUserPasswordStatus: state.changeUserPassword.changeUserPasswordStatus,
      passwordNotMatch: state.changeUserPassword.passwordNotMatch
    };
}

export default connect(mapStateToProps)(Form.create({})(ChangePassword))
