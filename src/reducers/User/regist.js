
const INITIAL_STATE = {
  id: '', text: '', registed: false,
  duplicated: false

}
// { type: 'LOGIN_SUCCESS', text }
const regist = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case 'REGIST_ATTEMPT':
      return {
        //loading sign
      }
    case 'REGIST_SUCCESS':
    console.log(action.json)
      let register_s = action.json.register_success
      let dup = action.json.duplicate

    if(register_s && !dup){
      return {
        registed: true
      }
    }else if(register_s && dup){
      return{
        duplicated: true
      }

    }else{
        console.log("error happens")
    }

    case 'REGIST_FAILURE':
    console.log("fail")
    let duplicate = action.json.duplicate

    if(duplicate){
      return {
        registed: false,
        duplicated: true
      }
    }

      return {
        registed: false
      }

    default:
      return state
  }
}

export default regist
