import React from 'react';
import PeopleAvatar from "../resuable_components/people_avatar";
import manIcon from "../../assets/avatar_icons/man.png";
import womanIcon from "../../assets/avatar_icons/woman.png";
import gamerIcon from "../../assets/avatar_icons/gamer.png";
import BackgroundEffect from './background_effect';

const avatarMap = {
  man: manIcon,
  woman: womanIcon,
  gamer: gamerIcon,
};

const SprintCard = ({ name, goal, progress, assignees, stories, dateRange, status }) => {
  return (
    <div className="bg-[#1C1C1E] text-white backdrop-blur-md rounded-xl shadow-lg shadow-black/30 w-[20vw] transition-transform duration-200 hover:scale-105 overflow-hidden p-[1.2vh] relative">
      {/* Header */}
      <div className="bg-transparent p-[0.7vh] rounded-t-xl w-full">
        <div className="flex justify-between items-start w-full min-w-0">
         
          <div className="flex items-center gap-[0.5vw] min-w-0">
            <div className="bg-[#2D2D2D] p-[0.4vh] rounded-full flex items-center justify-center shadow-md">
              <svg width="2vw" height="2vw" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                <rect x="4" y="4" width="20" height="22" rx="3" fill="#2D2D2D" />
                <polyline points="8,20 14,14 18,18 24,10" fill="none" stroke="#A755F7" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                <circle cx="8" cy="20" r="1.2" fill="#A755F7" />
                <circle cx="14" cy="14" r="1.2" fill="#A755F7" />
                <circle cx="18" cy="18" r="1.2" fill="#A755F7" />
                <circle cx="24" cy="10" r="1.2" fill="#A755F7" />
              </svg>
            </div>
            <div className="min-w-0">
              <h2 className="text-[1vw] font-bold truncate">{name}</h2>
              <p className="text-[#8E8E93] text-[0.9vw] font-bold truncate">{goal}</p>
            </div>
          </div>

        
          <div className="text-[0.7vw] font-semibold text-white bg-green-500 px-[0.8vw] py-[0.3vw] rounded-full whitespace-nowrap">
            {status}
          </div>
        </div>
      </div>

      {/* Card Body */}
      <div className="p-[1.5vh]">
        <p className="text-[1.4vh] text-white mb-[0.7vh] font-bold tracking-wide">{dateRange}</p>

        <div className="mb-[1.5vh] pt-1 relative overflow-visible">
          {/* Top Glow */}
          <BackgroundEffect className="top-0 -left-4 w-[calc(100%+2rem)] h-10 absolute" />
          <span className="text-[1.2vh] text-white font-bold mb-1 block z-10 relative">{progress}% complete</span>
          <div className="relative w-full h-0.5 flex items-center z-10">
            {/* Track */}
            <div className="w-full h-px bg-[#3A3A3C] rounded-full"></div>
            {/* Fill */}
            <div
              className="absolute h-0.5 bg-[#7C3AED] rounded-full"
              style={{
                width: `${progress}%`,
                filter: 'drop-shadow(0 0 10px rgba(124, 58, 237, 0.95))'
              }}
            ></div>
          </div>
          {/* Bottom Glow */}
          <BackgroundEffect className="bottom-0 -left-4 w-[calc(100%+2rem)] h-10 absolute" />
        </div>

        {/* Footer */}
        <div className="flex flex-col justify-between items-center text-[1.5vh] pt-2">
          {/* Labels */}
          <div className="flex w-full justify-between items-center">
            <span className="text-[#8E8E93] font-bold">Stories</span>
            <span className="text-[#8E8E93] font-bold">Assignees</span>
          </div>

          {/* Values */}
          <div className="flex w-full justify-between items-center mt-1">
            <span className="px-[0.8vw] py-[0.5vh] bg-[#2D2D2D] rounded-full text-gray-300 shadow-sm text-[1.2vh]">
              {stories?.done}/{stories?.total}
            </span>
            <PeopleAvatar
              people={assignees?.map(a => ({ ...a, image: avatarMap[a.image] }))}
              className="px-[0.8vw] py-[0.5vh]"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default SprintCard;
