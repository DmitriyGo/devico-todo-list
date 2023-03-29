import { put, call, takeLatest, takeEvery } from 'redux-saga/effects'

import { todoEndpoints } from './endpoints'
import {
  fetchTodosSuccess,
  addTodoSuccess,
  removeTodoSuccess,
  updateTodoSuccess,
  clearCompletedSuccess,
  setIsLoading,
  setError,
} from './todoSlice'

import { httpClient } from '@/helpers'

//========  WORKERS  ========//
function* fetchTodosSaga(action) {
  try {
    yield put(setIsLoading(true))
    const response = yield call(httpClient.get, todoEndpoints.getAllTodos(action.payload))
    yield put(fetchTodosSuccess(response.data))
  } catch (error) {
    yield put(setError(error))
    console.error(error)
  } finally {
    yield put(setIsLoading(false))
  }
}

function* addTodoSaga(action) {
  try {
    yield put(setIsLoading(true))
    const response = yield call(httpClient.post, todoEndpoints.createTodo(), {
      name: action.payload,
      completed: false,
    })
    yield put(addTodoSuccess(response.data))
  } catch (error) {
    yield put(setError(error))
    console.error(error)
  } finally {
    yield put(setIsLoading(false))
  }
}

function* updateTodoSaga(action) {
  try {
    yield put(setIsLoading(true))
    const response = yield call(
      httpClient.put,
      todoEndpoints.updateTodo(action.payload._id),
      action.payload,
    )
    yield put(updateTodoSuccess(response.data))
  } catch (error) {
    yield put(setError(error))
    console.error(error)
  } finally {
    yield put(setIsLoading(false))
  }
}

function* removeTodoSaga(action) {
  try {
    yield put(setIsLoading(true))
    yield call(httpClient.delete, todoEndpoints.deleteTodo(action.payload._id))
    yield put(removeTodoSuccess(action.payload))
  } catch (error) {
    yield put(setError(error))
    console.error(error)
  } finally {
    yield put(setIsLoading(false))
  }
}

function* clearCompletedSaga(action) {
  try {
    yield put(setIsLoading(true))
    yield call(httpClient.delete, todoEndpoints.clearCompleted())
    yield put(clearCompletedSuccess(action.payload))
  } catch (error) {
    yield put(setError(error))
    console.error(error)
  } finally {
    yield put(setIsLoading(false))
  }
}

//========  WATCHER  ========//

export function* todoSaga() {
  yield takeEvery('FETCH_TODOS', fetchTodosSaga)
  yield takeEvery('ADD_TODO', addTodoSaga)
  yield takeEvery('UPDATE_TODO', updateTodoSaga)
  yield takeEvery('REMOVE_TODO', removeTodoSaga)
  yield takeEvery('CLEAR_COMPLETED', clearCompletedSaga)
  yield takeEvery('SET_LOADING', setIsLoading)
  yield takeEvery('SET_ERROR', setError)
}
