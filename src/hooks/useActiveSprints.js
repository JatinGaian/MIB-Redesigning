// // src/hooks/useActiveSprints.js
// import { useEffect } from 'react';
// import axios from 'axios';
// import { useApiDataStore } from '../stores/apiDataStore';

// const Bearer_token_for_MIB = import.meta.env.VITE_Bearer_token_for_MIB;
// const schemaId = import.meta.env.VITE_ALL_SPRINTS_SCHEMA;

// export const useActiveSprints = () => {
//   const { setSprints } = useApiDataStore();

//   useEffect(() => {
//     const fetchSprints = async () => {
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

//         console.log('Active Sprints API response:', response.data);
//         setSprints(response?.data || []);
//       } catch (error) {
//         console.error('Failed to fetch sprints:', error.response?.data || error.message);
//       }
//     };

//     fetchSprints();
//   }, [setSprints]);
// };

// // src/hooks/useActiveSprints.js
// // import { useQuery } from '@tanstack/react-query';
// // import { fetchActiveSprints } from '../services/api';

// // export const useActiveSprints = () => {
// //   return useQuery({
// //     queryKey: ['active-sprints'],
// //     queryFn: fetchActiveSprints,
// //   });
// // };

// src/hooks/useActiveSprints.js
import { useQuery } from '@tanstack/react-query';
import { fetchActiveSprints } from '../services/api';
import { useApiDataStore } from '../stores/apiDataStore';

export const useActiveSprints = () => {
  const setSprints = useApiDataStore((state) => state.setSprints);

  return useQuery({
    queryKey: ['active-sprints'],
    queryFn: fetchActiveSprints,
    onSuccess: (data) => {
      console.log('✅ Active Sprints fetched:', data);
      setSprints(data); // ✅ Store in Zustand
    },
    onError: (err) => {
      console.error('❌ Error fetching active sprints:', err);
    },
  });
};

