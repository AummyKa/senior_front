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
        console.log("fail to login")
      return {

        //pop up
      }

    default:
      return state
  }
}

export default login
