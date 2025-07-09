// // src/hooks/useBoards.js
// import { useEffect } from 'react';
// import axios from 'axios';
// import { useApiDataStore } from '../stores/apiDataStore';

// const Bearer_token_for_MIB = import.meta.env.VITE_Bearer_token_for_MIB;
// const schemaId = import.meta.env.VITE_ALL_BOARDS_SCHEMA;

// export const useBoards = () => {
//   const { setBoards } = useApiDataStore();

//   useEffect(() => {
//     const fetchBoards = async () => {
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

//         console.log('Boards API response:', response.data);
//         setBoards(response?.data || []);
//       } catch (error) {
//         console.error('Failed to fetch boards:', error.response?.data || error.message);
//       }
//     };

//     fetchBoards();
//   }, [setBoards]);
// };
// src/hooks/useBoards.js
import { useQuery } from '@tanstack/react-query';
import { fetchBoards } from '../services/api';
import { useApiDataStore } from '../stores/apiDataStore';

export const useBoards = () => {
  const setBoards = useApiDataStore((state) => state.setBoards);

  return useQuery({
    queryKey: ['boards'],
    queryFn: fetchBoards,
    onSuccess: (data) => {
      console.log(' Boards fetched:', data);
      setBoards(data); // ✅ Set in Zustand
       console.log(' Zustand after setBoards:', useApiDataStore.getState().boards);
    },
    onError: (error) => {
      console.error('❌ Failed to fetch boards:', error);
    },
  });
};

