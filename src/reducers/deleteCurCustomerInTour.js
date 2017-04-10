
const INITIAL_STATE = {
  delete_cus_status: false
}
// { type: 'LOGIN_SUCCESS', text }
const deleteCurCustomerInTour = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case 'DELETE_CUR_CUS_IN_TOUR_ATTEMPT':
      return {

      }
    case 'DELETE_CUR_CUS_IN_TOUR_SUCCESS':
      return {
        delete_cus_status: true
      }
    case 'DELETE_CUR_CUS_IN_TOUR_FAILED':
      return {
        delete_cus_status: false
      }
      default:
        return state

}
}

export default deleteCurCustomerInTour
