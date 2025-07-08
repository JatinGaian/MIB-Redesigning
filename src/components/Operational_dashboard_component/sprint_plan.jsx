import React from 'react';
import { Clock, CheckCircle } from 'lucide-react';

export default function SprintPlan() {
  return (
      <div className="bg-white rounded-xl shadow-md p-[3vh] w-full ">
        {/* Header Row: Title left, Filters right */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-[2vh] mb-[2vh]">
          <span className="text-[2.7vh] font-semibold text-gray-800 flex items-center gap-[0.4vw]">
            <svg
              className="w-[1.8vh] h-[1.8vh] text-purple-600"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M9 17v-4H5v4h4zm0 0h6m-6 0v4m6-4v4m0 0h4v-4h-4zM9 5V3H5v2h4zm0 0h6m-6 0v2m6-2v2m0 0h4V3h-4z"
              />
            </svg>
            Sprint Plan
          </span>

          <div className="flex gap-[0.8vw] flex-wrap">
            <span className="bg-indigo-50 text-indigo-600 px-[1vw] py-[0.5vh] rounded-full text-[1.5vh] font-semibold">
              All Actions
            </span>

            <span className="bg-gray-100 text-gray-700 px-[1vw] py-[0.5vh] rounded-full text-[1.5vh] font-semibold flex items-center gap-[0.4vw]">
              <Clock className="w-[1.4vh] h-[1.4vh]" />
              Slightly delayed
              <span className="bg-white rounded-full px-[0.4vw] text-[1.4vh] font-bold">3</span>
            </span>

            <span className="bg-blue-100 text-blue-700 px-[1vw] py-[0.5vh] rounded-full text-[1.5vh] font-semibold flex items-center gap-[0.4vw]">
              <Clock className="w-[1.4vh] h-[1.4vh]" />
              In Progress
              <span className="bg-white rounded-full px-[0.4vw] text-[1.4vh] font-bold">1</span>
            </span>

            <span className="bg-green-100 text-green-700 px-[1vw] py-[0.5vh] rounded-full text-[1.5vh] font-semibold flex items-center gap-[0.4vw]">
              <CheckCircle className="w-[1.4vh] h-[1.4vh]" />
              On Track
              <span className="bg-white rounded-full px-[0.4vw] text-[1.4vh] font-bold">0</span>
            </span>
          </div>
        </div>
      </div>
  );
}
