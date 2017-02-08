import { combineReducers } from 'redux'
import login from './login'
import regist from './regist'
import pageStatus from './pageStatus'
import guideDetail from './guideDetail'
import search from './search'
import userData from './userData'
import pendingUser from './pendingUser'
import pendingApproved from './pendingApproved'
import calendar from './calendar'
import getTours from './getTours'
import guideProfile from './guideProfile'
import getStaffLists from './getStaffLists'
import logout from './logout'


const admin = combineReducers({
    login,
    regist,
    pageStatus,
    guideDetail,
    search,
    userData,
    pendingUser,
    pendingApproved,
    calendar,
    getTours,
    guideProfile,
    getStaffLists,
    logout
})

export default admin
