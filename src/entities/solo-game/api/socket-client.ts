import { io, Socket } from 'socket.io-client'
import { envConfig } from '@/shared/config/env.config'
import Cookies from 'js-cookie'
import { TOKEN_KEYS } from '@/entities/auth'

type SocketApiType = {
  socket: Socket | null
  createConnection: () => void
  disconnect: () => void
}

export const socketApi: SocketApiType = {
  socket: null,
  createConnection() {
    if (!this.socket) {
      const token = Cookies.get(TOKEN_KEYS.ACCESS)

      const serverUrl = envConfig.NEXT_PUBLIC_SERVER_URL?.replace(/\/$/, '') || 'http://localhost:8080'
      this.socket = io(`${serverUrl}/solo`, {
        reconnection: true,
        reconnectionAttempts: 5,
        reconnectionDelay: 1000,
        withCredentials: true,
        auth: { token },
        transports: ['websocket'],
      })

      this.socket.on('connect', () => {
        console.log('SOLO CLIENT CONNECTED')
      })

      this.socket.on('disconnect', () => {
        console.log('SOLO CLIENT DISCONNECTED')
      })

      this.socket.on('connect_error', (error) => {
        console.error('Socket connection error:', error)
      })

      this.socket.on('error', (error) => {
        console.error('Socket error:', error)
      })
    }
  },
  disconnect() {
    if (this.socket) {
      this.socket.disconnect()
      this.socket = null
    }
  },
}
