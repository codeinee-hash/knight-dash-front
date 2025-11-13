import { Navbar } from '@/widgets/navbar'

export default async function Layout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <>
      <Navbar variant={'public'} />
      {children}
    </>
  )
}
