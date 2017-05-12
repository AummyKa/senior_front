
const INITIAL_STATE = {
  selectedYear:'',
  selectedTourTear:''
}
// { type: 'LOGIN_SUCCESS', text }
const updateYearDashBoard = (state = INITIAL_STATE, action) => {
  switch (action.type) {

    case 'CHANGE_YEAR':
      return {
        selectedYear: action.selectedYear
      }
    case 'CHANGE_TOUR_DASHBOARD_YEAR':
      return {
        selectedTourYear: action.selectedYear
      }

      default:
        return state
}
}

export default updateYearDashBoard
