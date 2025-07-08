// src/App.jsx
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { useEffect } from 'react';

import Sidebar from './components/Sidebar';
import OperationalDashboard from './pages/OperationalDashboard';
import ProfileView from './pages/profile';
import ReportView from './pages/reportView';
import SprintView from './pages/sprintView';

import { useSidebarStore } from './stores/sidebarStore';
import { useFetchAllData } from './services/api';

// Create a query client
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 1,
      refetchOnWindowFocus: false,
    },
  },
});

function MainContent() {
  // 🔁 This hook will auto-fetch all API data into Zustand on load
  // useFetchAllData();

  const { selected } = useSidebarStore();

  if (selected === 'operational') return <OperationalDashboard />;
  if (selected === 'profile') return <ProfileView />;
  if (selected === 'report') return <ReportView />;
  if (selected === 'sprint') return <SprintView />;
  return null;
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <div className="flex h-[100vh] w-[100vw] bg-gradient-to-br from-gray-50 to-gray-100">
        <Sidebar />
        <div className="w-[94vw] p-[1.5vw]">
          <MainContent />
        </div>
      </div>
    </QueryClientProvider>
  );
}

export default App;
