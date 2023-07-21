import { QuestionPaperInterface } from 'interfaces/question-paper';
import { UserInterface } from 'interfaces/user';
import { GetQueryInterface } from 'interfaces';

export interface AttemptInterface {
  id?: string;
  score: number;
  analysis: string;
  question_paper_id?: string;
  user_id?: string;
  created_at?: any;
  updated_at?: any;

  question_paper?: QuestionPaperInterface;
  user?: UserInterface;
  _count?: {};
}

export interface AttemptGetQueryInterface extends GetQueryInterface {
  id?: string;
  analysis?: string;
  question_paper_id?: string;
  user_id?: string;
}
