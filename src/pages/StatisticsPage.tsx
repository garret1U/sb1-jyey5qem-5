import Layout from '../components/Layout';
import { PersonalStats } from '../components/statistics/PersonalStats';
import { ClubStats } from '../components/statistics/ClubStats';
import { useRole } from '../hooks/useRole';

export default function StatisticsPage() {
  const { hasPermission } = useRole();
  const canViewClubStats = hasPermission('view_all');

  return (
    <Layout>
      <div className="max-w-7xl mx-auto space-y-8">
        <h1 className="text-2xl font-bold text-gray-900">Statistics</h1>
        
        <PersonalStats />
        
        {canViewClubStats && <ClubStats />}
      </div>
    </Layout>
  );
}