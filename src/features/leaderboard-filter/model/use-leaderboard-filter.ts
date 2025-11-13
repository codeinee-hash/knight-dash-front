import { create } from 'zustand'

type TFilter = 'all' | 'bullet' | 'blitz' | 'rapid'

interface State {
  filter: TFilter
  setFilter: (filter: TFilter) => void
}

export const useLeaderboardFilter = create<State>((set) => ({
  filter: 'all',
  setFilter: (filter) => set({ filter }),
}))
