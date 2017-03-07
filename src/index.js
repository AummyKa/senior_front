import React from 'react';
import ReactDOM from 'react-dom';
import 'bootstrap/less/bootstrap.less'
import {createStore} from 'redux'
import {Provider} from 'react-redux'
// import configureStore from '../store/configureStore'

import {Router, IndexRoute, Route, browserHistory} from 'react-router';
import reducer from './reducers'

//Pages
import App from "./pages/App";
import DashboardPage from "./pages/DashboardPage";
import LoginPage from "./pages/LoginPage";
import Guide from './components/content/Guide'
import Tours from './components/content/Tours'
import Schedule from './components/content/Schedule'
import PendingList from './components/content/PendingList'



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

    <Provider store={store}>
    <Router history={browserHistory}>
        <Route component={App}>
            <IndexRoute component={LoginPage}/>
            <Route path="/" component={LoginPage}/>
            <Route path="/home" component={DashboardPage}/>
            <Route path="/guide" component={Guide}/>
            <Route path="/tours" component={Tours}/>
            <Route path="/schedule" component={Schedule}/>
            <Route path="/pending" component={PendingList}/>

        </Route>
    </Router>
</Provider>, document.getElementById('root'));
