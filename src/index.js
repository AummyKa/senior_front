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

const store = createStore(reducer);

//  var config = {
//   apiKey: "AIzaSyBdOEFbM1ktgj1Lc-ujrgOIDuy-i80_NYc",
//   authDomain: "senior2-77bb6.firebaseapp.com",
//   databaseURL: "https://senior2-77bb6.firebaseio.com",
//   storageBucket: "senior2-77bb6.appspot.com",
//   messagingSenderId: "332360993956"
// };
// firebase.initializeApp(config);

ReactDOM.render(

    <LocaleProvider locale={enUS}>
        <Provider store={store}>
        <Router history={browserHistory}>
          <Route path="/" component={App}>
            <IndexRoute component={LoginPage}/>
            <Route path="/home" component={DashboardPage}>
              <IndexRoute component= {Home}/>
                {/*
                  <Route path="/" component={LoginPage}/>
                  <Route path="/home" component={DashboardPage}/>
                */}

              <Route path="/guide">
                <IndexRoute  component={Guide}/>
                <Route path=":guideId"component={GuideLayout}> //tab
                  <IndexRoute component={GuidePersonal} />
                  <Route path="experience" component={GuideExperience} />
                  <Route path="history" component={GuideHistory} />
                  <Route path="timetable" component={GuideTimetable} />
                </Route>
              </Route>

                <Route path="/tours" >
                  <IndexRoute component={Tours}/>
                  <Route path=":tourId"component={TourDetail} />
                </Route>

                <Route path="/schedule" component={Schedule}/>
                <Route path="/pending" component={PendingList}/>
                <Route path="/staff" component={Staff}/>
                <Route path="/bookingMethod" component={BookingMethod}/>
              </Route>
          </Route>
        </Router>
    </Provider>
</LocaleProvider>
, document.getElementById('root'));
