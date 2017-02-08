import Cookies from 'js-cookie'

const INITIAL_STATE = {
  loggedIn: false, failLogged: false
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
      Cookies.set('session', action.json.login_success)
      console.log(action.json)
      console.log(action.json.session)
      if(action.json.login_success){
        return {
          loggedIn: true,
          session: action.json.session
        }
      }else {
        return {
          failLogged: true
        }
      }

    case 'LOGIN_FAILURE':
      return {
        failLogged: true,
        //pop up
      }

    default:
      return state
  }
}

export default login
