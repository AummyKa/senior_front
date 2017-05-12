

const INITIAL_STATE = {
  updateEachTourStatus: false
}

// { type: 'LOGIN_SUCCESS', text }
const updateEachTour = (state = INITIAL_STATE, action) => {
  switch (action.type) {

    case 'UPDATE_EACH_TOUR_ATTEMPT':
      return {

      }

    case 'UPDATE_EACH_TOUR_SUCCESS':

        return{
          updateEachTourStatus: true
        }

    case 'UPDATE_EACH_TOUR_FAILED':
      console.log("fail")
        return{
          updateEachTourStatus: false
        }

    default:
      return state
    }
}

export default updateEachTour
