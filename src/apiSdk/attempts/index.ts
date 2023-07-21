import axios from 'axios';
import queryString from 'query-string';
import { AttemptInterface, AttemptGetQueryInterface } from 'interfaces/attempt';
import { GetQueryInterface, PaginatedInterface } from '../../interfaces';

export const getAttempts = async (query?: AttemptGetQueryInterface): Promise<PaginatedInterface<AttemptInterface>> => {
  const response = await axios.get('/api/attempts', {
    params: query,
    headers: { 'Content-Type': 'application/json' },
  });
  return response.data;
};

export const createAttempt = async (attempt: AttemptInterface) => {
  const response = await axios.post('/api/attempts', attempt);
  return response.data;
};

export const updateAttemptById = async (id: string, attempt: AttemptInterface) => {
  const response = await axios.put(`/api/attempts/${id}`, attempt);
  return response.data;
};

export const getAttemptById = async (id: string, query?: GetQueryInterface) => {
  const response = await axios.get(`/api/attempts/${id}${query ? `?${queryString.stringify(query)}` : ''}`);
  return response.data;
};

export const deleteAttemptById = async (id: string) => {
  const response = await axios.delete(`/api/attempts/${id}`);
  return response.data;
};
