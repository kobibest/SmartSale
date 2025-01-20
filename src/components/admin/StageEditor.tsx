import React, { useState } from 'react';
import { Stage, Question, Condition } from '@/lib/types';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { QuestionEditor } from './QuestionEditor';
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "@/components/ui/alert-dialog";
import { generateId } from '@/lib/utils';

interface StageEditorProps {
  stage: Stage;
  onUpdate: (updates: Partial<Stage>) => void;
  onDelete: () => void;
  allQuestions: Question[];
  stageIndex: number;
}

export const StageEditor: React.FC<StageEditorProps> = ({
  stage,
  onUpdate,
  onDelete,
  allQuestions,
  stageIndex
}) => {
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);

  const addQuestion = () => {
    const newQuestion: Question = {
      id: generateId(),
      text: 'שאלה חדשה',
      type: 'text',
      required: false,
      conditions: [],
      scoreRules: [],
      requiredDocs: []
    };

    onUpdate({
      questions: [...stage.questions, newQuestion]
    });
  };

  const updateQuestion = (questionId: string, updates: Partial<Question>) => {
    onUpdate({
      questions: stage.questions.map(q =>
        q.id === questionId ? { ...q, ...updates } : q
      )
    });
  };

  const deleteQuestion = (questionId: string) => {
    onUpdate({
      questions: stage.questions.filter(q => q.id !== questionId)
    });
  };

  const moveQuestion = (questionId: string, direction: 'up' | 'down') => {
    const currentIndex = stage.questions.findIndex(q => q.id === questionId);
    if (currentIndex === -1) return;

    const newQuestions = [...stage.questions];
    const question = newQuestions[currentIndex];

    if (direction === 'up' && currentIndex > 0) {
      newQuestions[currentIndex] = newQuestions[currentIndex - 1];
      newQuestions[currentIndex - 1] = question;
    } else if (direction === 'down' && currentIndex < newQuestions.length - 1) {
      newQuestions[currentIndex] = newQuestions[currentIndex + 1];
      newQuestions[currentIndex + 1] = question;
    }

    onUpdate({ questions: newQuestions });
  };

  const duplicateQuestion = (questionId: string) => {
    const questionToDuplicate = stage.questions.find(q => q.id === questionId);
    if (!questionToDuplicate) return;

    const duplicatedQuestion: Question = {
      ...questionToDuplicate,
      id: generateId(),
      text: `${questionToDuplicate.text} (העתק)`
    };

    onUpdate({
      questions: [...stage.questions, duplicatedQuestion]
    });
  };

  const handleStageDelete = () => {
    setShowDeleteDialog(true);
  };

  const confirmDelete = () => {
    onDelete();
    setShowDeleteDialog(false);
  };

  return (
    <Card className="mb-6 border-2 border-gray-200">
      <CardHeader className="flex flex-row items-center justify-between bg-gray-50">
        <div className="flex items-center gap-4 flex-1">
          <span className="text-lg font-semibold text-gray-500">
            שלב {stageIndex + 1}
          </span>
          <div className="flex-1">
            <Input
              value={stage.title}
              onChange={(e) => onUpdate({ title: e.target.value })}
              className="font-bold text-xl bg-white"
              placeholder="כותרת השלב..."
            />
          </div>
        </div>
        <AlertDialog open={showDeleteDialog} onOpenChange={setShowDeleteDialog}>
          <AlertDialogTrigger asChild>
            <Button variant="destructive" onClick={handleStageDelete}>
              מחק שלב
            </Button>
          </AlertDialogTrigger>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>האם אתה בטוח שברצונך למחוק את השלב?</AlertDialogTitle>
              <AlertDialogDescription>
                פעולה זו תמחק את כל השאלות בשלב זה ולא ניתן יהיה לשחזר אותן.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>ביטול</AlertDialogCancel>
              <AlertDialogAction onClick={confirmDelete} className="bg-red-500 hover:bg-red-600">
                מחק שלב
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </CardHeader>
      <CardContent className="p-6">
        <div className="space-y-6">
          {stage.questions.map((question, index) => (
            <div key={question.id} className="relative">
              <div className="absolute left-[-40px] top-1/2 transform -translate-y-1/2 flex flex-col gap-1">
                <Button
                  variant="outline"
                  size="icon"
                  onClick={() => moveQuestion(question.id, 'up')}
                  disabled={index === 0}
                  className="w-8 h-8 p-0"
                >
                  ↑
                </Button>
                <Button
                  variant="outline"
                  size="icon"
                  onClick={() => moveQuestion(question.id, 'down')}
                  disabled={index === stage.questions.length - 1}
                  className="w-8 h-8 p-0"
                >
                  ↓
                </Button>
              </div>
              <QuestionEditor
                question={question}
                onUpdate={(updates) => updateQuestion(question.id, updates)}
                onDelete={() => deleteQuestion(question.id)}
                onDuplicate={() => duplicateQuestion(question.id)}
                allQuestions={allQuestions}
                questionIndex={index}
              />
            </div>
          ))}
          <div className="flex justify-end">
            <Button 
              onClick={addQuestion}
              className="bg-blue-500 hover:bg-blue-600 text-white"
            >
              הוסף שאלה חדשה
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default StageEditor;