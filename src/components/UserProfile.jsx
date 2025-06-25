import { useUser } from '../hooks/useUser';
import useUserStore from '../stores/userStore';
import { useEffect } from 'react';

const UserProfile = () => {
  const { data: user, isLoading, error } = useUser(1);
  const { setUser } = useUserStore();

  useEffect(() => {
    if (user) {
      setUser(user);
    }
  }, [user, setUser]);

  if (isLoading) {
    return (
      <div className="card animate-fade-in">
        <div className="animate-pulse">
          <div className="h-4 bg-gray-200 rounded w-3/4 mb-2"></div>
          <div className="h-4 bg-gray-200 rounded w-1/2 mb-2"></div>
          <div className="h-4 bg-gray-200 rounded w-2/3"></div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="card animate-fade-in border-red-200 bg-red-50">
        <h2 className="text-xl font-bold text-red-800 mb-2">Error Loading User</h2>
        <p className="text-red-600">{error.message}</p>
      </div>
    );
  }

  return (
    <div className="card animate-fade-in">
      <h2 className="text-2xl font-bold text-gray-800 mb-4">User Profile (TanStack Query)</h2>
      <div className="space-y-2">
        <p><span className="font-semibold text-gray-600">Name:</span> {user?.name}</p>
        <p><span className="font-semibold text-gray-600">Email:</span> {user?.email}</p>
        <p><span className="font-semibold text-gray-600">Phone:</span> {user?.phone}</p>
        <p><span className="font-semibold text-gray-600">Website:</span> {user?.website}</p>
        <p><span className="font-semibold text-gray-600">Company:</span> {user?.company?.name}</p>
      </div>
    </div>
  );
};

export default UserProfile;