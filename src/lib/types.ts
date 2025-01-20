export interface Question {
    id: string
    text: string
    type: 'text' | 'number' | 'date' | 'select'
    options?: string[]
    conditions?: {
      questionId: string
      operator: 'equals' | 'notEquals' | 'greaterThan' | 'lessThan' | 'isEmpty' | 'isNotEmpty'
      value?: any
    }[]
    scoreRules?: {
      value: any
      score: number
    }[]
    requiredDocs?: string[]
  }
  
  export interface Stage {
    id: string
    title: string
    questions: Question[]
  }
  
  export interface Questionnaire {
    id: string
    title: string
    stages: Stage[]
    defaultScore: number
    defaultDocs: string[]
  }