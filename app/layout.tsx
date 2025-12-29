import type { Metadata } from 'next'
import '../styles/globals.css'
import '../styles/responsive.css'

export const metadata: Metadata = {
  title: 'AstraVeda - Quantum-Ready Ground Infrastructure',
  description: 'Building secure, scalable satellite ground networks for governments, defense, and next-generation space operators.',
  icons: {
    icon: '/img/Group3.png',
    shortcut: '/img/Group3.png',
    apple: '/img/Group3.png',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}

