import React, { Component } from 'react';
import {connect} from 'react-redux';
import PropTypes from 'prop-types'
import Cookies from 'js-cookie'


const normal = {

}

const hover = {
  backgroundColor: '#B0AAA8',
  opacity: 1
}

class Box extends Component {

  constructor(props){
    super(props)
    console.log(this.props.show)
    this.state = {
      content: this.props.data,
      hover: false
    }
  }

  static contextTypes = {
    router: PropTypes.object.isRequired
  }


  handleHover(){
      this.setState({hover: true})
  }

  handleLeaveHover(){
    this.setState({hover: false})
  }

  handleClickBox(content){
    console.log(content)
    this.context.router.push('/tours/'+ content._id);
  }

  componentWillReceiveProps(nextProps){

  }

  render() {
    console.log(this.state.content._id)
    let inner = normal
    if(this.state.hover){
      inner = hover
    }


      return (
          <div className = "box">
            <div className = "box-inside" style={inner}
              onMouseEnter = {() => this.handleHover()}
              onMouseLeave={() => this.handleLeaveHover()}
              onClick = {() => this.handleClickBox(this.state.content)}>
              <div className = "box-image">
                <img src={this.state.content.image}
                  alt="boohoo" className="img-box"/>
              </div>
              <div className = "box-detail">
                  <h4>{this.state.content.tour_name}</h4>
              <ul>
                  <li><h5>{this.state.content.place}</h5></li>
                </ul>
              </div>
            </div>
        </div>

        );


  }

}

function mapStateToProps(state){
  return {

  }
}

export default connect(mapStateToProps)(Box)
