import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import App from './App';
import Dashboard from './pages/Dashboard';
import { SignIn, SignUp } from './pages/auth';
import ClubProfilePage from './pages/ClubProfilePage';
import UserProfilePage from './pages/UserProfilePage';
import GunsPage from './pages/GunsPage';
import StatisticsPage from './pages/StatisticsPage';
import ScoresPage from './pages/ScoresPage';
import ShootersPage from './pages/ShootersPage';
import OrganizationProfilePage from './pages/OrganizationProfilePage';
import OrganizationOnboarding from './pages/OrganizationOnboarding';
import Layout from './components/Layout';
import { AuthGuard } from './components/auth/AuthGuard';

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [
      {
        path: 'sign-in/*',
        element: <SignIn />
      },
      {
        path: 'sign-up/*',
        element: <SignUp />
      },
      {
        path: 'onboarding',
        element: (
          <AuthGuard>
            <OrganizationOnboarding />
          </AuthGuard>
        )
      },
      {
        path: 'club-profile',
        element: (
          <AuthGuard>
            <ClubProfilePage />
          </AuthGuard>
        )
      },
      {
        path: 'user-profile/*',
        element: (
          <AuthGuard>
            <UserProfilePage />
          </AuthGuard>
        )
      },
      {
        path: 'organization',
        element: (
          <AuthGuard>
            <OrganizationProfilePage />
          </AuthGuard>
        )
      },
      {
        path: 'statistics',
        element: (
          <AuthGuard>
            <StatisticsPage />
          </AuthGuard>
        )
      },
      {
        path: 'scores',
        element: (
          <AuthGuard>
            <ScoresPage />
          </AuthGuard>
        )
      },
      {
        path: 'shooters',
        element: (
          <AuthGuard>
            <ShootersPage />
          </AuthGuard>
        )
      },
      {
        path: 'guns',
        element: (
          <AuthGuard>
            <GunsPage />
          </AuthGuard>
        )
      },
      {
        path: '',
        element: (
          <AuthGuard>
            <Layout>
              <Dashboard />
            </Layout>
          </AuthGuard>
        )
      }
    ]
  }
]);

export function Router() {
  return <RouterProvider router={router} />;
}