import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useSidebarStore } from '../stores/sidebarStore';

import operationalIcon from '../assets/sidebar_icons/operational_dashboard.png';
import profileIcon from '../assets/sidebar_icons/profile.png';
import ganttChart from "../assets/sidebar_icons/gantt-chart.png"
import reportIcon from '../assets/sidebar_icons/report_view.png';
import sprintIcon from '../assets/sidebar_icons/sprint_view.png';
import MobiusLogo from '../assets/sidebar_icons/MOBIUS.png';
import TopLogo from '../assets/sidebar_icons/top.jpg';
import UserLogo from '../assets/sidebar_icons/user.png';

const navItems = [
  { key: 'operational', icon: operationalIcon, alt: 'Operational Dashboard', path: '/operational' },
  { key: 'SprintDependencyView', icon: ganttChart, alt: 'SprintDependencyView', path: '/SprintDependencyView' },
  { key: 'profile', icon: profileIcon, alt: 'profile view', path: '/profile' },
  { key: 'report', icon: reportIcon, alt: 'Report View', path: '/report' },
  { key: 'sprint', icon: sprintIcon, alt: 'Sprint View', path: '/sprint' },
];

export default function Sidebar() {
  const { selected, setSelected } = useSidebarStore();
  const location = useLocation();

  return (
    <div className="h-[100vh] w-[4vw] bg-white flex flex-col items-center shadow-lg z-50">
      {/* Top Logo */}
      <div className="mt-[2vh] mb-[3vh]">
        <img
          src={TopLogo}
          alt="Top Logo"
          className="w-[2vw] h-[2vw] object-contain"
        />
      </div>

      {/* Top Navigation */}
      <nav className="flex flex-col gap-[4vh] w-full items-center">
        {navItems.map(({ key, icon, alt, path }) => {
          // Highlight if current route matches path, or Zustand selected matches key
          const isActive = location.pathname === path || selected === key;
          return (
            <Link
              key={key}
              to={path}
              onClick={() => setSelected(key)}
              aria-label={alt}
              aria-current={isActive ? 'page' : undefined}
              title={alt}
              className={`flex items-center justify-center w-[2.5vw] h-[2.5vw] rounded-lg transition-all duration-200
                ${isActive ? 'ring-2 ring-blue-500 scale-110 bg-blue-100' : 'hover:bg-gray-100'}`}
            >
              <img
                src={icon}
                alt={alt}
                className={`w-[1.5vw] h-[1.5vw] object-contain
                  ${isActive ? 'drop-shadow-[0_2px_6px_rgba(59,130,246,0.5)]' : ''}`}
              />
            </Link>
          );
        })}
      </nav>

      {/* Spacer */}
      <div className="flex-grow" />

      {/* Bottom User Image */}
      <div className="mb-[3vh]">
        <img
          src={UserLogo}
          alt="User"
          className="w-[2vw] h-[2vw] object-cover rounded-full border border-gray-300"
        />
      </div>

      {/* Powered by and Logo */}
      <div className="mb-[3vh] flex flex-col items-center text-black text-[1.2vh] opacity-80">
        <p className="mb-[0.5vh]">Powered by</p>
        <img
          src={MobiusLogo}
          alt="Mobius Logo"
          className="w-[2vw] h-[2vw] object-contain opacity-90 hover:opacity-100 transition-opacity duration-200"
        />
      </div>
    </div>
  );
}
