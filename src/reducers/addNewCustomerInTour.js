

const INITIAL_STATE = {
  addCustomerSuccess: false
}

// { type: 'LOGIN_SUCCESS', text }
const addNewCustomerInTour = (state = INITIAL_STATE, action) => {
  switch (action.type) {

    case 'ADD_MORE_CUSTOMER_IN_TOUR_ATTEMPT':
      return {

      }

    case 'ADD_MORE_CUSTOMER_IN_TOUR_SUCCESS':

        return{
          addCustomerSuccess: true
        }

    case 'ADD_MORE_CUSTOMER_IN_TOUR_FAILED':
      console.log("fail")
        return{
          addCustomerSuccess: false
        }

    default:
      return state
    }
}

export default addNewCustomerInTour
