import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import { ModalProvider } from '@/context/ModalContext'
import './globals.css'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Template',
  description: 'My Template',
}

/**
 * The root layout component that wraps all pages and is server-rendered.
 *
 * @param {{ children: React.ReactNode }} props - The props for the component.
 * @param {React.ReactNode} props.children - The children elements to render.
 * @returns {JSX.Element} The rendered root layout component.
 */
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>): JSX.Element {
  return (
    <html lang="pt-BR">
      <ModalProvider>
        <body className={inter.className}>{children}</body>
      </ModalProvider>
    </html>
  )
}
