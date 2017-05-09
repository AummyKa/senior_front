
const INITIAL_STATE = {
  selectedYear:''
}
// { type: 'LOGIN_SUCCESS', text }
const updateYearDashBoard = (state = INITIAL_STATE, action) => {
  switch (action.type) {

    case 'CHANGE_YEAR':
      return {
        selectedYear: action.selectedYear
      }

      default:
        return state
}
}

export default updateYearDashBoard
