// import React, { useCallback } from 'react';
// import ReactFlow, {
//   Background,
//   Controls,
//   MiniMap,
//   useNodesState,
//   useEdgesState,
//   addEdge,
//   ConnectionLineType,
// } from 'reactflow';
// import 'reactflow/dist/style.css';
// import dagre from 'dagre';

// // Sprint and styling config
// const sprintData = [
//   { id: 'SP1', label: 'Sprint 1', team: 'Core', blockers: true, link: 'https://jira.example.com/SP1' },
//   { id: 'SP2', label: 'Sprint 2', team: 'API', blockers: false, link: 'https://jira.example.com/SP2' },
//   { id: 'SP3', label: 'Sprint 3', team: 'UI', blockers: true, link: 'https://jira.example.com/SP3' },
//   { id: 'SP4', label: 'Sprint 4', team: 'QA', blockers: false, link: 'https://jira.example.com/SP4' },
//   { id: 'SP5', label: 'Sprint 5', team: 'DevOps', blockers: false, link: 'https://jira.example.com/SP5' },
//   { id: 'SP6', label: 'Sprint 6', team: 'UX', blockers: true, link: 'https://jira.example.com/SP6' },
//   { id: 'SP8', label: 'Sprint 8', team: 'Security', blockers: false, link: 'https://jira.example.com/SP8' },
// ];

// const teamColors = {
//   Core: '#607d8b',
//   API: '#03a9f4',
//   UI: '#9c27b0',
//   QA: '#4caf50',
//   DevOps: '#795548',
//   UX: '#ff9800',
//   Security: '#e91e63',
// };

// const nodeWidth = 200;
// const nodeHeight = 100;

// // Helper to calculate age in weeks
// const getWeeksPending = (createdAt) => {
//   const created = new Date(createdAt);
//   const now = new Date();
//   const diffMs = now - created;
//   return Math.floor(diffMs / (1000 * 60 * 60 * 24 * 7));
// };

// // Create sprint cards (nodes)
// const createNodes = () =>
//   sprintData.map((sprint) => ({
//     id: sprint.id,
//     data: {
//       label: (
//         <div style={{ display: 'flex', alignItems: 'center', gap: 8 ,justifyContent:'space-between'}}>
//           {sprint.blockers && <span title="Blocker">⚠️</span>}
//           <strong>{sprint.label}</strong>
//           {sprint.link && (
//             <a href={sprint.link} target="_blank" rel="noopener noreferrer" title="Linked Jira Issue">
//               🔗
//             </a>
//           )}
//         </div>
//       ),
//     },
//     style: {
//       background: teamColors[sprint.team],
//       color: '#fff',
//       padding: 10,
//       borderRadius: 8,
//       width: nodeWidth,
//       boxShadow: sprint.blockers
//         ? '0 0 10px rgba(255,0,0,0.6)'
//         : '0 2px 6px rgba(0,0,0,0.2)',
//     },
//     position: { x: 0, y: 0 },
//   }));

// // Define sprint dependencies (edges)
// const edges = [
//   {
//     id: 'SP1-SP2',
//     source: 'SP1',
//     target: 'SP2',
//     animated: true,
//     type: '',
//     createdAt: '2025-06-10',
//   },
//   {
//     id: 'SP1-SP6',
//     source: 'SP1',
//     target: 'SP6',
//     animated: true,
//     type: '',
//     createdAt: '2025-06-18',
//   },
//   {
//     id: 'SP1-SP8',
//     source: 'SP1',
//     target: 'SP8',
//     animated: true,
//     type: '',
//     createdAt: '2025-07-02',
//   },
//   {
//     id: 'SP3-SP4',
//     source: 'SP3',
//     target: 'SP4',
//     animated: true,
//     type: '',
//     createdAt: '2025-06-25',
//   },
// ];

// // Position everything using Dagre layout
// const getLayoutedElements = (nodes, edges, direction = 'LR') => {
//   const dagreGraph = new dagre.graphlib.Graph();
//   dagreGraph.setDefaultEdgeLabel(() => ({}));
//   dagreGraph.setGraph({ rankdir: direction, ranksep: 800 });


//   nodes.forEach((node) => {
//     dagreGraph.setNode(node.id, { width: nodeWidth, height: nodeHeight });
//   });

//   edges.forEach((edge) => {
//     dagreGraph.setEdge(edge.source, edge.target);
//   });

//   dagre.layout(dagreGraph);

//   const isHorizontal = direction === 'LR';

//   const layoutedNodes = nodes.map((node) => {
//     const { x, y } = dagreGraph.node(node.id);
//     return {
//       ...node,
//       position: { x, y },
//       targetPosition: isHorizontal ? 'left' : 'top',
//       sourcePosition: isHorizontal ? 'right' : 'bottom',
//     };
//   });

//   const layoutedEdges = edges.map((edge) => ({
//     ...edge,
//     label: edge.createdAt
//       ? `Pending ${getWeeksPending(edge.createdAt)} week(s)`
//       : '',
//   }));

//   return { nodes: layoutedNodes, edges: layoutedEdges };
// };

// // Main component
// const DependencyFlowChart = () => {
//   const { nodes, edges: layoutedEdges } = getLayoutedElements(createNodes(), edges, 'LR');
//   const [nodesState, setNodes, onNodesChange] = useNodesState(nodes);
//   const [edgesState, setEdges, onEdgesChange] = useEdgesState(layoutedEdges);

//   const onConnect = useCallback(
//     (params) =>
//       setEdges((eds) =>
//         addEdge({ ...params, type: ConnectionLineType.SmoothStep, animated: true }, eds)
//       ),
//     []
//   );

//   return (
//     <div style={{ height: '40vh', width: '100vw' }}>
//       <ReactFlow
//         nodes={nodesState}
//         edges={edgesState}
//         onNodesChange={onNodesChange}
//         onEdgesChange={onEdgesChange}
//         onConnect={onConnect}
//         fitView
//         connectionLineType={ConnectionLineType.SmoothStep}
//       >
//         <Controls />
//         <Background color="#f0f0f0" gap={16} />
//       </ReactFlow>
//     </div>
//   );
// };

// export default DependencyFlowChart;




import React, { useState, useRef, useEffect } from "react";
import {
  Link,
  Calendar,
  Clock,
  Users,
  AlertTriangle,
  ZoomIn,
  ZoomOut,
  ChevronRight,
  ChevronDown,
} from "lucide-react";

const GanttChart = ({ tasks, startDate, endDate }) => {
  const [selectedTask, setSelectedTask] = useState(null);
  const [hoveredTask, setHoveredTask] = useState(null);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [zoomLevel, setZoomLevel] = useState(1);
  const [viewMode, setViewMode] = useState("Weeks");
  const svgRef = useRef(null);
  const chartRef = useRef(null);
  const timelineRef = useRef(null);
  const sidebarRef = useRef(null);

  const daysDiff = Math.ceil(
    (endDate.getTime() - startDate.getTime()) / (1000 * 60 * 60 * 24)
  );

  // Dynamic day width based on view mode and zoom
  const getBaseDayWidth = () => {
    switch (viewMode) {
      case "Weeks":
        return 1.5;
      case "Months":
        return 1;
      case "Quarters":
        return 0.8;
      default:
        return 1.5;
    }
  };

  const baseDayWidth = getBaseDayWidth();
  const dayWidth = baseDayWidth * zoomLevel;
  const taskHeight = 4;
  const taskPadding = 0.8;
  const headerHeight = 8;
  const sidebarWidth = 25;

  // Auto-scroll to today's line on component mount
  useEffect(() => {
    const scrollToToday = () => {
      const today = new Date();
      const todayDays = Math.ceil(
        (today.getTime() - startDate.getTime()) / (1000 * 60 * 60 * 24)
      );
      const todayPosition = todayDays * dayWidth;

      // Convert vw to pixels for scrolling
      const todayPositionPx = (todayPosition * window.innerWidth) / 100;
      const containerWidth = window.innerWidth * 0.75; // Approximate chart width
      const scrollPosition = Math.max(0, todayPositionPx - containerWidth / 2);

      if (chartRef.current && timelineRef.current) {
        chartRef.current.scrollLeft = scrollPosition;
        timelineRef.current.scrollLeft = scrollPosition;
      }
    };

    // Delay to ensure DOM is ready
    const timer = setTimeout(scrollToToday, 100);
    return () => clearTimeout(timer);
  }, [dayWidth, startDate]);

  // Handle mouse wheel for zooming
  useEffect(() => {
    const handleWheel = (e) => {
      if (e.ctrlKey || e.metaKey) {
        e.preventDefault();
        const delta = e.deltaY > 0 ? -0.1 : 0.1;
        setZoomLevel((prev) => Math.max(0.5, Math.min(3, prev + delta)));
      }
    };

    const chartElement = chartRef.current;
    if (chartElement) {
      chartElement.addEventListener("wheel", handleWheel, { passive: false });
      return () => chartElement.removeEventListener("wheel", handleWheel);
    }
  }, []);

  // Sync horizontal scroll between timeline and chart
  useEffect(() => {
    const handleScroll = (e) => {
      const scrollLeft = e.target.scrollLeft;
      if (timelineRef.current && timelineRef.current !== e.target) {
        timelineRef.current.scrollLeft = scrollLeft;
      }
      if (chartRef.current && chartRef.current !== e.target) {
        chartRef.current.scrollLeft = scrollLeft;
      }
    };

    const timeline = timelineRef.current;
    const chart = chartRef.current;

    if (timeline) timeline.addEventListener("scroll", handleScroll);
    if (chart) chart.addEventListener("scroll", handleScroll);

    return () => {
      if (timeline) timeline.removeEventListener("scroll", handleScroll);
      if (chart) chart.removeEventListener("scroll", handleScroll);
    };
  }, []);

  // Sync vertical scroll between sidebar and chart
  useEffect(() => {
    const handleVerticalScroll = (e) => {
      const scrollTop = e.target.scrollTop;
      if (sidebarRef.current && sidebarRef.current !== e.target) {
        sidebarRef.current.scrollTop = scrollTop;
      }
      if (chartRef.current && chartRef.current !== e.target) {
        chartRef.current.scrollTop = scrollTop;
      }
    };

    const sidebar = sidebarRef.current;
    const chart = chartRef.current;

    if (sidebar) sidebar.addEventListener("scroll", handleVerticalScroll);
    if (chart) chart.addEventListener("scroll", handleVerticalScroll);

    return () => {
      if (sidebar) sidebar.removeEventListener("scroll", handleVerticalScroll);
      if (chart) chart.removeEventListener("scroll", handleVerticalScroll);
    };
  }, []);

  // Calculate task positions
  const getTaskPosition = (task) => {
    const startDays = Math.ceil(
      (task.startDate.getTime() - startDate.getTime()) / (1000 * 60 * 60 * 24)
    );
    return {
      x: startDays * dayWidth,
      width: task.duration * dayWidth,
    };
  };

  // Get task color based on type
  const getTaskColor = (type) => {
    const colors = {
      sprint: "bg-purple-500",
      feature: "bg-blue-500",
      analytics: "bg-green-500",
      security: "bg-red-500",
      agent: "bg-orange-500",
      design: "bg-pink-500",
      mobile: "bg-indigo-500",
      ai: "bg-cyan-500",
      automation: "bg-yellow-500",
    };
    return colors[type] || "bg-gray-500";
  };

  // Generate date range based on view mode with proper alignment
  const generateDateRange = () => {
    const dates = [];
    const current = new Date(startDate);

    while (current <= endDate) {
      if (viewMode === "Weeks") {
        dates.push(new Date(current));
        current.setDate(current.getDate() + 1);
      } else if (viewMode === "Months") {
        // Show every 5th day for better spacing in months view
        if (current.getDate() === 1 || current.getDate() % 5 === 0) {
          dates.push(new Date(current));
        }
        current.setDate(current.getDate() + 1);
      } else {
        // Quarters - show every 10th day
        if (current.getDate() === 1 || current.getDate() % 10 === 0) {
          dates.push(new Date(current));
        }
        current.setDate(current.getDate() + 1);
      }
    }
    return dates;
  };

  // Generate all days for grid lines (regardless of view mode)
  const generateAllDays = () => {
    const dates = [];
    const current = new Date(startDate);

    while (current <= endDate) {
      dates.push(new Date(current));
      current.setDate(current.getDate() + 1);
    }
    return dates;
  };

  // Generate months for header with proper width calculation
  const generateMonthRange = () => {
    const months = [];
    const current = new Date(startDate.getFullYear(), startDate.getMonth(), 1);
    const end = new Date(endDate.getFullYear(), endDate.getMonth() + 1, 0);

    while (current <= end) {
      const monthStart = new Date(current);
      const monthEnd = new Date(
        current.getFullYear(),
        current.getMonth() + 1,
        0
      );

      // Calculate actual days in this month that fall within our date range
      const actualStart = monthStart < startDate ? startDate : monthStart;
      const actualEnd = monthEnd > endDate ? endDate : monthEnd;

      const daysInRange =
        Math.ceil(
          (actualEnd.getTime() - actualStart.getTime()) / (1000 * 60 * 60 * 24)
        ) + 1;

      const startDayFromProjectStart = Math.ceil(
        (actualStart.getTime() - startDate.getTime()) / (1000 * 60 * 60 * 24)
      );

      months.push({
        date: new Date(monthStart),
        daysInRange,
        startDayFromProjectStart,
        width: daysInRange * dayWidth,
      });

      current.setMonth(current.getMonth() + 1);
    }
    return months;
  };

  // Calculate connection paths with smooth curves
  const getConnectionPath = (fromTask, toTask, fromIndex, toIndex) => {
    const fromPos = getTaskPosition(fromTask);
    const toPos = getTaskPosition(toTask);

    // Convert vw/vh to actual pixel values for SVG calculations
    const vwToPx = window.innerWidth / 100;
    const vhToPx = window.innerHeight / 100;

    const fromX = (fromPos.x + fromPos.width) * vwToPx;
    const fromY =
      (fromIndex * (taskHeight + taskPadding) + taskHeight / 2) * vhToPx;
    const toX = toPos.x * vwToPx;
    const toY =
      (toIndex * (taskHeight + taskPadding) + taskHeight / 2) * vhToPx;

    // Create smooth curved path with better curve calculation
    const deltaX = toX - fromX;
    const deltaY = toY - fromY;
    const distance = Math.sqrt(deltaX * deltaX + deltaY * deltaY);

    // Adjust control points based on distance and direction
    const controlPointOffset = Math.min(
      Math.abs(deltaX) * 0.3,
      distance * 0.25
    );
    const controlPoint1X = fromX + controlPointOffset;
    const controlPoint1Y =
      fromY + (deltaY > 0 ? Math.abs(deltaY) * 0.1 : -Math.abs(deltaY) * 0.1);
    const controlPoint2X = toX - controlPointOffset;
    const controlPoint2Y =
      toY - (deltaY > 0 ? Math.abs(deltaY) * 0.1 : -Math.abs(deltaY) * 0.1);

    return `M ${fromX} ${fromY} C ${controlPoint1X} ${controlPoint1Y}, ${controlPoint2X} ${controlPoint2Y}, ${toX} ${toY}`;
  };

  // Calculate today line position
  const getTodayPosition = () => {
    const today = new Date();
    const todayDays = Math.ceil(
      (today.getTime() - startDate.getTime()) / (1000 * 60 * 60 * 24)
    );
    return todayDays * dayWidth;
  };

  // Handle mouse move for tooltip positioning
  const handleMouseMove = (e) => {
    setMousePosition({ x: e.clientX, y: e.clientY });
  };

  const monthRange = generateMonthRange();
  const dateRange = generateDateRange();
  const allDays = generateAllDays();

  // Zoom controls
  const handleZoomIn = () => setZoomLevel((prev) => Math.min(3, prev + 0.2));
  const handleZoomOut = () => setZoomLevel((prev) => Math.max(0.5, prev - 0.2));

  return (
    <div className="w-full h-full bg-gray-50 text-gray-900 overflow-hidden flex flex-col border  border-gray-300">
      {/* Header */}
      <div
        className="bg-white border-b border-gray-200 shadow-sm flex-shrink-0"
        style={{ height: `${headerHeight}vh` }}
      >
        <div
          className="flex items-center justify-between h-full"
          style={{ padding: `0 ${2}vw` }}
        >
          <div className="flex items-center" style={{ gap: `${1}vw` }}>
            <Calendar
              style={{ width: `${2}vw`, height: `${2}vw` }}
              className="text-blue-600"
            />
            <h1
              style={{ fontSize: `${1.2}vw` }}
              className="font-semibold text-gray-800"
            >
              Cross-Sprint Dependency
            </h1>
          </div>
          <div className="flex items-center" style={{ gap: `${2}vw` }}>
            {/* View Mode Filters */}
            <div
              className="flex items-center bg-gray-100 rounded-lg"
              style={{ gap: `${0.2}vw`, padding: `${0.2}vw` }}
            >
              {["Weeks", "Months", "Quarters"].map((mode) => (
                <button
                  key={mode}
                  onClick={() => setViewMode(mode)}
                  className={`rounded-md font-medium transition-colors ${
                    viewMode === mode
                      ? "bg-blue-600 text-white"
                      : "text-gray-600 hover:text-gray-800"
                  }`}
                  style={{
                    padding: `${0.5}vh ${1}vw`,
                    fontSize: `${0.8}vw`,
                  }}
                >
                  {mode}
                </button>
              ))}
            </div>
            {/* Zoom Controls */}
            <div className="flex items-center" style={{ gap: `${0.8}vw` }}>
              <button
                onClick={handleZoomOut}
                className="rounded-lg bg-gray-100 hover:bg-gray-200 transition-colors"
                style={{ padding: `${0.8}vh ${0.8}vw` }}
                title="Zoom Out"
              >
                <ZoomOut style={{ width: `${1}vw`, height: `${1}vw` }} />
              </button>
              <span
                style={{ fontSize: `${0.8}vw`, minWidth: `${3}vw` }}
                className="text-gray-600 text-center"
              >
                {Math.round(zoomLevel * 100)}%
              </span>
              <button
                onClick={handleZoomIn}
                className="rounded-lg bg-gray-100 hover:bg-gray-200 transition-colors"
                style={{ padding: `${0.8}vh ${0.8}vw` }}
                title="Zoom In"
              >
                <ZoomIn style={{ width: `${1}vw`, height: `${1}vw` }} />
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="flex flex-1 overflow-hidden">
        {/* Sidebar */}
        <div
          className="bg-white border-r border-gray-200 flex-shrink-0 flex flex-col"
          style={{ width: `${sidebarWidth}vw` }}
        >
          {/* Sidebar Header */}
          <div
            className="border-b border-gray-200 bg-gray-50"
            style={{
              height: `${headerHeight}vh`,
              padding: `${1.5}vh ${1}vw`,
            }}
          >
            <div className="flex items-center" style={{ gap: `${0.5}vw` }}>
              <ChevronDown
                style={{ width: `${1}vw`, height: `${1}vw` }}
                className="text-gray-500"
              />
              <span
                style={{ fontSize: `${0.9}vw` }}
                className="font-semibold text-gray-800"
              >
                Sprints
              </span>
            </div>
          </div>

          {/* Task List */}
          <div
            ref={sidebarRef}
            className="flex-1 overflow-y-auto scrollbar-hide"
          >
            {tasks.map((task, index) => (
              <div
                key={task.id}
                className={`border-b border-gray-100 cursor-pointer transition-colors flex items-center ${
                  selectedTask === task.id
                    ? "bg-blue-50 border-blue-200"
                    : "hover:bg-gray-50"
                }`}
                onClick={() => setSelectedTask(task.id)}
                style={{
                  height: `${taskHeight + taskPadding}vh`,
                  padding: `${1}vh ${1}vw`,
                  gap: `${0.8}vw`,
                }}
              >
                <div
                  className="rounded-full bg-purple-500"
                  style={{ width: `${0.8}vw`, height: `${0.8}vw` }}
                ></div>
                <span
                  style={{ fontSize: `${0.8}vw` }}
                  className="text-gray-800 truncate flex-1"
                >
                  {task.name}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Main chart area */}
        <div className="flex-1 flex flex-col overflow-hidden">
          {/* Timeline header */}
          <div
            ref={timelineRef}
            className="bg-white border-b border-gray-200 overflow-x-auto overflow-y-hidden flex-shrink-0 scrollbar-hide"
            style={{ height: `${headerHeight}vh` }}
          >
            <div
              className="relative"
              style={{ width: `${daysDiff * dayWidth}vw`, height: "100%" }}
            >
              {/* Month headers */}
              <div
                className="flex border-b border-gray-200"
                style={{ height: "50%" }}
              >
                {monthRange.map((month, index) => (
                  <div
                    key={index}
                    className="border-r border-gray-200 bg-gray-50 flex items-center justify-center font-medium text-gray-700"
                    style={{
                      width: `${month.width}vw`,
                      minWidth: `${month.width}vw`,
                      fontSize: `${0.8}vw`,
                    }}
                  >
                    {month.date.toLocaleDateString("en-US", {
                      month: "long",
                      year: "numeric",
                    })}
                  </div>
                ))}
              </div>

              {/* Day headers */}
              <div className="flex" style={{ height: "50%" }}>
                {dateRange.map((date, index) => {
                  const dayPosition = Math.ceil(
                    (date.getTime() - startDate.getTime()) /
                      (1000 * 60 * 60 * 24)
                  );
                  return (
                    <div
                      key={index}
                      className="border-r border-gray-100 flex flex-col items-center justify-center text-gray-600"
                      style={{
                        width: `${
                          viewMode === "Weeks" ? dayWidth : dayWidth * 5
                        }vw`,
                        minWidth: `${
                          viewMode === "Weeks" ? dayWidth : dayWidth * 5
                        }vw`,
                        fontSize: `${0.7}vw`,
                        position: "absolute",
                        left: `${dayPosition * dayWidth}vw`,
                      }}
                    >
                      <div className="font-medium">{date.getDate()}</div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Chart content */}
          <div
            ref={chartRef}
            className="flex-1 overflow-auto relative scrollbar-hide"
            onMouseMove={handleMouseMove}
          >
            <div
              className="relative"
              style={{
                width: `${daysDiff * dayWidth}vw`,
                height: `${tasks.length * (taskHeight + taskPadding)}vh`,
              }}
            >
              {/* Grid background */}
              <div className="absolute inset-0 pointer-events-none">
                {/* Vertical grid lines - using all days for proper alignment */}
                {allDays.map((date, index) => (
                  <div
                    key={index}
                    className={`absolute h-full ${
                      date.getDay() === 1
                        ? "bg-blue-300"
                        : "border-r border-gray-100"
                    }`}
                    style={{
                      left: `${index * dayWidth}vw`,
                      width: date.getDay() === 1 ? `${0.1}vw` : `${0.05}vw`,
                    }}
                  />
                ))}

                {/* Today line */}
                <div
                  className="absolute h-full bg-red-500 z-30"
                  style={{
                    left: `${getTodayPosition()}vw`,
                    width: `${0.2}vw`,
                  }}
                >
                  <div
                    className="absolute bg-red-500 text-white rounded shadow-md"
                    style={{
                      top: `${-0.3}vh`,
                      left: `${-1}vw`,
                      padding: `${0.2}vh ${0.5}vw`,
                      fontSize: `${0.6}vw`,
                    }}
                  >
                    Today
                  </div>
                </div>

                {/* Horizontal grid lines */}
                {tasks.map((_, index) => (
                  <div
                    key={index}
                    className="absolute w-full border-b border-gray-100"
                    style={{
                      top: `${(index + 1) * (taskHeight + taskPadding)}vh`,
                    }}
                  />
                ))}
              </div>

              {/* SVG for smooth curves */}
              <svg
                className="absolute inset-0 pointer-events-none z-10"
                style={{
                  width: `${daysDiff * dayWidth}vw`,
                  height: `${tasks.length * (taskHeight + taskPadding)}vh`,
                }}
                viewBox={`0 0 ${
                  (daysDiff * dayWidth * window.innerWidth) / 100
                } ${
                  (tasks.length *
                    (taskHeight + taskPadding) *
                    window.innerHeight) /
                  100
                }`}
                preserveAspectRatio="xMidYMid meet"
              >
                {tasks.map((task, taskIndex) => {
                  return task.dependencies.map((depId) => {
                    const depTask = tasks.find((t) => t.id === depId);
                    const depIndex = tasks.findIndex((t) => t.id === depId);
                    if (depTask && depIndex !== -1) {
                      const pathData = getConnectionPath(
                        depTask,
                        task,
                        depIndex,
                        taskIndex
                      );
                      return (
                        <path
                          key={`curved-${task.id}-${depId}`}
                          d={pathData}
                          stroke="#3b82f6"
                          strokeWidth="1.2"
                          fill="none"
                          opacity="0.8"
                          style={{
                            filter:
                              "drop-shadow(0 0.1vh 0.2vh rgba(0,0,0,0.15))",
                          }}
                        />
                      );
                    }
                    return null;
                  });
                })}
              </svg>

              {/* Task bars */}
              <div className="relative z-10">
                {tasks.map((task, index) => {
                  const position = getTaskPosition(task);
                  return (
                    <div
                      key={task.id}
                      className={`absolute rounded cursor-pointer transition-all duration-200 hover:shadow-md ${getTaskColor(
                        task.type
                      )} ${
                        selectedTask === task.id ? "ring-2 ring-blue-400" : ""
                      }`}
                      style={{
                        left: `${position.x}vw`,
                        top: `${
                          index * (taskHeight + taskPadding) + taskPadding / 2
                        }vh`,
                        width: `${position.width}vw`,
                        height: `${taskHeight - 1}vh`,
                      }}
                      onClick={() => setSelectedTask(task.id)}
                      onMouseEnter={() => setHoveredTask(task)}
                      onMouseLeave={() => setHoveredTask(null)}
                    >
                      <div
                        className="h-full flex items-center"
                        style={{ padding: `0 ${0.5}vw` }}
                      >
                        <span
                          style={{ fontSize: `${0.7}vw` }}
                          className="font-medium text-white truncate"
                        >
                          {task.name}
                        </span>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Tooltip */}
      {hoveredTask && (
        <div
          className="fixed bg-gray-800 text-white rounded-lg shadow-xl z-50 pointer-events-none"
          style={{
            left: `${mousePosition.x + 10}px`,
            top: `${mousePosition.y - 10}px`,
            transform: "translateY(-100%)",
            padding: `${1}vh ${1.5}vw`,
            maxWidth: `${20}vw`,
          }}
        >
          <div style={{ gap: `${0.8}vh` }} className="space-y-2">
            <div
              style={{
                fontSize: `${0.8}vw`,
                paddingBottom: `${0.8}vh`,
                borderBottom: `${0.1}vh solid rgb(75, 85, 99)`,
              }}
              className="font-semibold"
            >
              {hoveredTask.name}
            </div>
            <div
              className="grid grid-cols-2"
              style={{ gap: `${0.8}vw`, fontSize: `${0.7}vw` }}
            >
              <div>
                <span className="text-gray-400">Duration:</span>
                <div className="font-medium">{hoveredTask.duration} days</div>
              </div>
              <div>
                <span className="text-gray-400">Type:</span>
                <div className="font-medium capitalize">{hoveredTask.type}</div>
              </div>
              <div>
                <span className="text-gray-400">Start:</span>
                <div className="font-medium">
                  {hoveredTask.startDate.toLocaleDateString()}
                </div>
              </div>
              <div>
                <span className="text-gray-400">Progress:</span>
                <div className="font-medium">{hoveredTask.progress}%</div>
              </div>
            </div>
            {hoveredTask.dependencies.length > 0 && (
              <div style={{ fontSize: `${0.7}vw` }}>
                <span className="text-gray-400">Dependencies:</span>
                <div className="font-medium">
                  {hoveredTask.dependencies
                    .map((depId) => {
                      const depTask = tasks.find((t) => t.id === depId);
                      return depTask ? depTask.name : depId;
                    })
                    .join(", ")}
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default GanttChart;