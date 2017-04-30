import apiAccess from '../../Helpers/apiAccess'
// { type: 'LOGIN_SUCCESS', text }
export const getAllTour = () => {
  apiAccess({
    url: 'http://localhost:8000/tours',
    method: 'GET',
    payload: null,
    attemptAction: () => this.props.dispatch({ type: 'GET_ALL_TOURS_ATTEMPT' }),
    successAction: (json) => this.props.dispatch({ type: 'GET_ALL_TOURS_SUCCESS', json }),
    failureAction: () => this.props.dispatch({ type: 'GET_ALL_TOURS_FAILED' })
  })
}
