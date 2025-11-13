import { create } from 'zustand'

interface State {
  open: boolean
  setOpen: (value: boolean) => void
}

export const useNavbar = create<State>((set) => ({
  open: false,
  setOpen: (value: boolean) => set({ open: value }),
}))
