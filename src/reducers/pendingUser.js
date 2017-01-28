const INITIAL_STATE = {
  pendingUsers : {}
}

// { type: 'LOGIN_SUCCESS', text }
const pendingUser = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case 'GET_PENDING_USER_ATTEMPT':

      return {
        //loading sign
      }
    case 'GET_PENDING_USER_SUCCESS':
      // action: { type: 'LOGIN_SUCCESS', json: { token: '' }}
      console.log(action.json)
      return {
        pendingUsers: action.json
      }
    case 'GET_PENDING_USER__FAILED':
        console.log("fail")
      return {
        //pop up
      }

    default:
      return ''

}
}

export default pendingUser
