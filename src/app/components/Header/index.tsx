import Image from 'next/image'
import Link from 'next/link'
import { Cart } from '../Cart'

export function Header() {
  return (
    <header className="flex items-center justify-between px-4 py-10 lg:px-11">
      <Link href={'/'}>
        <Image src={'/logo.svg'} alt="img" width={129.74} height={52} />
      </Link>
      <Cart />
    </header>
  )
}
