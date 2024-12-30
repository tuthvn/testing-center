import React from 'react';
import { useFullscreen } from '../../hooks/useFullscreen';
import { Exam } from '../../types/exams';
import QuestionDisplay from './QuestionDisplay';
import QuestionList from './QuestionList';
import Timer from './Timer';

interface ExamRunnerProps {
  exam: Exam;
  timeLimit: number;
  onComplete: (answers: Record<number, number[]>) => void;
  onFail: () => void;
}

const ExamRunner: React.FC<ExamRunnerProps> = ({
  exam,
  timeLimit,
  onComplete,
  onFail,
}) => {
  const [currentQuestionIndex, setCurrentQuestionIndex] = React.useState(0);
  const [answers, setAnswers] = React.useState<Record<number, number[]>>({});
  const [remainingTime, setRemainingTime] = React.useState(timeLimit * 3600);

  const { elementRef, enterFullscreen } = useFullscreen(onFail);

  React.useEffect(() => {
    enterFullscreen();
  }, []);

  React.useEffect(() => {
    const timer = setInterval(() => {
      setRemainingTime((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          onComplete(answers);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [answers, onComplete]);

  const handleAnswerSelect = (answerId: number) => {
    const question = exam.questions[currentQuestionIndex];
    
    setAnswers(prev => {
      if (question.type === 'single') {
        return { ...prev, [currentQuestionIndex]: [answerId] };
      }
      
      const currentAnswers = prev[currentQuestionIndex] || [];
      if (currentAnswers.includes(answerId)) {
        return {
          ...prev,
          [currentQuestionIndex]: currentAnswers.filter(id => id !== answerId),
        };
      }
      return {
        ...prev,
        [currentQuestionIndex]: [...currentAnswers, answerId],
      };
    });
  };

  const currentQuestion = exam.questions[currentQuestionIndex];

  return (
    <div ref={elementRef} className="h-screen flex bg-gray-100">
      <div className="w-4/5 p-6 overflow-auto">
        <QuestionDisplay
          question={currentQuestion}
          selectedAnswers={answers[currentQuestionIndex] || []}
          onAnswerSelect={handleAnswerSelect}
          questionNumber={currentQuestionIndex}
        />
      </div>

      <div className="w-1/5 p-4 flex flex-col">
        <QuestionList
          questions={exam.questions}
          currentIndex={currentQuestionIndex}
          answers={answers}
          onQuestionSelect={setCurrentQuestionIndex}
        />
        
        <Timer
          timeRemaining={remainingTime}
          className="mt-4"
        />
      </div>
    </div>
  );
};

export default ExamRunner;