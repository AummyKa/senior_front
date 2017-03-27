import React, {
    Component
} from 'react';
import {
    Form,
    Icon,
    Input,
    Button,
    Checkbox
} from 'antd';

import RegistModal from './RegistModal';
import apiAccess from '../Helpers/apiAccess'

class LoginForm extends Component {

    constructor(props) {
        super(props);
        this.state = {
            visible: false,
            username: '',
            password: '',
            modal: false
        };
    }

    handleSubmit = (e) => {
        e.preventDefault();
        console.log(this.props.form.getFieldValue('username'))
        this.props.form.validateFields((err, values) => {
            if (!err) {
                apiAccess({
                    url: 'http://localhost:8000/login',
                    method: 'POST',
                    payload: {
                        username: this.props.form.getFieldValue('username'), //username is an email
                        password: this.props.form.getFieldValue('password')
                    },
                    attemptAction: () => this.props.dispatch({
                        type: 'LOGIN_ATTEMPT'
                    }),
                    successAction: (json) => this.props.dispatch({
                        type: 'LOGIN_SUCCESS',
                        json
                    }),
                    failureAction: () => this.props.dispatch({
                        type: 'LOGIN_FAILED'
                    })
                })
            } else
                console.log("error")
        });
    }

    render() {
        const {
            getFieldDecorator
        } = this.props.form;
        // console.log('LoginForm props', this.props);
        // console.log('form', this.props.form.getFieldValue('username'));
        return ( <
            Form onSubmit = {
                this.handleSubmit
            }
            className = "login-form" >
            <
            Form.Item > {
                getFieldDecorator('username', {
                    rules: [{
                        required: true,
                        message: 'Please input your username!'
                    }],
                })( <
                    Input addonBefore = { < Icon type = "lock" / >
                    }
                    type = "text"
                    placeholder = "username" / >
                )
            } <
            /Form.Item> <
            Form.Item > {
                getFieldDecorator('password', {
                    rules: [{
                        required: true,
                        message: 'Please input your Password!'
                    }],
                })( <
                    Input addonBefore = { < Icon type = "lock" / >
                    }
                    type = "password"
                    placeholder = "Password" / >
                )
            } <
            /Form.Item> <
            Form.Item > {
                getFieldDecorator('remember', {
                    valuePropName: 'checked',
                    initialValue: true,
                })( <
                    Checkbox > Remember me < /Checkbox>
                )
            } <
            a className = "login-form-forgot" > Forgot password < /a> <
            Button type = "primary"
            htmlType = "submit"
            className = "login-form-button" >
            Log in
            <
            /Button>

            <
            /Form.Item>

            <
            /Form>
        );
    }

}

export default Form.create({})(LoginForm)