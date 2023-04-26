import socketRoutes from '../../helpers/socketRoutes'

import socket from '@/store/socket'
import store from '@/store/store'
import { updateTodoList } from '@/store/todo/index'
import { setOutdated } from '@/store/todo/todoSlice'

socket.on(socketRoutes.listUpdated, () => {
  store.dispatch(setOutdated(true))
})

socket.on(socketRoutes.todoUpdated, (payload) => {
  store.dispatch(updateTodoList(payload))
})

export default socket
