'use client'

import { usePathname } from 'next/navigation'
import Footer from './Footer'

export default function ClientLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()
  const isMusicPage = pathname === '/music'

  return (
    <>
      <main className="flex-grow pt-32">
        <section className={isMusicPage ? "" : "relative z-0"}>
          {children}
        </section>
      </main>
      {!isMusicPage && <Footer />}
    </>
  )
}