import React, { useState } from "react";
import { Maximize2, Minimize2 } from "lucide-react";

const RecentActivityCard = () => {
  const [isMaximized, setIsMaximized] = useState(false);

  const activities = [
    { id: 1, user: "Jatin", action: "changed the Assignee to Jatin", task: "MIB-39: Historic sprint data should be stored in hudi & Queried upon", status: "TO DO", time: "about 23 hours ago" },
    { id: 2, user: "Jatin", action: "changed the Assignee to Aanchal Anand", task: "MIB-39: Historic sprint data should be stored in hudi & Queried upon", status: "TO DO", time: "about 23 hours ago" },
    { id: 3, user: "Jatin", action: 'updated field "Sprint"', task: "MIB-39: Historic sprint data should be stored in hudi & Queried upon", status: "TO DO", time: "about 23 hours ago" },
    { id: 4, user: "Prasad Barde", action: 'updated field "status"', task: "MIB-427: As a user, I would like to respond to comments and send rewards to particular individuals", status: "IN PROGRESS", time: "1 day ago" },
    { id: 5, user: "Prasad Barde", action: "changed the Assignee to Prasad Barde", task: "MIB-427: As a user, I would like to respond to comments and send rewards to particular individuals", status: "IN PROGRESS", time: "1 day ago" },
    { id: 6, user: "Prasad Barde", action: "changed the Assignee to Abhishek Kumar", task: "MIB-427: As a user, I would like to respond to comments and send rewards to particular individuals", status: "IN PROGRESS", time: "1 day ago" },
  ];

  return (
    <>
      {isMaximized && (
        <div className="fixed inset-0 bg-black/30 z-40" onClick={() => setIsMaximized(false)} />
      )}

      <div
        className={`bg-white rounded-xl shadow-lg border transition-all z-50 overflow-hidden flex flex-col
          ${isMaximized
            ? "fixed top-[10vh] left-1/2 -translate-x-1/2 w-[90vw] md:w-[70vw] h-[75vh]"
            : "h-[30vh] w-full"
          }`}
      >
        {/* Header */}
        <div className="sticky top-0 bg-white px-[1vh] py-[1.2vh] flex justify-between items-start border-b border-gray-200">
          <div>
            <h2 className="text-[1rem] sm:text-[1.1vw] font-bold">Recent activity</h2>
            <p className="text-[0.9rem] sm:text-[0.9vw] text-gray-600">
              Stay up to date with what's happening across the project.
            </p>
          </div>
          <button onClick={() => setIsMaximized(!isMaximized)} className="text-gray-500 hover:text-black">
            {isMaximized ? <Minimize2 size="1.5vw" /> : <Maximize2 size="1.5vw" />}
          </button>
        </div>

        {/* Scrollable content */}
        <div className="overflow-y-auto px-[1vh] py-[1vh] space-y-[1.5vh] h-full scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-gray-100">
          {activities.map((activity) => (
            <div key={activity.id} className="flex items-start gap-[1vw]">
              <div className="w-[2.5vw] aspect-square rounded-full bg-blue-600 text-white flex items-center justify-center text-[0.8vw] font-bold">
                {activity.user
                  .split(" ")
                  .map((n) => n[0])
                  .join("")}
              </div>
              <div className="text-[0.9vw]">
                <p>
                  <span className="font-semibold">{activity.user}</span> {activity.action} on{" "}
                  <span className="text-blue-600 underline cursor-pointer">{activity.task}</span>{" "}
                  <span className="inline-block bg-gray-100 border px-[0.4vw] py-[0.2vh] rounded-[0.3vh] text-[0.65vw] ml-[0.5vw]">
                    {activity.status}
                  </span>
                </p>
                <p className="text-gray-500 text-[0.75vw]">{activity.time}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default RecentActivityCard;
