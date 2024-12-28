import { useState } from 'react';
import { useClerk, useOrganization } from '@clerk/clerk-react';
import { Building2, Loader2 } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export function CreateOrganization() {
  const [name, setName] = useState('');
  const [isCreating, setIsCreating] = useState(false);
  const { createOrganization } = useClerk();
  const { setActive } = useOrganization();
  const navigate = useNavigate();
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || isCreating) return;

    setIsCreating(true);
    setError('');

    try {
      const org = await createOrganization({
        name,
        slug: name.toLowerCase().replace(/\s+/g, '-'),
        createdBy: 'clerk'
      });
      
      // Set the newly created organization as active
      await setActive({ organization: org.id });
      
      // Navigate to refresh the page
      navigate(0);
      
    } catch (error) {
      console.error('Failed to create organization:', error);
      if (error instanceof Error && error.message.includes('already exists')) {
        setError('An organization with this name already exists. Please choose a different name.');
      } else {
        setError('Failed to create organization. Please try again.');
      }
    } finally {
      setIsCreating(false);
    }
  };

  return (
    <div className="max-w-md mx-auto">
      <div className="text-center">
        <div className="mx-auto h-12 w-12 rounded-lg bg-indigo-100 flex items-center justify-center">
          <Building2 className="h-6 w-6 text-indigo-600" />
        </div>
        <h2 className="mt-4 text-2xl font-bold text-gray-900">Create an Organization</h2>
        <p className="mt-2 text-sm text-gray-600">
          Set up your organization to manage clubs and members
        </p>
      </div>

      <form onSubmit={handleSubmit} className="mt-8 space-y-6">
        <div>
          <label htmlFor="name" className="block text-sm font-medium text-gray-700">
            Organization Name
          </label>
          <div className="mt-1">
            <input
              type="text"
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
              placeholder="Enter organization name"
              required
            />
          </div>
          {error && (
            <p className="mt-2 text-sm text-red-600">
              {error}
            </p>
          )}
        </div>

        <button
          type="submit"
          disabled={isCreating || !name.trim()}
          className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isCreating ? (
            <>
              <Loader2 className="animate-spin h-5 w-5 mr-2" />
              Creating...
            </>
          ) : (
            'Create Organization'
          )}
        </button>
      </form>
    </div>
  );
}