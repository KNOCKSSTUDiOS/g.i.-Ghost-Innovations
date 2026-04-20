import React, { useEffect, useState } from "react";

export default function GuardianEditor() {
  const [policies, setPolicies] = useState([]);
  const [form, setForm] = useState({
    name: "",
    description: "",
    allow_actions: "",
    block_actions: "",
    allow_memory_write: true,
    allow_memory_read: true,
    allow_file_upload: true,
    allow_file_download: true,
    allowed_models: "",
    user_id: "",
    project: ""
  });

  useEffect(() => {
    fetch("http://localhost:3000/guardian/policies")
      .then(r => r.json())
      .then(setPolicies);
  }, []);

  function submit() {
    const payload = {
      ...form,
      allow_actions: form.allow_actions.split(",").map(s => s.trim()),
      block_actions: form.block_actions.split(",").map(s => s.trim()),
      allowed_models: form.allowed_models.split(",").map(s => s.trim())
    };

    fetch("http://localhost:3000/guardian/policy", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload)
    })
      .then(r => r.json())
      .then(p => setPolicies(prev => [...prev, p]));
  }

  return (
    <div className="guardian-editor">
      <h2>Guardian Policy Editor</h2>

      <div className="policy-form">
        <input
          placeholder="Policy Name"
          value={form.name}
          onChange={e => setForm({ ...form, name: e.target.value })}
        />

        <textarea
          placeholder="Description"
          value={form.description}
          onChange={e => setForm({ ...form, description: e.target.value })}
        />

        <input
          placeholder="Allow Actions (comma separated)"
          value={form.allow_actions}
          onChange={e => setForm({ ...form, allow_actions: e.target.value })}
        />

        <input
          placeholder="Block Actions (comma separated)"
          value={form.block_actions}
          onChange={e => setForm({ ...form, block_actions: e.target.value })}
        />

        <input
          placeholder="Allowed Models (comma separated)"
          value={form.allowed_models}
          onChange={e => setForm({ ...form, allowed_models: e.target.value })}
        />

        <input
          placeholder="User ID (optional)"
          value={form.user_id}
          onChange={e => setForm({ ...form, user_id: e.target.value })}
        />

        <input
          placeholder="Project ID (optional)"
          value={form.project}
          onChange={e => setForm({ ...form, project: e.target.value })}
        />

        <button onClick={submit}>Create Policy</button>
      </div>

      <h3>Existing Policies</h3>
      <pre>{JSON.stringify(policies, null, 2)}</pre>
    </div>
  );
}

