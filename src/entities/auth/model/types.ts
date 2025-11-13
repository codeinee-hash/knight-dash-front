export interface ISignUpForm {
  login: string
  email: string
  password: string
}

export interface ISignInForm {
  loginOrEmail: string
  password: string
}

export interface ISession {
  _id: string
  login: string
  email: string
  exp: number
  iat: number
}
