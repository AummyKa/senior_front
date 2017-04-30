
const INITIAL_STATE = {
  selectedDate: false,
  valid_date_status: false
}

// { type: 'LOGIN_SUCCESS', text }
const spreadSelectedDate = (state = INITIAL_STATE, action) => {
  switch (action.type) {

    case 'VALID_SELECTED_DATE':
      return {
        selectedDate: action.selectedDate,
        valide_date_status: true
      }

    case 'INVALID_SELECTED_DATE':
    return{
      selectedDate: action.selectedDate,
      valid_date_status: false
    }

    default:
      return state
}
}

export default spreadSelectedDate
