import { AxiosError } from 'axios'

export const errorCatch = (error: unknown): string => {
  if (error instanceof AxiosError) {
    const message = error.response?.data?.message
    if (message) {
      return typeof message === 'string' ? message : message[0]
    }
    return error.message
  }

  if (error instanceof Error) {
    return error.message
  }

  return 'Неизвестная ошибка'
}
