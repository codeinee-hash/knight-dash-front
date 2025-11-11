export const APP_URL = process.env.APP_URL as string

export const APP_ROUTES = {
  root: (url: string = '') => `${url ? url : ''}`,

  home: () => APP_ROUTES.root('/'),
  profile: () => APP_ROUTES.root('/profile'),
  leaderboard: () => APP_ROUTES.root('/leaderboard'),
  timeMode: () => APP_ROUTES.root('/time-mode'),
  soloGame: () => APP_ROUTES.root('/solo-game'),
  soloGameRoom: (gameId: string) => APP_ROUTES.root(`/solo-game/${gameId}`),
  duelGame: () => APP_ROUTES.root('/duel-game'),
  duelGameRoom: (gameId: string) => APP_ROUTES.root(`/duel-game/${gameId}`),

  login: () => APP_ROUTES.root('/sign-in'),
  register: () => APP_ROUTES.root('/sign-up'),
}
