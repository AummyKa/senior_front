

const INITIAL_STATE = {
  username: ''
}

// { type: 'LOGIN_SUCCESS', text }
const userData = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case 'GET_NAME_OF_USER_ATTEMPT':
      console.log("hi")
      return {
        //loading sign
      }
    case 'GET_NAME_OF_USER_SUCCESS':
      // action: { type: 'LOGIN_SUCCESS', json: { token: '' }}
      console.log(action)
      return {

      }
    case 'GET_NAME_OF_USER_FAILED':
        console.log("fail")
      return {
        //pop up
      }

    default:
      return ''
  }
}

export default userData
