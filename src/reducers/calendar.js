

const INITIAL_STATE = {
  events: ''
}

// { type: 'LOGIN_SUCCESS', text }
const calendar = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case 'GET_CALENDAR_ATTEMPT':
      return {
        //loading sign
      }
    case 'GET_CALENDAR_SUCCESS':
      // action: { type: 'LOGIN_SUCCESS', json: { token: '' }}
      console.log(action)
      return {
        events : action.json
      }
    case 'GET_CALENDAR_FAILED':
        console.log("fail")
      return {
        //pop up
      }

    default:
      return ''
  }
}

export default calendar
