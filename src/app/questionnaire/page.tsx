import { QuestionnaireForm } from '@/components/questionnaire/QuestionnaireForm'

export default function QuestionnairePage() {
  return (
    <main className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-6">שאלון חדש</h1>
      <QuestionnaireForm />
    </main>
  )
}
