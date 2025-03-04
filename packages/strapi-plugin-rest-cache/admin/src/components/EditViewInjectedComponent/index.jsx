import React from 'react';
import {
  unstable_useContentManagerContext as useCMEditViewDataManager,
  useRBAC,
} from '@strapi/strapi/admin';
import cachePermissions from '../../permissions';
import PurgeCacheButton from '../PurgeCacheButton';

function EditViewInjectedComponent() {
  const { allowedActions } = useRBAC(cachePermissions);

  const {
    slug,
    isCreatingEntry,
    hasDraftAndPublish,
    initialData,
    isSingleType,
  } = useCMEditViewDataManager();

  if (isCreatingEntry) {
    return null;
  }

  if (hasDraftAndPublish && initialData.publishedAt === null) {
    return null;
  }

  if (!allowedActions.canReadStrategy || !allowedActions.canPurge) {
    return null;
  }

  return (
    <PurgeCacheButton
      contentType={slug}
      params={isSingleType ? {} : initialData}
      wildcard={isSingleType}
    />
  );
}

export default EditViewInjectedComponent;
