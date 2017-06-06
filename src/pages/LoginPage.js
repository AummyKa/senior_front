import React, { Component } from 'react';
import PropTypes from 'prop-types'
import { connect } from 'react-redux'

import LoginForm from '../components/LoginForm';
import RegistModal from '../components/RegistModal';
import apiAccess from '../Helpers/apiAccess'


import { error, info } from '../components/Modal'

import { Col, Row, Modal, Icon, Input, Alert } from 'antd';


class LoginPage extends Component {

    constructor (props) {
        super(props)
        this.state = {
          people: [],
          showForgotPassword:false,
          userEmail:'',
          showSuccessfulForgetPassword:false,
          showUnsuccessfulForgetPassword:false
        }
    }

    static contextTypes = {
      router: PropTypes.object.isRequired
    }

    // componentDidMount () {
    //     dispatch({login(username,password)
    //     fetch('http://localhost:8000')
    //     .then(response => response.json())
    //     .then(json => {
    //         this.setState({ people: json })
    //     })
    // }

    componentWillReceiveProps (nextProps) {
      console.log(nextProps.failLogged)
      if(this.props.failLogged !== nextProps.failLogged){
        if(nextProps.failLogged){
          console.log("haha")
          let title = 'Login fail'
          let content = 'Your username or password are wrong, or your account is unauthorized.'

          return(
            <div>
              {error(title,content)}
            </div>
          )
        }
      }

      if(this.props.showForgotPasswordModal !== nextProps.showForgotPasswordModal){
        if(nextProps.showForgotPasswordModal){
          this.setState({showForgotPassword:true})
        }
      }

      if(this.props.getResetPasswordStatus !== nextProps.getResetPasswordStatus){
        if(nextProps.getResetPasswordStatus){
          this.setState({
            showSuccessfulForgetPassword:nextProps.getResetPasswordStatus,
            showUnsuccessfulForgetPassword:false
          })
        }
      }

      if(this.props.emailForgetPassewordInValidStatus!==nextProps.emailForgetPassewordInValidStatus){
        if(nextProps.emailForgetPassewordInValidStatus){
          this.setState({
            showUnsuccessfulForgetPassword:nextProps.emailForgetPassewordInValidStatus,
            showSuccessfulForgetPassword:false})
        }
      }

      if(this.props.registed !== nextProps.registed){

        if(nextProps.registed){
          let title = 'Registration Complete!!'
          let content = 'You can login after your account is approved'

          return(
            <div>
              {info(title,content)}
            </div>
          )
        }
      }
    }

    onChangeEmail(e){
      this.setState({ userEmail: e.target.value });
    }

    handleForgotPassword(){
      let email = this.state.userEmail
      if(email){
        apiAccess({
          url: 'forget-password',
          method: 'POST',
          payload: {
            email: email
          },
          attemptAction: () => this.props.dispatch({ type: 'SEND_EMAIL_FORGET_PASSWORD_ATTEMPT' }),
          successAction: (json) => this.props.dispatch({ type: 'SEND_EMAIL_FORGET_PASSWORD_SUCCESS', json }),
          failureAction: () => this.props.dispatch({ type: 'SEND_EMAIL_FORGET_PASSWORD_FAILED' })
        })
      }

    }

    render(){

      let closeForgotPassword = () => { this.setState({showForgotPassword: false})}

        return(
            <div>
                <Row className="login-page">
                    <Col xs={{ span: 0 }} lg={{ span: 17 }}>
                        <div className="login-background">
                            {/*{this.state.people.map(({ _id, name, age }) => {*/}
                                {/*return <div key={_id}>#{_id} Name: {name}, Age: {age}</div>*/}
                            {/*})}*/}
                            <h1>Bangkok Food Tour</h1>
                            <h3>Admistration System</h3>
                        </div>
                    </Col>

                    <Col xs={{ span: 24 }} lg={{ span: 7 }}>
                      <div className="login-form">

                        <h2 style={{fontSize:'3.5vh', marginBottom:'20px'}}>Welcome to Local Tour!!</h2>

                        <LoginForm dispatch={this.props.dispatch} />
                        <RegistModal dispatch={this.props.dispatch}  / >

                          <Modal style={{fontSize:'3vh'}} title="Forgot Password" visible={this.state.showForgotPassword}
                            onOk={this.handleForgotPassword.bind(this)} onCancel={closeForgotPassword}
                          >
                            <p style={{fontSize:'2vh'}}>Please input your email and submit</p>
                            <p style={{fontSize:'2vh'}}>Your reset password will be sent via email</p>
                              <Input
                                style={{fontSize:'2vh'}}
                                placeholder="Enter your email address"
                                prefix={<Icon type="user" />}
                                onChange={this.onChangeEmail.bind(this)}
                              />
                            {this.state.showSuccessfulForgetPassword ?
                              <Alert
                                  message="Your reset password is send to your email"
                                  type="success"
                                  showIcon
                                />
                              : null
                            }
                            {this.state.showUnsuccessfulForgetPassword ?
                              <Alert
                                message="Error: Your email is invalid"
                                type="error"
                                showIcon
                              />
                              : null
                            }

                          </Modal>
                        </div>
                    </Col>
            </Row>
            </div>
        );
    }

}

const mapStateToProps = (state) => ({
  loggedIn: state.login.loggedIn,
  registed: state.regist.registed,
  failLogged: state.login.failLogged,
  isLogout: state.logout.isLogout,
  showForgotPasswordModal: state.changeUserPassword.showForgotPasswordModal,
  emailForgetPassewordInValidStatus: state.changeUserPassword.emailForgetPassewordInValidStatus,
  getResetPasswordStatus: state.changeUserPassword.getResetPasswordStatus
})


export default connect(mapStateToProps)(LoginPage);
