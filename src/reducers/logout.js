import Cookies from 'js-cookie'

const INITIAL_STATE = {
  isLogout : false
}
// { type: 'LOGIN_SUCCESS', text }
const logout = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case 'LOGOUT_ATTEMPT':
      return {
        //loading sign
      }
    case 'LOGOUT_SUCCESS':
      // action: { type: 'LOGIN_SUCCESS', json: { token: '' }}
      console.log("hayyo")
      console.log(action.json)
      console.log(action)
      if(!action.json.isLogin){
        console.log("whut sup")
        Cookies.remove('session');
        return{
          isLogout : true
        }

      }

    case 'LOGOUT_FAILURE':
      return {

        //pop up
      }

    default:
      return state
  }
}

export default logout
