import {PermissionKeys} from '../authorization/permission-keys';
import {securityId} from '@loopback/security';

export interface RequiredPermissions {
  required: PermissionKeys[];
}

export interface MyUserProfile {
  [securityId]: string;
  email?: string;
  name: string;
  permissions: PermissionKeys[];
}
