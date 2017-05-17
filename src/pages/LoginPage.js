import React, { Component } from 'react';
import PropTypes from 'prop-types'
import { connect } from 'react-redux'

import LoginForm from '../components/LoginForm';
import RegistModal from '../components/RegistModal';

import { error, info } from '../components/Modal'

import { Col, Row } from 'antd';


const font_style={
    padding: 20
}


const login_style= {
    padding: 10,
    margin: 20,
    marginTop: 160,
    marginLeft: 50,
    marginRight:50,
    fontSize: 18,
    textAlign: "center",
    maxHeight: 100
}


class LoginPage extends Component {

    constructor (props) {
        super(props)
        this.state = {
          people: []

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


      if(this.props.registed !== nextProps.registed){

        if(nextProps.registed){
          let title = 'Register successful'
          let content = 'You can login when your registration is approved'

          return(
            <div>
              {info(title,content)}
            </div>
          )
        }
      }
    }

    render(){

        return(
            <div>
                <Row>
                    <Col span={17}>
                        <div className="login-background">
                            {/*{this.state.people.map(({ _id, name, age }) => {*/}
                                {/*return <div key={_id}>#{_id} Name: {name}, Age: {age}</div>*/}
                            {/*})}*/}
                            <h1>Food tour</h1>
                        </div>
                    </Col>

                    <Col span={5} style = {login_style}>
                        <h2 style={font_style}>Login</h2>

                        <LoginForm dispatch={this.props.dispatch} />
                        <RegistModal dispatch={this.props.dispatch}  / >

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
  isLogout: state.logout.isLogout
})


export default connect(mapStateToProps)(LoginPage);
