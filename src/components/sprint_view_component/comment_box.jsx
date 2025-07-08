import React, { useState } from "react";
import { ChevronDown, ChevronUp } from "lucide-react";
import { format } from "date-fns";

const CommentBox = () => {
  const [isExpanded, setIsExpanded] = useState(false);

  const comments = [
    {
      id: 1,
      author: "MB",
      text: "Please review the last update",
      timestamp: new Date("2025-07-07T15:11:07"),
    },
    {
      id: 2,
      author: "AA",
      text: "Test cases need to be added before pushing",
      timestamp: new Date("2025-07-06T12:42:10"),
    },
    {
      id: 3,
      author: "VK",
      text: "Completed implementation of API logic",
      timestamp: new Date("2025-07-05T17:09:33"),
    },
  ];

  return (
    <div className="bg-white rounded-xl shadow-md w-full border px-[2vh] py-[2vh]">
      {/* Header */}
      <div
        className="flex justify-between items-center cursor-pointer"
        onClick={() => setIsExpanded(!isExpanded)}
      >
        <div className="flex items-center gap-[1vw]">
          <div className="bg-[#7C3AED] text-white rounded-full w-[4vh] h-[4vh] flex items-center justify-center text-[1.2vh] font-bold">
            MB
          </div>
          <h2 className="text-[1rem] sm:text-[1.1vw] font-bold">Comments</h2>
        </div>
        {isExpanded ? (
          <ChevronUp className="text-gray-500 w-[2vh] h-[2vh]" />
        ) : (
          <ChevronDown className="text-gray-500 w-[2vh] h-[2vh]" />
        )}
      </div>

      {/* Comment Content */}
      {isExpanded && (
        <div className="mt-[1.5vh] px-[0.5vw] text-[0.9vw] max-h-[12vh] overflow-y-auto space-y-[1vh] scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-gray-100">
          {comments.map((comment, idx) => (
            <div
              key={comment.id}
              className={`pb-[0.8vh] ${
                idx < comments.length - 1 ? "border-b border-gray-200" : ""
              }`}
            >
              <div className="text-[1vw] font-semibold mb-[0.3vh]">{comment.text}</div>
              <p className="text-gray-500 text-[0.8vw]">
                {format(comment.timestamp, "MMM do yyyy, h:mm:ss a")}
              </p>
            </div>
          ))}
          <p className="text-[#7C3AED] underline text-[0.8vw] cursor-pointer">
            See past comments
          </p>
        </div>
      )}
    </div>
  );
};

export default CommentBox;
