import React from "react";

const SprintStories = () => {
  const stories = [
    {
      id: "MIB-39",
      description: "Historic sprint data should be stored in hudi & Queried upon",
      status: "In Progress",
      assignee: "V",
    },
    {
      id: "MIB-40",
      description: "Backend issue ",
      status: "ToDo",
      assignee: "J",
    },
    {
      id: "MIB-41",
      description: "API issue ",
      status: "In Progress",
      assignee: "K",
    },
  ];

  const statusColors = {
    "ToDo": "text-blue-500 bg-blue-100",
    "In Progress": "text-orange-500 bg-orange-100",
    "Done": "text-green-500 bg-green-100",
    "Code Review": "text-purple-500 bg-purple-100",
  };

  const statusLabels = [
    { label: "ToDo", count: 4 },
    { label: "In Progress", count: 3 },
    { label: "Done", count: 2 },
    { label: "Code Review", count: 3 },
  ];

  return (
    <div className="bg-white rounded-xl shadow-lg border flex flex-col w-[49vw] h-[45vh] px-[1.5vw] py-[1.5vh] overflow-hidden">
      {/* Header */}
      <div className="mb-[1vh]">
        <h2 className="text-[1.2vw] font-bold">Sprint Stories</h2>
      
      </div>

      {/* Status Summary */}
      <div className="flex justify-between items-center mb-[1.5vh]">
        {statusLabels.map((status) => (
          <div key={status.label} className="text-center">
            <div className={`font-bold text-[1vw] ${statusColors[status.label].split(" ")[0]}`}>
              {status.count}
            </div>
            <div className={`text-[0.75vw] ${statusColors[status.label].split(" ")[0]}`}>
              {status.label}
            </div>
          </div>
        ))}
      </div>

      {/* Scrollable Stories */}
      <div className="overflow-y-auto h-full space-y-[1vh] pr-[0.5vw]">
        {stories.map((story) => (
          <div
            key={story.id}
            className="flex items-center bg-gray-50 rounded-[0.7vw] p-[1vw] gap-[1vw]"
          >
            {/* Icon */}
            <div className="w-[2vw] h-[2vw]">
              <svg
                width="100%"
                height="100%"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M5 5V19L12 15L19 19V5C19 3.89543 18.1046 3 17 3H7C5.89543 3 5 3.89543 5 5Z"
                  stroke="#64748B"
                  strokeWidth="1.5"
                  strokeLinejoin="round"
                />
              </svg>
            </div>

            {/* ID and Description */}
            <div className="flex-1 text-[0.9vw]">
              <div className="font-semibold text-[1vw] mb-[0.4vh]">{story.id}</div>
              <div className="text-gray-700">{story.description}</div>
            </div>

            {/* Status */}
            <div
              className={`px-[1vw] py-[0.3vw] rounded-[0.5vw] font-semibold text-[0.8vw] whitespace-nowrap ${statusColors[story.status]}`}
            >
              {story.status}
            </div>

            {/* Assignee Initial */}
            <div className="w-[2vw] h-[2vw] rounded-full bg-blue-600 text-white flex items-center justify-center text-[1vw] font-bold">
              {story.assignee}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SprintStories;
