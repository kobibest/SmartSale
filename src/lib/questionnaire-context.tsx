import React, { createContext, useContext, useState } from 'react'
import { Questionnaire } from './types'

interface QuestionnaireContextType {
  currentQuestionnaire: Questionnaire | null
  setCurrentQuestionnaire: (questionnaire: Questionnaire | null) => void
  responses: Record<string, any>
  setResponses: (responses: Record<string, any>) => void
  questionnaires: Questionnaire[]
  addQuestionnaire: (questionnaire: Questionnaire) => void
  updateQuestionnaire: (id: string, updates: Partial<Questionnaire>) => void
  deleteQuestionnaire: (id: string) => void
}

const QuestionnaireContext = createContext<QuestionnaireContextType>({
  currentQuestionnaire: null,
  setCurrentQuestionnaire: () => {},
  responses: {},
  setResponses: () => {},
  questionnaires: [],
  addQuestionnaire: () => {},
  updateQuestionnaire: () => {},
  deleteQuestionnaire: () => {},
})

export const QuestionnaireProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [currentQuestionnaire, setCurrentQuestionnaire] = useState<Questionnaire | null>(null)
  const [responses, setResponses] = useState<Record<string, any>>({})
  const [questionnaires, setQuestionnaires] = useState<Questionnaire[]>([])

  const addQuestionnaire = (questionnaire: Questionnaire) => {
    setQuestionnaires((prev) => [...prev, questionnaire])
  }

  const updateQuestionnaire = (id: string, updates: Partial<Questionnaire>) => {
    setQuestionnaires((prev) =>
      prev.map((q) => (q.id === id ? { ...q, ...updates } : q))
    )
  }

  const deleteQuestionnaire = (id: string) => {
    setQuestionnaires((prev) => prev.filter((q) => q.id !== id))
  }

  return (
    <QuestionnaireContext.Provider
      value={{
        currentQuestionnaire,
        setCurrentQuestionnaire,
        responses,
        setResponses,
        questionnaires,
        addQuestionnaire,
        updateQuestionnaire,
        deleteQuestionnaire,
      }}
    >
      {children}
    </QuestionnaireContext.Provider>
  )
}

export const useQuestionnaire = () => useContext(QuestionnaireContext)
