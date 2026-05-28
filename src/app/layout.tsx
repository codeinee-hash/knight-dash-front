import type { Metadata } from 'next'
import { Montserrat } from 'next/font/google'
import { cn } from '@/shared/lib/utils'
import { AppProvider } from './_providers/app-privider'
import './globals.css'

const montserrat = Montserrat({
  subsets: ['latin'],
  variable: '--font-montserrat',
  weight: ['300', '400', '500', '600', '700'],
})

export const metadata: Metadata = {
  title: 'Knight Dash',
  description:
    'Тактическое соревнование на поле 8х8. Управляй фигурой коня, планируй маршруты и побеждай в быстрых дуэлях.',
  icons: {
    icon: '/images/Pictograms.svg',
  },
}

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang='en' className={cn(montserrat.variable, 'dark')}>
      <body className='antialiased' suppressHydrationWarning>
        <AppProvider>{children}</AppProvider>
      </body>
    </html>
  )
}
