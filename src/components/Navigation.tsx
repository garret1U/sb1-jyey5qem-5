import { useNavigate } from 'react-router-dom';
import { Home, Users, Target, BarChart2, Settings, Building2, Crosshair } from 'lucide-react';
import { useRole } from '../hooks/useRole';

const baseNavigation = [
  { name: 'Dashboard', icon: Home },
  { name: 'Shooters', icon: Users },
  { name: 'Scores', icon: Target },
  { name: 'Statistics', icon: BarChart2 },
  { name: 'My Guns', icon: Crosshair },
  { name: 'Settings', icon: Settings },
];

export default function Navigation() {
  const navigate = useNavigate();
  const { isAdmin } = useRole();

  const navigation = isAdmin ? [
    ...baseNavigation,
    { name: 'Organization', icon: Building2 }
  ] : baseNavigation;

  return (
    <nav className="bg-white shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex space-x-8">
          {navigation.map((item) => {
            const Icon = item.icon;
            return (
              <button
                key={item.name}
                onClick={() => {
                  if (item.name === 'Settings') {
                    navigate('/club-profile');
                  } else if (item.name === 'Dashboard') {
                    navigate('/');
                  } else if (item.name === 'Shooters') {
                    navigate('/shooters');
                 } else if (item.name === 'Scores') {
                   navigate('/scores');
                  } else if (item.name === 'Statistics') {
                    navigate('/statistics');
                  } else if (item.name === 'My Guns') {
                    navigate('/guns');
                  } else if (item.name === 'Organization') {
                    navigate('/organization');
                  }
                }}
                className="flex items-center px-3 py-4 text-sm font-medium text-gray-600 hover:text-indigo-600 hover:border-indigo-600 border-b-2 border-transparent"
              >
                <Icon className="h-5 w-5 mr-2" />
                {item.name}
              </button>
            );
          })}
        </div>
      </div>
    </nav>
  );
}