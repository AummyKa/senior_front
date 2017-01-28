import { combineReducers } from 'redux'
import login from './login'
import regist from './regist'
import pageStatus from './pageStatus'
import guideDetail from './guideDetail'
import search from './search'
import userData from './userData'



const admin = combineReducers({
    login,
    regist,
    pageStatus,
    guideDetail,
    search,
    userData
})

export default admin
