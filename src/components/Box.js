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
    console.log(this.props.show)
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

  componentWillReceiveProps(nextProps){
    console.log(nextProps.inVisible)
    if(this.props.inVisible !== nextProps.inVisible){
      if(nextProps.inVisible){
        this.setState({show: false})
      }
    }
  }

  render() {
    console.log(this.state.content._id)
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
              onClick = {this.props.handleClickBox(this.state.content._id)}>
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

function mapStateToProps(state){
  return {
    inVisible: state.tourAction.inVisible
  }
}

export default connect(mapStateToProps)(Box)
