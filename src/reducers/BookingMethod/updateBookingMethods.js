

const INITIAL_STATE = {
  updateBookingMethodsStatus: false
}

// { type: 'LOGIN_SUCCESS', text }
const updateBookingMethods = (state = INITIAL_STATE, action) => {
  switch (action.type) {

    case 'UPDATE_BOOKING_METHODS_ATTEMPT':
      return {

      }

    case 'UPDATE_BOOKING_METHODS_SUCCESS':
      console.log("success")
        return{
          updateBookingMethodsStatus: true
        }

    case 'UPDATE_BOOKING_METHODS_FAILED':
      console.log("fail")
        return{
          updateBookingMethodsStatus: false
        }

    default:
      return state
    }
}

export default updateBookingMethods
