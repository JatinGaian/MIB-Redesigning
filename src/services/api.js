// // src/services/api.js
import axios from 'axios';

const Bearer_token_for_MIB = import.meta.env.VITE_Bearer_token_for_MIB;

const headers = {
  'Content-Type': 'application/json',
  'Authorization': `Bearer ${Bearer_token_for_MIB}`,
};

// Optional: Dummy JSONPlaceholder instance
const api = axios.create({
  baseURL: 'https://jsonplaceholder.typicode.com',
  timeout: 5000,
});
//  Fetch Projects
export const fetchProjects = async () => {
  const schemaId = import.meta.env.VITE_PROJECTS_LEADS_SCHEMA;
  const url = `https://ig.gov-cloud.ai/pi-entity-instances-service/v2.0/schemas/${schemaId}/instances/list?size=1000`;

  const response = await axios.post(
    url,
    { dbType: 'TIDB', filter: {} },
    { headers:headers }
  );

  // console.log('🔍 Projects API response:', response.data);
  // console.log('🔍 Projects API response type:', typeof response.data);
  // console.log('🔍 Projects API response is array:', Array.isArray(response.data));
  
  // Return the data, ensuring it's always an array
  return Array.isArray(response.data) ? response.data : [];
};

//  Fetch Boards
export const fetchBoards = async () => {
  const schemaId = import.meta.env.VITE_ALL_BOARDS_SCHEMA;
  const url = `https://ig.gov-cloud.ai/pi-entity-instances-service/v2.0/schemas/${schemaId}/instances/list?size=1000`;

  const response = await axios.post(
    url,
    { dbType: 'TIDB', filter: {} },
    { headers:headers }
  );

  // console.log('🔍 Boards API response:', response.data);
  // console.log('🔍 Boards API response type:', typeof response.data);
  // console.log('🔍 Boards API response is array:', Array.isArray(response.data));
  
  // Return the data, ensuring it's always an array
  return Array.isArray(response.data) ? response.data : [];
};

//  Fetch Issues
export const fetchIssues = async () => {
  const schemaId = import.meta.env.VITE_ALL_ISSUES_SCHEMA;
  const url = `https://ig.gov-cloud.ai/pi-entity-instances-service/v2.0/schemas/${schemaId}/instances/list?size=1000`;

  const response = await axios.post(
    url,
    { dbType: 'TIDB', filter: {} },
    { headers:headers }
  );

  // console.log('🔍 Issues API response:', response.data);
  // console.log('🔍 Issues API response type:', typeof response.data);
  // console.log('🔍 Issues API response is array:', Array.isArray(response.data));
  
  // Return the data, ensuring it's always an array
  return Array.isArray(response.data) ? response.data : [];
};

//  Fetch Active Sprints
export const fetchActiveSprints = async () => {
  const schemaId = import.meta.env.VITE_ALL_SPRINTS_SCHEMA;
  const url = `https://ig.gov-cloud.ai/pi-entity-instances-service/v2.0/schemas/${schemaId}/instances/list?size=1000`;

  const response = await axios.post(
    url,
    { dbType: 'TIDB',
       filter: {} },
    { headers:headers }
  );

  // console.log('🔍 Active Sprints API response:', response.data);
  // console.log('🔍 Active Sprints API response type:', typeof response.data);
  // console.log('🔍 Active Sprints API response is array:', Array.isArray(response.data));
  
  // Return the data, ensuring it's always an array
  return Array.isArray(response.data) ? response.data : [];
};
export const fetchUser = async (id = 1) => {
  const response = await api.get(`/users/${id}`);
  return response.data;
};

//  Optional: Dummy API for posts
export const fetchPosts = async () => {
  const response = await api.get('/posts?_limit=5');
  return response.data;
};

//  Mock sprints for demo
export const fetchSprints = async () => {
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
    const numAssignees = Math.floor(Math.random() * 7) + 2;
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
