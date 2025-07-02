import React from 'react';
import PeopleAvatar from "../resuable_components/people_avatar";
import manIcon from "../../assets/avatar_icons/man.png";
import womanIcon from "../../assets/avatar_icons/woman.png";
import gamerIcon from "../../assets/avatar_icons/gamer.png";


const SprintCard = () => {
  const progressPercent = 20;

  return (
    <div className="relative bg-white/70 backdrop-blur-md rounded-2xl shadow-xl w-full max-w-[20vw] border border-gray-200 transition-transform duration-200 hover:scale-105 overflow-hidden p-[1.2vh]">
      {/* Gradient Header */}
      <div className="bg-gradient-to-r from-blue-200 via-sky-100 to-gray-100 p-[0.7vh] flex items-center gap-[0.5vw] rounded-t-2xl">
        <div className="bg-white/80 p-[0.4vh] rounded-full flex items-center justify-center shadow-md">
          <svg width="3vw" height="3vw" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
            <rect x="4" y="4" width="24" height="24" rx="4" fill="#F3F4F6" />
            <polyline points="8,20 14,14 18,18 24,10" fill="none" stroke="#22C55E" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
            <circle cx="8" cy="20" r="1.5" fill="#22C55E" />
            <circle cx="14" cy="14" r="1.5" fill="#22C55E" />
            <circle cx="18" cy="18" r="1.5" fill="#22C55E" />
            <circle cx="24" cy="10" r="1.5" fill="#22C55E" />
          </svg>
        </div>
        <div>
          <h2 className="text-[2.2vh] font-extrabold text-gray-800 drop-shadow-sm tracking-wide leading-tight">MIB SPRINT</h2>
          <p className="text-[1.3vh] text-gray-500 font-semibold leading-tight">Sprint Goal</p>
        </div>
        <div className="flex-1 flex justify-end">
          <span className="text-[1.3vh] bg-blue-100 text-blue-700 px-[0.8vw] py-[0.4vh] rounded-full flex items-center gap-[0.4vw] shadow-sm font-bold">
            <span className="w-[0.7vw] h-[0.7vw] bg-green-500 rounded-full inline-block"></span>
            On Track
          </span>
        </div>
      </div>

      {/* Card Body */}
      <div className="p-[1.5vh]">
        <p className="text-[1.4vh] text-gray-700 mb-[0.7vh] font-bold tracking-wide">20 July – 26 July</p>

        <div className="mb-[1.5vh]">
          <div className="flex justify-between items-center mb-[0.3vh]">
            <span className="text-[1.2vh] text-gray-600 font-bold">Sprint Progress</span>
            <span className="text-[1.2vh] text-green-700 font-extrabold">{progressPercent}%</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-[0.7vh] overflow-hidden">
            <div className="bg-gradient-to-r from-green-400 to-green-600 h-[0.7vh] rounded-full animate-pulse" style={{ width: `${progressPercent}%` }} />
          </div>
        </div>

        <div className="border-t border-gray-100 my-[1vh]"></div>

        {/* Footer */}
        <div className="flex justify-between items-center text-[1.5vh]">
          {/* Stories */}
          <div className="flex flex-col items-center gap-[0.3vh]">
            <span className="text-gray-800 font-bold">Stories</span>
            <span className="px-[1vw] py-[0.5vh] bg-gradient-to-r from-gray-100 to-gray-200 rounded-full text-gray-800 shadow-sm text-[1.5vh]">
              2/10
            </span>
          </div>

          {/* ✅ Assignees with PeopleAvatar */}
          <div className="flex flex-col items-center gap-[0.3vh]">
            <span className="text-gray-700 font-bold">Assignees</span>
            <PeopleAvatar
              people={[
                { name: 'vishwas', image: manIcon },
                { name: 'maya', image: womanIcon },
                { name: 'prasad', image: gamerIcon },
                { name: 'prasad', image: gamerIcon },
                { name: 'prasad', image: gamerIcon },
                { name: 'prasad', image: gamerIcon },
                { name: 'prasad', image: gamerIcon },
                { name: 'prasad', image: gamerIcon },
                { name: 'prasad', image: gamerIcon },// this makes +1 visible
                { name: 'prasad', image: gamerIcon },// this makes +1 visible
                { name: 'prasad', image: gamerIcon },// this makes +1 visible
                { name: 'prasad', image: gamerIcon },// this makes +1 visible
                { name: 'prasad', image: gamerIcon },// this makes +1 visible
                { name: 'prasad', image: gamerIcon },// this makes +1 visible
                { name: 'prasad', image: gamerIcon },// this makes +1 visible
                { name: 'prasad', image: gamerIcon },// this makes +1 visible
                { name: 'prasad', image: gamerIcon },// this makes +1 visible
                { name: 'prasad', image: gamerIcon },// this makes +1 visible
              ]}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default SprintCard;
