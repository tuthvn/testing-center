import React from 'react';
import { ExamSetupData } from '../../types/exam';
import { Button } from '../ui/Button';
import { Input } from '../ui/Input';
import { Select } from '../ui/Select';

interface ExamSetupProps {
  onStart: (setupData: ExamSetupData) => void;
}

const ExamSetup: React.FC<ExamSetupProps> = ({ onStart }) => {
  const [formData, setFormData] = React.useState<ExamSetupData>({
    examId: '',
    candidateName: '',
    questionCount: 100,
    timeLimit: 3,
  });

  const [errors, setErrors] = React.useState<string[]>([]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErrors([]);

    if (!formData.examId) {
      setErrors(prev => [...prev, 'Vui lòng chọn môn thi']);
      return;
    }

    if (!formData.candidateName.trim()) {
      setErrors(prev => [...prev, 'Vui lòng nhập tên thí sinh']);
      return;
    }

    onStart(formData);
  };

  return (
    <div className="max-w-md mx-auto mt-10 p-6 bg-white rounded-lg shadow-lg">
      <h1 className="text-2xl font-bold mb-6">Testing Center</h1>
      
      <form onSubmit={handleSubmit} className="space-y-4">
        <Select
          label="Chọn môn thi"
          value={formData.examId}
          onChange={(e) => setFormData(prev => ({ ...prev, examId: e.target.value }))}
          options={[
            { value: '', label: 'Chọn môn thi' },
            { value: 'math', label: 'Toán học' },
            { value: 'physics', label: 'Vật lý' },
            { value: 'chemistry', label: 'Hóa học' },
          ]}
        />

        <Input
          label="Tên thí sinh"
          type="text"
          value={formData.candidateName}
          onChange={(e) => setFormData(prev => ({ ...prev, candidateName: e.target.value }))}
        />

        <Input
          label="Số câu hỏi"
          type="number"
          min={1}
          max={100}
          value={formData.questionCount}
          onChange={(e) => setFormData(prev => ({ ...prev, questionCount: parseInt(e.target.value) }))}
        />

        <Input
          label="Thời gian làm bài (giờ)"
          type="number"
          min={1}
          max={5}
          value={formData.timeLimit}
          onChange={(e) => setFormData(prev => ({ ...prev, timeLimit: parseInt(e.target.value) }))}
        />

        {errors.length > 0 && (
          <div className="bg-red-50 p-4 rounded-md">
            {errors.map((error, index) => (
              <p key={index} className="text-red-600">{error}</p>
            ))}
          </div>
        )}

        <Button
          type="submit"
          className="w-full"
          disabled={!formData.examId || !formData.candidateName}
        >
          Bắt đầu thi
        </Button>
      </form>
    </div>
  );
};

export default ExamSetup;