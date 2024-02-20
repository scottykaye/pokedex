import React from 'react'
import Wrapper from '@/components/ui/wrapper'

export default async function StandardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <>
      <header>
        <Wrapper>Pokedex</Wrapper>
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
