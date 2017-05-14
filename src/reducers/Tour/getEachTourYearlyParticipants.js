
const INITIAL_STATE = {
  eachTourYearlyParticipants: []
}
// { type: 'LOGIN_SUCCESS', text }
const getEachTourYearlyParticipants = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case 'GET_EACH_TOUR_YEARLY_PARTICIPANTS_ATTEMPT':
      return {
        //loading sign
      }
    case 'GET_EACH_TOUR_YEARLY_PARTICIPANTS_SUCCESS':
      // action: { type: 'LOGIN_SUCCESS', json: { token: '' }

        return {
          eachTourYearlyParticipants: action.json
        }

    case 'GET_EACH_TOUR_YEARLY_PARTICIPANTS_FAILURE':
            console.log("noooooo it's not work")
      return {
        //pop up
      }

    default:
      return state
  }
}

export default getEachTourYearlyParticipants
