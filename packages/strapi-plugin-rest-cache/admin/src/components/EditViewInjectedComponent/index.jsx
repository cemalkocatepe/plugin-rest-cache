import React from 'react';
import {
  unstable_useContentManagerContext as useCMEditViewDataManager,
  useRBAC,
} from '@strapi/strapi/admin';
import cachePermissions from '../../permissions';
import PurgeCacheButton from '../PurgeCacheButton';

function EditViewInjectedComponent() {
  const { allowedActions } = useRBAC(cachePermissions);

  const { slug, isCreatingEntry, hasDraftAndPublish, form, isSingleType } =
    useCMEditViewDataManager();

  const { initialValues, values, onChange } = form;

  if (isCreatingEntry) {
    return null;
  }

  if (hasDraftAndPublish && values.publishedAt === null) {
    return null;
  }

  if (!allowedActions.canReadStrategy || !allowedActions.canPurge) {
    return null;
  }

  return (
    <PurgeCacheButton
      contentType={slug}
      params={isSingleType ? {} : values}
      wildcard={isSingleType}
    />
  );
}

export default EditViewInjectedComponent;
