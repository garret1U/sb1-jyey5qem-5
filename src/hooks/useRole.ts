import { useUser } from '@clerk/clerk-react';
import { UserRole } from '../types/roles';
import { hasPermission } from '../utils/permissions';

export function useRole() {
  const { user } = useUser();
  
  // Check if user has a verified email with oneuprising.com domain
  const isAdmin = user?.emailAddresses.some(
    email => 
      email.verification.status === 'verified' &&
      email.emailAddress.endsWith('@oneuprising.com')
  ) ?? false;
    
  const role: UserRole = isAdmin ? 'admin' : 'member';

  return {
    role,
    isAdmin,
    hasPermission: (permission: string) => hasPermission(role, permission)
  };
}