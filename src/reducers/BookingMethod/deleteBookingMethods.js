

const INITIAL_STATE = {
  deleteBookingMethodsStatus: false
}

// { type: 'LOGIN_SUCCESS', text }
const deleteBookingMethods = (state = INITIAL_STATE, action) => {
  switch (action.type) {

    case 'DELETE_BOOKING_METHOD_ATTEMPT':
      return {

      }

    case 'DELETE_BOOKING_METHOD_SUCCESS':
      console.log("success")
        return{
          deleteBookingMethodsStatus: true
        }

    case 'DELETE_BOOKING_METHOD_FAILED':
      console.log("fail")
        return{
          deleteBookingMethodsStatus: false
        }

    default:
      return state
    }
}

export default deleteBookingMethods
