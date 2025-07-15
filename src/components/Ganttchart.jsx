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
  const [filters, setFilters] = useState({
    category: [],
    manager: [],
    type: [],
  });
  const [openDropdown, setOpenDropdown] = useState(null);
  const svgRef = useRef(null);
  const chartRef = useRef(null);
  const timelineRef = useRef(null);
  const sidebarRef = useRef(null);

  // Get task end date
  const getTaskEndDate = (task) => {
    const endDate = new Date(task.startDate);
    endDate.setDate(task.startDate.getDate() + task.duration);
    return endDate;
  };

  // Get current week range (Monday to Sunday)
  const getCurrentWeekRange = () => {
    const today = new Date();
    const currentDay = today.getDay();
    const mondayOffset = currentDay === 0 ? -6 : 1 - currentDay;

    const monday = new Date(today);
    monday.setDate(today.getDate() + mondayOffset);
    monday.setHours(0, 0, 0, 0);

    // Monday to Monday (next Monday)
    const nextMonday = new Date(monday);
    nextMonday.setDate(monday.getDate() + 7);
    nextMonday.setHours(0, 0, 0, 0);

    return { start: monday, end: nextMonday };
  };

  // Filter tasks for Days view (current week only)
  const getFilteredTasks = () => {
    let filtered = tasks;

    // Apply filters first
    if (filters.category.length > 0) {
      filtered = filtered.filter((task) =>
        filters.category.includes(task.category)
      );
    }
    if (filters.manager.length > 0) {
      filtered = filtered.filter((task) =>
        filters.manager.includes(task.manager)
      );
    }
    if (filters.type.length > 0) {
      filtered = filtered.filter((task) => filters.type.includes(task.type));
    }

    // Then apply date filtering for Days view
    if (viewMode === "Days") {
      const { start: weekStart, end: weekEnd } = getCurrentWeekRange();

      return filtered.filter((task) => {
        const taskEndDate = getTaskEndDate(task);
        // Show task if it overlaps with current week (starts before week ends AND ends after week starts)
        return task.startDate <= weekEnd && taskEndDate >= weekStart;
      });
    }
    return filtered;
  };

  // Get date range for Days view or regular view
  const getDateRange = () => {
    if (viewMode === "Days") {
      // Show only current week (Monday to Sunday)
      return getCurrentWeekRange();
    }
    return { start: startDate, end: endDate };
  };

  const filteredTasks = getFilteredTasks();
  const dateRange = getDateRange();
  const viewStartDate = dateRange.start;
  const viewEndDate = dateRange.end;

  const daysDiff = Math.ceil(
    (viewEndDate.getTime() - viewStartDate.getTime()) / (1000 * 60 * 60 * 24)
  );

  // Dynamic day width based on view mode and zoom
  const getBaseDayWidth = () => {
    switch (viewMode) {
      case "Days":
        return 15; // Much wider for daily view
      case "Weeks":
        return 2;
      case "Months":
        return 1.5;
      case "Quarters":
        return 1;
      default:
        return 2;
    }
  };

  const baseDayWidth = getBaseDayWidth();
  const dayWidth = baseDayWidth * zoomLevel;
  const taskHeight = 4;
  const taskPadding = 0.8;
  const headerHeight = 8;
  const sidebarWidth = 25;

  // Calculate if content needs scrolling
  const availableHeight = 100 - headerHeight; // Total height minus header
  const contentHeight = filteredTasks.length * (taskHeight + taskPadding);
  const needsVerticalScroll = contentHeight > availableHeight;
  const shouldUseSpaceBetween =
    !needsVerticalScroll && filteredTasks.length > 1;

  // Auto-scroll to today's line on component mount
  useEffect(() => {
    const scrollToToday = () => {
      // Only auto-scroll on initial load, not on every render
      if (viewMode !== "Days") return;

      const today = new Date();
      const todayDays = Math.ceil(
        (today.getTime() - viewStartDate.getTime()) / (1000 * 60 * 60 * 24)
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

    // Only auto-scroll once when component mounts or view mode changes to Days
    const timer = setTimeout(scrollToToday, 100);
    return () => clearTimeout(timer);
  }, [viewMode]); // Remove dayWidth and viewStartDate dependencies

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
    const startDays = Math.floor(
      (task.startDate.getTime() - viewStartDate.getTime()) /
        (1000 * 60 * 60 * 24)
    );

    if (viewMode === "Days") {
      const { start: weekStart, end: weekEnd } = getCurrentWeekRange();
      const taskEndDate = getTaskEndDate(task);

      // Clip task to current week boundaries
      const clippedStart =
        task.startDate < weekStart ? weekStart : task.startDate;
      const clippedEnd = taskEndDate > weekEnd ? weekEnd : taskEndDate;

      const clippedStartDays = Math.floor(
        (clippedStart.getTime() - viewStartDate.getTime()) /
          (1000 * 60 * 60 * 24)
      );
      const clippedDuration = Math.floor(
        (clippedEnd.getTime() - clippedStart.getTime()) / (1000 * 60 * 60 * 24)
      );

      return {
        x: clippedStartDays * dayWidth,
        width: Math.max(clippedDuration * dayWidth, dayWidth * 0.5), // Minimum width
        isClipped: task.startDate < weekStart || taskEndDate > weekEnd,
      };
    }

    return {
      x: startDays * dayWidth,
      width: task.duration * dayWidth,
      isClipped: false,
    };
  };

  // Check if connection has scheduling conflict
  const hasSchedulingConflict = (fromTask, toTask) => {
    const fromEndDate = getTaskEndDate(fromTask);
    const toStartDate = toTask.startDate;
    return fromEndDate > toStartDate;
  };

  // Check if a task has any scheduling conflicts (incoming or outgoing)
  const hasTaskConflicts = (task) => {
    // Check outgoing dependencies (this task depends on others)
    const hasOutgoingConflicts = task.dependencies.some((depId) => {
      const depTask = tasks.find((t) => t.id === depId);
      return depTask && hasSchedulingConflict(depTask, task);
    });

    // Check incoming dependencies (other tasks depend on this one)
    const hasIncomingConflicts = filteredTasks.some(
      (otherTask) =>
        otherTask.dependencies.includes(task.id) &&
        hasSchedulingConflict(task, otherTask)
    );

    return hasOutgoingConflicts || hasIncomingConflicts;
  };

  // Handle link click to navigate to task page
  const handleLinkClick = (task, e) => {
    e.stopPropagation(); // Prevent task selection

    // Extract task ID from name (e.g., "MIB-18" from "MIB-18 MIB - Mobius IntelliBoard")
    const taskIdMatch = task.name.match(/^([A-Z]+-\d+)/);
    const taskId = taskIdMatch ? taskIdMatch[1] : task.id;

    // For now, show alert - replace with actual navigation
    alert(`Navigating to ${taskId} page...`);

    // Replace with actual navigation:
    // window.open(`/tasks/${taskId}`, '_blank');
    // or navigate(`/sprints/${task.id}`);
  };

  // Get unique values for filter options
  const getFilterOptions = () => {
    const categories = [...new Set(tasks.map((task) => task.category))].sort();
    const managers = [...new Set(tasks.map((task) => task.manager))].sort();
    const types = [...new Set(tasks.map((task) => task.type))].sort();

    return { categories, managers, types };
  };

  // Handle filter changes
  const handleFilterToggle = (filterType, value) => {
    setFilters((prev) => ({
      ...prev,
      [filterType]: prev[filterType].includes(value)
        ? prev[filterType].filter((item) => item !== value)
        : [...prev[filterType], value],
    }));
  };

  // Clear all filters
  const clearFilters = () => {
    setFilters({
      category: [],
      manager: [],
      type: [],
    });
    setOpenDropdown(null);
  };

  // Toggle dropdown
  const toggleDropdown = (dropdownType) => {
    setOpenDropdown(openDropdown === dropdownType ? null : dropdownType);
  };

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (!event.target.closest(".filter-dropdown")) {
        setOpenDropdown(null);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Get active filter count
  const getActiveFilterCount = (filterType) => {
    return filters[filterType].length;
  };

  // Get task color based on type
  const getTaskColor = (type) => {
    const colors = {
      sprint: "bg-purple-500",
      ToDo: "bg-blue-500",
      Done: "bg-green-500",
      closed: "bg-red-500",
      agent: "bg-orange-500",
      design: "bg-pink-500",
      mobile: "bg-indigo-500",
      ai: "bg-cyan-500",
      InProgress: "bg-yellow-500",
      active: "bg-gray-600",
      planning: "bg-teal-500",
      future: "bg-lime-500",
    };
    return colors[type] || "bg-gray-500";
  };

  // Generate date range based on view mode with proper alignment
  const generateDateRange = () => {
    const dates = [];
    const current = new Date(viewStartDate);

    while (current <= viewEndDate) {
      if (viewMode === "Days") {
        dates.push(new Date(current));
        current.setDate(current.getDate() + 1);
      } else if (viewMode === "Weeks") {
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
    const current = new Date(viewStartDate);

    while (current <= viewEndDate) {
      dates.push(new Date(current));
      current.setDate(current.getDate() + 1);
    }
    return dates;
  };

  // Generate months for header with proper width calculation
  const generateMonthRange = () => {
    if (viewMode === "Days") {
      // For days view, show the current week as a single "month"
      const { start: weekStart, end: weekEnd } = getCurrentWeekRange();
      return [
        {
          date: weekStart,
          daysInRange: 7,
          startDayFromProjectStart: 0,
          width: 7 * dayWidth,
        },
      ];
    }

    const months = [];
    const current = new Date(
      viewStartDate.getFullYear(),
      viewStartDate.getMonth(),
      1
    );
    const end = new Date(
      viewEndDate.getFullYear(),
      viewEndDate.getMonth() + 1,
      0
    );

    while (current <= end) {
      const monthStart = new Date(current);
      const monthEnd = new Date(
        current.getFullYear(),
        current.getMonth() + 1,
        0
      );

      // Calculate actual days in this month that fall within our date range
      const actualStart =
        monthStart < viewStartDate ? viewStartDate : monthStart;
      const actualEnd = monthEnd > viewEndDate ? viewEndDate : monthEnd;

      const daysInRange =
        Math.ceil(
          (actualEnd.getTime() - actualStart.getTime()) / (1000 * 60 * 60 * 24)
        ) + 1;

      const startDayFromProjectStart = Math.ceil(
        (actualStart.getTime() - viewStartDate.getTime()) /
          (1000 * 60 * 60 * 24)
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

  // Calculate connection paths with smooth curves and custom Y positions
  const getConnectionPathWithCustomY = (
    fromTask,
    toTask,
    fromIndex,
    toIndex,
    fromY,
    toY
  ) => {
    const fromPos = getTaskPosition(fromTask);
    const toPos = getTaskPosition(toTask);

    // Convert vw/vh to actual pixel values for SVG calculations
    const vwToPx = window.innerWidth / 100;
    const vhToPx = window.innerHeight / 100;

    const fromX = (fromPos.x + fromPos.width) * vwToPx;
    const fromYPx = fromY * vhToPx;
    const toX = toPos.x * vwToPx;
    const toYPx = toY * vhToPx;

    // Create smooth curved path with better curve calculation
    const deltaX = toX - fromX;
    const deltaY = toYPx - fromYPx;
    const distance = Math.sqrt(deltaX * deltaX + deltaY * deltaY);

    // Adjust control points based on distance and direction
    const controlPointOffset = Math.min(
      Math.abs(deltaX) * 0.25,
      distance * 0.2
    );
    const controlPoint1X = fromX + controlPointOffset;
    const controlPoint1Y =
      fromYPx + (deltaY > 0 ? Math.abs(deltaY) * 0.1 : -Math.abs(deltaY) * 0.1);
    const controlPoint2X = toX - controlPointOffset;
    const controlPoint2Y =
      toYPx - (deltaY > 0 ? Math.abs(deltaY) * 0.1 : -Math.abs(deltaY) * 0.1);

    return `M ${fromX} ${fromYPx} C ${controlPoint1X} ${controlPoint1Y}, ${controlPoint2X} ${controlPoint2Y}, ${toX} ${toYPx}`;
  };

  // Calculate today line position
  const getTodayPosition = () => {
    const today = new Date();
    const todayDays = Math.floor(
      (today.getTime() - viewStartDate.getTime()) / (1000 * 60 * 60 * 24)
    );
    return todayDays * dayWidth;
  };

  // Handle mouse move for tooltip positioning
  const handleMouseMove = (e) => {
    setMousePosition({ x: e.clientX, y: e.clientY });
  };

  // Get manager initials from full name
  const getManagerInitials = (managerName) => {
    if (!managerName) return "?";
    return managerName
      .split(" ")
      .map((name) => name.charAt(0).toUpperCase())
      .join("")
      .substring(0, 2); // Limit to 2 characters
  };

  // Get consistent avatar color based on manager name
  const getAvatarColor = (managerName) => {
    if (!managerName) return "bg-gray-500";

    const colors = [
      "bg-blue-500",
      "bg-green-500",
      "bg-purple-500",
      "bg-orange-500",
      "bg-pink-500",
      "bg-indigo-500",
      "bg-teal-500",
      "bg-red-500",
      "bg-yellow-500",
      "bg-cyan-500",
    ];

    // Generate consistent color based on name hash
    let hash = 0;
    for (let i = 0; i < managerName.length; i++) {
      hash = managerName.charCodeAt(i) + ((hash << 5) - hash);
    }
    const colorIndex = Math.abs(hash) % colors.length;
    return colors[colorIndex];
  };

  const monthRange = generateMonthRange();
  const dateRangeForHeader = generateDateRange();
  const allDays = generateAllDays();
  const filterOptions = getFilterOptions();

  // Zoom controls
  const handleZoomIn = () => setZoomLevel((prev) => Math.min(3, prev + 0.2));
  const handleZoomOut = () => setZoomLevel((prev) => Math.max(0.5, prev - 0.2));

  return (
    <div className="w-full h-full bg-gray-50 text-gray-900 overflow-hidden flex flex-col border border-gray-300">
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
              {["Days", "Weeks", "Months", "Quarters"].map((mode) => (
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
              minHeight: `${headerHeight}vh`,
              //   padding: `${1}vh ${1}vw`,
            }}
          >
            <div
              className="flex items-center justify-between mb-2"
              style={{ gap: `${0.5}vw` }}
            >
              {/* <ChevronDown
                style={{ width: `${1}vw`, height: `${1}vw` }}
                className="text-gray-500"
              /> */}
              <span></span>
              <span
                style={{ fontSize: `${0.9}vw` }}
                className="font-semibold text-gray-800"
              >
                Tasks List {viewMode === "Days" && "(Current Week)"}
              </span>
              <button
                onClick={clearFilters}
                className="text-blue-600 hover:text-blue-800 text-xs mr-3"
                style={{ fontSize: `${0.7}vw` }}
              >
                Clear All Filters
              </button>
            </div>

            {/* Filters */}
            <div className="flex gap-2 justify-around">
              {/* Category Filter */}
              <div className="relative filter-dropdown">
                <button
                  onClick={() => toggleDropdown("category")}
                  className="flex items-center justify-between w-full border border-gray-300 rounded bg-white hover:bg-gray-50"
                  style={{
                    fontSize: `${0.7}vw`,
                    padding: `${0.3}vh ${0.5}vw`,
                    minWidth: `${6}vw`,
                  }}
                >
                  <span>
                    Category{" "}
                    {getActiveFilterCount("category") > 0 &&
                      `(${getActiveFilterCount("category")})`}
                  </span>
                  <ChevronDown
                    style={{ width: `${0.8}vw`, height: `${0.8}vw` }}
                  />
                </button>

                {openDropdown === "category" && (
                  <div
                    className="absolute top-full left-0 mt-1 bg-white border border-gray-300 rounded shadow-lg z-50 overflow-y-auto"
                    style={{ minWidth: `${8}vw`, maxHeight: `${20}vh` }}
                  >
                    <div className="overflow-y-auto">
                      {filterOptions.categories.map((category) => (
                        <label
                          key={category}
                          className="flex items-center hover:bg-gray-50 cursor-pointer"
                          style={{
                            padding: `${0.4}vh ${0.8}vw`,
                            fontSize: `${0.7}vw`,
                          }}
                        >
                          <input
                            type="checkbox"
                            checked={filters.category.includes(category)}
                            onChange={() =>
                              handleFilterToggle("category", category)
                            }
                            className="mr-2"
                            style={{ width: `${0.8}vw`, height: `${0.8}vw` }}
                          />
                          <span>
                            {category.charAt(0).toUpperCase() +
                              category.slice(1)}
                          </span>
                        </label>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              {/* Manager Filter */}
              <div className="relative filter-dropdown">
                <button
                  onClick={() => toggleDropdown("manager")}
                  className="flex items-center justify-between w-full border border-gray-300 rounded bg-white hover:bg-gray-50"
                  style={{
                    fontSize: `${0.7}vw`,
                    padding: `${0.3}vh ${0.5}vw`,
                    minWidth: `${6}vw`,
                  }}
                >
                  <span>
                    Manager{" "}
                    {getActiveFilterCount("manager") > 0 &&
                      `(${getActiveFilterCount("manager")})`}
                  </span>
                  <ChevronDown
                    style={{ width: `${0.8}vw`, height: `${0.8}vw` }}
                  />
                </button>

                {openDropdown === "manager" && (
                  <div
                    className="absolute top-full left-0 mt-1 bg-white border border-gray-300 rounded shadow-lg z-50 overflow-y-auto"
                    style={{ minWidth: `${8}vw`, maxHeight: `${20}vh` }}
                  >
                    <div className="overflow-y-auto">
                      {filterOptions.managers.map((manager) => (
                        <label
                          key={manager}
                          className="flex items-center hover:bg-gray-50 cursor-pointer"
                          style={{
                            padding: `${0.4}vh ${0.8}vw`,
                            fontSize: `${0.7}vw`,
                          }}
                        >
                          <input
                            type="checkbox"
                            checked={filters.manager.includes(manager)}
                            onChange={() =>
                              handleFilterToggle("manager", manager)
                            }
                            className="mr-2"
                            style={{ width: `${0.8}vw`, height: `${0.8}vw` }}
                          />
                          <span>{manager}</span>
                        </label>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              {/* Type Filter */}
              <div className="relative filter-dropdown">
                <button
                  onClick={() => toggleDropdown("type")}
                  className="flex items-center justify-between w-full border border-gray-300 rounded bg-white hover:bg-gray-50"
                  style={{
                    fontSize: `${0.7}vw`,
                    padding: `${0.3}vh ${0.5}vw`,
                    minWidth: `${6}vw`,
                  }}
                >
                  <span>
                    Type{" "}
                    {getActiveFilterCount("type") > 0 &&
                      `(${getActiveFilterCount("type")})`}
                  </span>
                  <ChevronDown
                    style={{ width: `${0.8}vw`, height: `${0.8}vw` }}
                  />
                </button>

                {openDropdown === "type" && (
                  <div
                    className="absolute top-full left-0 mt-1 bg-white border border-gray-300 rounded shadow-lg z-50 overflow-y-auto"
                    style={{ minWidth: `${8}vw`, maxHeight: `${20}vh` }}
                  >
                    <div className="overflow-y-auto">
                      {filterOptions.types.map((type) => (
                        <label
                          key={type}
                          className="flex items-center hover:bg-gray-50 cursor-pointer"
                          style={{
                            padding: `${0.4}vh ${0.8}vw`,
                            fontSize: `${0.7}vw`,
                          }}
                        >
                          <input
                            type="checkbox"
                            checked={filters.type.includes(type)}
                            onChange={() => handleFilterToggle("type", type)}
                            className="mr-2"
                            style={{ width: `${0.8}vw`, height: `${0.8}vw` }}
                          />
                          <span>
                            {type.charAt(0).toUpperCase() + type.slice(1)}
                          </span>
                        </label>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Task List */}
          <div
            ref={sidebarRef}
            className="flex-1 overflow-y-auto scrollbar-hide"
          >
            <div
              className={
                shouldUseSpaceBetween
                  ? "flex flex-col justify-between h-full"
                  : ""
              }
              style={
                shouldUseSpaceBetween ? { height: `${availableHeight}vh` } : {}
              }
            >
              {filteredTasks.map((task, index) => {
                // Calculate sidebar item height and position
                const getItemStyle = () => {
                  if (shouldUseSpaceBetween) {
                    const rowHeight = availableHeight / filteredTasks.length;
                    return {
                      height: `${rowHeight}vh`,
                      padding: `${rowHeight * 0.2}vh ${1}vw`,
                      gap: `${0.8}vw`,
                    };
                  } else {
                    return {
                      height: `${taskHeight + taskPadding}vh`,
                      padding: `${1}vh ${1}vw`,
                      gap: `${0.8}vw`,
                    };
                  }
                };

                return (
                  <div
                    key={task.id}
                    className={`border-b border-gray-100 cursor-pointer transition-colors flex items-center ${
                      index % 2 === 0 ? "bg-gray-50" : "bg-white"
                    } ${
                      selectedTask === task.id
                        ? "bg-blue-50 border-blue-200"
                        : "hover:bg-gray-50"
                    }`}
                    onClick={() => setSelectedTask(task.id)}
                    style={getItemStyle()}
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
                    <div
                      className="flex flex-row items-center text-xs text-gray-500 gap-2"
                      style={{ fontSize: `${0.6}vw` }}
                    >
                      <span
                        className={`capitalize ${getTaskColor(
                          task.type
                        )} text-white font-medium px-1 py-0.9 rounded`}
                      >
                        {task.type.toUpperCase()}
                      </span>
                      <div
                        className={`rounded-full ${getAvatarColor(
                          task.manager
                        )} text-white font-semibold flex items-center justify-center`}
                        style={{
                          width: `${1}vw`,
                          height: `${1}vw`,
                          fontSize: `${0.5}vw`,
                          // minWidth: '20px',
                          // minHeight: '20px'
                        }}
                        title={task.manager}
                      >
                        {getManagerInitials(task.manager)}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
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
                    {viewMode === "Days"
                      ? `Week of ${month.date.toLocaleDateString("en-US", {
                          month: "short",
                          day: "numeric",
                        })}`
                      : month.date.toLocaleDateString("en-US", {
                          month: "long",
                          year: "numeric",
                        })}
                  </div>
                ))}
              </div>

              {/* Day headers */}
              <div className="flex relative" style={{ height: "50%" }}>
                {dateRangeForHeader.map((date, index) => {
                  const dayPosition = Math.ceil(
                    (date.getTime() - viewStartDate.getTime()) /
                      (1000 * 60 * 60 * 24)
                  );
                  const isMonday = date.getDay() === 1;
                  return (
                    <div
                      key={index}
                      className="border-r border-gray-100 flex flex-col items-center justify-center text-gray-600 absolute"
                      style={{
                        width: `${dayWidth}vw`,
                        minWidth: `${dayWidth}vw`,
                        fontSize: `${0.7}vw`,
                        left: `${dayPosition * dayWidth}vw`,
                        height: "100%",
                      }}
                    >
                      <div className="font-medium">
                        {viewMode === "Days"
                          ? date.toLocaleDateString("en-US", {
                              weekday: "short",
                            })
                          : date.getDate()}
                      </div>
                      {viewMode === "Days" && (
                        <div
                          style={{ fontSize: `${0.6}vw` }}
                          className="text-gray-500"
                        >
                          {date.getDate()}
                        </div>
                      )}
                      {isMonday && viewMode === "Days" && (
                        <div
                          className="absolute bg-blue-500 text-white rounded shadow-md z-30"
                          style={{
                            top: `${-0.3}vh`,
                            left: `${-1}vw`,
                            padding: `${0.2}vh ${0.5}vw`,
                            fontSize: `${0.6}vw`,
                            whiteSpace: "nowrap",
                          }}
                        >
                          Mon
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Chart content */}
          <div
            ref={chartRef}
            className="flex-1 relative overflow-auto scrollbar-hide"
            onMouseMove={handleMouseMove}
          >
            <div
              className="relative"
              style={{
                width: `${daysDiff * dayWidth}vw`,
                height: shouldUseSpaceBetween
                  ? `${availableHeight}vh`
                  : `${filteredTasks.length * (taskHeight + taskPadding)}vh`,
                minHeight: `${availableHeight}vh`,
              }}
            >
              {/* Grid background */}
              <div
                className={`absolute inset-0 pointer-events-none ${
                  shouldUseSpaceBetween ? "flex flex-col justify-between" : ""
                }`}
              >
                {/* Alternating row backgrounds */}
                {filteredTasks.map((_, index) => {
                  const rowHeight = shouldUseSpaceBetween
                    ? `${availableHeight / filteredTasks.length}vh`
                    : `${taskHeight + taskPadding}vh`;
                  const rowTop = shouldUseSpaceBetween
                    ? `${(index * availableHeight) / filteredTasks.length}vh`
                    : `${index * (taskHeight + taskPadding)}vh`;

                  return (
                    <div
                      key={`row-bg-${index}`}
                      className={`absolute w-full ${
                        index % 2 === 0 ? "bg-gray-50" : "bg-white"
                      }`}
                      style={{
                        top: rowTop,
                        height: rowHeight,
                      }}
                    />
                  );
                })}

                {/* Vertical grid lines - using all days for proper alignment */}
                {Array.from({ length: daysDiff }, (_, index) => {
                  const date = new Date(viewStartDate);
                  date.setDate(viewStartDate.getDate() + index);
                  const isMonday = date.getDay() === 1;
                  const isToday =
                    date.toDateString() === new Date().toDateString();

                  return (
                    <div
                      key={index}
                      className={`absolute h-full ${
                        isToday
                          ? "bg-red-500"
                          : isMonday
                          ? "bg-blue-300"
                          : "border-r border-gray-100"
                      }`}
                      style={{
                        left: `${index * dayWidth}vw`,
                        width: isToday
                          ? `${0.15}vw`
                          : isMonday
                          ? `${0.15}vw`
                          : `${0.05}vw`,
                      }}
                    />
                  );
                })}

                {/* Horizontal grid lines */}
                {filteredTasks.map((_, index) => {
                  const lineTop = shouldUseSpaceBetween
                    ? `${
                        ((index + 1) * availableHeight) / filteredTasks.length
                      }vh`
                    : `${(index + 1) * (taskHeight + taskPadding)}vh`;

                  return (
                    <div
                      key={index}
                      className="absolute w-full border-b border-gray-100"
                      style={{
                        top: lineTop,
                      }}
                    />
                  );
                })}
              </div>

              {/* SVG for smooth curves */}
              <svg
                className="absolute inset-0 pointer-events-none z-10"
                style={{
                  width: `${daysDiff * dayWidth}vw`,
                  height: shouldUseSpaceBetween
                    ? `${availableHeight}vh`
                    : `${filteredTasks.length * (taskHeight + taskPadding)}vh`,
                }}
                viewBox={`0 0 ${
                  (daysDiff * dayWidth * window.innerWidth) / 100
                } ${
                  shouldUseSpaceBetween
                    ? (availableHeight * window.innerHeight) / 100
                    : (filteredTasks.length *
                        (taskHeight + taskPadding) *
                        window.innerHeight) /
                      100
                }`}
                preserveAspectRatio="xMidYMid meet"
              >
                {filteredTasks.map((task, taskIndex) => {
                  return task.dependencies.map((depId) => {
                    const depTask = tasks.find((t) => t.id === depId);
                    const depIndex = filteredTasks.findIndex(
                      (t) => t.id === depId
                    );
                    if (depTask && depIndex !== -1) {
                      // Calculate connection positions using same logic as task positioning
                      const getConnectionY = (index) => {
                        if (shouldUseSpaceBetween) {
                          const rowHeight =
                            availableHeight / filteredTasks.length;
                          const rowTop =
                            (index * availableHeight) / filteredTasks.length;
                          return rowTop + rowHeight / 2; // Center of the row
                        } else {
                          return (
                            index * (taskHeight + taskPadding) + taskHeight / 2
                          );
                        }
                      };

                      const pathData = getConnectionPathWithCustomY(
                        depTask,
                        task,
                        depIndex,
                        taskIndex,
                        getConnectionY(depIndex),
                        getConnectionY(taskIndex)
                      );
                      const hasConflict = hasSchedulingConflict(depTask, task);
                      return (
                        <path
                          key={`curved-${task.id}-${depId}`}
                          d={pathData}
                          stroke={hasConflict ? "#ef4444" : "#3b82f6"}
                          strokeWidth="0.12vw"
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
                {filteredTasks.map((task, index) => {
                  const position = getTaskPosition(task);
                  const hasConflicts = hasTaskConflicts(task);

                  // Calculate task vertical position - same logic as sidebar and grid
                  const getTaskVerticalPosition = () => {
                    if (shouldUseSpaceBetween) {
                      const rowHeight = availableHeight / filteredTasks.length;
                      const rowTop =
                        (index * availableHeight) / filteredTasks.length;
                      return rowTop + (rowHeight - taskHeight) / 2;
                    } else {
                      return (
                        index * (taskHeight + taskPadding) + taskPadding / 2
                      );
                    }
                  };

                  const taskTop = `${getTaskVerticalPosition()}vh`;

                  const actualTaskHeight = shouldUseSpaceBetween
                    ? `${Math.min(
                        taskHeight,
                        (availableHeight / filteredTasks.length) * 0.8
                      )}vh`
                    : `${taskHeight - 1}vh`;

                  return (
                    <div
                      key={task.id}
                      className={`absolute rounded cursor-pointer transition-all duration-200 hover:shadow-md flex items-center justify-between ${getTaskColor(
                        task.type
                      )} ${
                        selectedTask === task.id ? "ring-2 ring-blue-400" : ""
                      }`}
                      style={{
                        left: `${position.x}vw`,
                        top: taskTop,
                        width: `${position.width}vw`,
                        height: actualTaskHeight,
                        padding: `0 ${0.5}vw`,
                      }}
                      onClick={() => setSelectedTask(task.id)}
                      onMouseEnter={() => setHoveredTask(task)}
                      onMouseLeave={() => setHoveredTask(null)}
                    >
                      {/* Task name */}
                      <span
                        style={{ fontSize: `${0.7}vw` }}
                        className="font-medium text-white truncate flex-1"
                      >
                        {task.name}
                      </span>

                      {/* Icons container */}
                      <div
                        className="flex items-center"
                        style={{ gap: `${0.3}vw` }}
                      >
                        {/* Alert symbol for conflicts */}
                        {hasConflicts && (
                          <AlertTriangle
                            style={{
                              width: `${0.8}vw`,
                              height: `${0.8}vw`,
                            }}
                            className="text-white"
                          />
                        )}
                        <Link
                          style={{
                            width: `${0.8}vw`,
                            height: `${0.8}vw`,
                          }}
                          className="text-white"
                          onClick={(e) => handleLinkClick(task, e)}
                        />
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
                <span className="text-gray-400">End:</span>
                <div className="font-medium">
                  {getTaskEndDate(hoveredTask).toLocaleDateString()}
                </div>
              </div>
              <div>
                <span className="text-gray-400">Progress:</span>
                <div className="font-medium">{hoveredTask.progress}%</div>
              </div>
              <div>
                <span className="text-gray-400">Manager:</span>
                <div className="font-medium">{hoveredTask.manager}</div>
              </div>
              <div>
                <span className="text-gray-400">Category:</span>
                <div className="font-medium capitalize">
                  {hoveredTask.category}
                </div>
              </div>
            </div>
            {hasTaskConflicts(hoveredTask) && (
              <div style={{ fontSize: `${0.7}vw` }} className="text-red-400">
                <AlertTriangle
                  style={{
                    width: `${0.8}vw`,
                    height: `${0.8}vw`,
                    display: "inline",
                  }}
                  className="mr-1"
                />
                Scheduling conflicts detected
              </div>
            )}
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
