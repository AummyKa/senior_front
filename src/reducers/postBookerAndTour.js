import Cookies from 'js-cookie'

const INITIAL_STATE = {
  addBookerAndTour: false
}
// { type: 'LOGIN_SUCCESS', text }
const postBookerAndTour = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case 'POST_BOOKER_AND_TOUR_ATTEMPT':
      return {
        //loading sign
      }
    case 'POST_BOOKER_AND_TOUR_SUCCESS':
      // action: { type: 'LOGIN_SUCCESS', json: { token: '' }
        console.log("haha you can do it")
        return {
          addBookerAndTour: true
        }
      
    case 'POST_BOOKER_AND_TOUR_FAILURE':
      return {
        addBookerAndTour: false
        //pop up
      }

    default:
      return state
  }
}

export default postBookerAndTour
