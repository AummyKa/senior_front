

const INITIAL_STATE = {
  showSideBar: false
}

// { type: 'LOGIN_SUCCESS', text }
const clickSideBar = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case 'TOGGLE_SIDEBAR':
        return {
            showSideBar: action.showSideBar,
        }

    default:
        return ""
      }
}

export default clickSideBar
