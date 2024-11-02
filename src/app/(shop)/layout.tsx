import { ReactNode } from 'react'
import { Header } from '../components/Header'

interface ShopLayoutProps {
  children: ReactNode
}

export default function ShopLayout({ children }: ShopLayoutProps) {
  return (
    <main className="mx-auto mb-5 w-full max-w-[1440px] lg:mb-32">
      <Header />
      {children}
    </main>
  )
}
