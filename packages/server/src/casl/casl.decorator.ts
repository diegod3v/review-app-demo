import { SetMetadata } from '@nestjs/common';
import { Action } from './action.enum';
import { Resource } from './resources.enum';

export const PERMISSIONS_KEY = 'permissions';
export const RequirePermissions = (
  action: Action,
  resource: Resource | 'all',
) => SetMetadata(PERMISSIONS_KEY, { action, resource });
