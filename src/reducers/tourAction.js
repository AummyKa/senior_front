
const INITIAL_STATE = {
  inVisible: false
}

// { type: 'LOGIN_SUCCESS', text }
const tourAction = (state = INITIAL_STATE, action) => {
  switch (action.type) {

    case 'CLOSE_ALL_TOURS':
      return {
        inVisible: action.inVisible
      }

    default:
      return state
    }
}

export default tourAction
