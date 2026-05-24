import Cookies from 'js-cookie'

export const TOKEN_KEYS = {
  ACCESS: 'access_token',
  REFRESH: 'refresh_token',
} as const

export type TokenKey = (typeof TOKEN_KEYS)[keyof typeof TOKEN_KEYS]

class TokenService {
  get() {
    const accessToken = Cookies.get(TOKEN_KEYS.ACCESS)
    return accessToken || null
  }

  save(accessToken: string) {
    Cookies.set(TOKEN_KEYS.ACCESS, accessToken, {
      sameSite: 'strict',
      expires: 1,
    })
  }

  remove() {
    Cookies.remove(TOKEN_KEYS.ACCESS)
  }
}

export const tokenService = new TokenService()
