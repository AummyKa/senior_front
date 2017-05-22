

// { type: 'LOGIN_SUCCESS', text }
export const getSelectedDate = (type,selectedDate) => {
  switch (type) {
    case 'GET_SELECTED_DATE_FROM_EVENT':
    return{
      type: "VALID_SELECTED_DATE_FROM_EVENT",
      datePack: selectedDate
    }

    case 'GET_SELECTED_DATE':
      let start = selectedDate.toString().substring(0,15)
      let today = new Date()
      console.log(start)

      if(selectedDate.getTime() - today.getTime() >= 0){
        return{
          type: "VALID_SELECTED_DATE",
          selectedDate: start
        }
      }else{
        return{
          type: "INVALID_SELECTED_DATE",
          selectedDate: start
        }
      }

    default:
      return{
        selectedDate: ""
      }

}
}
