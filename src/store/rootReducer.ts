import { combineReducers } from '@reduxjs/toolkit'

import { authReducer } from './auth'
import { todoReducer } from './todo'

const rootReducer = combineReducers({ todo: todoReducer, auth: authReducer })

export default rootReducer
