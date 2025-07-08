import React, { useEffect } from 'react';
import { useApiDataStore } from '../stores/apiDataStore';

const ApiFetch = () => {
  const { projects, issues, sprints, boards } = useApiDataStore();

  useEffect(() => {
    console.log('Projects:', projects);
    console.log('Issues:', issues);
    console.log('Sprints:', sprints);
    console.log('Boards:', boards);
  }, [projects, issues, sprints, boards]);

  return <div>Check the console for fetched data.</div>;
};

export default ApiFetch; 