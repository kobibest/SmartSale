import Link from 'next/link'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'

export default function Home() {
  return (
    <main className="container mx-auto p-4">
      <h1 className="text-4xl font-bold mb-8 text-center">מערכת שאלונים</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Link href="/questionnaire">
          <Card>
            <CardHeader>
              <CardTitle>שאלונים</CardTitle>
            </CardHeader>
            <CardContent>
              <p>מילוי שאלון חדש</p>
            </CardContent>
          </Card>
        </Link>
        <Link href="/admin">
          <Card>
            <CardHeader>
              <CardTitle>ניהול</CardTitle>
            </CardHeader>
            <CardContent>
              <p>ניהול והגדרת שאלונים</p>
            </CardContent>
          </Card>
        </Link>
      </div>
    </main>
  )
}