

const INITIAL_STATE = {
  showAddTourModal: false,
  dateTour: ''
}

// { type: 'LOGIN_SUCCESS', text }
const addTourForm = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case 'ADD_TOUR':
      return {
        showAddTourModal: action.showAddTourModal,
        dateTour: action.dateTour
      }
    default:
      return state
}
}

export default addTourForm
