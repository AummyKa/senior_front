import React, { Component } from 'react';
import {connect} from 'react-redux';

const normal = {

}

const hover = {
  backgroundColor: '#B0AAA8',
  opacity: 1
}

class Box extends Component {

  constructor(props){
    super(props)
    this.state = {
      content: this.props.data,
      hover: false,
      show: this.props.show
    }
  }

  handleHover(){
      this.setState({hover: true})
  }

  handleLeaveHover(){
    this.setState({hover: false})
  }



  render() {
    console.log(this.props.dispatch)
    let inner = normal
    if(this.state.hover){
      inner = hover
    }

    if(this.state.show){
      return (
          <div className = "box">
            <div className = "box-inside" style={inner}
              onMouseEnter = {() => this.handleHover()}
              onMouseLeave={() => this.handleLeaveHover()}
              onClick = {() => this.props.handleClickBox}>
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
    }else{
      return (
        <div>
        </div>
      )
    }

  }

}

export default Box
