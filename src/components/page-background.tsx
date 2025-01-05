import { ReactNode } from 'react'

interface PageBackgroundProps {
  children: ReactNode
  className?: string
}

export function PageBackground({ children, className = "" }: PageBackgroundProps) {
  return (
    <div className={`min-h-screen flex flex-col items-center justify-center text-pink-800 p-4 overflow-hidden ${className}`}>
      {children}
    </div>
  )
}

