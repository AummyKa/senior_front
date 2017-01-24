import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux'

import { Row,Col, Content } from 'antd';

import SideBar from '../components/SideBar'
import NavBar from '../components/NavBar'
import Guide from '../components/content/Guide'
import Home from '../components/content/Home'
import PendingList from '../components/content/PendingList'

class DashboardPage extends Component {

  constructor(props){
    super(props)

    this.state = {
      home: true,
      guide: false,
      schedule: false,
      tour: false,
      finance: false,
      pendinglist: false
    }
  }
  static contextTypes = {
    router: PropTypes.object.isRequired
  }

  componentWillReceiveProps (nextProps) {

      let page = nextProps.pageState
      let previous = this.props.pageState

      if(page!==previous){
        switch (page) {
          case 'home': //home
              this.setState({home:true,guide:false,pendinglist: false })
              break;
          case 'guide': //guide
              this.setState({guide:true,home:false, pendinglist: false})
              break;
          case 'pendinglist':
              console.log("page")
              this.setState({pendinglist: true, guide:false, home:false})
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
                        { this.state.pendinglist ? <PendingList /> : null }
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
