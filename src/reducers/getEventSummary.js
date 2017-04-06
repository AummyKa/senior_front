
const INITIAL_STATE = {
  events: []
}
// { type: 'LOGIN_SUCCESS', text }
const getEventSummary = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case 'GET_EVENT_SUMMARY_ATTEMPT':
      return {
        //loading sign
      }
    case 'GET_EVENT_SUMMARY_SUCCESS':
      // action: { type: 'LOGIN_SUCCESS', json: { token: '' }
      console.log(action.json)
          return {
          events: action.json.payload
        }
    case 'GET_EVENT_SUMMARY_FAILURE':
      return {
        //pop up
      }

    default:
      return state
  }
}

export default getEventSummary
