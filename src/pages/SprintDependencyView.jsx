import GanttChart from "../components/Ganttchart";
import React, { useEffect, useState } from "react";
import dayjs from "dayjs";

export default function SprintDependencyView() {
  // const sprintTasks = [
  //   // 🗓 Current Week
  //   {
  //     id: "sprint-a1",
  //     name: "UI Component Accessibility Review",
  //     startDate: new Date("2025-07-15"),
  //     duration: 5,
  //     dependencies: [],
  //     type: "review",
  //     progress: 35,
  //     category: "Weekly",
  //   },
  //   {
  //     id: "sprint-a2",
  //     name: "Mobile Gesture Bug Fixes",
  //     startDate: new Date("2025-07-16"),
  //     duration: 2,
  //     dependencies: [],
  //     type: "mobile",
  //     progress: 60,
  //     category: "Weekly",
  //   },
  //   {
  //     id: "sprint-a3",
  //     name: "Sprint Timeline Adjustment Tool",
  //     startDate: new Date("2025-07-18"),
  //     duration: 3,
  //     dependencies: ["sprint-a1"],
  //     type: "planning",
  //     progress: 25,
  //     category: "Weekly",
  //   },

  //   // 📅 Current Month (July)
  //   {
  //     id: "sprint-1",
  //     name: "Mobius IntelliBoard",
  //     startDate: new Date("2025-07-11"),
  //     duration: 8,
  //     dependencies: ["sprint-10"],
  //     type: "sprint",
  //     progress: 85,
  //     category: "Sprints",
  //   },
  //   {
  //     id: "sprint-3",
  //     name: "Dependency Analytics",
  //     startDate: new Date("2025-07-21"),
  //     duration: 10,
  //     dependencies: ["sprint-1"],
  //     type: "analytics",
  //     progress: 40,
  //     category: "Sprints",
  //   },
  //   {
  //     id: "sprint-5",
  //     name: "Agent Creation",
  //     startDate: new Date("2025-07-19"),
  //     duration: 8,
  //     dependencies: ["sprint-3"],
  //     type: "agent",
  //     progress: 90,
  //     category: "Sprints",
  //   },
  //   {
  //     id: "sprint-7",
  //     name: "Companion App",
  //     startDate: new Date("2025-07-24"),
  //     duration: 14,
  //     dependencies: ["sprint-5"],
  //     type: "mobile",
  //     progress: 55,
  //     category: "Sprints",
  //   },
  //   {
  //     id: "sprint-10",
  //     name: "Team Performance Analytics",
  //     startDate: new Date("2025-07-27"),
  //     duration: 16,
  //     dependencies: [],
  //     type: "analytics",
  //     progress: 35,
  //     category: "Sprints",
  //   },
  //   {
  //     id: "sprint-a4",
  //     name: "Connector Styling",
  //     startDate: new Date("2025-07-09"),
  //     duration: 6,
  //     dependencies: [],
  //     type: "design",
  //     progress: 50,
  //     category: "Weekly",
  //   },
  //   {
  //     id: "sprint-a5",
  //     name: "Tailwind Dark Mode Alignment",
  //     startDate: new Date("2025-07-14"),
  //     duration: 2,
  //     dependencies: ["sprint-a2"],
  //     type: "frontend",
  //     progress: 75,
  //     category: "Weekly",
  //   },

  //   // 🔙 Previous Month (June)
  //   {
  //     id: "sprint-16",
  //     name: "API Rate Limiting Module",
  //     startDate: new Date("2025-06-07"),
  //     duration: 7,
  //     dependencies: [],
  //     type: "backend",
  //     progress: 50,
  //     category: "Sprints",
  //   },
  //   {
  //     id: "sprint-17",
  //     name: "Pre-Sprint Planning Review",
  //     startDate: new Date("2025-06-18"),
  //     duration: 6,
  //     dependencies: [],
  //     type: "planning",
  //     progress: 20,
  //     category: "Sprints",
  //   },
  //   {
  //     id: "sprint-18",
  //     name: "Notification Center Updates",
  //     startDate: new Date("2025-06-12"),
  //     duration: 9,
  //     dependencies: ["sprint-17"],
  //     type: "feature",
  //     progress: 65,
  //     category: "Sprints",
  //   },
  //   {
  //     id: "sprint-19",
  //     name: "Timeline Visual Optimization",
  //     startDate: new Date("2025-06-22"),
  //     duration: 11,
  //     dependencies: [],
  //     type: "design",
  //     progress: 40,
  //     category: "Sprints",
  //   },
  //   {
  //     id: "sprint-20",
  //     name: "Testing Framework Extension",
  //     startDate: new Date("2025-06-15"),
  //     duration: 8,
  //     dependencies: ["sprint-18"],
  //     type: "testing",
  //     progress: 70,
  //     category: "Sprints",
  //   },

  //   // 🔜 Next Month (August)
  //   {
  //     id: "sprint-21",
  //     name: "Security Patch Deployment",
  //     startDate: new Date("2025-08-05"),
  //     duration: 6,
  //     dependencies: ["sprint-4"],
  //     type: "security",
  //     progress: 35,
  //     category: "Sprints",
  //   },
  //   {
  //     id: "sprint-22",
  //     name: "Benchmarking Suite",
  //     startDate: new Date("2025-08-22"),
  //     duration: 12,
  //     dependencies: ["sprint-21"],
  //     type: "analytics",
  //     progress: 50,
  //     category: "Sprints",
  //   },
  //   {
  //     id: "sprint-23",
  //     name: "Automation Upgrade",
  //     startDate: new Date("2025-08-13"),
  //     duration: 10,
  //     dependencies: ["sprint-22"],
  //     type: "automation",
  //     progress: 60,
  //     category: "Sprints",
  //   },
  //   {
  //     id: "sprint-24",
  //     name: "UI Responsiveness QA",
  //     startDate: new Date("2025-08-27"),
  //     duration: 7,
  //     dependencies: [],
  //     type: "testing",
  //     progress: 45,
  //     category: "Sprints",
  //   },
  //   {
  //     id: "sprint-25",
  //     name: "Sprint Retrospective Review",
  //     startDate: new Date("2025-08-03"),
  //     duration: 5,
  //     dependencies: [],
  //     type: "review",
  //     progress: 90,
  //     category: "Sprints",
  //   },
  // ];


  const [activeSprints, setActiveSprints] = useState([]);
  const [allSprintData, setAllSprintData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const token = import.meta.env.VITE_Bearer_token_for_MIB; // Put token securely

  // Fetch active sprints
  const fetchActiveSprints = async () => {
    try {
      const res = await fetch("https://ig.aidtaas.com/mib-backend/MIB_castingLinks");

      if (!res.ok) {
        throw new Error(`GET API failed: ${res.status}`);
      }

      const data = await res.json();
      console.log("ALL active  sprints",data);
      setActiveSprints(data);
      return data;
    } catch (err) {
      console.error("Error fetching active sprints:", err);
      setError("Failed to fetch active sprints");
      return [];
    }
  };

  // Fetch data per sprintName
  const fetchSprintDetails = async (sprintName) => {
    const url =
      "https://ig.gov-cloud.ai/pi-entity-instances-service/v2.0/schemas/68088a5eb34ddb3e0b55307b/instances/list?size=100&showPageableMetaData=true&showDBaaSReservedKeywords=false";

    const payload = {
      dbType: "TIDB",
      filter: {
        sprintName: sprintName,
      },
    };

    try {
      const res = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(payload),
      });

      if (!res.ok) {
        throw new Error(`POST API failed for ${sprintName}`);
      }

      const data = await res.json();
      return data?.content || [];
    } catch (err) {
      console.error(`Error fetching data for sprint ${sprintName}:`, err);
      return [];
    }
  };

  const fetchSortedIssuesData = async (flattenedData) => {
    try {
      const mappedData = flattenedData.map((issue) => {
        const id = issue.issueKey;
        const name =id +  " " +  issue.fields?.summary || "";
  
        const startRaw = issue.fields?.customfield_10014;
        const sprintStartDate  = issue.fields?.sprint.createdDate
        const endRaw = issue.fields?.customfield_10124;
  
        const startDate = startRaw ? new Date(startRaw.split("T")[0]) : new Date(sprintStartDate.split("T")[0]);
        const endDate = endRaw ? new Date(endRaw.split("T")[0]) : null;
        const typeRaw = issue.fields?.statusCategory.name;
        const type = typeRaw.includes(" ") ? typeRaw.replace(/\s+/g, "") : typeRaw;
  
        let duration = 1;
        if (startDate && endDate) {
          duration = Math.ceil((endDate - startDate) / (1000 * 60 * 60 * 24)); // in days
        }
  
        return {
          id,
          name,
          startDate, // will look like: new Date('2025-07-15')
          duration,
          dependencies: [],
          type,
          progress: 35,
          category: "Weekly",
        };
      });
  
      return mappedData;
    } catch (error) {
      console.error("Error processing flattenedData:", error);
      return [];
    }
  };
  
    

  useEffect(() => {
    console.log("useEffect triggered"); // <-- Add this
    const loadAllData = async () => {
      setLoading(true);
  
      const sprints = await fetchActiveSprints();
  
      const allData = await Promise.all(
        sprints.castingLinks.map((sprint) => fetchSprintDetails(sprint.sprintName))
      );
  
      const flattenedData = allData.flat();
      console.log("flattenedData", flattenedData);

      const SortedIssuesData  = await  fetchSortedIssuesData(flattenedData);

      console.log(SortedIssuesData,"SortedIssuesData");
      setAllSprintData(SortedIssuesData);
      setLoading(false);
    };
  
    loadAllData();
  }, []);
  
  if (loading) return <p>Loading...</p>;
  if (error) return <p style={{ color: "red" }}>{error}</p>;
  return (
    <div className="h-full w-full">
      <GanttChart
        tasks={allSprintData}
        startDate={new Date("2025-06-01")}
        endDate={new Date("2025-10-30")}
      />
    </div>
  );
}
