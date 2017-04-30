
const INITIAL_STATE = {
  editCustomerInTourStatus: false
}
// { type: 'LOGIN_SUCCESS', text }
const editCustomerInTour = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case 'EDIT_CUSTOMER_IN_TOUR_ATTEMPT':
      return {

      }
    case 'EDIT_CUSTOMER_IN_TOUR_SUCCESS':
      return {
        editCustomerInTourStatus: true
      }
    case 'EDIT_CUSTOMER_IN_TOUR_FAILED':
      return {
        editCustomerInTourStatus: false
      }
      default:
        return state

}
}

export default editCustomerInTour
