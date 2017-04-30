const INITIAL_STATE = {
  approvedUser : false
}

// { type: 'LOGIN_SUCCESS', text }
const pendingApproved = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case 'APPROVE_PENDING_USER_ATTEMPT':
        console.log("hi")
      return {
        //loading sign
      }
    case 'APPROVE_PENDING_USER_SUCCESS':
      // action: { type: 'LOGIN_SUCCESS', json: { token: '' }}
      console.log("approve success")
        return {
          approvedUser : true
      }
    case 'APPROVE_PENDING_USER_FAILED':

      console.log("approve fail")
      return {
        //pop up
      }

    default:
      return state

}
}

export default pendingApproved
