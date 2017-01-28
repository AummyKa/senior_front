import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux'

import { Row,Col, Content } from 'antd';

import SideBar from '../components/SideBar'
import NavBar from '../components/NavBar'
import Guide from '../components/content/Guide'
import Home from '../components/content/Home'
import PendingList from '../components/content/PendingList'
import Tours from '../components/content/Tours'

class DashboardPage extends Component {

  constructor(props){
    super(props)

    this.state = {
      home: true,
      guide: false,
      schedule: false,
      tour: false,
      finance: false,
      pendinglist: false,
      tours: false

    }
  }
  static contextTypes = {
    router: PropTypes.object.isRequired
  }

  componentWillReceiveProps (nextProps) {

      let page = nextProps.pageState
      let previous = this.props.pageState

      console.log(page)

      if(page!==previous){
        switch (page) {
          case 'home': //home
              this.setState({home:true,guide:false,pendinglist: false,
              tours: false})
              break;
          case 'guide': //guide
              this.setState({guide:true,home:false, pendinglist: false,
              tours: false})
              break;
          case 'pendinglist':
              this.setState({pendinglist: true, guide:false, home:false,
              tours: false})
              break;
          case 'tours':
              console.log(page)
              this.setState({tours: true,pendinglist: false, guide:false,
              home:false})
              break;
          default:
            return ""
        }
      }
      // if(page = "home"){
      //   this.setState({home: true, guide: false})
      //   this.context.router.replace('/home')
      // }
      // if(page = "guide"){
      //   this.setState({guide: true, home: false })
      //   this.context.router.replace('/guide')
      // }

  //   if(page = "schedule"){
  //     this.setState({schedule: true})
  //     this.context.router.replace('/schedule')
  //  }
  //   if(page = "tour"){
  //     this.setState({tour: true})
  //     this.context.router.replace('/tour')
  //   }
  //   if(page = "finance"){
  //     this.setState({finance: true})
  //     this.context.router.replace('/tour')
  //   }

  }

  render(){
          return(
          <div>
              <Row>
                  <Col span={4}>
                      <SideBar dispatch={this.props.dispatch}/>
                          {/*{this.state.people.map(({ _id, name, age }) => {*/}
                              {/*return <div key={_id}>#{_id} Name: {name}, Age: {age}</div>*/}
                          {/*})}*/}
                  </Col>
                  <Col span={18} >
                    <NavBar dispatch={this.props.dispatch} />
                      <div style={{ padding: 60, minHeight: 360  }}>
                        { this.state.home ? <Home /> : null }
                        { this.state.guide ? <Guide dispatch={this.props.dispatch} /> : null }
                        { this.state.pendinglist ? <PendingList dispatch={this.props.dispatch} /> : null }
                        { this.state.tours ? <Tours /> : null }
                      </div>
                  </Col>
              </Row>
          </div>
      );
  }

}

const mapStateToProps = (state) => ({
  pageState: state.pageStatus.pageMove
})

export default connect(mapStateToProps)(DashboardPage);
