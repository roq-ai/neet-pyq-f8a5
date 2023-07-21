import axios from 'axios';
import queryString from 'query-string';
import { QuestionPaperInterface, QuestionPaperGetQueryInterface } from 'interfaces/question-paper';
import { GetQueryInterface, PaginatedInterface } from '../../interfaces';

export const getQuestionPapers = async (
  query?: QuestionPaperGetQueryInterface,
): Promise<PaginatedInterface<QuestionPaperInterface>> => {
  const response = await axios.get('/api/question-papers', {
    params: query,
    headers: { 'Content-Type': 'application/json' },
  });
  return response.data;
};

export const createQuestionPaper = async (questionPaper: QuestionPaperInterface) => {
  const response = await axios.post('/api/question-papers', questionPaper);
  return response.data;
};

export const updateQuestionPaperById = async (id: string, questionPaper: QuestionPaperInterface) => {
  const response = await axios.put(`/api/question-papers/${id}`, questionPaper);
  return response.data;
};

export const getQuestionPaperById = async (id: string, query?: GetQueryInterface) => {
  const response = await axios.get(`/api/question-papers/${id}${query ? `?${queryString.stringify(query)}` : ''}`);
  return response.data;
};

export const deleteQuestionPaperById = async (id: string) => {
  const response = await axios.delete(`/api/question-papers/${id}`);
  return response.data;
};
