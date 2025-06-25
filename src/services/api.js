import axios from 'axios';

const api = axios.create({
  baseURL: 'https://jsonplaceholder.typicode.com',
  timeout: 5000,
});

export const fetchUser = async (id = 1) => {
  const response = await api.get(`/users/${id}`);
  return response.data;
};

export const fetchPosts = async () => {
  const response = await api.get('/posts?_limit=5');
  return response.data;
};

export default api;