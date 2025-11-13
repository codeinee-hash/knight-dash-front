import { create } from 'zustand'
import { ISession } from './types'
import { tokenService } from '../services/token.service'
import { jwtDecode } from 'jwt-decode'

interface Store {
  token: string | null
  session: ISession | null
  setSession: () => void
  removeSession: () => void
}

export const useSession = create<Store>((set) => {
  const token = tokenService.get()
  const decoded = token ? jwtDecode<ISession>(token) : null

  return {
    token,
    session: decoded,

    setSession: () => {
      const token = tokenService.get()
      const decoded = token ? jwtDecode<ISession>(token) : null
      set({ token, session: decoded })
    },

    removeSession: () => set({ token: null, session: null }),
  }
})
