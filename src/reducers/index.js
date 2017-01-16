import { combineReducers } from 'redux'
import login from './login'
import regist from './regist'

console.log({ login })

const admin = combineReducers({
    login,
    regist


})

export default admin
