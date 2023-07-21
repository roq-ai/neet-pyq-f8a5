import { GetQueryInterface } from 'interfaces';

export function getOrderByOptions(order: GetQueryInterface['order']) {
  const orderBy: Record<string, any> = {};

  if (order?.length) {
    for (const { id, desc } of order) {
      const orderFields = id.split('.');
      let fieldRef = orderBy;

      for (let i = 0; i < orderFields.length - 1; i++) {
        const field = orderFields[i];
        if (!fieldRef[field]) {
          fieldRef[field] = {};
        }
        fieldRef = fieldRef[field] as Record<string, any>;
      }
      const lastField = orderFields[orderFields.length - 1];
      fieldRef[lastField] = desc ? 'desc' : 'asc';
    }
  }

  return orderBy;
}
