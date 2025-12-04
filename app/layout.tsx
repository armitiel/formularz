import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Program współpracy – Diasen',
  description: 'Interaktywny generator propozycji współpracy'
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="pl">
      <body>{children}</body>
    </html>
  )
}