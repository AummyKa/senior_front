
const INITIAL_STATE = {
  selectedDate: '',
  valid_date_status: false,
  readyFormatDate:'',
}

// { type: 'LOGIN_SUCCESS', text }
const spreadSelectedDate = (state = INITIAL_STATE, action) => {
  switch (action.type) {

    case 'VALID_SELECTED_DATE_FROM_EVENT':
      return{
        selectedDate:action.datePack.dateString,
        readyFormatDate:action.datePack.date_for_querry,
        valide_date_status: true
      }

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
