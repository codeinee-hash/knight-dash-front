import { z } from 'zod'

export const loginSchema = z.object({
  loginOrEmail: z
    .string({ message: 'Обязательное поле' })
    .trim()
    .min(1, 'Обязательное поле'),
  password: z
    .string({ message: 'Пароль обязателен' })
    .min(6, 'Минимальная длина пароля — 6 символов'),
})

export const registerSchema = z
  .object({
    login: z
      .string({ message: 'Обязательное поле' })
      .trim()
      .min(1, 'Обязательное поле'),
    email: z
      .string({ message: 'Обязательное поле' })
      .trim()
      .email('Некорректный email'),
    password: z
      .string({ message: 'Пароль обязателен' })
      .min(6, 'Минимальная длина пароля — 6 символов')
      .regex(/[A-Z]/, 'Пароль должен содержать хотя бы одну заглавную букву')
      .regex(/[0-9]/, 'Пароль должен содержать хотя бы одну цифру'),
    passwordConfirm: z.string({ message: 'Подтверждение пароля обязательно' }),
  })
  .refine((data) => data.password === data.passwordConfirm, {
    message: 'Пароли не совпадают',
    path: ['passwordConfirm'],
  })
