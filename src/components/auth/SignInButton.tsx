import { useNavigate } from 'react-router-dom';
import { LogIn } from 'lucide-react';

export function SignInButton() {
  const navigate = useNavigate();

  return (
    <button
      onClick={() => navigate('/sign-in')}
      className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700"
    >
      <LogIn className="h-4 w-4 mr-2" />
      Sign In
    </button>
  );
}