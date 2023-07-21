import { Prisma } from '@prisma/client';
import set from 'lodash/set';

type RecordType = Record<string, any>;

export function convertQueryToPrismaUtil(query: any, modelName: string) {
  let body: any = { where: {} };
  const userPivotRelations: string[] = [];
  if (query) {
    const { relations, searchTerm, searchTermKeys, ...restQuery } = query;
    const filterKeys = Object.keys(restQuery);
    if (filterKeys.length > 0) {
      filterKeys.forEach((key) => {
        body.where[key] = query[key];
      });
    }
    if (query.relations) {
      body = { ...body, include: { _count: { select: {} } } };
      const processRelation = (relation: string) => {
        if (relation.includes('.count')) {
          const rel = relation.replace('.count', '');
          if (isOneToMany(modelName, rel)) {
            body.include._count.select[rel] = true;
          } else {
            body.include[rel] = true;
            if (userPivotRelations.some((r) => r === rel)) {
              body.include[rel] = { select: { user: true, id: true } };
            }
          }
        } else {
          body.include[relation] = true;
          if (userPivotRelations.some((r) => r === relation)) {
            body.include[relation] = { select: { user: true, id: true } };
          }
        }
      };
      if (Array.isArray(query.relations)) {
        query.relations.forEach((relation: string) => {
          processRelation(relation);
        });
      } else {
        processRelation(query.relations);
      }
      if (Object.keys(body.include._count.select).length === 0) {
        delete body.include._count;
      }
    }
    body.where = processSearchQuery(body.where, searchTermKeys, searchTerm);
    if (Object.keys(body.where).length === 0) {
      delete body.where;
    }
  }
  return body;
}

function processSearchQuery(findOptions: RecordType, searchTermKeys: string[] = [], searchTerm: string): RecordType {
  const processedOptions = { ...findOptions };
  const orConditions = searchTerm
    ? searchTermKeys.map((searchKey) => {
        const keyPathArray = searchKey.split('.');
        let operator = 'equals';
        if (keyPathArray.length > 1) {
          operator = keyPathArray.pop();
        }

        return set({}, keyPathArray.join('.'), {
          [operator]: searchTerm,
        });
      })
    : [];

  const filteredConditions = orConditions.filter((condition) => condition !== null);
  if (filteredConditions.length > 0) {
    processedOptions['OR'] = processedOptions['OR'] || [];
    processedOptions['OR'] = [...processedOptions['OR'], ...filteredConditions];
  }

  return processedOptions;
}

function isOneToMany(modelName: string, relation: string) {
  const model = Prisma.dmmf.datamodel.models.find((model) => model.name === modelName);
  const relations = model.fields.filter((field) => field.relationName);
  const r = relations.find((rel) => rel.name === relation);
  return r.isList && r.kind === 'object';
}
