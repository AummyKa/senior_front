import React, { Component } from 'react';
import {connect} from 'react-redux';
import PropTypes from 'prop-types'
import Cookies from 'js-cookie'
// import getCurTourID from '../actions/action-getCurTourID'

const normal={}

const normalImage={}

const hover={
  backgroundColor: '#F94F2A',
  color: 'white',
  opacity: 1,
  height: '100%'
}

const hoverImage={
  opacity: 0.5,
}

class Box extends Component {

  constructor(props){
    super(props)
    console.log(this.props.show)
    this.state = {
      content: this.props.data,
      hover: false,
      tour_picture_url:"http://localhost:8000/tours/image/"+this.props.data._id
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
    // this.props.dispatch(getCurTourID("GET_CUR_TOUR_ID",this.state.tour_id))
    Cookies.set('tour_id',content._id)
    this.context.router.push('/tours/'+ content._id);
  }

  componentWillReceiveProps(nextProps){

  }

  render() {
    let inner = normal
    let innerImage = normalImage
    if(this.state.hover){
      inner = hover
      innerImage= hoverImage
    }


      return (
          <div className = "box">
            <div className = "box-inside" style={inner}
              onMouseEnter = {() => this.handleHover()}
              onMouseLeave={() => this.handleLeaveHover()}
              onClick = {() => this.handleClickBox(this.state.content)}>
              <div className = "box-image">
                <img src={this.state.tour_picture_url} className="img-box" style={innerImage}/>
              </div>
              <div className = "box-detail">
                  <h4>{this.state.content.tour_name}</h4>
              <ul>
                  <li><h5>{this.state.content.place}</h5>
                  <h5 style = {{textAlign:'right'}}>{this.state.content.type}</h5></li>
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
