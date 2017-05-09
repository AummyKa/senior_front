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
import addUnAvailDateEachGuide from './Guide/addUnAvailDateEachGuide'

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

//BookingMethod
import addBookingMethods from './BookingMethod/addBookingMethods'
import updateAgency from './BookingMethod/updateAgency'
import deleteAgency from './BookingMethod/deleteAgency'
import getBookingMethods from './BookingMethod/getBookingMethods'

//Home
import getTotalRev from './Home/getTotalRev'
import getTotalRevTable from './Home/getTotalRevTable'
import getTourRevRanking from './Home/getTourRevRanking'
import getAmountNationsSummary from './Home/getAmountNationsSummary'
import updateYearDashBoard from './Home/updateYearDashBoard'

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
    addBookingMethods,
    updateAgency,
    deleteAgency,
    editCustomerModal,
    addCustomerModal,
    editCustomerInTour,
    deleteEachGuideExpert,
    updateEachGuideExpert,
    addUnAvailDateEachGuide,
    getTotalRev,
    getTotalRevTable,
    getTourRevRanking,
    getAmountNationsSummary,
    updateYearDashBoard,
    getBookingMethods
})

export default admin
