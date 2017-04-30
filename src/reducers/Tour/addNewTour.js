

const INITIAL_STATE = {
  newTour: [],
  add_newTour_success_status: false
}

// { type: 'LOGIN_SUCCESS', text }
const addNewTour = (state = INITIAL_STATE, action) => {
  switch (action.type) {

    case 'ADD_NEW_TOUR_ATTEMPT':
      console.log("attempt")
      return {

      }

    case 'ADD_NEW_TOUR_SUCCESS':
      console.log(action.json)
      console.log("success")
        return{
          newTour: action.json,
          add_newTour_success_status: true
        }

    case 'ADD_NEW_TOUR_FAILED':
      console.log("fail")
        return{
          add_newTour_success_status: false
        }

    default:
      return state
    }
}

export default addNewTour
