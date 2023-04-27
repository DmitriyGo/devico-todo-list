import { configureStore } from '@reduxjs/toolkit'
import createSagaMiddleware from 'redux-saga'

import { authSaga } from './auth/sagas'
import rootReducer from './rootReducer'
import { todoSaga } from './todo/sagas'

const sagaMiddleware = createSagaMiddleware()

const store = configureStore({
  reducer: rootReducer,
  middleware: [sagaMiddleware],
})

sagaMiddleware.run(todoSaga)
sagaMiddleware.run(authSaga)

export default store

export type RootStore = typeof store
export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
