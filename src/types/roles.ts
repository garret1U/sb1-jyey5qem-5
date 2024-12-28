export type UserRole = 'admin' | 'member';

export interface UserRoleConfig {
  role: UserRole;
  permissions: string[];
}

export const ROLES: Record<UserRole, UserRoleConfig> = {
  admin: {
    role: 'admin',
    permissions: ['manage_clubs', 'manage_users', 'manage_admins', 'view_all']
  },
  member: {
    role: 'member',
    permissions: ['manage_profile', 'add_scores', 'view_personal_stats']
  }
} as const;