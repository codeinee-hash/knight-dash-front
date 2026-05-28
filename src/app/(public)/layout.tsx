import { Navbar } from '@/widgets/navbar'

interface Props {
  children: React.ReactNode
}

export default async function Layout({ children }: Props) {
  return (
    <>
      <Navbar />
      {children}
    </>
  )
}
