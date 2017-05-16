
const INITIAL_STATE = {
  eachFilteredEventsSummary: []
}
// { type: 'LOGIN_SUCCESS', text }
const getFilteredEventSummary = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case 'GET_FILTERED_EVENT_SUMMARY_ATTEMPT':
      return {
        //loading sign
      }
    case 'GET_FILTERED_EVENT_SUMMARY_SUCCESS':
      // action: { type: 'LOGIN_SUCCESS', json: { token: '' }

          return {
          eachFilteredEventsSummary: action.json.payload
        }
    case 'GET_FILTERED_EVENT_SUMMARY_FAILURE':
      return {
        //pop up
      }

    default:
      return state
  }
}

export default getFilteredEventSummary
