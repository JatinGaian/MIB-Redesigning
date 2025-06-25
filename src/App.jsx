import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import HelloWorld from './components/HelloWorld';
import Counter from './components/Counter';
import UserProfile from './components/UserProfile';
import PostsList from './components/PostsList';

// Create a client
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
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 py-8 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="grid gap-8">
            {/* Hero Section */}
            <div className="text-center">
              <HelloWorld />
            </div>

            {/* Main Content Grid */}
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              <div className="lg:col-span-1">
                <Counter />
              </div>
              <div className="lg:col-span-1">
                <UserProfile />
              </div>
              <div className="lg:col-span-1">
                <PostsList />
              </div>
            </div>

            {/* Footer */}
            <div className="text-center mt-8">
              <p className="text-gray-600">
                Built with ❤️ using React, Tailwind CSS, Zustand, and TanStack Query
              </p>
            </div>
          </div>
        </div>
      </div>
    </QueryClientProvider>
  );
}

export default App;