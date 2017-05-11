
const INITIAL_STATE = {
  totalParticipantTable: []
}
// { type: 'LOGIN_SUCCESS', text }
const getTotalParticipantTable = (state = INITIAL_STATE, action) => {
  switch (action.type) {

    case 'GET_TOTAL_PARTICIPANT_TABLE_ATTEMPT':
      return {

      }
    case 'GET_TOTAL_PARTICIPANT_TABLE_SUCCESS':
    console.log(action.json)
      return {
        totalParticipantTable: action.json
      }
    case 'GET_TOTAL_PARTICIPANT_TABLE_FAILED':

      return {

      }

      default:
        return state

}
}

export default getTotalParticipantTable
