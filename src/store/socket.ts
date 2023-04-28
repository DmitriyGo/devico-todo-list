import io from 'socket.io-client'

const sockets = io(import.meta.env.VITE_PUBLIC_SOCKET_URL, {
  transports: ['websocket'],
})

export default sockets
