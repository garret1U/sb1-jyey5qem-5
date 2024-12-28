import { SignIn as ClerkSignIn, SignUp as ClerkSignUp } from '@clerk/clerk-react';
import { clerkAppearance } from '../../config/clerk';

export function SignIn() {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <ClerkSignIn 
        appearance={clerkAppearance}
        redirectUrl="/"
        routing="path"
        path="/sign-in"
      />
    </div>
  );
}

export function SignUp() {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <ClerkSignUp
        appearance={clerkAppearance}
        redirectUrl="/"
        routing="path"
        path="/sign-up"
      />
    </div>
  );
}