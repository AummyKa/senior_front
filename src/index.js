import React from 'react';
import ReactDOM from 'react-dom';
import 'bootstrap/less/bootstrap.less'
import {createStore} from 'redux'
import {Provider} from 'react-redux'
// import configureStore from '../store/configureStore'

import {Router, IndexRoute, Route, browserHistory} from 'react-router';
import reducer from './reducers'
import enUS from 'antd/lib/locale-provider/en_US';
import { LocaleProvider } from 'antd';

//Pages
import App from "./pages/App";
import DashboardPage from "./pages/DashboardPage";
import LoginPage from "./pages/LoginPage";
import Schedule from './components/content/Schedule'
import PendingList from './components/content/PendingList'
import Staff from './components/content/Staff'

//Guide
import Guide from './components/content/Guide'
import GuideLayout from './components/content/GuideLayout'
import GuidePersonal from './components/content/GuidePersonal'
import GuideHistory from './components/content/GuideHistory'
import GuideTimetable from './components/content/GuideTimetable'
import GuideExperience from './components/content/GuideExperience'

//Tours
import Tours from './components/content/Tours'
import TourDetail from './components/content/TourDetail'

//Agency
import BookingMethod from './components/content/BookingMethod'

import Home from './components/content/Home'
import InvalidPage from './components/content/InvalidPage'

// import { requireAuth } from './Helpers/requireAuth'
import Cookies from 'js-cookie'


const store = createStore(reducer);
let token = Cookies.get('token')
let userRole = Cookies.get('userRole')

function requireManagerAuth(nextState, replace){
  if (token){
    if(userRole !== 'Manager'){
      replace({ pathname: '/invalid' })
    }
  }else {
    replace({ pathname: '/' })
  }
}

function notRequireGuideAuth(nextState, replace){
  if (token){
    if(userRole == 'Tour Guide'){
      replace({ pathname: '/invalid' })
    }
  }else {
    replace({ pathname: '/' })
  }
}

function isOnSession(nextState, replace){
  let guide_id = Cookies.get('userID')

  if(token){
    if (userRole == 'Manager') {
        replace({ pathname: '/home' })
    }else if (userRole == 'Tour Guide') {
        replace({ pathname: '/guide/'+guide_id })
    }else
        replace({ pathname: '/schedule' })
  }

 }

function isGuideAccess(nextState, replace){
  let guide_id = Cookies.get('userID')

  if(!token){
    replace({ pathname: '/' })
  }else if(token && userRole == 'Tour Guide'){
    Cookies.set('guide_id',guide_id)
    replace({ pathname: '/guide/'+guide_id })
  }

}

// function backToFirstPage(nextState, replace){
//   let guide_id = Cookies.get('userID')
//   if (token && userRole === 'Tour guide') {
//       replace({ pathname: '/guide/'+guide_id })
//   }else if (token && userRole === 'Manager') {
//       replace({ pathname: '/guide/'+guide_id })
//   }
// }


ReactDOM.render(

    <LocaleProvider locale={enUS}>
        <Provider store={store}>
        <Router history={browserHistory}>
          <Route path="/" component={App} >
            <IndexRoute component={LoginPage} onEnter={isOnSession} />
            <Route component={DashboardPage} path="/home">
              <IndexRoute component={Home} name="Home"
                onEnter={requireManagerAuth}/>
                {/*
                  <Route path="/" component={LoginPage}/>
                  <Route path="/home" component={DashboardPage}/>
                */}
              <Route path="/invalid">
                <IndexRoute component={InvalidPage}/>
              </Route>

              <Route path="/guide">
                <IndexRoute component={Guide} onEnter={isGuideAccess}/>
                <Route path=":guideId"component={GuideLayout}> //tab
                  <IndexRoute component={GuidePersonal} />
                  <Route path="experience" component={GuideExperience}/>
                  <Route path="history" component={GuideHistory}  />
                  <Route path="timetable" component={GuideTimetable} />
                </Route>
              </Route>

                <Route path="/tours" >
                  <IndexRoute component={Tours} onEnter={notRequireGuideAuth}/>/>
                  <Route path=":tourId"component={TourDetail} />
                </Route>

                <Route path="/schedule" component={Schedule} onEnter={notRequireGuideAuth}/>
                <Route path="/pending" component={PendingList} onEnter={requireManagerAuth}/>
                <Route path="/staff" component={Staff} onEnter={notRequireGuideAuth}/>
                <Route path="/bookingMethod" component={BookingMethod} onEnter={notRequireGuideAuth}/>
              </Route>
          </Route>
        </Router>
    </Provider>
</LocaleProvider>
, document.getElementById('root'));
