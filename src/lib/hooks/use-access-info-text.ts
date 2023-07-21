import { AccessOperationEnum, AccessServiceEnum, useAuthorizationApi, useSession } from '@roq/nextjs';
import { useMemo } from 'react';
import * as inflection from 'inflection';
import { appConfig } from 'config';

export function useAccessInfo(entity: string) {
  const entityName = entity.replace(/_/g, ' ');
  const { hasAccess } = useAuthorizationApi();
  const { session } = useSession();
  const operationsText = useMemo(() => {
    const canRead = hasAccess(entity, AccessOperationEnum.READ, AccessServiceEnum.PROJECT);
    const canUpdate = hasAccess(entity, AccessOperationEnum.UPDATE, AccessServiceEnum.PROJECT);
    const canCreate = hasAccess(entity, AccessOperationEnum.CREATE, AccessServiceEnum.PROJECT);
    const canDelete = hasAccess(entity, AccessOperationEnum.DELETE, AccessServiceEnum.PROJECT);
    const operations = [canRead && 'read', canUpdate && 'update', canCreate && 'create', canDelete && 'delete'].filter(
      Boolean,
    );
    if (operations.length > 2) {
      return `${operations.slice(0, -1).join(', ')} and ${operations.slice(-1)}`;
    }
    if (operations.length === 2) {
      return operations.join(' and ');
    }
    return operations.join('');
  }, [entity]);
  return `As a ${inflection.humanize(session.user.roles[0])} you can ${operationsText} the ${inflection.pluralize(
    entityName,
  )} of your ${appConfig.tenantName.toLowerCase()}`;
}
