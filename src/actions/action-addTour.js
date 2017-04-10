
// { type: 'LOGIN_SUCCESS', text }
export const addTour = (type,selectedDate) => {
  switch (type) {
    case 'ADD_TOUR':

      return {
        showAddTourModal: true,
        dateTour: selectedDate,
        type: type
      }

      case 'CLOSE_ADD_TOUR':

      return{
        showAddTourModal: false,
        type: type
      }

    default:
      return{
        showAddTourModal: false
      }

}
}
