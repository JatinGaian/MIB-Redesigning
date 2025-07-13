import React from 'react';
import GanttChart from '../components/Ganttchart';

export default function SprintDependencyView() {
  const sprintTasks = [
    {
      id: 'sprint-1',
      name: 'MIB-18 MIB - Mobius IntelliBoard',
      startDate: new Date('2025-07-11'),
      duration: 8,
      dependencies: ['sprint-10'],
      type: 'sprint',
      progress: 85,
      category: 'Sprints'
    },
    {
      id: 'sprint-2',
      name: 'MIB-6 Gamification Features to Improve Engagement',
      startDate: new Date('2025-07-03'),
      duration: 12,
      dependencies: [],
      type: 'feature',
      progress: 60,
      category: 'Sprints'
    },
    {
      id: 'sprint-3',
      name: 'MIB-7 Dependency Analytics for Project Planning',
      startDate: new Date('2025-07-21'),
      duration: 10,
      dependencies: ['sprint-1'],
      type: 'analytics',
      progress: 40,
      category: 'Sprints'
    },
    {
      id: 'sprint-4',
      name: 'MIB-262 MIB-Security Features',
      startDate: new Date('2025-07-08'),
      duration: 15,
      dependencies: ['sprint-2'],
      type: 'security',
      progress: 75,
      category: 'Sprints'
    },
    {
      id: 'sprint-5',
      name: 'MIB-286 Agent Creation',
      startDate: new Date('2025-07-19'),
      duration: 8,
      dependencies: ['sprint-3'],
      type: 'agent',
      progress: 90,
      category: 'Sprints'
    },
    {
      id: 'sprint-6',
      name: 'MIB-360 Redesigning of MIB',
      startDate: new Date('2025-07-04'),
      duration: 20,
      dependencies: ['sprint-4', 'sprint-5'],
      type: 'design',
      progress: 30,
      category: 'Sprints'
    },
    {
      id: 'sprint-7',
      name: 'MIB-367 Companion App',
      startDate: new Date('2025-07-24'),
      duration: 14,
      dependencies: ['sprint-5'],
      type: 'mobile',
      progress: 55,
      category: 'Sprints'
    },
    {
      id: 'sprint-9',
      name: 'MIB-377 Automated Task Assignments',
      startDate: new Date('2025-07-13'),
      duration: 12,
      dependencies: ['sprint-7', 'sprint-8'],
      type: 'automation',
      progress: 45,
      category: 'Sprints'
    },
    {
      id: 'sprint-10',
      name: 'MIB-378 Team Performance Analytics',
      startDate: new Date('2025-07-27'),
      duration: 16,
      dependencies: ['sprint-8'],
      type: 'analytics',
      progress: 35,
      category: 'Sprints'
    },
    {
      id: 'sprint-a1',
      name: 'MIB-601 UI Component Accessibility Review',
      startDate: new Date('2025-07-07'),
      duration: 5,
      dependencies: [],
      type: 'review',
      progress: 35,
      category: 'Weekly'
    },
    {
      id: 'sprint-a2',
      name: 'MIB-602 Mobile Gesture Bug Fixes',
      startDate: new Date('2025-07-08'),
      duration: 2,
      dependencies: [],
      type: 'mobile',
      progress: 60,
      category: 'Weekly'
    },
    {
      id: 'sprint-a3',
      name: 'MIB-603 Sprint Timeline Adjustment Tool',
      startDate: new Date('2025-07-10'),
      duration: 3,
      dependencies: ['sprint-a1'],
      type: 'planning',
      progress: 25,
      category: 'Weekly'
    },
    {
      id: 'sprint-a4',
      name: 'MIB-604 React Flow Connector Styling',
      startDate: new Date('2025-07-09'),
      duration: 6,
      dependencies: [],
      type: 'design',
      progress: 50,
      category: 'Weekly'
    },
    {
      id: 'sprint-a5',
      name: 'MIB-605 Tailwind Dark Mode Alignment',
      startDate: new Date('2025-07-11'),
      duration: 2,
      dependencies: ['sprint-a2'],
      type: 'frontend',
      progress: 75,
      category: 'Weekly'
    },
    {
      id: 'sprint-15',
      name: 'MIB-448 Real-Time Task Updates Engine',
      startDate: new Date('2025-07-26'),
      duration: 14,
      dependencies: ['sprint-14'],
      type: 'automation',
      progress: 55,
      category: 'Sprints'
    }
    ,

    // 🔙 Sprints from June 2025 (last month)
    {
      id: 'sprint-16',
      name: 'MIB-460 API Rate Limiting Module',
      startDate: new Date('2025-06-05'),
      duration: 7,
      dependencies: [],
      type: 'backend',
      progress: 50,
      category: 'Sprints'
    },
    {
      id: 'sprint-17',
      name: 'MIB-475 Pre-Sprint Planning Review',
      startDate: new Date('2025-06-18'),
      duration: 6,
      dependencies: [],
      type: 'planning',
      progress: 20,
      category: 'Sprints'
    },
    {
      id: 'sprint-18',
      name: 'MIB-487 Notification Center Updates',
      startDate: new Date('2025-06-10'),
      duration: 9,
      dependencies: ['sprint-17'],
      type: 'feature',
      progress: 65,
      category: 'Sprints'
    },
    {
      id: 'sprint-19',
      name: 'MIB-501 Timeline Visual Optimization',
      startDate: new Date('2025-06-25'),
      duration: 11,
      dependencies: [],
      type: 'design',
      progress: 40,
      category: 'Sprints'
    },
    {
      id: 'sprint-20',
      name: 'MIB-514 Testing Framework Extension',
      startDate: new Date('2025-06-15'),
      duration: 8,
      dependencies: ['sprint-18'],
      type: 'testing',
      progress: 70,
      category: 'Sprints'
    },
  
    // 🔜 Sprints from August 2025 (next month)
    {
      id: 'sprint-21',
      name: 'MIB-530 Security Patch Deployment',
      startDate: new Date('2025-08-06'),
      duration: 6,
      dependencies: ['sprint-4'],
      type: 'security',
      progress: 35,
      category: 'Sprints'
    },
    {
      id: 'sprint-22',
      name: 'MIB-545 Performance Benchmarking Suite',
      startDate: new Date('2025-08-22'),
      duration: 12,
      dependencies: ['sprint-21'],
      type: 'analytics',
      progress: 50,
      category: 'Sprints'
    },
    {
      id: 'sprint-23',
      name: 'MIB-558 Workflow Automation Upgrade',
      startDate: new Date('2025-08-13'),
      duration: 10,
      dependencies: ['sprint-22'],
      type: 'automation',
      progress: 60,
      category: 'Sprints'
    },
    {
      id: 'sprint-24',
      name: 'MIB-572 UI Responsiveness QA',
      startDate: new Date('2025-08-28'),
      duration: 7,
      dependencies: [],
      type: 'testing',
      progress: 45,
      category: 'Sprints'
    },
    {
      id: 'sprint-25',
      name: 'MIB-583 Sprint Retrospective Review',
      startDate: new Date('2025-08-03'),
      duration: 5,
      dependencies: [],
      type: 'review',
      progress: 90,
      category: 'Sprints'
    }
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