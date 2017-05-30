
const INITIAL_STATE = {
  agencyTotalParticipants: []
}
// { type: 'LOGIN_SUCCESS', text }
const getAgencyTotalParticipants = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case 'GET_AGENCY_TOTAL_PARTICIPANTS_ATTEMPT':
      return {
        //loading sign
      }
    case 'GET_AGENCY_TOTAL_PARTICIPANTS_SUCCESS':
      // action: { type: 'LOGIN_SUCCESS', json: { token: '' }
          return {
            agencyTotalParticipants: action.json
        }
    case 'GET_AGENCY_TOTAL_PARTICIPANTS_FAILURE':
      return {
        //pop up
      }

    default:
      return state
  }
}

export default getAgencyTotalParticipants
