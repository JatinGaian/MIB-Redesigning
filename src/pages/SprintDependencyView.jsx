import GanttChart from "../components/Ganttchart";
import React, { useEffect, useState } from "react";
import dayjs from "dayjs";

export default function SprintDependencyView() {
  const today = new Date();

  const startDate = new Date(today.getFullYear(), today.getMonth() - 3, 1); // 1st day of 3 months ago
  const endDate = new Date(today.getFullYear(), today.getMonth() + 3, 0); // Last day of 2 months ahead
  const [activeSprints, setActiveSprints] = useState([]);
  const [ganttChartData, setGanttChartData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const token = import.meta.env.VITE_Bearer_token_for_MIB; // Put token securely

  // Fetch active sprints
  const fetchActiveSprints = async () => {
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
  const fetchIssueDetails = async (sprintName) => {
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
        const id = sprint.id;
        const name = sprint.name || "";

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
        const id = issue.issueKey + i;
        const name = issue.issueKey + " " + issue.fields?.summary || "";

        const startRaw = issue.fields?.customfield_10014;
        const sprintStartDate = issue.fields?.sprint?.createdDate;
        const endRaw = issue.fields?.customfield_10124;

        const startDate = startRaw
          ? new Date(startRaw?.split("T")[0])
          : new Date(sprintStartDate?.split("T")[0]);
        const endDate = endRaw ? new Date(endRaw?.split("T")[0]) : null;
        const typeRaw = issue.fields?.statusCategory.name;
        const type = typeRaw?.includes(" ")
          ? typeRaw?.replace(/\s+/g, "")
          : typeRaw;

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

      const allsprints = await fetchActiveSprints();

      const filteredSprints = allsprints.filter((sprint) => {
        const sprintStart = new Date(sprint.startDateWithoutTime);
        const sprintEnd = new Date(sprint.endDateWithoutTime);

        return sprintStart >= startDate && sprintEnd <= endDate;
      });

      console.log(filteredSprints, "filteredSprints");
      const FormatedSprintsData = await SprintsFormatedData(filteredSprints);
      console.log(FormatedSprintsData, "FormatedSprintsData");

      const TotalIssuesData = await Promise.all(
        filteredSprints.map((sprint) => fetchIssueDetails(sprint.name))
      );

      const flattenedData = TotalIssuesData.flat();
      console.log("flattenedData", flattenedData);

      const SortedIssuesData = await fetchSortedIssuesData(flattenedData);

      console.log(SortedIssuesData, "SortedIssuesData");

      setGanttChartData([...SortedIssuesData, ...FormatedSprintsData]);

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
