
// import { useEffect } from 'react';
// import axios from 'axios';
// import { useApiDataStore } from '../stores/apiDataStore';

// const Bearer_token_for_MIB = import.meta.env.VITE_Bearer_token_for_MIB;
// const schemaId = import.meta.env.VITE_ALL_ISSUES_SCHEMA;

// export const useIssues = () => {
//   const { setIssues } = useApiDataStore();

//   useEffect(() => {
//     const fetchIssues = async () => {
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

//         console.log('Issues API response:', response.data);
//         setIssues(response?.data || []);
//       } catch (error) {
//         console.error('Failed to fetch issues:', error.response?.data || error.message);
//       }
//     };

//     fetchIssues();
//   }, [setIssues]);
// };

// src/hooks/useIssues.js
import { useQuery } from '@tanstack/react-query';
import { fetchIssues } from '../services/api';
import { useApiDataStore } from '../stores/apiDataStore';

export const useIssues = () => {
  const setIssues = useApiDataStore((state) => state.setIssues);

  return useQuery({
    queryKey: ['issues'],
    queryFn: fetchIssues,
    onSuccess: (data) => {
      console.log('✅ Issues fetched:', data);
      setIssues(data); // ✅ Update Zustand store
    },
    onError: (error) => {
      console.error('❌ Error fetching issues:', error);
    },
  });
};

