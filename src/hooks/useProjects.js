// // src/hooks/useProjects.js
// import { useEffect } from 'react';
// import axios from 'axios';
// import { useApiDataStore } from '../stores/apiDataStore';

// const Bearer_token_for_MIB = import.meta.env.VITE_Bearer_token_for_MIB;
// const schemaId = import.meta.env.VITE_PROJECTS_LEADS_SCHEMA;

// export const useProjects = () => {
//   const { setProjects } = useApiDataStore();

//   useEffect(() => {
//     const fetchProjects = async () => {
//       const url = `https://ig.gov-cloud.ai/pi-entity-instances-service/v2.0/schemas/${schemaId}/instances/list?size=1000`;

//       try {
//         const response = await axios.post(
//           url,
//           {
//             dbType: 'TIDB',
//             filter: {},
//           },
//           {
//             headers: {
//               'Content-Type': 'application/json',
//               'Authorization': `Bearer ${Bearer_token_for_MIB}`,
//             },
//           }
//         );

//         console.log('API response:', response.data);
//         setProjects(response?.data || []);
//       } catch (error) {
//         console.error('Failed to fetch projects:', error.response?.data || error.message);
//       }
//     };

//     fetchProjects();
//   }, [setProjects]);
// };

// // src/hooks/useProjects.js
// // import { useQuery } from '@tanstack/react-query';
// // import { fetchProjects } from '../services/api';

// // export const useProjects = () => {
// //   const query = useQuery({
// //     queryKey: ['projects'],
// //     queryFn: fetchProjects,
// //   });

// //   return query; // gives { data, isLoading, error, ... }
// // };

// src/hooks/useProjects.js
import { useQuery } from '@tanstack/react-query';
import { fetchProjects } from '../services/api';
import { useApiDataStore } from '../stores/apiDataStore';

export const useProjects = () => {
  const setProjects = useApiDataStore((state) => state.setProjects);

  return useQuery({
    queryKey: ['projects'],
    queryFn: fetchProjects,
    onSuccess: (data) => {
      console.log('✅ Projects fetched:', data);
      setProjects(data); // ✅ Save to Zustand store
    },
    onError: (error) => {
      console.error('❌ Error fetching projects:', error);
    },
  });
};

