export const generateId = () => Math.random().toString(36).substr(2, 9)

export const evaluateConditions = (
  conditions: Question['conditions'],
  responses: Record<string, any>
) => {
  if (!conditions?.length) return true

  return conditions.every((condition) => {
    const response = responses[condition.questionId]
    switch (condition.operator) {
      case 'equals':
        return response === condition.value
      case 'notEquals':
        return response !== condition.value
      case 'greaterThan':
        return response > condition.value
      case 'lessThan':
        return response < condition.value
      case 'isEmpty':
        return !response
      case 'isNotEmpty':
        return !!response
      default:
        return true
    }
  })
}