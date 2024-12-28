import { useAuth } from '@clerk/clerk-react';
import { Navigate } from 'react-router-dom';
import { useRole } from '../../hooks/useRole';

interface RoleGuardProps {
  children: React.ReactNode;
  requiredPermission: string;
}

export function RoleGuard({ children, requiredPermission }: RoleGuardProps) {
  const { hasPermission } = useRole();

  if (!hasPermission(requiredPermission)) {
    return <Navigate to="/" replace />;
  }

  return <>{children}</>;
}