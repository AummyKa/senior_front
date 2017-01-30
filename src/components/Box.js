import React, { Component } from 'react';


class Box extends Component {

  constructor(props){
    super(props)
    this.state = {
      content : this.props.data
    }
  }


  render() {
    return (

      <div className = "box">
        <div className = "box-image">
          <img src={this.state.content.image}
            alt="boohoo" className="img-box"/>
        </div>
        <div className = "box-detail">
            <h4>{this.state.content.title}</h4>
        <ul>
            <li><h5>{this.state.content.place}</h5></li>
          </ul>
        </div>
      </div>

    );
  }
}

export default Box
