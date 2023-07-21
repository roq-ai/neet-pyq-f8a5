import { AttemptInterface } from 'interfaces/attempt';
import { OrganizationInterface } from 'interfaces/organization';
import { GetQueryInterface } from 'interfaces';

export interface QuestionPaperInterface {
  id?: string;
  name: string;
  content: string;
  organization_id?: string;
  created_at?: any;
  updated_at?: any;
  attempt?: AttemptInterface[];
  organization?: OrganizationInterface;
  _count?: {
    attempt?: number;
  };
}

export interface QuestionPaperGetQueryInterface extends GetQueryInterface {
  id?: string;
  name?: string;
  content?: string;
  organization_id?: string;
}
