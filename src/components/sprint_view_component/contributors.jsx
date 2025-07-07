import React, { useState } from "react";
import likeIcon from "../../assets/contributors_icons/like.png";
import dislikeIcon from "../../assets/contributors_icons/dislike.png";
import commentIcon from "../../assets/contributors_icons/comment.png";
import voiceIcon from "../../assets/contributors_icons/voice.png";

const contributors = [
  { name: "Deepak Chitturi", initials: "DE", tasks: "1/1", color: "bg-purple-500" },
  { name: "Aaditya Kandu", initials: "AA", tasks: "15/15", color: "bg-indigo-100 text-black" },
  { name: "Anis Shaikh", initials: "AN", tasks: "8/8", color: "bg-green-500" },
  { name: "prasad", initials: "P", tasks: "6/8", color: "bg-pink-400" },
  { name: "jathin", initials: "J", tasks: "5/6", color: "bg-red-500" },
  { name: "vishwas", initials: "V", tasks: "3/5", color: "bg-blue-500" },
];

const Contributors = () => {
  const [isExpanded, setIsExpanded] = useState(true);
  const [hoveredIndex, setHoveredIndex] = useState(null);

  return (
    <div className="border border-white bg-white rounded-[1vw] w-full p-[1.5vh] shadow-md">
      {/* Header */}
      <div
        onClick={() => setIsExpanded(!isExpanded)}
        className="flex justify-between items-center cursor-pointer mb-[1vh]"
      >
        <h2 className="text-[1rem] sm:text-[1.1vw] font-bold">Contributors</h2>
        <svg
          width="2vh"
          height="2vh"
          viewBox="0 0 24 24"
          stroke="#555"
          className={`transition-transform duration-300 ${isExpanded ? "rotate-180" : ""}`}
        >
          <path
            d="M6 9l6 6 6-6"
            strokeWidth="2"
            fill="none"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </div>

      {/* Contributor List */}
      {isExpanded && (
        <div className="max-h-[10vh] overflow-y-auto pr-[0.5vh] scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-transparent">
          {contributors.map((c, i) => {
            const [done, total] = c.tasks.split("/").map(Number);
            const percent = (done / total) * 100;
            return (
              <div
                key={i}
                onMouseEnter={() => setHoveredIndex(i)}
                onMouseLeave={() => setHoveredIndex(null)}
                className="flex justify-between items-center border-b border-gray-200 pb-[1vh] mb-[1.5vh]"
              >
                {/* Avatar & Name */}
                <div className="flex items-center gap-[1vw]">
                  <div
                    className={`w-[4vh] h-[4vh] rounded-full flex items-center justify-center font-bold text-[1.5vh] ${c.color}`}
                  >
                    {c.initials}
                  </div>
                  <span className="text-[1.8vh] text-gray-800">{c.name}</span>
                </div>

                {/* Task Info or Icons */}
                {hoveredIndex === i ? (
                  <div className="flex items-center gap-[0.8vw]">
                    <img src={likeIcon} alt="like" className="w-[2vh] h-[2vh] cursor-pointer" />
                    <img src={dislikeIcon} alt="dislike" className="w-[2vh] h-[2vh] cursor-pointer" />
                    <img src={commentIcon} alt="comment" className="w-[2vh] h-[2vh] cursor-pointer" />
                    <img src={voiceIcon} alt="voice" className="w-[2vh] h-[2vh] cursor-pointer" />
                  </div>
                ) : (
                  <div className="flex items-center gap-[0.8vw]">
                    {/* Circle Progress Indicator */}
                    <div
                      className="w-[2vh] h-[2vh] rounded-full"
                      style={{
                        background: `conic-gradient(#3B82F6 ${percent}%, #E5E7EB ${percent}% 100%)`,
                      }}
                    ></div>

                    {/* Progress Bar */}
                    <div className="relative bg-gray-200 rounded-[1vh] w-[5vw] h-[2vh] flex items-center justify-center overflow-hidden">
                      <div
                        className="absolute top-0 left-0 h-full bg-blue-500 rounded-[1vh]"
                        style={{ width: `${percent}%` }}
                      />
                      <span className="text-white text-[1.5vh] font-medium z-10">{c.tasks}</span>
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default Contributors;
