import React from 'react';
import PeopleAvatar from "../resuable_components/people_avatar";
import manIcon from "../../assets/avatar_icons/man.png";
import womanIcon from "../../assets/avatar_icons/woman.png";
import gamerIcon from "../../assets/avatar_icons/gamer.png";

const avatarMap = {
  man: manIcon,
  woman: womanIcon,
  gamer: gamerIcon,
};

const SprintCard = ({ name, goal, progress, assignees, stories, dateRange, status }) => {
  return (
    <div className="bg-white/70 backdrop-blur-md rounded-2xl shadow-xl w-[20vw] border border-gray-200 transition-transform duration-200 hover:scale-105 overflow-hidden p-[1.2vh]">
      {/* Gradient Header */}
      <div className="bg-gradient-to-r from-blue-200 via-sky-100 to-gray-100 p-[0.7vh] rounded-t-2xl w-full">
        <div className="flex justify-between items-start w-full min-w-0">
         
          <div className="flex items-center gap-[0.5vw] min-w-0">
            <div className="bg-white/80 p-[0.4vh] rounded-full flex items-center justify-center shadow-md">
              <svg width="2vw" height="2vw" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                <rect x="4" y="4" width="20" height="22" rx="3" fill="#F3F4F6" />
                <polyline points="8,20 14,14 18,18 24,10" fill="none" stroke="#22C55E" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                <circle cx="8" cy="20" r="1.2" fill="#22C55E" />
                <circle cx="14" cy="14" r="1.2" fill="#22C55E" />
                <circle cx="18" cy="18" r="1.2" fill="#22C55E" />
                <circle cx="24" cy="10" r="1.2" fill="#22C55E" />
              </svg>
            </div>
            <div className="min-w-0">
              <h2 className="text-[1vw] font-bold truncate">{name}</h2>
              <p className="text-gray-500 text-[0.9vw] font-bold truncate">{goal}</p>
            </div>
          </div>

        
          <div className="text-[0.6vw] font-semibold text-blue-600 bg-blue-100 px-[0.6vw] py-[0.2vw] rounded-full whitespace-nowrap flex items-center gap-1 mt-[0.3vh]">
            <span className="w-1.5 h-1.5 bg-green-500 rounded-full inline-block"></span>
            {status}
          </div>
        </div>
      </div>

      {/* Card Body */}
      <div className="p-[1.5vh]">
        <p className="text-[1.4vh] text-gray-700 mb-[0.7vh] font-bold tracking-wide">{dateRange}</p>

        <div className="mb-[1.5vh]">
          <div className="flex justify-between items-center mb-[0.3vh]">
            <span className="text-[1.2vh] text-gray-600 font-bold">Sprint Progress</span>
            <span className="text-[1.2vh] text-green-700 font-extrabold">{progress}%</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-[0.3vh] overflow-hidden">
            <div
              className="bg-gradient-to-r from-green-400 to-green-600 h-[0.5vh] rounded-full animate-pulse"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>

        <div className="border-t border-gray-100 my-[1vh]"></div>

        {/* Footer */}
        <div className="flex flex-col justify-between items-center text-[1.5vh]">
          {/* Labels */}
          <div className="flex w-full justify-between items-center">
            <span className="text-gray-800 font-bold">Stories</span>
            <span className="text-gray-700 font-bold">Assignees</span>
          </div>

          {/* Values */}
          <div className="flex w-full justify-between items-center mt-1">
            <span className="px-[0.8vw] py-[0.5vh] bg-gradient-to-r from-gray-100 to-gray-200 rounded-full text-gray-800 shadow-sm text-[1.2vh]">
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
