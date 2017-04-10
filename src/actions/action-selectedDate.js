
// { type: 'LOGIN_SUCCESS', text }
export const getSelectedDate = (type,selectedDate) => {
  switch (type) {
    case 'GET_SELECTED_DATE':
      let start = selectedDate.toString().substring(0,15)
      let today = new Date()

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
