
const INITIAL_STATE = {
  eachTourExpertGuide: []
}
// { type: 'LOGIN_SUCCESS', text }
const getEachTourExpertGuide = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case 'GET_EACH_TOUR_EXPERT_GUIDE_ATTEMPT':
      return {
        //loading sign
      }
    case 'GET_EACH_TOUR_EXPERT_GUIDE_SUCCESS':
      // action: { type: 'LOGIN_SUCCESS', json: { token: '' }
        return {
          eachTourExpertGuide: action.json
        }

    case 'GET_EACH_TOUR_EXPERT_GUIDE_FAILURE':
            console.log("noooooo it's not work")
      return {
        //pop up
      }

    default:
      return state
  }
}

export default getEachTourExpertGuide
