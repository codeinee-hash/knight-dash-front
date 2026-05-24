export const API_URL = {
  root: (url: string = '') => `${url ? `/api/v1/${url}` : ''}`,

  auth: (endpoint: string = '') => API_URL.root(`auth/${endpoint}`),
  players: () => API_URL.root('top-players'),
  soloGame: (endpoint: string = '') => API_URL.root(`solo-game/${endpoint}`),
  soloGameWithId: (gameId: string = '', endpoint: string = '') =>
    API_URL.root(`solo-game/${gameId}/${endpoint}`),

  profile: (endpoint: string = '') => API_URL.root(`profile${endpoint ? `/${endpoint}` : ''}`),
}
