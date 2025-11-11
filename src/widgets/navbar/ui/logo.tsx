import Link from 'next/link'
import Image from 'next/image'

export function Logo() {
  return (
    <Link href={'/'}>
      <Image src={'/images/geeks 2.png'} alt={'logo'} width={189} height={37} />
    </Link>
  )
}
