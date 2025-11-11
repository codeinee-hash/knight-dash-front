export const SERVER_URL = process.env.SERVER_URL as string

export const API_URL = {
  root: (url: string = '') => `${url ? `${SERVER_URL}/api/v1/${url}` : ''}`,

  auth: (endpoint: string = '') => API_URL.root(`auth/${endpoint}`),
  score: (endpoint: string = '') => API_URL.root(`score/${endpoint}`),
  players: (endpoint: string = '') => API_URL.root(`top-players/${endpoint}`),
  soloGame: (endpoint: string = '') => API_URL.root(`solo-game/${endpoint}`),
  soloGameWithId: (gameId: string = '', endpoint: string = '') =>
    API_URL.root(`solo-game/${gameId}/${endpoint}`),
}
