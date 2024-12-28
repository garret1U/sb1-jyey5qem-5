import { useAuth } from '@clerk/clerk-react';
import { Navigate, useLocation, useNavigate } from 'react-router-dom';
import { useOrganizationList } from '@clerk/clerk-react';
import { useEffect } from 'react';

interface AuthGuardProps {
  children: React.ReactNode;
}

export function AuthGuard({ children }: AuthGuardProps) {
  const { isSignedIn, isLoaded } = useAuth();
  const { organizationList, isLoaded: orgsLoaded } = useOrganizationList();
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    if (isSignedIn && orgsLoaded && organizationList?.length === 0 && location.pathname !== '/onboarding') {
      navigate('/onboarding');
    }
  }, [isSignedIn, orgsLoaded, organizationList, location.pathname, navigate]);

  if (!isLoaded) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-indigo-600" />
      </div>
    );
  }

  if (!isSignedIn) {
    return <Navigate to="/sign-in" state={{ from: location }} replace />;
  }

  return <>{children}</>;
}