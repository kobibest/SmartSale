import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import '../styles/globals.css'
import { QuestionnaireProvider } from '@/lib/questionnaire-context'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'מערכת שאלונים',
  description: 'מערכת לניהול שאלוני מכירות',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="he" dir="rtl">
      <body className={inter.className}>
        <QuestionnaireProvider>
          {children}
        </QuestionnaireProvider>
      </body>
    </html>
  )
}