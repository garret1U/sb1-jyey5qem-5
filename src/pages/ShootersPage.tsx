import Layout from '../components/Layout';
import { ShootersList } from '../components/shooters/ShootersList';
import { useRole } from '../hooks/useRole';

export default function ShootersPage() {
  const { hasPermission } = useRole();
  const canManageUsers = hasPermission('manage_users');

  return (
    <Layout>
      <div className="max-w-7xl mx-auto">
        <ShootersList canManageUsers={canManageUsers} />
      </div>
    </Layout>
  );
}