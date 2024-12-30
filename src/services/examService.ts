import { Exam, ExamSetupData } from '../types/exams';

export const examService = {
  async loadExam(examId: string): Promise<Exam> {
    try {
      const response = await fetch(`/exams/${examId}.json`);
      if (!response.ok) {
        throw new Error('Failed to load exam');
      }
      return await response.json();
    } catch (error) {
      console.error('Error loading exam:', error);
      throw error;
    }
  },

  validateExamSetup(setup: ExamSetupData): string[] {
    const errors: string[] = [];
    
    if (!setup.examId) {
      errors.push('Vui lòng chọn môn thi');
    }
    
    if (!setup.candidateName.trim()) {
      errors.push('Vui lòng nhập tên thí sinh');
    }
    
    if (setup.questionCount < 1 || setup.questionCount > 100) {
      errors.push('Số câu hỏi phải từ 1 đến 100');
    }
    
    if (setup.timeLimit < 1 || setup.timeLimit > 5) {
      errors.push('Thời gian làm bài phải từ 1 đến 5 giờ');
    }
    
    return errors;
  }
};