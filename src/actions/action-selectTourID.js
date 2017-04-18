
// { type: 'LOGIN_SUCCESS', text }
export const selectTourID = (type,selectedID) => {
  switch (type) {
    case 'SELECTED_TOUR':
      return {
        selectedTourID: selectedID,
        type: type
      }


    default:
      return{
        selectedTourID: ''
      }

}
}
