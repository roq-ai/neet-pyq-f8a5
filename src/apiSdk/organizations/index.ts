import axios from 'axios';
import queryString from 'query-string';
import { OrganizationInterface, OrganizationGetQueryInterface } from 'interfaces/organization';
import { GetQueryInterface, PaginatedInterface } from '../../interfaces';

export const getOrganizations = async (
  query?: OrganizationGetQueryInterface,
): Promise<PaginatedInterface<OrganizationInterface>> => {
  const response = await axios.get('/api/organizations', {
    params: query,
    headers: { 'Content-Type': 'application/json' },
  });
  return response.data;
};

export const createOrganization = async (organization: OrganizationInterface) => {
  const response = await axios.post('/api/organizations', organization);
  return response.data;
};

export const updateOrganizationById = async (id: string, organization: OrganizationInterface) => {
  const response = await axios.put(`/api/organizations/${id}`, organization);
  return response.data;
};

export const getOrganizationById = async (id: string, query?: GetQueryInterface) => {
  const response = await axios.get(`/api/organizations/${id}${query ? `?${queryString.stringify(query)}` : ''}`);
  return response.data;
};

export const deleteOrganizationById = async (id: string) => {
  const response = await axios.delete(`/api/organizations/${id}`);
  return response.data;
};
