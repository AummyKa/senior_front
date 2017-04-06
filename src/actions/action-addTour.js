
// { type: 'LOGIN_SUCCESS', text }
export const addTour = (type,selectedDate) => {
  switch (type) {
    case 'ADD_TOUR':

      return {
        showAddTourModal: true,
        dateTour: selectedDate
      }

    default:
      return{
        showAddTourModal: false
      }

}
}
