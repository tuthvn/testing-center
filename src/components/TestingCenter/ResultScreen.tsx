import React from 'react';
import { CheckCircle, XCircle } from 'lucide-react';
import { Button } from '../ui/Button';

interface ResultScreenProps {
  score: number;
  totalQuestions: number;
  correctAnswers: number;
  onRestart: () => void;
}

const ResultScreen: React.FC<ResultScreenProps> = ({
  score,
  totalQuestions,
  correctAnswers,
  onRestart,
}) => {
  const getScoreColor = () => {
    if (score >= 80) return 'text-green-600';
    if (score >= 60) return 'text-yellow-600';
    return 'text-red-600';
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center">
      <div className="bg-white p-8 rounded-2xl shadow-lg max-w-md w-full">
        <div className="text-center">
          {score >= 60 ? (
            <CheckCircle className="w-16 h-16 text-green-500 mx-auto mb-4" />
          ) : (
            <XCircle className="w-16 h-16 text-red-500 mx-auto mb-4" />
          )}

          <h1 className="text-2xl font-bold mb-2">Kết quả bài thi</h1>
          
          <div className={`text-5xl font-bold mb-6 ${getScoreColor()}`}>
            {score.toFixed(1)}%
          </div>

          <div className="space-y-2 text-gray-600 mb-8">
            <p>Số câu trả lời đúng: {correctAnswers}/{totalQuestions}</p>
            <p>Trạng thái: {score >= 60 ? 'Đạt' : 'Không đạt'}</p>
          </div>

          <Button onClick={onRestart} className="w-full">
            Làm bài thi mới
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ResultScreen;