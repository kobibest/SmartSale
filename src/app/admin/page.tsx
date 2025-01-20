import { AdminPanel } from '@/components/admin/AdminPanel'

export default function AdminPage() {
  return (
    <main className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-6">ניהול שאלונים</h1>
      <AdminPanel />
    </main>
  )
}