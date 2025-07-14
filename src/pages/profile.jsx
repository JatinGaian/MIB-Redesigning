import React from 'react';
import { useApiDataStore } from '../stores/apiDataStore';
import { useProjects } from '../hooks/useProjects';
import { useBoards } from '../hooks/useBoards';
import { useActiveSprints } from '../hooks/useActiveSprints';
import { useIssues } from '../hooks/useIssues';
import { shallow } from 'zustand/shallow'; //import shallow

const ProfileView = () => {
  const { projects, boards, sprints, issues } = useApiDataStore(
    (state) => ({
      projects: state.projects,
      boards: state.boards,
      sprints: state.sprints,
      issues: state.issues,
    }),
    shallow
  );

  // React Query hooks (already working fine)
  const { isLoading: loadingProjects, data: projectsData } = useProjects();
  const { isLoading: loadingBoards, data: boardsData } = useBoards();
  const { isLoading: loadingSprints, data: sprintsData } = useActiveSprints();
  const { isLoading: loadingIssues, data: issuesData } = useIssues();

  // Render helper
  const renderItem = (item, i, label) => (
    <li key={i}>
      {item.name || item.title || item.displayName || item.id || `${label} ${i + 1}`}
    </li>
  );

  return (
    <div className="p-[3vh]">
      <h1 className="text-[3vh] font-bold mb-[2vh]">Profile Page</h1>

      {/* Projects */}
      <section className="mb-[4vh]">
        <h2 className="text-[2.2vh] font-semibold">Projects</h2>
        <ul className="list-disc ml-[2vw] mt-[1vh] text-[1.8vh]">
          {loadingProjects ? (
            <li>Loading projects...</li>
          ) : projects.length === 0 ? (
            <li>No projects found.</li>
          ) : (
            projects.map((proj, i) => renderItem(proj, i, 'Project'))
          )}
        </ul>
      </section>

      {/* Boards */}
      <section className="mb-[4vh]">
        <h2 className="text-[2.2vh] font-semibold">Boards</h2>
        <ul className="list-disc ml-[2vw] mt-[1vh] text-[1.8vh]">
          {loadingBoards ? (
            <li>Loading boards...</li>
          ) : boards.length === 0 ? (
            <li>No boards Found.</li>
          ) : (
            boards.map((board, i) => renderItem(board, i, 'Board'))
          )}
        </ul>
      </section>

      {/* Active Sprints */}
      <section className="mb-[4vh]">
        <h2 className="text-[2.2vh] font-semibold">Active Sprints</h2>
        <ul className="list-disc ml-[2vw] mt-[1vh] text-[1.8vh]">
          {loadingSprints ? (
            <li>Loading Sprints...</li>
          ) : sprints.length === 0 ? (
            <li>No sprints Found .</li>
          ) : (
            sprints.map((sprint, i) => renderItem(sprint, i, 'Sprint'))
          )}
        </ul>
      </section>

      {/* Issues */}
      <section>
        <h2 className="text-[2.2vh] font-semibold">Issues</h2>
        <ul className="list-disc ml-[2vw] mt-[1vh] text-[1.8vh]">
          {loadingIssues ? (
            <li>Loading issues...</li>
          ) : issues.length === 0 ? (
            <li>No issues found.</li>
          ) : (
            issues.map((issue, i) => renderItem(issue, i, 'Issue'))
          )}
        </ul>
      </section>
    </div>
  );
};

export default ProfileView;
