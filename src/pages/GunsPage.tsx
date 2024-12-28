import Layout from '../components/Layout';
import { GunList } from '../components/guns/GunList';

export default function GunsPage() {
  return (
    <Layout>
      <div className="max-w-7xl mx-auto">
        <GunList />
      </div>
    </Layout>
  );
}