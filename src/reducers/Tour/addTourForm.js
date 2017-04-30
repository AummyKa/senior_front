

const INITIAL_STATE = {
  showAddTourModal: false,
  dateTour: ''
}

// { type: 'LOGIN_SUCCESS', text }
const addTourForm = (state = INITIAL_STATE, action) => {
  switch (action.type) {

    case 'ADD_TOUR':
      return {
        showAddTourModal: true,
        dateTour: action.dateTour
      }

    case 'CLOSE_ADD_TOUR':
      console.log("close add tour")
        return{
          showAddTourModal: false
        }

    case 'STOP_COUNT_ADD_TOUR':
        return{
          isStoppedCountingAddTour: action.isStoppedCountingAddTour
        }

    default:
      return state
    }
}

export default addTourForm
