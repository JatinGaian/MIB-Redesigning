import React, { useEffect } from 'react';
import SprintCard from '../components/Operational_dashboard_component/sprintCard';
import SprintPlan from '../components/Operational_dashboard_component/sprint_plan';
import InfiniteScrolling from '../components/infinite_scrolling';
import { useSprints } from '../hooks/useSprints';
import { useSprintStore } from '../stores/sprintStore';
import DependencyFlowChart from '../components/dependancyflowchart';
import GanttChart from '../components/Ganttchart';

const OperationalDashboard = () => {
  const { data: sprints, isLoading, isError } = useSprints();
  const setSprints = useSprintStore((state) => state.setSprints);

  useEffect(() => {
    if (sprints) setSprints(sprints);
  }, [sprints, setSprints]);


  if (isLoading) return <div>Loading sprints...</div>;
  if (isError) return <div>Error loading sprints.</div>;

  return (
    <div className="w-full h-full bg-white]">
      {/* Sprint Plan at top */}
      <SprintPlan />

      {/* Sprint Cards below */}
      <div className="mt-[3vh] flex justify-center">
        <InfiniteScrolling sprints={sprints} />
      </div>
      {/* <DependencyFlowChart/> */}
      
    </div>
  );
};

export default OperationalDashboard;
