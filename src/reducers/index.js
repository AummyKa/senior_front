import { combineReducers } from 'redux'

//user
import login from './User/login'
import regist from './User/regist'
import userData from './User/userData'
import pendingUser from './User/pendingUser'
import pendingApproved from './User/pendingApproved'
import logout from './User/logout'
import changeUserPassword from './User/changeUserPassword'

//guide
import guideDetail from './Guide/guideDetail'
import guideProfile from './Guide/guideProfile'
import getEachGuideName from './Guide/getEachGuideName'
import addGuideExpertField from './Guide/addGuideExpertField'
import getSuggestGuide from './Guide/getSuggestGuide'
import deleteEachGuideExpert from './Guide/deleteEachGuideExpert'
import updateEachGuideExpert from './Guide/updateEachGuideExpert'
import addUnAvailDateEachGuide from './Guide/addUnAvailDateEachGuide'
import updateEachGuideStatus from './Guide/updateEachGuideStatus'
import getGuideIncomeSummary from './Guide/getGuideIncomeSummary'
import getAllUnAvailDateEachGuide from './Guide/getAllUnAvailDateEachGuide'
import getYearlyTotalCostFromGuide from './Guide/getYearlyTotalCostFromGuide'
import getEachGuideUnAvailableEachDate from './Guide/getEachGuideUnAvailableEachDate'
import receiveSuggestedGuideName from './Guide/receiveSuggestedGuideName'


//staff
import getStaffLists from './Staff/getStaffLists'
import updateStaff from './Staff/updateStaff'
import getStaffProfile from './Staff/getStaffProfile'

//Tours
import getToursName from './Tour/getToursName'
import addTourForm from './Tour/addTourForm'
import postBookerAndTour from './Tour/postBookerAndTour'
import getBookerAndTour from './Tour/getBookerAndTour'
import getSpecificBookedTour from './Tour/getSpecificBookedTour'
import deleteCurCustomerInTour from './Tour/deleteCurCustomerInTour'
import deletedTour from './Tour/deletedTour'
import addNewTour from './Tour/addNewTour'
import tourAction from './Tour/tourAction'
import addNewCustomerInTour from './Tour/addNewCustomerInTour'
import selectTourID from './Tour/selectTourID'
import getTourData from './Tour/getTourData'
import getSpecificTourData from './Tour/getSpecificTourData'
import editCustomerInTour from './Tour/editCustomerInTour'
import postGuidePaymentEachTour from './Tour/postGuidePaymentEachTour'
import getEachTourYearlyRevenue from './Tour/getEachTourYearlyRevenue'
import getEachTourYearlyRevenueTable from './Tour/getEachTourYearlyRevenueTable'
import getEachTourExpertGuide from './Tour/getEachTourExpertGuide'
import getAmountNationsOfEachTour from './Tour/getAmountNationsOfEachTour'
import updateEachTour from './Tour/updateEachTour'
import getEachTourYearlyParticipants from './Tour/getEachTourYearlyParticipants'
import updateEachBookedTour from './Tour/updateEachBookedTour'

//schedule
import calendar from './Schedule/calendar'
import getEventSummary from './Schedule/getEventSummary'
import spreadSelectedDate from './Schedule/spreadSelectedDate'
import editCustomerModal from './Schedule/editCustomerModal'
import addCustomerModal from './Schedule/addCustomerModal'
import getFilteredEventSummary from './Schedule/getFilteredEventSummary'

//BookingMethod
import addBookingMethods from './BookingMethod/addBookingMethods'
import updateBookingMethods from './BookingMethod/updateBookingMethods'
import deleteBookingMethods from './BookingMethod/deleteBookingMethods'
import getBookingMethods from './BookingMethod/getBookingMethods'

//Home
import getTotalRev from './Home/getTotalRev'
import getTotalRevTable from './Home/getTotalRevTable'
import getTourRevRanking from './Home/getTourRevRanking'
import getAmountNationsSummary from './Home/getAmountNationsSummary'
import updateYearDashBoard from './Home/updateYearDashBoard'
import getTotalParticipant from './Home/getTotalParticipant'
import getTotalParticipantTable from './Home/getTotalParticipantTable'
import getYearlyTotalCustomer from './Home/getYearlyTotalCustomer'
import getYearlyBookingTypeCustomer from './Home/getYearlyBookingTypeCustomer'
import getYearlyTourTypeCustomer from './Home/getYearlyTourTypeCustomer'
import getTourCustomerRanking from './Home/getTourCustomerRanking'

//other
import clickSideBar from './clickSideBar'
import uploadPicture from './uploadPicture'

const admin = combineReducers({
    login,
    regist,
    guideDetail,
    userData,
    pendingUser,
    pendingApproved,
    calendar,
    getToursName,
    guideProfile,
    getStaffLists,
    logout,
    updateStaff,
    addTourForm,
    postBookerAndTour,
    getBookerAndTour,
    getSpecificBookedTour,
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
    updateBookingMethods,
    deleteBookingMethods,
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
    getBookingMethods,
    getTotalParticipant,
    getTotalParticipantTable,
    getYearlyTotalCustomer,
    getYearlyBookingTypeCustomer,
    getYearlyTourTypeCustomer,
    getTourCustomerRanking,
    postGuidePaymentEachTour,
    getEachTourYearlyRevenue,
    getEachTourYearlyRevenueTable,
    getSpecificTourData,
    getEachTourExpertGuide,
    getAmountNationsOfEachTour,
    updateEachTour,
    getEachTourYearlyParticipants,
    updateEachGuideStatus,
    updateEachBookedTour,
    getGuideIncomeSummary,
    getAllUnAvailDateEachGuide,
    getYearlyTotalCostFromGuide,
    getEachGuideUnAvailableEachDate,
    getFilteredEventSummary,
    receiveSuggestedGuideName,
    clickSideBar,
    uploadPicture,
    getStaffProfile,
    changeUserPassword
})

export default admin
