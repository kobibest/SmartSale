import { Question } from '@/lib/types'
import { Card, CardContent } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Button } from '@/components/ui/button'

interface QuestionEditorProps {
  question: Question
  onUpdate: (updates: Partial<Question>) => void
  onDelete: () => void
  allQuestions: Question[]
}

export const QuestionEditor: React.FC<QuestionEditorProps> = ({
  question,
  onUpdate,
  onDelete,
  allQuestions,
}) => {
  return (
    <Card className="mb-4">
      <CardContent className="pt-4">
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block mb-2">טקסט השאלה</label>
            <Input
              value={question.text}
              onChange={(e) => onUpdate({ text: e.target.value })}
            />
          </div>
          <div>
            <label className="block mb-2">סוג שאלה</label>
            <Select
              value={question.type}
              onValueChange={(value) => onUpdate({ type: value as Question['type'] })}
            >
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="text">טקסט</SelectItem>
                <SelectItem value="number">מספר</SelectItem>
                <SelectItem value="date">תאריך</SelectItem>
                <SelectItem value="select">בחירה</SelectItem>
              </SelectContent>
            </Select>
          </div>
          {question.type === 'select' && (
            <div className="col-span-2">
              <label className="block mb-2">אפשרויות</label>
              <Input
                value={question.options?.join(', ')}
                onChange={(e) =>
                  onUpdate({
                    options: e.target.value.split(',').map((s) => s.trim()),
                  })
                }
                placeholder="הפרד אפשרויות בפסיק"
              />
            </div>
          )}
          <div className="col-span-2">
            <Button
              variant="destructive"
              className="mt-4"
              onClick={onDelete}
            >
              מחק שאלה
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}