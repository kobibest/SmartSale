import { Question } from '@/lib/types'
import { Input } from '@/components/ui/input'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'

interface QuestionInputProps {
  question: Question
  value: any
  onChange: (value: any) => void
}

export const QuestionInput: React.FC<QuestionInputProps> = ({
  question,
  value,
  onChange,
}) => {
  switch (question.type) {
    case 'text':
      return (
        <div className="mb-4">
          <label className="block mb-2">{question.text}</label>
          <Input
            type="text"
            value={value || ''}
            onChange={(e) => onChange(e.target.value)}
          />
        </div>
      )
    case 'number':
      return (
        <div className="mb-4">
          <label className="block mb-2">{question.text}</label>
          <Input
            type="number"
            value={value || ''}
            onChange={(e) => onChange(parseFloat(e.target.value))}
          />
        </div>
      )
    case 'date':
      return (
        <div className="mb-4">
          <label className="block mb-2">{question.text}</label>
          <Input
            type="date"
            value={value || ''}
            onChange={(e) => onChange(e.target.value)}
          />
        </div>
      )
    case 'select':
      return (
        <div className="mb-4">
          <label className="block mb-2">{question.text}</label>
          <Select value={value} onValueChange={onChange}>
            <SelectTrigger>
              <SelectValue placeholder="בחר..." />
            </SelectTrigger>
            <SelectContent>
              {question.options?.map((option) => (
                <SelectItem key={option} value={option}>
                  {option}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      )
    default:
      return null
  }
}