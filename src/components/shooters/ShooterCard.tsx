import { MoreVertical, Target, Trophy, TrendingUp } from 'lucide-react';
import { Menu } from '@headlessui/react';
import type { Shooter } from '../../types';

interface ShooterCardProps {
  shooter: Shooter;
  canManageUsers: boolean;
}

export function ShooterCard({ shooter, canManageUsers }: ShooterCardProps) {
  const stats = [
    { label: 'Average', value: shooter.statistics.average.toFixed(1), icon: Target },
    { label: 'Straights', value: shooter.statistics.straights, icon: Trophy },
    { label: 'Streak', value: shooter.statistics.longest_streak, icon: TrendingUp },
  ];

  return (
    <div className="bg-white rounded-lg shadow">
      <div className="p-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="flex-shrink-0">
              <div className="h-10 w-10 rounded-full bg-indigo-100 flex items-center justify-center">
                <span className="text-indigo-600 font-medium">
                  {shooter.name.split(' ').map(n => n[0]).join('')}
                </span>
              </div>
            </div>
            <div>
              <h3 className="text-lg font-medium text-gray-900">{shooter.name}</h3>
              <p className="text-sm text-gray-500">Member since {new Date(shooter.joined_date).toLocaleDateString()}</p>
            </div>
          </div>

          {canManageUsers && (
            <Menu as="div" className="relative">
              <Menu.Button className="flex items-center text-gray-400 hover:text-gray-600">
                <MoreVertical className="h-5 w-5" />
              </Menu.Button>
              <Menu.Items className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                <div className="py-1">
                  <Menu.Item>
                    {({ active }) => (
                      <button
                        className={`${
                          active ? 'bg-gray-100' : ''
                        } block px-4 py-2 text-sm text-gray-700 w-full text-left`}
                      >
                        Edit Details
                      </button>
                    )}
                  </Menu.Item>
                  <Menu.Item>
                    {({ active }) => (
                      <button
                        className={`${
                          active ? 'bg-gray-100' : ''
                        } block px-4 py-2 text-sm text-gray-700 w-full text-left`}
                      >
                        View History
                      </button>
                    )}
                  </Menu.Item>
                  <Menu.Item>
                    {({ active }) => (
                      <button
                        className={`${
                          active ? 'bg-gray-100 text-red-600' : 'text-red-500'
                        } block px-4 py-2 text-sm w-full text-left`}
                      >
                        Deactivate
                      </button>
                    )}
                  </Menu.Item>
                </div>
              </Menu.Items>
            </Menu>
          )}
        </div>

        <dl className="mt-6 grid grid-cols-3 gap-4">
          {stats.map(({ label, value, icon: Icon }) => (
            <div key={label} className="text-center">
              <dt className="text-sm font-medium text-gray-500 flex items-center justify-center">
                <Icon className="h-4 w-4 mr-1" />
                {label}
              </dt>
              <dd className="mt-1 text-lg font-semibold text-gray-900">{value}</dd>
            </div>
          ))}
        </dl>
      </div>
    </div>
  );
}