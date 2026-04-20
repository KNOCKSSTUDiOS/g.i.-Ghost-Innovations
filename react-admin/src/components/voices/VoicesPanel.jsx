import React, { useEffect, useState } from "react";

export default function VoicesPanel() {
  const [voices, setVoices] = useState([]);
  const [form, setForm] = useState({
    name: "",
    style: "",
    gender: "",
    language: "",
    description: ""
  });

  useEffect(() => {
    fetch("http://localhost:3000/voices/list")
      .then(r => r.json())
      .then(setVoices);
  }, []);

  function submit() {
    fetch("http://localhost:3000/voices/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form)
    })
      .then(r => r.json())
      .then(v => setVoices(prev => [...prev, v]));
  }

  return (
    <div className="voices-panel">
      <h2>G.I. Voices</h2>

      <div className="voice-form">
        <input placeholder="Name" onChange={e => setForm({ ...form, name: e.target.value })} />
        <input placeholder="Style" onChange={e => setForm({ ...form, style: e.target.value })} />
        <input placeholder="Gender" onChange={e => setForm({ ...form, gender: e.target.value })} />
        <input placeholder="Language" onChange={e => setForm({ ...form, language: e.target.value })} />
        <textarea placeholder="Description" onChange={e => setForm({ ...form, description: e.target.value })} />
        <button onClick={submit}>Register Voice</button>
      </div>

      <h3>Available Voices</h3>
      <pre>{JSON.stringify(voices, null, 2)}</pre>
    </div>
  );
}
