import { ActionType } from './action-types'

export const initialState = {
  items: [],
}

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case ActionType.FETCH_TODOS_REQUEST:
    case ActionType.ADD_TODO_REQUEST:
    case ActionType.UPDATE_TODO_REQUEST:
    case ActionType.DELETE_TODO_REQUEST:
    case ActionType.CLEAR_COMPLETED_TODOS_REQUEST:
      return { ...state, loading: true, error: null }
    case ActionType.FETCH_TODOS_SUCCESS:
      return { ...state, items: action.payload, loading: false }
    case ActionType.ADD_TODO_SUCCESS:
      return { ...state, items: [...state.items, action.payload], loading: false }
    case ActionType.UPDATE_TODO_SUCCESS:
      return {
        ...state,
        items: state.items.map((todo) => (todo._id === action.payload._id ? action.payload : todo)),
        loading: false,
      }
    case ActionType.DELETE_TODO_SUCCESS:
      return {
        ...state,
        items: state.items.filter((todo) => todo._id !== action.payload._id),
        loading: false,
      }
    case ActionType.CLEAR_COMPLETED_TODOS_SUCCESS:
      return {
        ...state,
        items: state.items.filter((todo) => !todo.completed),
        loading: false,
      }
    case ActionType.FETCH_TODOS_FAILURE:
    case ActionType.ADD_TODO_FAILURE:
    case ActionType.UPDATE_TODO_FAILURE:
    case ActionType.DELETE_TODO_FAILURE:
    case ActionType.CLEAR_COMPLETED_TODOS_FAILURE:
      return { ...state, loading: false, error: action.payload }
    default:
      return state
  }
}

export default reducer
