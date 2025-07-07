import React from 'react';
import SprintInfo from '../components/sprint_view_component/sprint_info';
import RecentActivityCard from '../components/sprint_view_component/recent_activity';
import SprintStories from '../components/sprint_view_component/sprint_stories';
import Contributors from '../components/sprint_view_component/contributors';
import CommentBox from '../components/sprint_view_component/comment_box';

export default function SprintViewPage() {
  return (
    <div className="w-full p-[2vh] space-y-[2vh]">
      {/* Top sprint info */}
      <SprintInfo />

      {/* First Row: Recent Activity and Sprint Stories */}
      <div className="flex gap-[2vw] w-full">
        <div className="w-[41vw]" >
          <RecentActivityCard />
        </div>
        <div className="flex-1">
          <SprintStories />
        </div>
      </div>

      {/* Second Row: Contributors occupying 50% width */}
      <div className="w-[41vw]">
        <Contributors />
      </div>
      <div className="w-[41vw]">
  <CommentBox />
</div>
    </div>
    
  );
}
