const mapping: Record<string, string> = {
  attempts: 'attempt',
  organizations: 'organization',
  'question-papers': 'question_paper',
  users: 'user',
};

export function convertRouteToEntityUtil(route: string) {
  return mapping[route] || route;
}
