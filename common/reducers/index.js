import { combineReducers } from 'redux'
import auth from './auth'
import rooms from './rooms'
import scroll from './scroll'
import watch from './watch'
import { reducer as form } from 'redux-form'

const rootReducer = combineReducers({
  auth,
  rooms,
  scroll,
  form,
  watch
})

export default rootReducer
