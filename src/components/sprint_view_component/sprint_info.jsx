import React from "react";
import { ArrowUpRight } from "lucide-react";
import qrImage from "../../assets/QR_code.png";

export default function SprintInfo() {
  return (
    <div className="relative bg-slate-50/80 backdrop-blur-md border border-gray-200 shadow-md rounded-3xl p-[1.2vh] flex flex-col md:flex-row justify-between items-start md:items-center transition-all duration-300 hover:shadow-lg hover:border-blue-200 hover:shadow-blue-100 group overflow-hidden min-h-[12vh]">
      {/* Left Text */}
      <div className="space-y-[2.5vh] z-10">
        <h1 className="text-[2.2vh] font-bold text-slate-800 drop-shadow-lg tracking-tight">PROJECT / BOARD / SPRINT NAME / LEAD</h1>
        <p className="text-[2.2vh] font-bold text-blue-700 drop-shadow-sm">SPRINT GOAL</p>
      </div>

      {/* Right Section */}
      <div className="flex flex-col items-end gap-[1vh] z-10">
        {/* QR Code */}
        <div className="bg-white border border-blue-100 rounded-2xl p-[0.3vw] shadow transition-all duration-300 group-hover:shadow-blue-200">
          <img
            src={qrImage}
            alt="QR Code"
            className="w-[3vw] h-[3vw] object-contain"
          />
        </div>

        {/* Metrics Row */}
        <div className="flex gap-[0.5vw]">
          {/* 1. Improvement (Arrow only, green) */}
          <div className="bg-blue-50 rounded-xl px-[0.5vw] py-[0.7vh] flex flex-col items-center w-[3vw] transition-all duration-200 hover:scale-110 hover:shadow-md hover:border-blue-200 border border-transparent cursor-pointer">
            <ArrowUpRight className="text-green-500" />
          </div>

          {/* 2. New Number Box */}
          <div className="bg-blue-50 rounded-xl px-[0.5vw] py-[0.7vh] flex flex-col items-center w-[3vw] transition-all duration-200 hover:scale-110 hover:shadow-md hover:border-blue-200 border border-transparent cursor-pointer">
            <span className="text-base font-bold text-blue-900">12</span>
          </div>

          {/* 3. Today */}
          <div className="bg-blue-50 rounded-xl px-[0.5vw] py-[0.7vh] flex flex-col items-center w-[3vw] transition-all duration-200 hover:scale-110 hover:shadow-md hover:border-blue-200 border border-transparent cursor-pointer">
            <span className="text-base font-bold text-blue-900">5</span>
          </div>

          {/* 4. Scope Change */}
          <div className="bg-blue-50 rounded-xl px-[0.5vw] py-[0.7vh] flex flex-col items-center w-[3vw] transition-all duration-200 hover:scale-110 hover:shadow-md hover:border-blue-200 border border-transparent cursor-pointer">
            <span className="text-base font-bold text-blue-900">8</span>
          </div>

          {/* 5. Success Path */}
          <div className="bg-blue-50 border border-blue-200 rounded-xl px-[0.5vw] py-[0.7vh] flex flex-col items-center w-[3vw] transition-all duration-200 hover:scale-110 hover:shadow-md hover:border-blue-400 cursor-pointer">
            <span className="text-base font-bold text-blue-900">92</span>
          </div>
        </div>
      </div>
    </div>
  );
}