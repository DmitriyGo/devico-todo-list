import { spawn } from 'redux-saga/effects'

import { authSaga } from './auth/sagas'
import { todoSaga } from './todo/sagas'
export default function* rootSaga() {
  yield spawn(authSaga)
  yield spawn(todoSaga)
}
