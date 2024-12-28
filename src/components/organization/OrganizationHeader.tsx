import { useOrganization } from '@clerk/clerk-react';
import { Building2, Users, Calendar } from 'lucide-react';

export function OrganizationHeader() {
  const { organization, membershipList } = useOrganization();
  const createdAt = organization?.createdAt ? 
    new Date(organization.createdAt).toLocaleDateString() : 
    'N/A';

  return (
    <div className="bg-white shadow rounded-lg p-6">
      <div className="sm:flex sm:items-center sm:justify-between">
        <div className="sm:flex sm:space-x-5">
          <div className="flex-shrink-0">
            <div className="h-20 w-20 rounded-full bg-indigo-600 flex items-center justify-center">
              <Building2 className="h-10 w-10 text-white" />
            </div>
          </div>
          <div className="mt-4 text-center sm:mt-0 sm:pt-1 sm:text-left">
            <p className="text-xl font-bold text-gray-900 sm:text-2xl">
              {organization?.name || 'Organization'}
            </p>
            <div className="flex flex-col space-y-2 mt-2">
              <div className="flex items-center text-sm text-gray-500">
                <Users className="h-4 w-4 mr-2" />
                {membershipList?.length || 0} Members
              </div>
              <div className="flex items-center text-sm text-gray-500">
                <Calendar className="h-4 w-4 mr-2" />
                Created {createdAt}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}