export const APP_ROUTES = {
  root: (url: string = '') => `${url ? url : ''}`,

  home: () => APP_ROUTES.root('/'),
  profile: () => APP_ROUTES.root('/profile'),
  leaderboard: () => APP_ROUTES.root('/leaderboard'),
  timeMode: () => APP_ROUTES.root('/time-mode'),
  soloGame: () => APP_ROUTES.root('/play/solo'),
  soloGameRoom: (gameId: string) => APP_ROUTES.root(`/play/solo/${gameId}`),
  multiplayerGame: () => APP_ROUTES.root('/play/multiplayer'),
  multiplayerGameRoom: (gameId: string) =>
    APP_ROUTES.root(`/play/multiplayer/${gameId}`),

  login: () => APP_ROUTES.root('/sign-in'),
  register: () => APP_ROUTES.root('/sign-up'),
}
