import { combineReducers } from '@reduxjs/toolkit'

import authReducer from './auth/authSlice'
import todoReducer from './todo/todoSlice'

const rootReducer = combineReducers({ todo: todoReducer, auth: authReducer })

export default rootReducer
