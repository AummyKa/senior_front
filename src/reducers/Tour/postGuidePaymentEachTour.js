

const INITIAL_STATE = {
  postGuidePaymentEachTourStatus: false
}

// { type: 'LOGIN_SUCCESS', text }
const postGuidePaymentEachTour = (state = INITIAL_STATE, action) => {
  switch (action.type) {

    case 'POST_GUIDE_PAYMENT_EACH_TOUR_ATTEMPT':
      return {

      }

    case 'POST_GUIDE_PAYMENT_EACH_TOUR_SUCCESS':

        return{
          postGuidePaymentEachTourStatus: true
        }

    case 'POST_GUIDE_PAYMENT_EACH_TOUR_FAILED':
      console.log("fail")
        return{
          postGuidePaymentEachTourStatus: false
        }

    default:
      return state
    }
}

export default postGuidePaymentEachTour
