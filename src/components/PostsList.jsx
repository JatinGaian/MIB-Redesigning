import { usePosts } from '../hooks/usePosts';

const PostsList = () => {
  const { data: posts, isLoading, error } = usePosts();

  if (isLoading) {
    return (
      <div className="card animate-fade-in">
        <h2 className="text-2xl font-bold text-gray-800 mb-4">Recent Posts</h2>
        <div className="space-y-3">
          {[...Array(3)].map((_, i) => (
            <div key={i} className="animate-pulse">
              <div className="h-4 bg-gray-200 rounded w-3/4 mb-2"></div>
              <div className="h-3 bg-gray-200 rounded w-full"></div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="card animate-fade-in border-red-200 bg-red-50">
        <h2 className="text-xl font-bold text-red-800 mb-2">Error Loading Posts</h2>
        <p className="text-red-600">{error.message}</p>
      </div>
    );
  }

  return (
    <div className="card animate-fade-in">
      <h2 className="text-2xl font-bold text-gray-800 mb-4">Recent Posts (TanStack Query)</h2>
      <div className="space-y-4">
        {posts?.map((post) => (
          <div key={post.id} className="border-l-4 border-blue-500 pl-4">
            <h3 className="font-semibold text-gray-800 capitalize">{post.title}</h3>
            <p className="text-gray-600 text-sm mt-1">{post.body.substring(0, 100)}...</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PostsList;