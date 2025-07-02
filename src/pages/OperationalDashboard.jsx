// pages/OperationalDashboard.jsx
import React from 'react';
import SprintCard from '../components/Operational_dashboard_component/sprintCard';
import InfiniteScrolling from '../components/infinite_scrolling';

const OperationalDashboard = () => {
  const sprintData = [1, 2, 3, 4];

  return (
    <div className="w-[100vw] h-[100vh] bg-white flex items-start justify-center">
      <InfiniteScrolling duration={25}>
        {sprintData.map((_, i) => (
          <div key={i} className="inline-block mx-[1vw]">
            <SprintCard />
          </div>
        ))}
      </InfiniteScrolling>
    </div>
  );
};

export default OperationalDashboard;
