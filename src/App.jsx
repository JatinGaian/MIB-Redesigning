// src/App.jsx
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';

import Sidebar from './components/Sidebar';
import OperationalDashboard from './pages/OperationalDashboard';
import SprintDependencyView from './pages/SprintDependencyView';
import ReportView from './pages/reportView';
import SprintView from './pages/sprintView';
import ProfileView from './pages/profile';

// Create a query client
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 1,
      refetchOnWindowFocus: false,
    },
  },
});

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Router>
        <div className="flex h-[100vh] w-[100vw] bg-gradient-to-br from-gray-50 to-gray-100">
          <Sidebar />
          <div className="w-[96vw] p-[0.8vw] overflow-auto">
            <Routes>
              <Route path="/" element={<Navigate to="/operational" replace />} />
              <Route path="/operational" element={<OperationalDashboard />} />
              <Route path="/SprintDependencyView" element={<SprintDependencyView />} />
              <Route path="/report" element={<ReportView />} />
              <Route path="/sprint" element={<SprintView />} />
              <Route path="/profile" element={<ProfileView />} />
            </Routes>
          </div>
        </div>
      </Router>
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  );
}

export default App;
