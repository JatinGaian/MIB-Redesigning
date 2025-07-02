import React from 'react';
import SprintCard from '../components/Operational_dashboard_component/sprintCard';

const cards = Array.from({ length: 6 }); // Number of unique cards

const InfiniteScrolling = () => {
  return (
    <div className="relative w-full max-w-[96vw] mx-auto overflow-hidden px-[2vw]">
      <div
        className="flex items-center gap-[2vw]"
        style={{
          animation: 'scroll-left 30s linear infinite',
          width: 'max-content',
        }}
      >
        {[...cards, ...cards].map((_, idx) => (
          <SprintCard key={idx} />
        ))}
      </div>

      {/* Animation Keyframes */}
      <style>{`
        @keyframes scroll-left {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }

        /* Hide scrollbars globally for this component */
        ::-webkit-scrollbar {
          display: none;
        }
      `}</style>
    </div>
  );
};

export default InfiniteScrolling;
