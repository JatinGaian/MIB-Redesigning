import React from 'react';
import GanttChart from '../components/Ganttchart';

export default function SprintDependencyView() {
  const sprintTasks = [
    // 🗓 Current Week
    { id: 'sprint-a1', name: 'UI Component Accessibility Review', startDate: new Date('2025-07-15'), duration: 5, dependencies: [], type: 'review', progress: 35, category: 'Weekly' },
    { id: 'sprint-a2', name: 'Mobile Gesture Bug Fixes', startDate: new Date('2025-07-16'), duration: 2, dependencies: [], type: 'mobile', progress: 60, category: 'Weekly' },
    { id: 'sprint-a3', name: 'Sprint Timeline Adjustment Tool', startDate: new Date('2025-07-18'), duration: 3, dependencies: ['sprint-a1'], type: 'planning', progress: 25, category: 'Weekly' },
  
    // 📅 Current Month (July)
    { id: 'sprint-1', name: 'Mobius IntelliBoard', startDate: new Date('2025-07-11'), duration: 8, dependencies: ['sprint-10'], type: 'sprint', progress: 85, category: 'Sprints' },
    { id: 'sprint-3', name: 'Dependency Analytics', startDate: new Date('2025-07-21'), duration: 10, dependencies: ['sprint-1'], type: 'analytics', progress: 40, category: 'Sprints' },
    { id: 'sprint-5', name: 'Agent Creation', startDate: new Date('2025-07-19'), duration: 8, dependencies: ['sprint-3'], type: 'agent', progress: 90, category: 'Sprints' },
    { id: 'sprint-7', name: 'Companion App', startDate: new Date('2025-07-24'), duration: 14, dependencies: ['sprint-5'], type: 'mobile', progress: 55, category: 'Sprints' },
    { id: 'sprint-10', name: 'Team Performance Analytics', startDate: new Date('2025-07-27'), duration: 16, dependencies: [], type: 'analytics', progress: 35, category: 'Sprints' },
    { id: 'sprint-a4', name: 'Connector Styling', startDate: new Date('2025-07-09'), duration: 6, dependencies: [], type: 'design', progress: 50, category: 'Weekly' },
    { id: 'sprint-a5', name: 'Tailwind Dark Mode Alignment', startDate: new Date('2025-07-14'), duration: 2, dependencies: ['sprint-a2'], type: 'frontend', progress: 75, category: 'Weekly' },
  
    // 🔙 Previous Month (June)
    { id: 'sprint-16', name: 'API Rate Limiting Module', startDate: new Date('2025-06-07'), duration: 7, dependencies: [], type: 'backend', progress: 50, category: 'Sprints' },
    { id: 'sprint-17', name: 'Pre-Sprint Planning Review', startDate: new Date('2025-06-18'), duration: 6, dependencies: [], type: 'planning', progress: 20, category: 'Sprints' },
    { id: 'sprint-18', name: 'Notification Center Updates', startDate: new Date('2025-06-12'), duration: 9, dependencies: ['sprint-17'], type: 'feature', progress: 65, category: 'Sprints' },
    { id: 'sprint-19', name: 'Timeline Visual Optimization', startDate: new Date('2025-06-22'), duration: 11, dependencies: [], type: 'design', progress: 40, category: 'Sprints' },
    { id: 'sprint-20', name: 'Testing Framework Extension', startDate: new Date('2025-06-15'), duration: 8, dependencies: ['sprint-18'], type: 'testing', progress: 70, category: 'Sprints' },
  
    // 🔜 Next Month (August)
    { id: 'sprint-21', name: 'Security Patch Deployment', startDate: new Date('2025-08-05'), duration: 6, dependencies: ['sprint-4'], type: 'security', progress: 35, category: 'Sprints' },
    { id: 'sprint-22', name: 'Benchmarking Suite', startDate: new Date('2025-08-22'), duration: 12, dependencies: ['sprint-21'], type: 'analytics', progress: 50, category: 'Sprints' },
    { id: 'sprint-23', name: 'Automation Upgrade', startDate: new Date('2025-08-13'), duration: 10, dependencies: ['sprint-22'], type: 'automation', progress: 60, category: 'Sprints' },
    { id: 'sprint-24', name: 'UI Responsiveness QA', startDate: new Date('2025-08-27'), duration: 7, dependencies: [], type: 'testing', progress: 45, category: 'Sprints' },
    { id: 'sprint-25', name: 'Sprint Retrospective Review', startDate: new Date('2025-08-03'), duration: 5, dependencies: [], type: 'review', progress: 90, category: 'Sprints' }
  ];
  
  
    return (
      <div className="h-full w-full">
         <GanttChart
        tasks={sprintTasks}
        startDate={new Date('2025-06-01')}
        endDate={new Date('2025-10-30')}
      />
      </div>
    );
  }  