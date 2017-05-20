

const INITIAL_STATE = {
  changeUserPasswordStatus: false,
  passwordNotMatch:false,
  showForgotPasswordModal:false,
  getResetPasswordStatus:false,
  emailForgetPassewordInValidStatus:false
}
// { type: 'LOGIN_SUCCESS', text }
const changeUserPassword = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case 'CHANGE_PASSWORD_ATTEMPT':
      return {
        //loading sign
      }
    case 'CHANGE_PASSWORD_SUCCESS':
      // action: { type: 'LOGIN_SUCCESS', json: { token: '' }}
      console.log(action.json.success)
      if(action.json.success){
        return {
          changeUserPasswordStatus:true
        }
      }else{
        return{
          changeUserPasswordStatus:false,
          passwordNotMatch:true
        }
      }

    case 'CHANGE_PASSWORD_FAILURE':
      alert(action.json.status)
      return {
        changeUserPasswordStatus: false,
        warning:action.json
    }

    case 'SHOW_FORGET_PASSWORD_MODAL':
      return{
        showForgotPasswordModal:true
      }

    case 'CLOSE_FORGET_PASSWORD_MODAL':
      return{
        showForgotPasswordModal:false
      }

    case 'SEND_EMAIL_FORGET_PASSWORD_ATTEMPT':
      return{

      }

    case 'SEND_EMAIL_FORGET_PASSWORD_SUCCESS':
      console.log(action.json.success)
      if(action.json.success){
        return{
          getResetPasswordStatus:true
        }
      }else{
        return{
          getResetPasswordStatus:false,
          emailForgetPassewordInValidStatus:true
        }
      }

    case 'SEND_EMAIL_FORGET_PASSWORD_FAILED':
      return{
        getResetPasswordStatus:false
      }


    default:
      return state
  }
}

export default changeUserPassword
