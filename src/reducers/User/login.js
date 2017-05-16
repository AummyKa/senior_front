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
      if(action.json.login_success){
        Cookies.set('token', action.json.token)
        Cookies.set('userName',action.json.user.fullname)
        Cookies.set('userRole',action.json.user.role)
        Cookies.set('userID',action.json.user._id)
        return {
          loggedIn: true,
          session: action.json.session,
          token: action.json.token
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
