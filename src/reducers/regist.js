import Cookies from 'js-cookie'

const INITIAL_STATE = {
  id: '', text: '', registed: false

}
// { type: 'LOGIN_SUCCESS', text }
const regist = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case 'REGIST_ATTEMPT':
      return {
        //loading sign
      }
    case 'REGIST_SUCCESS':

    console.log(action)
      return {
        registed: true
      }
    case 'REGIST_FAILURE':
      return {

      }

    default:
      return state
  }
}

export default regist
