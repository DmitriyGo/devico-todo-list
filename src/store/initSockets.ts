import socketClient from './socket'

import { RootStore } from '@/store/store'
import { editTodo, setOutdated } from '@/store/todo'
const initSockets = (store: RootStore) => {
  socketClient.on('listUpdated', () => {
    store.dispatch(setOutdated(true))
  })

  socketClient.on('todoUpdated', (data) => {
    store.dispatch(editTodo(data))
  })
}

export default initSockets
