
const INITIAL_STATE = {
  amountNationsSummary: []
}
// { type: 'LOGIN_SUCCESS', text }
const getAmountNationsSummary = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case 'GET_SUMMARY_AMOUNT_NATIONS_ATTEMPT':
      return {
        //loading sign
      }
    case 'GET_SUMMARY_AMOUNT_NATIONS_SUCCESS':
      // action: { type: 'LOGIN_SUCCESS', json: { token: '' }
          return {
            amountNationsSummary: action.json
        }
    case 'GET_SUMMARY_AMOUNT_NATIONS_FAILURE':
      return {
        //pop up
      }

    default:
      return state
  }
}

export default getAmountNationsSummary
