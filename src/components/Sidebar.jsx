import React, { useState } from 'react';
import { useSidebarStore } from '../stores/sidebarStore';
import operationalIcon from '../assets/sidebar_icons/operational_dashboard.png';
import profileIcon from '../assets/sidebar_icons/profile.png';
import reportIcon from '../assets/sidebar_icons/report_view.png';
import sprintIcon from '../assets/sidebar_icons/sprint_view.png';

const navItems = [
  { key: 'operational', icon: operationalIcon, alt: 'Operational Dashboard' },
  { key: 'profile', icon: profileIcon, alt: 'Profile' },
  { key: 'report', icon: reportIcon, alt: 'Report View' },
  { key: 'sprint', icon: sprintIcon, alt: 'Sprint View' },
];

export default function Sidebar() {
  const { selected, setSelected } = useSidebarStore();
  const [hovered, setHovered] = useState(false);

  return (
    <>
      {/* Desktop Hover Sidebar with Highlighted Icons */}
      <div className="hidden md:block fixed top-0 left-0 h-[100vh] z-30">
        {/* Hover area */}
        <div
          className="absolute left-0 top-0 h-[100vh] w-[0.7vw] cursor-pointer z-40"
          onMouseEnter={() => setHovered(true)}
          onMouseLeave={() => setHovered(false)}
        />
        {/* Sidebar */}
        <div
          className={`h-[100vh] w-[3.5vw] min-w-[3vw] bg-gradient-to-b from-blue-600 to-blue-400 flex flex-col items-center py-[2vh] shadow-lg transition-transform duration-300 ease-in-out z-50 ${hovered ? 'translate-x-0' : '-translate-x-full'}`}
          onMouseEnter={() => setHovered(true)}
          onMouseLeave={() => setHovered(false)}
          style={{ position: 'absolute', left: 0, top: 0 }}
        >
          <nav className="flex flex-col gap-[4vh] w-full items-center mt-[6vh]">
            {navItems.map(item => (
              <button
                key={item.key}
                className={`flex items-center justify-center w-[2.2vw] h-[2.2vw] rounded-lg transition-all duration-200 bg-transparent focus:outline-none
                  ${selected === item.key ? 'ring-2 ring-blue-300 scale-110 shadow-[0_4px_20px_0_rgba(59,130,246,0.4)] bg-white bg-opacity-30' : 'hover:bg-white hover:bg-opacity-10'}`}
                onClick={() => setSelected(item.key)}
                aria-label={item.alt}
                style={{ transition: 'box-shadow 0.3s, transform 0.2s' }}
              >
                <img src={item.icon} alt={item.alt} className={`w-[1.5vw] h-[1.5vw] object-contain ${selected === item.key ? 'drop-shadow-[0_2px_8px_rgba(59,130,246,0.5)]' : ''}`} />
              </button>
            ))}
          </nav>
        </div>
      </div>
      {/* Mobile Topbar with Highlighted Icons */}
      <div className="flex md:hidden w-[100vw] h-[8vh] bg-gradient-to-r from-blue-600 to-blue-400 items-center px-[2vw] shadow-lg">
        <nav className="flex gap-[4vw] w-full justify-around">
          {navItems.map(item => (
            <button
              key={item.key}
              className={`flex items-center justify-center w-[4vw] h-[4vw] rounded-lg transition-all duration-200 bg-transparent focus:outline-none
                ${selected === item.key ? 'ring-2 ring-blue-300 scale-110 shadow-[0_4px_20px_0_rgba(59,130,246,0.4)] bg-white bg-opacity-30' : 'hover:bg-white hover:bg-opacity-10'}`}
              onClick={() => setSelected(item.key)}
              aria-label={item.alt}
              style={{ transition: 'box-shadow 0.3s, transform 0.2s' }}
            >
              <img src={item.icon} alt={item.alt} className={`w-[2.5vw] h-[2.5vw] object-contain ${selected === item.key ? 'drop-shadow-[0_2px_8px_rgba(59,130,246,0.5)]' : ''}`} />
            </button>
          ))}
        </nav>
      </div>
    </>
  );
} 