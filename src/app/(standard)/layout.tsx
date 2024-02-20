import React from 'react'
import Wrapper from '@/components/ui/wrapper'
import { Button } from '@/components/ui/button'
import Link from 'next/link'

export default async function StandardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <>
      <header className="sticky top-0 z-50 backdrop-blur border-b-2 border-b-slate-500 mb-10">
        <Wrapper className="flex justify-between items-center">
          <h1 className="text-3xl">Pokédex</h1>{' '}
          <Link href="/api/auth/signin" passHref>
            <Button>Sign in</Button>
          </Link>
        </Wrapper>
      </header>
      <main>
        <Wrapper>{children}</Wrapper>
      </main>
      <footer>
        <Wrapper>Copyright {new Date().getFullYear()}</Wrapper>
      </footer>
    </>
  )
}
