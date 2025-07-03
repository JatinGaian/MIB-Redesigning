import axios from 'axios';

const api = axios.create({
  baseURL: 'https://jsonplaceholder.typicode.com',
  timeout: 5000,
});
// Fetch a Single User
export const fetchUser = async (id = 1) => {
  const response = await api.get(`/users/${id}`);
  return response.data;
};
// Fetch Sample Posts
export const fetchPosts = async () => {
  const response = await api.get('/posts?_limit=5');
  return response.data;
};
//Mock Fetch Sprints
export const fetchSprints = async () => {
  // Possible assignees
  const allAssignees = [
    { name: 'vishwas', image: 'man' },
    { name: 'maya', image: 'woman' },
    { name: 'prasad', image: 'gamer' },
    { name: 'alex', image: 'man' },
    { name: 'sara', image: 'woman' },
    { name: 'john', image: 'man' },
    { name: 'emma', image: 'woman' },
    { name: 'leo', image: 'gamer' },
  ];
  return Array.from({ length: 10 }, (_, i) => {
    // Random number of assignees between 2 and 8
    const numAssignees = Math.floor(Math.random() * 7) + 2;
    // Shuffle and pick assignees
    const shuffled = allAssignees.sort(() => 0.5 - Math.random());
    return {
      id: i + 1,
      name: `Sprint ${i + 1}`,
      goal: 'Sprint Goal',
      progress: Math.floor(Math.random() * 100),
      assignees: shuffled.slice(0, numAssignees),
      stories: { done: Math.floor(Math.random() * 10), total: 10 },
      dateRange: `July ${20 + i} – July ${26 + i}`,
      status: 'On Track',
    };
  });
};

export default api;