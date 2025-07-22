import GanttChart from "../components/Ganttchart";
import React, { useEffect, useState } from "react";
import dayjs from "dayjs";

export default function SprintDependencyView() {
  const today = new Date();

  const startDate = new Date(today.getFullYear(), today.getMonth() - 1, 1); // 1st day of 3 months ago
  const endDate = new Date(today.getFullYear(), today.getMonth() + 2, 0); // Last day of 2 months ahead
  const [activeSprints, setActiveSprints] = useState([]);
  const [ganttChartData, setGanttChartData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const token = import.meta.env.VITE_Bearer_token_for_MIB; // Put token securely
  // Fetch all Projects
  const fetchAllProjects = async () => {
    const url =
      "https://ig.gov-cloud.ai/pi-entity-instances-service/v2.0/schemas/6862c89c2ec4242da906e446/instances/list?size=2500&showPageableMetaData=true&showDBaaSReservedKeywords=false";

    const payload = {
      dbType: "TIDB",
      filter: {
        // sprintName: sprintName,
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
        throw new Error(`POST API failed for all sprints`);
      }

      const data = await res.json();
      return data?.content || [];
    } catch (err) {
      console.error(`Error fetching data for projects `, err);
      return [];
    }
  };
  // Fetch all Boards
  const fetchAllBoards = async () => {
    const url =
      "https://ig.gov-cloud.ai/pi-entity-instances-service/v2.0/schemas/66d97c664006bd33cd1a3746/instances/list?size=2500&showPageableMetaData=true&showDBaaSReservedKeywords=false";

    const payload = {
      dbType: "TIDB",
      filter: {
        // sprintName: sprintName,
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
        throw new Error(`POST API failed for all sprints`);
      }

      const data = await res.json();
      return data?.content || [];
    } catch (err) {
      console.error(`Error fetching data for boards:`, err);
      return [];
    }
  };
  // Fetch active sprints
  const fetchAllSprints = async () => {
    const url =
      "https://ig.gov-cloud.ai/pi-entity-instances-service/v2.0/schemas/66f28b044006bd33cd1a3839/instances/list?size=2500&showPageableMetaData=true&showDBaaSReservedKeywords=false";

    const payload = {
      dbType: "TIDB",
      filter: {
        // sprintName: sprintName,
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
        throw new Error(`POST API failed for all sprints`);
      }

      const data = await res.json();
      return data?.content || [];
    } catch (err) {
      console.error(`Error fetching data for sprint ${sprintName}:`, err);
      return [];
    }
  };

  // Fetch data per sprintName
  const fetchAllIssueDetails = async (sprintName) => {
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

  const SprintsFormatedData = async (filteredSprints) => {
    try {
      const mappedData = filteredSprints.map((sprint) => {
        const id = String(sprint.id);
        const name = sprint.name || "";
        const boardId = sprint.originBoardId;
        const startRaw = sprint.startDate;
        const endRaw = sprint.endDate;

        const startDate = startRaw ? new Date(startRaw?.split("T")[0]) : null;
        const endDate = endRaw ? new Date(endRaw?.split("T")[0]) : null;
        const typeRaw = sprint.state;
        const type = typeRaw?.includes(" ")
          ? typeRaw?.replace(/\s+/g, "")
          : typeRaw;

        let duration = 1;
        if (startDate && endDate) {
          duration = Math.ceil((endDate - startDate) / (1000 * 60 * 60 * 24)); // in days
        }

        return {
          id,
          boardId,
          boardName: "",
          projectId: "",
          projectName: "",
          projectKey: "",
          name,
          startDate, // will look like: new Date('2025-07-15')
          duration,
          dependencies: [],
          type,
          progress: 35,
          category: "sprints",
          manager: "Pedda Raju",
        };
      });

      return mappedData;
    } catch (error) {
      console.error("Error processing filteredSprints:", error);
      return [];
    }
  };

  const fetchSortedIssuesData = async (flattenedData) => {
    try {
      const mappedData = flattenedData.map((issue, i) => {
        const id = issue.issueKey;
        const name = issue.issueKey + " " + issue.fields?.summary || "";
        const sprintId = String(issue.sprintId);
        const startRaw = issue.fields?.customfield_10014;
        const sprintStartDate = issue.fields?.sprint?.createdDate;
        const endRaw = issue.fields?.customfield_10124;
        const boardId = issue.sprintBoardId;
        const startDate = startRaw
          ? new Date(startRaw?.split("T")[0])
          : new Date(sprintStartDate?.split("T")[0]);
        const endDate = endRaw ? new Date(endRaw?.split("T")[0]) : null;
        const typeRaw = issue.fields?.statusCategory.name;
        const type = typeRaw?.includes(" ")
          ? typeRaw?.replace(/\s+/g, "")
          : typeRaw;
        const dependencies =
          issue.fields.issuelinks
            ?.map((link) => link.inwardIssue?.key)
            .filter(Boolean) || [];

        let duration = 1;
        if (startDate && endDate) {
          duration = Math.ceil((endDate - startDate) / (1000 * 60 * 60 * 24)); // in days
        }

        return {
          id,
          boardId,
          boardName: "",
          projectId: "",
          projectName: "",
          sprintId,
          name,
          startDate, // will look like: new Date('2025-07-15')
          duration,
          dependencies,
          type,
          progress: 35,
          category: "issue",
          manager: "KL Das",
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
      const allprojects = await fetchAllProjects();
      const allboards = await fetchAllBoards();
      const allsprints = await fetchAllSprints();

      const filteredSprints = allsprints.filter((sprint) => {
        const sprintStart = new Date(sprint.startDateWithoutTime);
        const sprintEnd = new Date(sprint.endDateWithoutTime);

        return sprintStart >= startDate && sprintEnd <= endDate;
      });

      console.log(filteredSprints, "filteredSprints");

      const TotalIssuesData = await Promise.all(
        filteredSprints.map((sprint) => fetchAllIssueDetails(sprint.name))
      );

      const flattenedData = TotalIssuesData.flat();
      console.log("flattenedData", flattenedData);

      const FormatedSprintsData = await SprintsFormatedData(filteredSprints);
      console.log(FormatedSprintsData, "FormatedSprintsData");

      const SortedIssuesData = await fetchSortedIssuesData(flattenedData);

      console.log(SortedIssuesData, "SortedIssuesData");

      const WithProjectdetails = [
        ...SortedIssuesData,
        ...FormatedSprintsData,
      ].map((entry) => {
        const foundBoard = allboards.find(
          (board) => board.id === entry.boardId
        );
        return {
          ...entry,
          boardName: foundBoard?.name || null,
          projectId: foundBoard?.location?.projectId || null,
          projectName: foundBoard?.location?.projectName || null,
        };
      });
      console.log("WithProjectdetails", WithProjectdetails);
      const WithManagerData = WithProjectdetails.map((entry) => {
        const foundProject = allprojects.find(
          (project) => project.id == entry.projectId
        );
        return {
          ...entry,
          manager: foundProject?.lead?.displayName || null,
          projectKey: foundProject?.projectKey || null,
        };
      });
      console.log("WithManagerData", WithManagerData);
      const uniqueArray = Array.from(
        new Map(WithManagerData.map((item) => [item.id, item])).values()
      );

      uniqueArray.forEach((entry) => {
        if (entry.dependencies?.length > 0) {
          entry.dependencies.forEach((dependency) => {
            const initial = dependency?.split("-")[0];
      
            // Check if dependency is from another project
            if (initial !== entry.projectKey) {
              const foundDependencyIssue = uniqueArray.find(
                (project) => project.id === dependency
              );
      
              if (foundDependencyIssue) {
                const foundDependencySprint = uniqueArray.find(
                  (project) => project.id === foundDependencyIssue.sprintId
                );
      
                if (foundDependencySprint) {
                  // Avoid duplicate sprintIds being pushed
                  if (!foundDependencySprint.dependencies.includes(entry.sprintId)) {
                    foundDependencySprint.dependencies.push(entry.sprintId);
                  }
                }
              }
            }
          });
        }
      });
      console.log(uniqueArray,"uniqueArray");
      
      setGanttChartData(uniqueArray);

      setLoading(false);
    };

    loadAllData();
  }, []);

  if (loading) return <p>Loading...</p>;
  if (error) return <p style={{ color: "red" }}>{error}</p>;
  return (
    <div className="h-full w-full">
      <GanttChart
        tasks={ganttChartData}
        // tasks={sprintTasks}
        startDate={startDate}
        endDate={endDate}
      />
    </div>
  );
}
