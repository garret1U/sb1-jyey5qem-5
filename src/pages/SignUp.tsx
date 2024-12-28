import { SignUp as ClerkSignUp } from '@clerk/clerk-react';
import { Navigate, useLocation, Link } from 'react-router-dom';
import { clerkAppearance, signUpConfig } from '../config/clerk';

export default function SignUp() {
  const location = useLocation();
  const from = location.state?.from?.pathname || '/';

        // Request to join existing organization
        // Mark user as org creator
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <ClerkSignUp
        appearance={clerkAppearance}
        {...signUpConfig}
        redirectUrl={from}
        routing="path"
        path="/sign-up"
      />
    </div>
  );
}