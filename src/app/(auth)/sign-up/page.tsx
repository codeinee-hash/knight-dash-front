import { AuthLayout, SignUpForm } from '@/features/auth'
import Link from 'next/link'
import { APP_ROUTES } from '@/shared/config/routes.config'

export default function SignUpPage() {
  return (
    <AuthLayout
      title='Регистрация'
      form={<SignUpForm />}
      footerText={
        <>
          У вас уже есть аккаунт? <Link href={APP_ROUTES.login()}>Войти</Link>
        </>
      }
    />
  )
}
