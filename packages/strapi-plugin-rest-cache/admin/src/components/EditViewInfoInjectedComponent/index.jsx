import React from 'react';
import {
  unstable_useContentManagerContext as useCMEditViewDataManager,
  useRBAC,
} from '@strapi/strapi/admin';

import cachePermissions from '../../permissions';
import EntityCacheInformation from '../EntityCacheInformation';

function EditViewInfoInjectedComponent() {
  const { allowedActions } = useRBAC(cachePermissions);
  const { slug } = useCMEditViewDataManager();

  if (!allowedActions.canReadStrategy) {
    return null;
  }

  return <EntityCacheInformation contentType={slug} />;
}

export default EditViewInfoInjectedComponent;
