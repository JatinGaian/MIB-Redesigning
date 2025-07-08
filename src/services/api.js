// src/api/api.js
import axios from 'axios';
import { useQuery } from '@tanstack/react-query';
import { useApiDataStore } from '../stores/apiDataStore';
const Bearer_token_for_MIB = import.meta.env.VITE_Bearer_token_for_MIB
const headers = {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${Bearer_token_for_MIB}`  // Set the token correctly in the headers
        };


const api = axios.create({
  baseURL: 'https://jsonplaceholder.typicode.com', // used only for dummy fallback
  timeout: 5000,
});

// Utility fetcher
const fetcher = async (schemaId) => {
  const url = `https://ig.gov-cloud.ai/pi-entity-instances-service/v2.0/schemas/${schemaId}/instances/list?size=1000`
  try {
    const response = await axios.post(url,
    {
      headers:headers
    }
  );
console.log("fetcher function data",response?.data)
  return response.data;
  } catch (error) {
    console.log(error);
    
  }
};

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

export const fetchProjects = async (schemaId) => {
  console.log("inside fetch project");
  
  const url = `https://ig.gov-cloud.ai/pi-entity-instances-service/v2.0/schemas/${schemaId}/instances/list?size=1000`
  const response = await  axios.post(url,
    {
      headers:headers
    })
  return response.data;
};


//  Custom hook to fetch & store all 4 entities in Zustand
export const useFetchAllData = () => {
  console.log("insde usefetc all data");
  
  const setAllData = useApiDataStore((state) => state.setAllData);

  // Projects
  useQuery({
    queryKey: ['projects'],
    queryFn: () => fetcher(import.meta.env.VITE_PROJECTS_LEADS_SCHEMA),
    
  });

  // Boards
  useQuery({
    queryKey: ['boards'],
    queryFn: () => fetcher(import.meta.env.VITE_ALL_BOARDS_SCHEMA),
    onSuccess: (data) => {
      console.log("✅ Boards:", data);
      setAllData('boards', data);
    },
    onError: (err) => console.error(" Boards fetch error:", err),
  });

  // Sprints
  useQuery({
    queryKey: ['sprints'],
    queryFn: () => fetcher(import.meta.env.VITE_ALL_SPRINTS_SCHEMA),
    onSuccess: (data) => {
      console.log("✅ Sprints:", data);
      setAllData('sprints', data);
    },
    onError: (err) => console.error(" Sprints fetch error:", err),
  });

  // Issues
  useQuery({
    queryKey: ['issues'],
    queryFn: () => fetcher(import.meta.env.VITE_ALL_ISSUES_SCHEMA),
    onSuccess: (data) => {
      console.log("✅ Issues:", data);
      setAllData('issues', data);
    },
    onError: (err) => console.error("❌ Issues fetch error:", err),
  });
};

// 🔁 Optional: Mock sprints for demo purposes
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
