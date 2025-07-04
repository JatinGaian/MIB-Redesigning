import React from 'react';
import SprintInfo from '../components/sprint_view_component/sprint_info';
import RecentActivityCard from '../components/sprint_view_component/recent_activity';
import SprintStories from '../components/sprint_view_component/sprint_stories';

export default function SprintViewPage() {
  return (
    <div className="w-full p-[2vh] space-y-[2vh]">
      <SprintInfo />
      <div style={{ display: 'flex', flexDirection: 'row', gap: '2vw', justifyContent: 'start' }}>
        <div style={{ width: '111vw' }}>
          <RecentActivityCard />
        </div>
        <div style={{ display: 'flex', flexDirection: 'row', gap: '2vw', justifyContent: 'end' }}>
          
        </div>
        <div style={{ width: '66vw' }}>
          <SprintStories />
        </div>
      </div>
    </div>
  );
}
