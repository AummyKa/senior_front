
// { type: 'LOGIN_SUCCESS', text }
export const selectedGuideSuggestion = (type,selectedDate) => {
  switch (type) {
    case 'ADD_TOUR':
      console.log("you did it bro!")
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

    case 'STOP_COUNT_ADD_TOUR':
      return{
        isStoppedCountingAddTour: true,
        type: type
      }

    default:
      return{
        showAddTourModal: false
      }

}
}
