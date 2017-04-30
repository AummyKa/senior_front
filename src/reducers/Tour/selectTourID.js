

const INITIAL_STATE = {
  selectedTourID: '',
  changeToEachTourState: false
}

// { type: 'LOGIN_SUCCESS', text }
const selectTourID = (state = INITIAL_STATE, action) => {
  switch (action.type) {

    case 'SELECTED_TOUR_ID':
      return {
          selectedTourID: action.selectedTourID,
          changeToEachTourState: true
      }

    default:
      return state
    }
}

export default selectTourID
