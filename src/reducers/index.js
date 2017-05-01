import { combineReducers } from 'redux'

//user
import login from './User/login'
import regist from './User/regist'
import userData from './User/userData'
import pendingUser from './User/pendingUser'
import pendingApproved from './User/pendingApproved'
import logout from './User/logout'

//guide
import guideDetail from './Guide/guideDetail'
import guideProfile from './Guide/guideProfile'
import getEachGuideName from './Guide/getEachGuideName'
import addGuideExpertField from './Guide/addGuideExpertField'
import getSuggestGuide from './Guide/getSuggestGuide'
import deleteEachGuideExpert from './Guide/deleteEachGuideExpert'
import updateEachGuideExpert from './Guide/updateEachGuideExpert'

//staff
import getStaffLists from './Staff/getStaffLists'
import updateStaff from './Staff/updateStaff'

//Tours
import getTours from './Tour/getTours'
import addTourForm from './Tour/addTourForm'
import postBookerAndTour from './Tour/postBookerAndTour'
import getBookerAndTour from './Tour/getBookerAndTour'
import getSpecificTour from './Tour/getSpecificTour'
import deleteCurCustomerInTour from './Tour/deleteCurCustomerInTour'
import deletedTour from './Tour/deletedTour'
import addNewTour from './Tour/addNewTour'
import tourAction from './Tour/tourAction'
import addNewCustomerInTour from './Tour/addNewCustomerInTour'
import selectTourID from './Tour/selectTourID'
import getTourData from './Tour/getTourData'
import editCustomerInTour from './Tour/editCustomerInTour'

//schedule
import calendar from './Schedule/calendar'
import getEventSummary from './Schedule/getEventSummary'
import spreadSelectedDate from './Schedule/spreadSelectedDate'
import editCustomerModal from './Schedule/editCustomerModal'
import addCustomerModal from './Schedule/addCustomerModal'

//Agency
import getAgency from './Agency/getAgency'
import addAgency from './Agency/addAgency'
import updateAgency from './Agency/updateAgency'
import deleteAgency from './Agency/deleteAgency'



const admin = combineReducers({
    login,
    regist,
    guideDetail,
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
    getTourData,
    getEachGuideName,
    addGuideExpertField,
    getSuggestGuide,
    getAgency,
    addAgency,
    updateAgency,
    deleteAgency,
    editCustomerModal,
    addCustomerModal,
    editCustomerInTour,
    deleteEachGuideExpert,
    updateEachGuideExpert
})

export default admin
