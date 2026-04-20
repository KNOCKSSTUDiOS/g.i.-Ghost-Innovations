import React from "react";

export default function Sidebar({ setView }) {
  return (
    <div className="sidebar">
      <button onClick={() => setView("logs")}>Logs</button>
      <button onClick={() => setView("metrics")}>Metrics</button>
      <button onClick={() => setView("memory")}>Memory</button>
      <button onClick={() => setView("storage")}>Storage</button>
      <button onClick={() => setView("billing")}>Billing</button>
    </div>
  );
}

