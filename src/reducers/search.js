
const INITIAL_STATE = {
  search_input: ""
}


const search = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case 'SEARCH_GUIDE': //home
      console.log(action.input)
        return{
          search_input: action.input,

        }

    default:
      return state
  }

}

export default search
