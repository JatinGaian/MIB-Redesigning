import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import Sidebar from './components/Sidebar';
import OperationalDashboard from './pages/OperationalDashboard';
import SprintDependencyView from './pages/SprintDependencyView';
import ReportView from './pages/reportView';
import SprintView from './pages/sprintView';
import { useSidebarStore } from './stores/sidebarStore';

// Create a client
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 1,
      refetchOnWindowFocus: false,
    },
  },
});

function MainContent() {
  const { selected } = useSidebarStore();
  if (selected === 'operational') return <OperationalDashboard />;
  if (selected === 'SprintDependencyView') return <SprintDependencyView />;
  if (selected === 'report') return <ReportView />;
  if (selected === 'sprint') return <SprintView />;
  return null;
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <div className="flex h-[100vh] w-[100vw] bg-gradient-to-br from-gray-50 to-gray-100">
        <Sidebar />
        <div className="  w-[96vw] p-[0.8vw]">
          <MainContent />
        </div>
      </div>
    </QueryClientProvider>
  );
}

export default App;