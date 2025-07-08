import React from 'react';
import SprintCard from '../components/Operational_dashboard_component/sprintCard';

const InfiniteScrolling = ({ sprints = [] }) => {
  // Duplicate sprints for infinite effect
  const displaySprints = [...sprints, ...sprints];

  return (
    <div className=" w-full overflow-hidden ">
      <div
        className="flex items-start gap-[1vw]"
        style={{
          animation: 'scroll-left 30s linear infinite',
          // width: 'max-content',
        }}
      >
        {displaySprints.map((sprint, idx) => (
          <div key={idx} className="inline-block ">
            <SprintCard {...sprint} />
          </div>
        ))}
      </div>

      {/* Animation Keyframes */}
      <style>{`
        // @keyframes scroll-left {
        //   0% { transform: translateX(0); }
        //   100% { transform: translateX(-50%); }
        // }

        /* Hide scrollbars globally for this component */
        ::-webkit-scrollbar {
          display: none;
        }
      `}</style>
    </div>
  );
};

export default InfiniteScrolling;
