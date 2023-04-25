import { io } from 'socket.io-client'

import store from '@/store/store'
import { setOutdated } from '@/store/todo/todoSlice'

const socket = io(import.meta.env.VITE_PUBLIC_API_URL, {
  autoConnect: false,
})

socket.on('todosUpdated', () => {
  store.dispatch(setOutdated(true))
})

export default socket
