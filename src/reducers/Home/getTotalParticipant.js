
const INITIAL_STATE = {
  totalParticipantData: []
}
// { type: 'LOGIN_SUCCESS', text }
const getTotalParticipant = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case 'GET_TOTAL_PARTICIPANT_ATTEMPT':
      return {
        //loading sign
      }
    case 'GET_TOTAL_PARTICIPANT_SUCCESS':
      // action: { type: 'LOGIN_SUCCESS', json: { token: '' }
          return {
          totalParticipantData: action.json
        }
    case 'GET_TOTAL_PARTICIPANT_FAILURE':
      return {
        //pop up
      }

    default:
      return state
  }
}

export default getTotalParticipant
