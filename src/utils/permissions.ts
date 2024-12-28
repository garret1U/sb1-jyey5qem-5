import { UserRole, ROLES } from '../types/roles';

export function hasPermission(userRole: UserRole = 'member', permission: string): boolean {
  const roleConfig = ROLES[userRole];
  return roleConfig?.permissions.includes(permission) ?? false;
}