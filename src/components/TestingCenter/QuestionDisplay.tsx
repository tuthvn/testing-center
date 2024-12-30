import React from 'react';
import { Question } from '../../types/exam';

interface QuestionDisplayProps {
  question: Question;
  selectedAnswers: number[];
  onAnswerSelect: (answerId: number) => void;
  questionNumber: number;
}

const QuestionDisplay: React.FC<QuestionDisplayProps> = ({
  question,
  selectedAnswers,
  onAnswerSelect,
  questionNumber,
}) => {
  return (
    <div className="bg-white rounded-lg p-6 shadow-lg">
      <div className="mb-4 flex justify-between items-center">
        <span className="text-sm text-gray-500">
          Category: {question.category} | Difficulty: {question.difficulty}
        </span>
        <span className="text-sm font-semibold">
          Câu {questionNumber + 1}
        </span>
      </div>

      <h2 className="text-xl font-semibold mb-6">
        {question.content}
      </h2>

      <div className="space-y-4">
        {question.options.map((option, idx) => (
          <label
            key={idx}
            className="flex items-center space-x-3 p-3 rounded-lg hover:bg-gray-50 cursor-pointer transition-colors"
          >
            <input
              type={question.type === 'single' ? 'radio' : 'checkbox'}
              checked={selectedAnswers.includes(idx)}
              onChange={() => onAnswerSelect(idx)}
              name={`question-${question.id}`}
              className={`form-${question.type === 'single' ? 'radio' : 'checkbox'} h-5 w-5 text-blue-600`}
            />
            <span className="flex-grow">{option}</span>
          </label>
        ))}
      </div>
    </div>
  );
};

export default QuestionDisplay;