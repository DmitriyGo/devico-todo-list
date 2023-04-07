import { PayloadAction } from '@reduxjs/toolkit'
import { enqueueSnackbar } from 'notistack'
import { call, put, takeEvery, takeLatest, select } from 'redux-saga/effects'

import { TodoActionTypes } from './actions'
import { todoEndpoints } from './endpoints'
import { setError, setLoading, setTodos } from './todoSlice'
import { Todo, TodoState } from './types'

import { httpClient } from '@/helpers'

interface FetchTodoResponse {
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

export function* fetchTodosSaga(): Generator<
  unknown,
  void,
  FetchTodoResponse & TodoState
> {
  const { paginationModel, sorting }: TodoState = yield select(
    (state) => state.todo,
  )

  try {
    yield put(setLoading(true))

    const response: FetchTodoResponse = yield call(
      httpClient.post,
      todoEndpoints.getAllTodos(),
      {
        page: paginationModel.page + 1,
        pageSize: paginationModel.pageSize,
        sorting,
      },
    )

    yield put(setTodos(response.data))
  } catch (error) {
    yield put(setError(error as Error))
    enqueueSnackbar('An error occurred while fetching  item', {
      variant: 'error',
    })
  } finally {
    yield put(setLoading(false))
  }
}

export function* addTodoSaga(
  action: PayloadAction<Todo>,
): Generator<unknown, void, CreateTodoResponse> {
  try {
    yield put(setLoading(true))

    yield call(httpClient.post, todoEndpoints.createTodo(), action.payload)

    yield call(fetchTodosSaga)
  } catch (error) {
    yield put(setError(error as Error))
    enqueueSnackbar('An error occurred while creating item', {
      variant: 'error',
    })
  } finally {
    yield put(setLoading(false))
    enqueueSnackbar(`Item: '${action.payload.name}' has successfully created`, {
      variant: 'success',
    })
  }
}

export function* updateTodoSaga(
  action: PayloadAction<Todo>,
): Generator<unknown, void, UpdateTodoResponse> {
  try {
    yield put(setLoading(true))

    yield call(
      httpClient.put,
      todoEndpoints.updateTodo(action.payload._id),
      action.payload,
    )

    yield call(fetchTodosSaga)
  } catch (error) {
    yield put(setError(error as Error))
    enqueueSnackbar('An error occurred while updating item', {
      variant: 'error',
    })
  } finally {
    yield put(setLoading(false))
    enqueueSnackbar(`Item: '${action.payload.name}' has successfully updated`, {
      variant: 'success',
    })
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

    yield call(fetchTodosSaga)
  } catch (error) {
    yield put(setError(error as Error))
    enqueueSnackbar('An error occurred while removing item', {
      variant: 'error',
    })
  } finally {
    yield put(setLoading(false))
    enqueueSnackbar(
      `${action.payload.length} ${
        action.payload.length === 1 ? 'item' : 'items'
      } has successfully removed`,
      {
        variant: 'success',
      },
    )
  }
}

export function* clearCompletedTodosSaga() {
  try {
    yield put(setLoading(true))

    yield call(httpClient.delete, todoEndpoints.clearCompleted())

    yield call(fetchTodosSaga)
  } catch (error) {
    yield put(setError(error as Error))
    enqueueSnackbar('An error occurred while removing completed items', {
      variant: 'error',
    })
  } finally {
    yield put(setLoading(false))
    enqueueSnackbar(`Completed items successfully removed`, {
      variant: 'success',
    })
  }
}

export function* todoSaga() {
  yield takeLatest(TodoActionTypes.fetchTodos, fetchTodosSaga)
  yield takeEvery(TodoActionTypes.addTodo, addTodoSaga)
  yield takeEvery(TodoActionTypes.updateTodo, updateTodoSaga)
  yield takeEvery(TodoActionTypes.removeTodo, removeTodoSaga)
  yield takeEvery(TodoActionTypes.clearCompleted, clearCompletedTodosSaga)
}
