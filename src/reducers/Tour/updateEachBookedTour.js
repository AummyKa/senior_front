
const INITIAL_STATE = {
  updateEachBookedTourStatus : false

}
// { type: 'LOGIN_SUCCESS', text }
const updateEachBookedTour = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case 'UPDATE_EACH_BOOKED_TOUR_ATTEMPT':
      return {
        //loading sign
      }
    case 'UPDATE_EACH_BOOKED_TOUR_SUCCESS':
      // action: { type: 'LOGIN_SUCCESS', json: { token: '' }}
      return{
        updateEachBookedTourStatus : true
      }

    case 'UPDATE_EACH_BOOKED_TOUR_FAILURE':
      return {
        updateEachBookedTourStatus : false
      }

    default:
      return state
  }
}

export default updateEachBookedTour
