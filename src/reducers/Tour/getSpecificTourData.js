const INITIAL_STATE = {
  specific_tours_data : []
}

// { type: 'LOGIN_SUCCESS', text }
const getSpecificTourData = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case 'GET_SPECIFIC_TOUR_DATA_ATTEMPT':

      return {
        //loading sign
      }
    case 'GET_SPECIFIC_TOUR_DATA_SUCCESS':
      // action: { type: 'LOGIN_SUCCESS', json: { token: '' }}
      let data = action.json
      return {
        specific_tours_data: data
      }
    case 'GET_SPECIFIC_TOUR_DATA_FAILED':
        console.log("fail")
      return {
        //pop up
      }

    default:
      return ''

}
}

export default getSpecificTourData
