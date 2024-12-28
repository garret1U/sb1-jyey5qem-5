import { SignIn as ClerkSignIn } from '@clerk/clerk-react';
import { Navigate, useLocation, Link } from 'react-router-dom';
import { clerkAppearance } from '../config/clerk';

export default function SignIn() {
  const location = useLocation();
  const from = location.state?.from?.pathname || '/';

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <ClerkSignIn 
        appearance={clerkAppearance}
        redirectUrl={from}
        routing="path"
        path="/sign-in"
      />
    </div>
  );
}