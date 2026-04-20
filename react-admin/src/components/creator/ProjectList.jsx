import React, { useEffect, useState } from "react";

export default function ProjectList({ onSelect }) {
  const [projects, setProjects] = useState([]);

  useEffect(() => {
    fetch("http://localhost:3000/projects/list?user_id=admin")
      .then(r => r.json())
      .then(setProjects);
  }, []);

  function createProject() {
    const name = prompt("Project name:");
    if (!name) return;

    fetch("http://localhost:3000/projects/create", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        user_id: "admin",
        name
      })
    })
      .then(r => r.json())
      .then(p => setProjects(prev => [...prev, p]));
  }

  return (
    <div className="project-list">
      <h2>Select Project</h2>

      {projects.map(p => (
        <button key={p.id} onClick={() => onSelect(p)}>
          {p.name}
        </button>
      ))}

      <button onClick={createProject} style={{ marginTop: "10px" }}>
        + New Project
      </button>
    </div>
  );
}
