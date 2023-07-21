type RecordType = Record<string, any>;

export const parseQueryParams = (queryParams: RecordType) => {
  const result: RecordType = {};
  const arrayFields: string[] = [];

  for (const key in queryParams) {
    if (queryParams.hasOwnProperty(key)) {
      let value = queryParams[key];

      if (value === 'true') {
        value = true;
      } else if (value === 'false') {
        value = false;
      }

      if (key.includes('[]')) {
        const fieldName = key.replace('[]', '');
        result[fieldName] = Array.isArray(value) ? value : [value];
      } else if (key.includes('[') && key.includes(']')) {
        const fieldPath = key.split(/[\[\]]/).filter(Boolean);
        let fieldRef = result;

        for (let i = 0; i < fieldPath.length - 1; i++) {
          if (i === 0) {
            arrayFields.push(fieldPath[i]);
          }
          const field = fieldPath[i];
          if (!fieldRef[field]) {
            fieldRef[field] = {};
          }
          fieldRef = fieldRef[field];
        }

        const lastField = fieldPath[fieldPath.length - 1];
        fieldRef[lastField] = value;
      } else {
        result[key] = value;
      }
    }
  }

  convertFieldsToArrays(result, arrayFields);
  return result;
};

function convertFieldsToArrays(obj: RecordType, arrayFields: string[]) {
  for (const key in obj) {
    if (obj.hasOwnProperty(key)) {
      const value = obj[key];
      if (typeof value === 'object') {
        convertFieldsToArrays(value, arrayFields);
      }
    }
  }

  for (const field of arrayFields) {
    if (obj[field]) {
      obj[field] = Object.values(obj[field]);
    }
  }
}
