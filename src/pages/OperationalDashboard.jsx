// pages/OperationalDashboard.jsx
import React from 'react';
import SprintCard from '../components/Operational_dashboard_component/sprintCard';
import InfiniteScrolling from '../components/infinite_scrolling';

const OperationalDashboard = () => {
  const sprintData = [1, 2, 3, 4];

  return (
    <div className="p-4">
      <InfiniteScrolling />
    </div>
  );
};

export default OperationalDashboard;
