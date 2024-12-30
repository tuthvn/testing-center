import React from 'react';
import { Question } from '../../types/exams';

interface QuestionListProps {
  questions: Question[];
  currentIndex: number;
  answers: Record<number, number[]>;
  onQuestionSelect: (index: number) => void;
}

const QuestionList: React.FC<QuestionListProps> = ({
  questions,
  currentIndex,
  answers,
  onQuestionSelect,
}) => {
  const getQuestionStatus = (index: number) => {
    if (currentIndex === index) return 'current';
    if (answers[index]?.length > 0) return 'answered';
    return 'unanswered';
  };

  const getButtonClass = (status: string) => {
    switch (status) {
      case 'current':
        return 'bg-blue-500 text-white';
      case 'answered':
        return 'bg-green-200 text-gray-800';
      default:
        return 'bg-white text-gray-800';
    }
  };

  return (
    <div className="h-full flex flex-col">
      <h3 className="text-lg font-semibold mb-4">Danh sách câu hỏi</h3>
      
      <div className="flex-grow overflow-auto">
        <div className="grid grid-cols-5 gap-2">
          {questions.map((_, idx) => (
            <button
              key={idx}
              className={`
                p-2 text-center rounded-lg
                hover:opacity-80 transition-opacity
                ${getButtonClass(getQuestionStatus(idx))}
              `}
              onClick={() => onQuestionSelect(idx)}
            >
              {idx + 1}
            </button>
          ))}
        </div>
      </div>

      <div className="mt-4">
        <div className="flex items-center justify-between text-sm">
          <div className="flex items-center">
            <div className="w-3 h-3 bg-white rounded-full mr-2"></div>
            <span>Chưa làm</span>
          </div>
          <div className="flex items-center">
            <div className="w-3 h-3 bg-green-200 rounded-full mr-2"></div>
            <span>Đã làm</span>
          </div>
          <div className="flex items-center">
            <div className="w-3 h-3 bg-blue-500 rounded-full mr-2"></div>
            <span>Hiện tại</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default QuestionList;