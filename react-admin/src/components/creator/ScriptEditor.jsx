import React, { useEffect, useState } from "react";

export default function ScriptEditor({ project, scene }) {
  const [text, setText] = useState("");

  useEffect(() => {
    if (!scene) return;
    fetch(`http://localhost:3000/projects/${project.id}/script/${scene.id}`)
      .then(r => r.json())
      .then(d => setText(d.text));
  }, [project, scene]);

  if (!scene) return <div>Select a scene to edit its script</div>;

  function save() {
    fetch(`http://localhost:3000/projects/${project.id}/script/${scene.id}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ text })
    });
  }

  function aiExpand() {
    fetch("http://localhost:3000/ai/script", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        user_id: project.user_id,
        project_id: project.id,
        scene_id: scene.id,
        prompt: "Expand this scene"
      })
    })
      .then(r => r.json())
      .then(out => setText(text + "\n\n" + out.output));
  }

  function aiRewrite() {
    fetch("http://localhost:3000/language/op", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        user_id: project.user_id,
        type: "rewrite",
        input: text
      })
    })
      .then(r => r.json())
      .then(out => setText(out.output));
  }

  return (
    <div className="script-editor">
      <h3>Script: {scene.name}</h3>

      <textarea
        value={text}
        onChange={e => setText(e.target.value)}
        rows={20}
        style={{ width: "100%" }}
      />

      <div style={{ marginTop: "10px", display: "flex", gap: "10px" }}>
        <button onClick={save}>Save</button>
        <button onClick={aiExpand}>+ AI Expand</button>
        <button onClick={aiRewrite}>✎ Rewrite with AI</button>
      </div>
    </div>
  );
}
