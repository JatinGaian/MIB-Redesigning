// src/pages/profile.jsx
import React from 'react';
import { useApiDataStore } from '../stores/apiDataStore';
import ApiFetch from '../components/ApiFetch';

const ProfileView = () => {
  const { projects, issues, sprints, boards } = useApiDataStore();

  return (
    <div className="p-[3vh]">
      <h1 className="text-[3vh] font-bold mb-[2vh]">Profile Page</h1>

      {/* 🔍 Debug component */}
      <ApiFetch />

      {/* Projects */}
      <section className="mb-[3vh]">
        <h2 className="text-[2.2vh] font-semibold">Projects</h2>
        <ul className="list-disc ml-[2vw] mt-[1vh] text-[1.8vh]">
          {projects.map((proj, i) => (
            <li key={i}>{proj.name || `Project ${i + 1}`}</li>
          ))}
        </ul>
      </section>

      {/* Issues */}
      <section className="mb-[3vh]">
        <h2 className="text-[2.2vh] font-semibold">Issues</h2>
        <ul className="list-disc ml-[2vw] mt-[1vh] text-[1.8vh]">
          {issues.map((issue, i) => (
            <li key={i}>{issue.title || `Issue ${i + 1}`}</li>
          ))}
        </ul>
      </section>

      {/* Sprints */}
      <section className="mb-[3vh]">
        <h2 className="text-[2.2vh] font-semibold">Sprints</h2>
        <ul className="list-disc ml-[2vw] mt-[1vh] text-[1.8vh]">
          {sprints.map((sprint, i) => (
            <li key={i}>{sprint.name || `Sprint ${i + 1}`}</li>
          ))}
        </ul>
      </section>

      {/* Boards */}
      <section className="mb-[3vh]">
        <h2 className="text-[2.2vh] font-semibold">Boards</h2>
        <ul className="list-disc ml-[2vw] mt-[1vh] text-[1.8vh]">
          {boards.map((board, i) => (
            <li key={i}>{board.name || `Board ${i + 1}`}</li>
          ))}
        </ul>
      </section>
    </div>
  );
};

export default ProfileView;
