import { GridSortModel } from '@mui/x-data-grid'
import { PayloadAction } from '@reduxjs/toolkit'
import { call, put, takeEvery, takeLatest } from 'redux-saga/effects'

import { TodoActionTypes } from './actions'
import { todoEndpoints } from './endpoints'
import {
  Todo,
  TodoState,
  setError,
  setLoading,
  setTodos,
  addTodo,
  removeTodo,
  updateTodo,
  clearCompleted,
} from './todoSlice'

import { httpClient } from '@/helpers'

interface fetchTodoResponse {
  data: TodoState
}

interface CreateTodoResponse {
  data: Todo
}

interface UpdateTodoResponse {
  data: {
    item: Todo
    completed: number
    active: number
    total: number
  }
}

interface DeleteTodoResponse {
  data: Todo
}

export function* fetchTodosSaga(
  action: PayloadAction<{
    page: number
    pageSize: number
    sorting: GridSortModel
  }>,
): Generator<unknown, void, fetchTodoResponse> {
  const { page, pageSize, sorting } = action.payload
  try {
    yield put(setLoading(true))

    const response = yield call(httpClient.post, todoEndpoints.getAllTodos(), {
      page,
      pageSize,
      sorting,
    })

    yield put(setTodos(response.data))
  } catch (error) {
    yield put(setError(error as Error))
  } finally {
    yield put(setLoading(false))
  }
}

export function* addTodoSaga(
  action: PayloadAction<Todo>,
): Generator<unknown, void, CreateTodoResponse> {
  try {
    yield put(setLoading(true))

    const response = yield call(
      httpClient.post,
      todoEndpoints.createTodo(),
      action.payload,
    )

    yield put(addTodo(response.data))
  } catch (error) {
    yield put(setError(error as Error))
  } finally {
    yield put(setLoading(false))
  }
}

export function* updateTodoSaga(
  action: PayloadAction<Todo>,
): Generator<unknown, void, UpdateTodoResponse> {
  try {
    yield put(setLoading(true))

    const response = yield call(
      httpClient.put,
      todoEndpoints.updateTodo(action.payload._id),
      action.payload,
    )

    yield put(updateTodo(response.data))
  } catch (error) {
    yield put(setError(error as Error))
  } finally {
    yield put(setLoading(false))
  }
}

export function* removeTodoSaga(
  action: PayloadAction<string | string[]>,
): Generator<unknown, void, DeleteTodoResponse> {
  try {
    yield put(setLoading(true))

    yield call(httpClient.post, todoEndpoints.deleteTodo(), {
      ids: action.payload,
    })

    yield put(removeTodo(action.payload))
  } catch (error) {
    yield put(setError(error as Error))
  } finally {
    yield put(setLoading(false))
  }
}

export function* clearCompletedTodosSaga() {
  try {
    yield put(setLoading(true))

    yield call(httpClient.delete, todoEndpoints.clearCompleted())

    yield put(clearCompleted())
  } catch (error) {
    yield put(setError(error as Error))
  } finally {
    yield put(setLoading(false))
  }
}

export function* todoSaga() {
  yield takeLatest(TodoActionTypes.fetchTodos, fetchTodosSaga)
  yield takeEvery(TodoActionTypes.addTodo, addTodoSaga)
  yield takeEvery(TodoActionTypes.updateTodo, updateTodoSaga)
  yield takeEvery(TodoActionTypes.removeTodo, removeTodoSaga)
  yield takeEvery(TodoActionTypes.clearCompleted, clearCompletedTodosSaga)
}
