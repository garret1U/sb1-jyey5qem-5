import { UserButton as ClerkUserButton } from '@clerk/clerk-react';
import { Shield } from 'lucide-react';
import { useRole } from '../../hooks/useRole';

export function UserButton() {
  const { role } = useRole();
  const roleLabel = role === 'admin' ? 'Admin' : 'Member';

  return (
    <div className="flex flex-col items-end relative">
      <ClerkUserButton
        afterSignOutUrl="/sign-in"
        userProfileUrl="/user-profile"
        appearance={{
          elements: {
            avatarBox: 'w-10 h-10 cursor-pointer',
            userButtonPopoverCard: 'right-0 mt-2',
            userButtonPopoverActions: 'p-0 divide-y divide-gray-100',
            userButtonPopoverActionButton: 'w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-50',
            userButtonPopoverActionButtonText: 'text-sm font-medium'
          }
        }}
      />
      <div className="absolute -top-1 -right-1 bg-indigo-600 rounded-full px-2 py-0.5 flex items-center">
        <Shield className="w-3 h-3 text-white mr-1" />
        <span className="text-xs font-medium text-white">{roleLabel}</span>
      </div>
    </div>
  );
}