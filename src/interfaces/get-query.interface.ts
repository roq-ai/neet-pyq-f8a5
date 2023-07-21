export interface GetQueryInterface {
  relations?: string[];
  limit?: number;
  offset?: number;
  searchTerm?: string;
  searchTermKeys?: string[];
  order?: { id: string; desc: boolean }[];
}
