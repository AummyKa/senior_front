
const INITIAL_STATE = {
  inVisible: false,
  tour_cur_id: ''
}

// { type: 'LOGIN_SUCCESS', text }
const tourAction = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case 'GET_CUR_TOUR_ID':
    console.log(action.tour_id)
    return{
      tour_cur_id: action.tour_id
    }
    case 'CLOSE_ALL_TOURS':
      return {
        inVisible: action.inVisible,

      }
    case 'FINISH_CLOSE_ALL_TOURS':
      console.log(action.inVisible)
      return {
        inVisible: action.inVisible
        }

    default:
      return state
    }
}

export default tourAction
