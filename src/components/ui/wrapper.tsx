import { ReactNode } from 'react'
import { cn } from '@/lib/utils'

export default function Wrapper({
  children,
  className,
}: {
  children: ReactNode
  className?: string
}) {
  return (
    <section className={cn('p-6 max-w-7xl mx-auto Wrapper', className)}>
      {children}
    </section>
  )
}
