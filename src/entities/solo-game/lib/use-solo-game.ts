import { create } from 'zustand'

interface State {
  isGameOver: boolean
  setIsGameOver: (value: boolean) => void
}

export const useSoloGame = create<State>((set) => ({
  isGameOver: false,
  setIsGameOver: (isGameOver) => set({ isGameOver }),
}))
