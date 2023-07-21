export interface GetManyQueryOptions {
  [key: string]: string | string[] | unknown;
  limit?: string;
  offset?: string;
  order?: { id: string; desc: boolean }[];
}
