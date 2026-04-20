import React, { useEffect, useState } from "react";

export default function Timeline({ project }) {
  const [timeline, setTimeline] = useState([]);

  useEffect(() => {
    fetch(`http://localhost:3000/projects/${project.id}/timeline`)
      .then(r => r.json())
      .then(setTimeline);
  }, [project]);

  function addEvent() {
    const time = prompt("Time:");
    const event = prompt("Event:");
    if (!time || !event) return;

    fetch(`http://localhost:3000/projects/${project.id}/timeline`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ time, event })
    })
      .then(r => r.json())
      .then(e => setTimeline(prev => [...prev, e]));
  }

  function aiEvent() {
    const promptText = prompt("Describe the timeline event:");
    if (!promptText) return;

    fetch("http://localhost:3000/ai/timeline", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        user_id: project.user_id,
        project_id: project.id,
        prompt: promptText
      })
    })
      .then(r => r.json())
      .then(out => alert(out.output));
  }

  return (
    <div className="timeline">
      <h3>Timeline</h3>

      {timeline.map(t => (
        <div key={t.id} className="timeline-item">
          <strong>{t.time}</strong> — {t.event}
        </div>
      ))}

      <div style={{ marginTop: "10px", display: "flex", gap: "10px" }}>
        <button onClick={addEvent}>+ Add Event</button>
        <button onClick={aiEvent}>+ AI Event</button>
      </div>
    </div>
  );
}
