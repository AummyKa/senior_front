

const INITIAL_STATE = {
  showAddTourModal: false,
  dateTour: ''
}

// { type: 'LOGIN_SUCCESS', text }
const addTourForm = (state = INITIAL_STATE, action) => {
  switch (action.type) {

    case 'ADD_TOUR':
    console.log(action.dateTour)
    let today = new Date()
    console.log("today  "+today)
    
      return {
        showAddTourModal: true,
        dateTour: action.dateTour
      }
    default:
      return state
}
}

export default addTourForm
