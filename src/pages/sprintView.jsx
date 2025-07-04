import React from 'react';
import SprintInfo from '../components/sprint_view_component/sprint_info';
import RecentActivityCard from '../components/sprint_view_component/recent_activity';

export default function SprintViewPage() {
  return (
    <div className="w-full p-[2vh] space-y-[2vh]">
      <SprintInfo />
      <RecentActivityCard /> 
    </div>
  );
}
