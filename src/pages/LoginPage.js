import React, { PropTypes, Component } from 'react';
import { connect } from 'react-redux'
import { login } from '../actions'

import LoginForm from '../components/LoginForm';
import RegistModal from '../components/RegistModal';

import { Row,Col, Form, Icon, Input, Button, Checkbox } from 'antd';

const imgUrl = "./img";
const source = "bg.jpg";
const font_style ={
    padding: 20
}


const login_style = {
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
        this.state = { people: [] }
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
      if (this.props.loggedIn !== nextProps.loggedIn) {
        this.context.router.replace('/dashboard')

      }
    }

    render(){
        console.log('props in LoginPage', this.props)

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
  loggedIn: state.login.loggedIn
})


export default connect(mapStateToProps)(LoginPage);
