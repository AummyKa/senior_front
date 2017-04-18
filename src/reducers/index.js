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
import updateStaff from './updateStaff'
import addTourForm from './addTourForm'
import postBookerAndTour from './postBookerAndTour'
import getBookerAndTour from './getBookerAndTour'
import getSpecificTour from './getSpecificTour'
import getEventSummary from './getEventSummary'
import deleteCurCustomerInTour from './deleteCurCustomerInTour'
import spreadSelectedDate from './spreadSelectedDate'
import deletedTour from './deletedTour'
import addNewTour from './addNewTour'
import tourAction from './tourAction'
import addNewCustomerInTour from './addNewCustomerInTour'
import selectTourID from './selectTourID'
import getTourData from './getTourData'

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
    logout,
    updateStaff,
    addTourForm,
    postBookerAndTour,
    getBookerAndTour,
    getSpecificTour,
    getEventSummary,
    deleteCurCustomerInTour,
    spreadSelectedDate,
    deletedTour,
    addNewTour,
    tourAction,
    addNewCustomerInTour,
    selectTourID,
    getTourData
})

export default admin
