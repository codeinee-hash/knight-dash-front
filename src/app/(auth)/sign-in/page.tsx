import { AuthLayout, SignInForm } from '@/features/auth'
import Link from 'next/link'
import { APP_ROUTES } from '@/shared/config/routes.config'

export default function SignInPage() {
  return (
    <AuthLayout
      title='Вход'
      form={<SignInForm />}
      footerText={
        <>
          Впервые здесь?{' '}
          <Link href={APP_ROUTES.register()}>Зарегистрироваться</Link>
        </>
      }
    />
  )
}
