export const APP_ROUTES = {
  home: () => '/',
  profile: () => '/profile',
  leaderboard: () => '/leaderboard',
  timeMode: () => '/time-mode',
  gameRules: () => '/game-rules',
  soloGame: () => '/play/solo',
  soloGameRoom: (gameId: string) => `/play/solo/${gameId}`,
  multiplayerGame: () => '/play/multiplayer',
  multiplayerGameRoom: (gameId: string) => `/play/multiplayer/${gameId}`,

  login: () => '/sign-in',
  register: () => '/sign-up',
}
