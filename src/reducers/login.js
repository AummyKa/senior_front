import Cookies from 'js-cookie'

const INITIAL_STATE = {
  id: '', text: '', completed: false,
  loggedIn: false
}

// { type: 'LOGIN_SUCCESS', text }
const login = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case 'LOGIN_ATTEMPT':
      return {
        //loading sign
      }
    case 'LOGIN_SUCCESS':
      // action: { type: 'LOGIN_SUCCESS', json: { token: '' }}
      Cookies.set('token', action.json.token)
      console.log(action)
      return {
        loggedIn: true
      }
    case 'LOGIN_FAILURE':
      return {
        //pop up
      }
    // case 'LOGIN_FAILED':
    //     id: action.id,
    //     text: action.text,
    //     completed: false
    //
    //   return {
    //     ...state,
    //     completed: !state.completed
    //   }
    default:
      return state
  }
}

export default login
